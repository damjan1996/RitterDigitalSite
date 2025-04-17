// src/pages/api/newsletter/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { brevoClient } from '@/lib/brevo/client';
import { newsletterSchema } from '@/lib/validation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { event as trackEvent } from '@/lib/analytics';
import { NewsletterSubscriptionData } from '@/lib/brevo/types';

/**
 * API-Handler für Newsletter-Anmeldungen
 * POST: Fügt einen Kontakt zur Newsletter-Liste in Brevo hinzu
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // CORS-Header setzen
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // OPTIONS-Anfragen für CORS beantworten
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Nur POST-Anfragen erlauben
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Methode nicht erlaubt'
        });
    }

    try {
        // Newsletter-Daten aus dem Request-Body extrahieren
        const subscriptionData = req.body as NewsletterSubscriptionData;

        try {
            // Daten mit Zod-Schema validieren
            newsletterSchema.parse(subscriptionData);
        } catch (validationError) {
            // Validierungsfehler zurückgeben
            if (validationError instanceof z.ZodError) {
                const formattedErrors = validationError.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));

                return res.status(400).json({
                    success: false,
                    error: 'Validierungsfehler',
                    validationErrors: formattedErrors,
                });
            }

            return res.status(400).json({
                success: false,
                error: 'Ungültige Formulardaten'
            });
        }

        // Supabase-Client erstellen
        const supabase = createServerSupabaseClient();

        // Überprüfen, ob die E-Mail-Adresse bereits für den Newsletter angemeldet ist
        // Dies könnte in einer separaten Tabelle oder in Brevo gespeichert sein
        // Hier zur Demonstration in einer fiktiven Tabelle 'newsletter_subscribers'
        const { data: existingSubscriber, error: queryError } = await supabase
            .from('newsletter_subscribers')
            .select('id, email')
            .eq('email', subscriptionData.email)
            .maybeSingle();

        if (queryError) {
            console.error('Error checking existing subscriber:', queryError);
            // Wir setzen fort und vertrauen auf die Brevo-API für die Deduplizierung
        }

        // Wenn der Benutzer bereits angemeldet ist, senden wir eine entsprechende Antwort
        if (existingSubscriber) {
            return res.status(200).json({
                success: true,
                message: 'Diese E-Mail-Adresse ist bereits für den Newsletter angemeldet',
                alreadySubscribed: true,
            });
        }

        // Newsletter-Anmeldung in Brevo durchführen
        const { success: brevoSuccess, error: brevoError } = await brevoClient.subscribeToNewsletter(subscriptionData);

        if (!brevoSuccess) {
            console.error('Error subscribing to newsletter via Brevo:', brevoError);
            return res.status(500).json({
                success: false,
                error: 'Fehler bei der Newsletter-Anmeldung'
            });
        }

        // Anmeldung in der Datenbank speichern
        const { error: dbError } = await supabase
            .from('newsletter_subscribers')
            .insert([
                {
                    email: subscriptionData.email,
                    first_name: subscriptionData.firstName || null,
                    last_name: subscriptionData.lastName || null,
                    subscribed_at: new Date().toISOString(),
                    active: true,
                },
            ]);

        if (dbError) {
            console.error('Error saving newsletter subscription to database:', dbError);
            // Wir setzen fort, da die Anmeldung in Brevo bereits erfolgreich war
        }

        // Bestätigungs-E-Mail senden (über Brevo-Template)
        const confirmationResult = await brevoClient.sendTransactionalEmail(
            {
                email: subscriptionData.email,
                name: subscriptionData.firstName
                    ? `${subscriptionData.firstName} ${subscriptionData.lastName || ''}`
                    : undefined
            },
            2, // Newsletter-Bestätigungs-Template-ID
            {
                FIRSTNAME: subscriptionData.firstName || '',
                EMAIL: subscriptionData.email,
            }
        );

        if (!confirmationResult.success) {
            console.warn('Error sending newsletter confirmation email:', confirmationResult.error);
            // Wir setzen fort, da die Hauptfunktionalität bereits erfolgreich war
        }

        // Event für Analytics tracken (serverseitig)
        if (process.env.NODE_ENV === 'production') {
            // Anmerkung: Dies ist eine serverseitige Tracking-Methode, die optional implementiert werden kann
            // Event direkt an Google Analytics senden via Measurement Protocol
        }

        // Erfolgreiche Antwort senden
        return res.status(200).json({
            success: true,
            message: 'Newsletter-Anmeldung erfolgreich',
        });
    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({
            success: false,
            error: 'Ein serverseitiger Fehler ist aufgetreten'
        });
    }
}