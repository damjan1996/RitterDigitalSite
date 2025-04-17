// src/hooks/use-supabase.ts
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/config/supabase';
import {
    RealtimeChannel,
    RealtimePostgresChangesPayload,
    PostgrestError,
    PostgrestSingleResponse,
    PostgrestResponse
} from '@supabase/supabase-js';

interface UseSupabaseState<T> {
    data: T | null;
    error: PostgrestError | Error | null;
    loading: boolean;
    count: number | null;
}

interface UseSupabaseOptions {
    realtimeEnabled?: boolean;
    realtimeTable?: string;
    schema?: string;
}

/**
 * Hook für die Interaktion mit Supabase
 * Vereinfacht das Abrufen, Erstellen, Aktualisieren und Löschen von Daten
 *
 * @param table Der Tabellenname in Supabase
 * @param options Optionale Konfiguration (Echtzeit-Updates, Schema)
 * @returns State und Funktionen für Datenbankoperationen
 */
export function useSupabase<T = any>(table: string, options: UseSupabaseOptions = {}) {
    const {
        realtimeEnabled = false,
        realtimeTable = table,
        schema = 'public'
    } = options;

    const [state, setState] = useState<UseSupabaseState<T[]>>({
        data: null,
        error: null,
        loading: true,
        count: null
    });

    const [subscription, setSubscription] = useState<RealtimeChannel | null>(null);

    // Daten mit Filtern abrufen
    const fetch = useCallback(async (
        queryBuilder?: (query: any) => any,
        options: { count?: boolean } = {}
    ) => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            let query = supabase.from(table).select('*', options.count ? { count: 'exact' } : undefined);

            if (queryBuilder) {
                query = queryBuilder(query);
            }

            const response = await query;

            if (response.error) {
                throw response.error;
            }

            setState({
                data: response.data || [],
                error: null,
                loading: false,
                count: response.count
            });

            return response;
        } catch (error: any) {
            console.error(`Error fetching data from ${table}:`, error);
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error : new Error(error.message || 'Unknown error'),
                loading: false
            }));

            return { data: null, error };
        }
    }, [table]);

    // Einzelnen Datensatz abrufen
    const fetchById = useCallback(async (id: string | number): Promise<PostgrestSingleResponse<T>> => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const response = await supabase
                .from(table)
                .select('*')
                .eq('id', id)
                .single();

            if (response.error) {
                throw response.error;
            }

            return response;
        } catch (error: any) {
            console.error(`Error fetching ${table} with id ${id}:`, error);

            return {
                data: null,
                error: error instanceof Error ? error : new Error(error.message || 'Unknown error'),
                count: null,
                status: 400,
                statusText: 'Bad Request'
            };
        }
    }, [table]);

    // Neuen Datensatz erstellen
    const create = useCallback(async (data: Partial<T>): Promise<PostgrestSingleResponse<T>> => {
        try {
            const response = await supabase
                .from(table)
                .insert(data)
                .select()
                .single();

            if (response.error) {
                throw response.error;
            }

            // Daten neu laden, wenn erfolgreich
            fetch();

            return response;
        } catch (error: any) {
            console.error(`Error creating record in ${table}:`, error);

            return {
                data: null,
                error: error instanceof Error ? error : new Error(error.message || 'Unknown error'),
                count: null,
                status: 400,
                statusText: 'Bad Request'
            };
        }
    }, [table, fetch]);

    // Datensatz aktualisieren
    const update = useCallback(async (
        id: string | number,
        data: Partial<T>
    ): Promise<PostgrestSingleResponse<T>> => {
        try {
            const response = await supabase
                .from(table)
                .update(data)
                .eq('id', id)
                .select()
                .single();

            if (response.error) {
                throw response.error;
            }

            // Daten neu laden, wenn erfolgreich
            fetch();

            return response;
        } catch (error: any) {
            console.error(`Error updating record in ${table}:`, error);

            return {
                data: null,
                error: error instanceof Error ? error : new Error(error.message || 'Unknown error'),
                count: null,
                status: 400,
                statusText: 'Bad Request'
            };
        }
    }, [table, fetch]);

    // Datensatz löschen
    const remove = useCallback(async (id: string | number): Promise<PostgrestResponse<null>> => {
        try {
            const response = await supabase
                .from(table)
                .delete()
                .eq('id', id);

            if (response.error) {
                throw response.error;
            }

            // Daten neu laden, wenn erfolgreich
            fetch();

            return response;
        } catch (error: any) {
            console.error(`Error deleting record in ${table}:`, error);

            return {
                data: null,
                error: error instanceof Error ? error : new Error(error.message || 'Unknown error'),
                count: null,
                status: 400,
                statusText: 'Bad Request'
            };
        }
    }, [table, fetch]);

    // Echtzeit-Aktualisierungen
    useEffect(() => {
        // Echtzeit-Updates nur aktivieren, wenn gewünscht
        if (!realtimeEnabled) return;

        const channel = supabase
            .channel(`table:${realtimeTable}:${schema}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema,
                    table: realtimeTable,
                },
                (payload: RealtimePostgresChangesPayload<T>) => {
                    // Daten neu laden, wenn sich etwas ändert
                    fetch();
                }
            )
            .subscribe();

        setSubscription(channel);

        return () => {
            if (subscription) {
                supabase.removeChannel(subscription);
            }
        };
    }, [realtimeEnabled, realtimeTable, schema, fetch, subscription]);

    // Initial Daten laden
    useEffect(() => {
        fetch();
    }, [fetch]);

    return {
        ...state,
        fetch,
        fetchById,
        create,
        update,
        remove,
        supabase
    };
}

export default useSupabase;