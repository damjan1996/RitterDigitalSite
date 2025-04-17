// src/hooks/use-supabase.ts
import {
  type RealtimeChannel,
  type PostgrestError,
  type PostgrestSingleResponse,
} from '@supabase/supabase-js';
import { useState, useEffect, useCallback } from 'react';

import { supabase } from '@/config/supabase';

interface UseSupabaseState<T> {
  data: T | null;
  error: PostgrestError | null;
  loading: boolean;
  count: number | null;
}

interface UseSupabaseOptions {
  realtimeEnabled?: boolean;
  realtimeTable?: string;
  schema?: string;
}

// Use more generic typing without explicit imports from '@supabase/supabase-js'
type SupabaseFilterBuilder = {
  select: (columns: string, options?: { count?: 'exact' }) => SupabaseFilterBuilder;
  eq: (column: string, value: unknown) => SupabaseFilterBuilder;
  neq: (column: string, value: unknown) => SupabaseFilterBuilder;
  gt: (column: string, value: unknown) => SupabaseFilterBuilder;
  gte: (column: string, value: unknown) => SupabaseFilterBuilder;
  lt: (column: string, value: unknown) => SupabaseFilterBuilder;
  lte: (column: string, value: unknown) => SupabaseFilterBuilder;
  like: (column: string, pattern: string) => SupabaseFilterBuilder;
  ilike: (column: string, pattern: string) => SupabaseFilterBuilder;
  is: (column: string, value: unknown) => SupabaseFilterBuilder;
  in: (column: string, values: unknown[]) => SupabaseFilterBuilder;
  contains: (column: string, value: unknown) => SupabaseFilterBuilder;
  // Add other methods you need from PostgrestFilterBuilder
};

type QueryBuilder<T> = (query: SupabaseFilterBuilder) => SupabaseFilterBuilder;

type ErrorType = {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
};

/**
 * Hook für die Interaktion mit Supabase
 * Vereinfacht das Abrufen, Erstellen, Aktualisieren und Löschen von Daten
 *
 * @param table Der Tabellenname in Supabase
 * @param options Optionale Konfiguration (Echtzeit-Updates, Schema)
 * @returns State und Funktionen für Datenbankoperationen
 */
