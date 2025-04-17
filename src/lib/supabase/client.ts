// src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

import type { Database } from './types';

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

// Export um die TypeScript-Warnung für ungenutzte Funktion zu verhindern
export { userHasRole };

/**
 * Prüft, ob ein Benutzer in einer bestimmten Rolle ist
 * @internal Diese Funktion wird aktuell nicht aktiv verwendet, bleibt aber für zukünftige Nutzung verfügbar
 */
const userHasRole = async (role: string) => {
  const user = await getCurrentUser();

  if (!user) return false;

  // Prüft Rollen in user.app_metadata.roles
  const roles = user.app_metadata?.roles || [];
  return Array.isArray(roles) ? roles.includes(role) : roles === role;
};

/**
 * Vereinfachter direkter Zugriff auf Tabellen
 */
export const tables = {
  // Direkter Zugriff auf blog_posts Tabelle mit korrekter Typisierung
  blogPosts: supabase.from('blog_posts'),

  // Weitere Tabellen hier hinzufügen wenn nötig
  // users: supabase.from('users'),
  // products: supabase.from('products'),
};

/**
 * Erweitere diesen Typ bei Bedarf für weitere Tabellen
 */
export type SupabaseTable = 'blog_posts'; // | 'users' | 'products' | etc.

/**
 * Hilfsfunktion für direkten Tabellenzugriff
 * Ermöglicht typensicheren Zugriff auf jede Tabelle
 */
export const getTable = (tableName: SupabaseTable) => {
  return supabase.from(tableName);
};

/**
 * Base64-codiert einen String (für slug-Erstellung etc.)
 */
export const encodeBase64 = (str: string) => {
  if (typeof window !== 'undefined') {
    return window.btoa(str);
  }
  return Buffer.from(str).toString('base64');
};

/**
 * Decodiert einen Base64-String
 */
export const decodeBase64 = (str: string) => {
  if (typeof window !== 'undefined') {
    return window.atob(str);
  }
  return Buffer.from(str, 'base64').toString();
};

// Export des Supabase-Clients als Standard
export default supabase;
