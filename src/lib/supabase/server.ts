// src/lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js';

import type { Database } from './types';

/**
 * Erstellt einen Supabase-Server-Client für SSR und API-Routen
 * Diese vereinfachte Version nutzt keine Cookie-basierte Authentifizierung
 * HINWEIS: Für vollständige Server-Unterstützung, installiere '@supabase/auth-helpers-nextjs' oder '@supabase/ssr'
 */
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Supabase Umgebungsvariablen fehlen für Server-Client');
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

/**
 * Hilfsfunktion zum Abrufen des Benutzers im Server-Kontext
 * HINWEIS: Diese Funktion ist eingeschränkt ohne Cookie-basierte Auth
 */
export const getServerUser = async () => {
  // Ohne Cookie-basierte Authentifizierung kann diese Funktion
  // keinen angemeldeten Benutzer zurückgeben
  return null;
};

/**
 * Prüft, ob ein Benutzer auf der Serverseite in einer bestimmten Rolle ist
 * HINWEIS: Diese Funktion ist eingeschränkt ohne Cookie-basierte Auth
 */
export const serverUserHasRole = async (_role: string) => {
  // Ohne Cookie-basierte Authentifizierung ist diese Funktion eingeschränkt
  return false;
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

// Benanntes Objekt für den Export
export const serverClient = {
  createServerSupabaseClient,
  getServerUser,
  serverUserHasRole,
  withServerSupabase,
};

export default serverClient;