export function useSupabase<T extends Record<string, unknown>>(
  table: string,
  options: UseSupabaseOptions = {}
) {
  const { realtimeEnabled = false, realtimeTable = table, schema = 'public' } = options;

  const [state, setState] = useState<UseSupabaseState<T[]>>({
    data: null,
    error: null,
    loading: true,
    count: null,
  });

  // Hilfsfunktion zum Erstellen eines einheitlichen PostgrestError
  const createPostgrestError = (error: ErrorType): PostgrestError => {
    return {
      message: error.message || 'Unknown error',
      details: error.details || '',
      hint: error.hint || '',
      code: error.code || 'UNKNOWN_ERROR',
      name: 'PostgrestError',
    };
  };

  // Daten mit Filtern abrufen
  const fetch = useCallback(
    async (queryBuilder?: QueryBuilder<T>, options: { count?: boolean } = {}) => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        // Using a type assertion to avoid type issues while maintaining functionality
        let query = supabase
          .from(table)
          .select(
            '*',
            options.count ? { count: 'exact' } : undefined
          ) as unknown as SupabaseFilterBuilder;

        if (queryBuilder) {
          query = queryBuilder(query);
        }

        const response = await (query as any);

        if (response.error) {
          throw response.error;
        }

        setState({
          data: response.data || [],
          error: null,
          loading: false,
          count: response.count,
        });

        return response;
      } catch (error: unknown) {
        console.error(`Error fetching data from ${table}:`, error);
        setState(prev => ({
          ...prev,
          error: createPostgrestError(error as ErrorType),
          loading: false,
        }));

        return { data: null, error };
      }
    },
    [table]
  );

  // Einzelnen Datensatz abrufen
  const fetchById = useCallback(
    async (id: string | number): Promise<PostgrestSingleResponse<T>> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await supabase.from(table).select('*').eq('id', id).single();

        if (response.error) {
          throw response.error;
        }

        return response;
      } catch (error: unknown) {
        console.error(`Error fetching ${table} with id ${id}:`, error);

        return {
          data: null,
          error: createPostgrestError(error as ErrorType),
          count: null,
          status: 400,
          statusText: 'Bad Request',
        };
      }
    },
    [table]
  );

  // Neuen Datensatz erstellen
  const create = useCallback(
    async (data: Partial<T>): Promise<PostgrestSingleResponse<T>> => {
      try {
        const response = await supabase.from(table).insert(data).select().single();

        if (response.error) {
          throw response.error;
        }

        // Daten neu laden, wenn erfolgreich
        void fetch(); // Using void instead of await to avoid TS80007

        return response;
      } catch (error: unknown) {
        console.error(`Error creating record in ${table}:`, error);

        return {
          data: null,
          error: createPostgrestError(error as ErrorType),
          count: null,
          status: 400,
          statusText: 'Bad Request',
        };
      }
    },
    [table, fetch]
  );

  // Datensatz aktualisieren
  const update = useCallback(
    async (id: string | number, data: Partial<T>): Promise<PostgrestSingleResponse<T>> => {
      try {
        const response = await supabase.from(table).update(data).eq('id', id).select().single();

        if (response.error) {
          throw response.error;
        }

        // Daten neu laden, wenn erfolgreich
        void fetch(); // Using void instead of await to avoid TS80007

        return response;
      } catch (error: unknown) {
        console.error(`Error updating record in ${table}:`, error);

        return {
          data: null,
          error: createPostgrestError(error as ErrorType),
          count: null,
          status: 400,
          statusText: 'Bad Request',
        };
      }
    },
    [table, fetch]
  );

  // Datensatz löschen
  const remove = useCallback(
    async (id: string | number): Promise<PostgrestSingleResponse<null>> => {
      try {
        const { error, status, statusText } = await supabase.from(table).delete().eq('id', id);

        if (error) {
          throw error;
        }

        // Daten neu laden, wenn erfolgreich
        void fetch(); // Using void instead of await to avoid TS80007

        return {
          data: null,
          error: null,
          count: null,
          status,
          statusText,
        };
      } catch (error: unknown) {
        console.error(`Error deleting record in ${table}:`, error);

        return {
          data: null,
          error: createPostgrestError(error as ErrorType),
          count: null,
          status: 400,
          statusText: 'Bad Request',
        };
      }
    },
    [table, fetch]
  );

  // Echtzeit-Aktualisierungen
  useEffect(() => {
    // Echtzeit-Updates nur aktivieren, wenn gewünscht
    if (!realtimeEnabled) return;

    let channel: RealtimeChannel | null = null;

    const setupRealtimeSubscription = () => {
      try {
        channel = supabase.channel(`table-changes-${realtimeTable}`);

        channel.on(
          'postgres_changes',
          {
            event: '*',
            schema: schema,
            table: realtimeTable,
          },
          () => {
            // Daten neu laden, wenn sich etwas ändert
            void fetch(); // Using void to handle the promise
          }
        );

        void channel.subscribe(); // Using void instead of await
      } catch (error) {
        console.error('Fehler beim Einrichten der Echtzeit-Subscription:', error);
      }
    };

    setupRealtimeSubscription();

    return () => {
      if (channel) {
        try {
          void supabase.removeChannel(channel);
        } catch (error) {
          console.error('Fehler beim Entfernen des Channels:', error);
        }
      }
    };
  }, [realtimeEnabled, realtimeTable, schema, fetch]);

  // Initial Daten laden
  useEffect(() => {
    void fetch();
  }, [fetch]);

  return {
    ...state,
    fetch,
    fetchById,
    create,
    update,
    remove,
    supabase,
  };
}

export default useSupabase;
