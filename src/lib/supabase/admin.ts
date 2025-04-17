// src/lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

let adminClient: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Erstellt einen Supabase-Admin-Client mit erweiterten Berechtigungen
 * NUR auf der Serverseite zu verwenden (z.B. in API-Routen oder SSR)
 */
export const getAdminClient = () => {
    // Prüft, ob wir uns auf dem Server befinden
    if (typeof window !== 'undefined') {
        console.error('Der Admin-Client darf nur serverseitig verwendet werden');
        throw new Error('Der Admin-Client darf nur serverseitig verwendet werden');
    }

    // Überprüft, ob die erforderlichen Umgebungsvariablen vorhanden sind
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceRoleKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY nicht in Umgebungsvariablen gesetzt');
    }

    if (!supabaseUrl) {
        throw new Error('NEXT_PUBLIC_SUPABASE_URL nicht in Umgebungsvariablen gesetzt');
    }

    // Verwendet vorhandenen Client oder erstellt einen neuen
    if (!adminClient) {
        adminClient = createClient<Database>(supabaseUrl, serviceRoleKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });
    }

    return adminClient;
};

/**
 * Führt eine Funktion mit dem Admin-Client aus
 * Hilfsfunktion für sicherere Admin-Operationen
 */
export const withAdmin = async <T>(
    callback: (adminClient: ReturnType<typeof createClient<Database>>) => Promise<T>
): Promise<T> => {
    const admin = getAdminClient();
    return callback(admin);
};

/**
 * Gibt einen Benutzer aus der Supabase-Datenbank zurück
 * Nur auf der Serverseite verwenden
 */
export const getUserById = async (userId: string) => {
    return withAdmin(async (admin) => {
        const { data, error } = await admin.auth.admin.getUserById(userId);

        if (error) {
            throw error;
        }

        return data.user;
    });
};

/**
 * Erstellt einen neuen Benutzer mit der Admin-API
 * Nur auf der Serverseite verwenden
 */
export const createUser = async (email: string, password: string, userData?: any) => {
    return withAdmin(async (admin) => {
        const { data, error } = await admin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: userData,
        });

        if (error) {
            throw error;
        }

        return data.user;
    });
};

export default {
    getAdminClient,
    withAdmin,
    getUserById,
    createUser,
};