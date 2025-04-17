// src/pages/api/contact/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { brevoClient } from '@/lib/brevo/client';
import type { ContactFormData } from '@/lib/brevo/types';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { contactFormSchema } from '@/lib/validation';

/**
 * API-Handler für Kontaktformulare
 * POST: Sendet Kontaktformulare per E-Mail und speichert sie in der Datenbank
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

    // Supabase-Client erstellen
    const supabase = createServerSupabaseClient();

    // Kontaktanfrage in der Datenbank speichern
    const { error: dbError } = await supabase.from('contact_requests').insert([
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        message: formData.message,
        status: 'new',
        created_at: new Date().toISOString(),
      },
    ]);

    if (dbError) {
      console.error('Error saving contact request to database:', dbError);
      // Wir setzen fort, da das Senden der E-Mail wichtiger ist
    }

    // E-Mail an das Unternehmen senden
    const { success: emailSuccess, error: emailError } =
      await brevoClient.sendContactForm(formData);

    if (!emailSuccess) {
      console.error('Error sending contact email:', emailError);
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
      console.warn('Error sending confirmation email:', confirmationResult.error);
      // Wir setzen fort, da die Hauptfunktionalität bereits erfolgreich war
    }

    // Erfolgreiche Antwort senden
    return res.status(200).json({
      success: true,
      message: 'Kontaktanfrage erfolgreich gesendet',
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Ein serverseitiger Fehler ist aufgetreten',
    });
  }
}
