// src/pages/api/newsletter/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { brevoClient } from '@/lib/brevo/client';
import type { NewsletterSubscriptionData } from '@/lib/brevo/types';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { newsletterSchema } from '@/lib/validation';

// API response types
type SuccessResponse = {
  success: true;
  message: string;
  alreadySubscribed?: boolean;
};

type ErrorResponse = {
  success: false;
  error: string;
  validationErrors?: Array<{ field: string; message: string }>;
};

type ApiResponse = SuccessResponse | ErrorResponse;

// Database insertion type
type NewsletterSubscriberInsert = {
  email: string;
  first_name: string | null;
  last_name: string | null;
  subscribed_at: string;
  active: boolean;
};

/**
 * API-Handler für Newsletter-Anmeldungen
 * POST: Fügt einen Kontakt zur Newsletter-Liste in Brevo hinzu
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
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
      error: 'Methode nicht erlaubt',
    });
  }

  try {
    // Newsletter-Daten aus dem Request-Body extrahieren
    const subscriptionData = req.body as NewsletterSubscriptionData;

    try {
      // Daten mit Zod-Schema validieren
      newsletterSchema.parse(subscriptionData);
    } catch (err) {
      // Validierungsfehler zurückgeben
      if (err instanceof z.ZodError) {
        const formattedErrors = err.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        }));

        return res.status(400).json({
          success: false,
          error: 'Validierungsfehler',
          validationErrors: formattedErrors,
        });
      }

      return res.status(400).json({
        success: false,
        error: 'Ungültige Formulardaten',
      });
    }

    // Supabase-Client erstellen
    const supabase = createServerSupabaseClient();

    // Überprüfen, ob die E-Mail-Adresse bereits für den Newsletter angemeldet ist
    const { data: existingSubscriber, error: queryError } = await supabase
      .from('newsletter_subscribers' as any)
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
    const brevoResult = await brevoClient.subscribeToNewsletter(subscriptionData);

    if (!brevoResult.success) {
      console.error('Error subscribing to newsletter via Brevo:', brevoResult.error);
      return res.status(500).json({
        success: false,
        error: 'Fehler bei der Newsletter-Anmeldung',
      });
    }

    // Anmeldung in der Datenbank speichern
    const newSubscriber: NewsletterSubscriberInsert = {
      email: subscriptionData.email,
      first_name: subscriptionData.firstName || null,
      last_name: subscriptionData.lastName || null,
      subscribed_at: new Date().toISOString(),
      active: true,
    };

    const { error: insertError } = await supabase
      .from('newsletter_subscribers' as any)
      .insert(newSubscriber as any);

    if (insertError) {
      console.error('Error saving newsletter subscription to database:', insertError);
      // Wir setzen fort, da die Anmeldung in Brevo bereits erfolgreich war
    }

    // Bestätigungs-E-Mail senden (über Brevo-Template)
    const recipient = {
      email: subscriptionData.email,
      name: subscriptionData.firstName
        ? `${subscriptionData.firstName} ${subscriptionData.lastName || ''}`.trim()
        : undefined,
    };

    const templateParams = {
      FIRSTNAME: subscriptionData.firstName || '',
      EMAIL: subscriptionData.email,
    };

    // Korrigiert: Template-ID als Nummer übergeben
    const confirmationResult = await brevoClient.sendTransactionalEmail(
      recipient,
      2, // Template-ID als Nummer
      templateParams
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
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Ein serverseitiger Fehler ist aufgetreten',
    });
  }
}
