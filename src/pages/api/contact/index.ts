// src/pages/api/contact/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { brevoClient } from '@/lib/brevo/client';
import type { ContactFormData } from '@/lib/brevo/types';
import { contactFormSchema } from '@/lib/validation';

/**
 * API-Handler für Kontaktformulare
 * POST: Sendet Kontaktformulare per E-Mail
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    // Formular-Daten aus dem Request-Body extrahieren und validieren
    const formData = req.body as ContactFormData;

    try {
      // Daten mit Zod-Schema validieren
      contactFormSchema.parse(formData);
    } catch (validationError) {
      // Validierungsfehler zurückgeben
      if (validationError instanceof z.ZodError) {
        const formattedErrors = validationError.errors.map(err => ({
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
        error: 'Ungültige Formulardaten',
      });
    }

    // Anstelle der Datenbankspeicherung können wir hier eine Log-Ausgabe machen
    // console.log removed

    // E-Mail an das Unternehmen senden
    const { success: emailSuccess } = await brevoClient.sendContactForm(formData);

    if (!emailSuccess) {
      // Error is not used, so we don't capture it
      return res.status(500).json({
        success: false,
        error: 'Fehler beim Senden der E-Mail',
      });
    }

    // Bestätigungs-E-Mail an den Absender senden
    const confirmationResult = await brevoClient.sendConfirmationEmail({
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
    });

    if (!confirmationResult.success) {
      // console.warn removed
      // Wir setzen fort, da die Hauptfunktionalität bereits erfolgreich war
    }

    // Erfolgreiche Antwort senden
    return res.status(200).json({
      success: true,
      message: 'Kontaktanfrage erfolgreich gesendet',
    });
  } catch (error) {
    // console.error removed
    return res.status(500).json({
      success: false,
      error: 'Ein serverseitiger Fehler ist aufgetreten',
    });
  }
}
