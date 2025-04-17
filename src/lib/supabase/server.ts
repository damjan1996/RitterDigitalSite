// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from './types';

/**
 * Erstellt einen Supabase-Server-Client für SSR und API-Routen
 * Mit Cookie-basierter Sitzungsverwaltung
 */
export const createServerSupabaseClient = () => {
    const cookieStore = cookies();

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: any) {
                    try {
                        cookieStore.set(name, value, options);
                    } catch (error) {
                        // Schreibgeschützte Cookie-Instanz in einigen Next.js-Kontexten
                        // Fehler ignorieren, da Cookies nur im Response-Header gesetzt werden können
                    }
                },
                remove(name: string, options: any) {
                    try {
                        cookieStore.set(name, '', { ...options, maxAge: 0 });
                    } catch (error) {
                        // Schreibgeschützte Cookie-Instanz in einigen Next.js-Kontexten
                    }
                },
            },
        }
    );
};

/**
 * Hilfsfunktion zum Abrufen des Benutzers im Server-Kontext
 */
export const getServerUser = async () => {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        return null;
    }

    return data.user;
};

/**
 * Prüft, ob ein Benutzer auf der Serverseite in einer bestimmten Rolle ist
 */
export const serverUserHasRole = async (role: string) => {
    const user = await getServerUser();

    if (!user) return false;

    // Prüft Rollen in user.app_metadata.roles
    const roles = user.app_metadata?.roles || [];
    return Array.isArray(roles) ? roles.includes(role) : roles === role;
};

/**
 * Hilfsfunktion für Serverkomponenten und Seitenfunktionen
 */
export const withServerSupabase = async <T>(
    callback: (supabase: ReturnType<typeof createServerSupabaseClient>) => Promise<T>
): Promise<T> => {
    const supabase = createServerSupabaseClient();
    return callback(supabase);
};

export default {
    createServerSupabaseClient,
    getServerUser,
    serverUserHasRole,
    withServerSupabase,
};