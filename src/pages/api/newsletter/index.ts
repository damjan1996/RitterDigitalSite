// src/pages/api/newsletter/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { brevoClient } from '@/lib/brevo/client';
import type { NewsletterSubscriptionData } from '@/lib/brevo/types';
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

    // Wir können hier einen Cache oder eine alternative Datenbank verwenden, um
    // zu überprüfen, ob die E-Mail bereits registriert ist
    // Für jetzt überspringen wir diese Prüfung und vertrauen auf Brevo

    // Newsletter-Anmeldung in Brevo durchführen
    const brevoResult = await brevoClient.subscribeToNewsletter(subscriptionData);

    if (!brevoResult.success) {
      // console.error removed
      return res.status(500).json({
        success: false,
        error: 'Fehler bei der Newsletter-Anmeldung',
      });
    }

    // Log der Anmeldung für interne Nachverfolgung
    // console.log removed

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
      // console.warn removed
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
    // console.error removed
    return res.status(500).json({
      success: false,
      error: 'Ein serverseitiger Fehler ist aufgetreten',
    });
  }
}
