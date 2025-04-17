// src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// Überprüft, ob die erforderlichen Umgebungsvariablen vorhanden sind
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        'Supabase Umgebungsvariablen fehlen. Bitte setzen Sie NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
}

/**
 * Supabase-Client für clientseitige Operationen
 * Verwendet die öffentlichen Anon-Schlüssel mit RLS-Sicherheit
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
});

/**
 * Prüft, ob ein Benutzer angemeldet ist
 * Gibt Benutzer-Objekt oder null zurück
 */
export const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        return null;
    }
    return data.user;
};

/**
 * Prüft, ob ein Benutzer in einer bestimmten Rolle ist
 */
export const userHasRole = async (role: string) => {
    const user = await getCurrentUser();

    if (!user) return false;

    // Prüft Rollen in user.app_metadata.roles
    const roles = user.app_metadata?.roles || [];
    return Array.isArray(roles) ? roles.includes(role) : roles === role;
};

/**
 * Hilft beim Erstellen von Supabase-Abfragen
 * Typische Filterparameter (limit, offset, order, etc.)
 */
export const createQueryBuilder = <T>(from: string) => {
    const queryBuilder = {
        select: (columns: string = '*', options?: { count?: 'exact' | 'planned' | 'estimated' }) => {
            return supabase.from(from).select(columns, options);
        },
        getById: (id: string | number, columns: string = '*') => {
            return supabase.from(from).select(columns).eq('id', id).single();
        },
        getOne: (column: string, value: any, selectColumns: string = '*') => {
            return supabase.from(from).select(selectColumns).eq(column, value).single();
        },
        getMany: (column: string, value: any, selectColumns: string = '*') => {
            return supabase.from(from).select(selectColumns).eq(column, value);
        },
        insert: (data: Partial<T> | Partial<T>[]) => {
            return supabase.from(from).insert(data).select();
        },
        update: (id: string | number, data: Partial<T>) => {
            return supabase.from(from).update(data).eq('id', id).select();
        },
        delete: (id: string | number) => {
            return supabase.from(from).delete().eq('id', id);
        },
        search: (column: string, query: string, selectColumns: string = '*') => {
            return supabase.from(from).select(selectColumns).ilike(column, `%${query}%`);
        },
    };

    return queryBuilder;
};

export default supabase;