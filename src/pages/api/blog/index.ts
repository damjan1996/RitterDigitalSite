// src/pages/api/blog/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { withAdmin } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { PAGINATION } from '@/lib/constants';

/**
 * API-Handler für Blog-Endpunkte
 * GET: Ruft Blog-Beiträge mit Paginierung und Filterung ab
 * POST: Erstellt einen neuen Blog-Beitrag (nur für authentifizierte Benutzer)
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // CORS-Header setzen
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // OPTIONS-Anfragen für CORS beantworten
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Supabase-Client erstellen
        const supabase = createServerSupabaseClient();

        // GET-Anfragen für das Abrufen von Blog-Beiträgen
        if (req.method === 'GET') {
            // Abfrageparameter aus der Anfrage extrahieren
            const {
                page = PAGINATION.DEFAULT_PAGE,
                limit = PAGINATION.DEFAULT_LIMIT,
                category,
                tag,
                search,
                author
            } = req.query;

            // Seitenzahl und Limit in Zahlen umwandeln
            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);

            // Berechne den Offset für die Paginierung
            const offset = (pageNumber - 1) * limitNumber;

            // Basisabfrage erstellen
            let query = supabase
                .from('blog_posts')
                .select(`
          *,
          categories(*),
          author:authors(*)
        `, { count: 'exact' })
                .eq('published', true)
                .order('published_at', { ascending: false })
                .range(offset, offset + limitNumber - 1);

            // Kategoriefilter hinzufügen, wenn vorhanden
            if (category) {
                // Überprüfen, ob nach Slug oder ID gefiltert wird
                if (isNaN(parseInt(category as string, 10))) {
                    // Nach Slug filtern
                    query = query.eq('categories.slug', category);
                } else {
                    // Nach ID filtern
                    query = query.eq('category_id', parseInt(category as string, 10));
                }
            }

            // Tag-Filter hinzufügen, wenn vorhanden
            if (tag) {
                query = query.contains('tags', [tag]);
            }

            // Autorenfilter hinzufügen, wenn vorhanden
            if (author) {
                query = query.eq('author_id', author);
            }

            // Suchfilter hinzufügen, wenn vorhanden
            if (search) {
                query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
            }

            // Abfrage ausführen
            const { data, error, count } = await query;

            if (error) {
                console.error('Error fetching blog posts:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Fehler beim Abrufen der Blog-Beiträge'
                });
            }

            // Erfolgreiche Antwort senden
            return res.status(200).json({
                success: true,
                data: {
                    posts: data || [],
                    pagination: {
                        page: pageNumber,
                        limit: limitNumber,
                        total: count || 0,
                        totalPages: count ? Math.ceil(count / limitNumber) : 0,
                    },
                },
            });
        }

        // POST-Anfragen für das Erstellen neuer Blog-Beiträge
        if (req.method === 'POST') {
            // Benutzer-Session abrufen
            const { data: { session } } = await supabase.auth.getSession();

            // Authentifizierung prüfen
            if (!session) {
                return res.status(401).json({
                    success: false,
                    error: 'Nicht autorisiert'
                });
            }

            // Benutzerrollen überprüfen (mit Admin-Client)
            const hasAccess = await withAdmin(async (admin) => {
                const { data: userData } = await admin.auth.admin.getUserById(session.user.id);

                // Prüfen, ob der Benutzer ein Author oder Admin ist
                const userRoles = userData.user?.app_metadata?.roles || [];
                return Array.isArray(userRoles)
                    ? userRoles.some(role => ['admin', 'author'].includes(role))
                    : ['admin', 'author'].includes(userRoles);
            });

            if (!hasAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Keine Berechtigung zum Erstellen von Blog-Beiträgen'
                });
            }

            // Daten aus dem Request-Body extrahieren
            const {
                title,
                content,
                excerpt,
                slug,
                category_id,
                tags,
                featured_image,
                meta_title,
                meta_description,
                published = false
            } = req.body;

            // Validierung der Pflichtfelder
            if (!title || !content || !slug || !category_id) {
                return res.status(400).json({
                    success: false,
                    error: 'Titel, Inhalt, Slug und Kategorie sind erforderlich'
                });
            }

            // Prüfen, ob der Slug bereits existiert
            const { data: existingPost } = await supabase
                .from('blog_posts')
                .select('id')
                .eq('slug', slug)
                .maybeSingle();

            if (existingPost) {
                return res.status(400).json({
                    success: false,
                    error: 'Ein Beitrag mit diesem Slug existiert bereits'
                });
            }

            // Neuen Blog-Beitrag erstellen
            const { data: newPost, error: createError } = await supabase
                .from('blog_posts')
                .insert([
                    {
                        title,
                        content,
                        excerpt,
                        slug,
                        category_id,
                        tags,
                        featured_image,
                        meta_title,
                        meta_description,
                        published,
                        author_id: session.user.id,
                        published_at: published ? new Date().toISOString() : null,
                    },
                ])
                .select()
                .single();

            if (createError) {
                console.error('Error creating blog post:', createError);
                return res.status(500).json({
                    success: false,
                    error: 'Fehler beim Erstellen des Blog-Beitrags'
                });
            }

            // Erfolgreiche Antwort senden
            return res.status(201).json({
                success: true,
                data: newPost,
            });
        }

        // Methode nicht erlaubt für andere Anfragen
        return res.status(405).json({
            success: false,
            error: 'Methode nicht erlaubt'
        });
    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({
            success: false,
            error: 'Ein serverseitiger Fehler ist aufgetreten'
        });
    }
}