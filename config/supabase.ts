// config/supabase.ts
// Supabase Konfiguration für die Datenbank-Anbindung

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Umgebungsvariablen für Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Stellt sicher, dass die Umgebungsvariablen gesetzt sind
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        'Supabase URL oder Anon Key nicht in Umgebungsvariablen gesetzt. ' +
        'Einige Funktionen könnten nicht wie erwartet arbeiten.'
    );
}

// Supabase Client für den Browser
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Blog-bezogene Funktionen
export const getBlogPosts = async (page = 1, pageSize = 10, category?: string) => {
    try {
        let query = supabase
            .from('blog_posts')
            .select('*, categories(*)', { count: 'exact' })
            .eq('published', true)
            .order('published_at', { ascending: false })
            .range((page - 1) * pageSize, page * pageSize - 1);

        if (category) {
            query = query.eq('categories.slug', category);
        }

        const { data, error, count } = await query;

        if (error) throw error;

        return {
            posts: data || [],
            totalCount: count || 0,
            currentPage: page,
            totalPages: count ? Math.ceil(count / pageSize) : 0,
        };
    } catch (error) {
        console.error('Fehler beim Abrufen der Blog-Beiträge:', error);
        return {
            posts: [],
            totalCount: 0,
            currentPage: page,
            totalPages: 0,
        };
    }
};

export const getBlogPostBySlug = async (slug: string) => {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*, categories(*), author:authors(*)')
            .eq('slug', slug)
            .eq('published', true)
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error(`Fehler beim Abrufen des Blog-Beitrags mit Slug ${slug}:`, error);
        return null;
    }
};

export const getBlogCategories = async () => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (error) throw error;

        return data || [];
    } catch (error) {
        console.error('Fehler beim Abrufen der Blog-Kategorien:', error);
        return [];
    }
};

// Funktionen für die Kontaktformular-Übermittlung (falls mit Supabase gespeichert)
export const saveContactRequest = async (contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
}) => {
    try {
        const { data, error } = await supabase
            .from('contact_requests')
            .insert([
                {
                    first_name: contactData.firstName,
                    last_name: contactData.lastName,
                    email: contactData.email,
                    phone: contactData.phone || null,
                    company: contactData.company || null,
                    message: contactData.message,
                    created_at: new Date().toISOString(),
                },
            ]);

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Fehler beim Speichern der Kontaktanfrage:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten',
        };
    }
};

// Administration (erfordert Server-Side Authentifizierung)
export const adminClient = (adminKey?: string) => {
    // Diese Funktion sollte nur serverseitig verwendet werden
    if (typeof window !== 'undefined') {
        console.warn('adminClient sollte nur in serverseitigen Funktionen verwendet werden');
        return supabase;
    }

    const key = adminKey || process.env.SUPABASE_SERVICE_KEY || '';
    if (!key) {
        console.error('SUPABASE_SERVICE_KEY nicht gesetzt');
        throw new Error('SUPABASE_SERVICE_KEY nicht gesetzt');
    }

    return createClient<Database>(supabaseUrl, key, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
};

export default supabase;