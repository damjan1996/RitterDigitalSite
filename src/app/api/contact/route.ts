// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { contactFormSchema, type ContactFormData } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validierung mit Zod
    let validatedData: ContactFormData;
    try {
      validatedData = contactFormSchema.parse(body);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const formattedErrors = validationError.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return NextResponse.json(
          {
            success: false,
            error: 'Validierungsfehler',
            validationErrors: formattedErrors,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Ungültige Formulardaten',
        },
        { status: 400 }
      );
    }

    // Hier würden Sie normalerweise die E-Mail senden
    // Beispiel-Implementation ohne externe Dependencies:

    // 1. Log der Kontaktanfrage (in Production durch echte E-Mail-API ersetzen)
    console.info('Neue Kontaktanfrage:', {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
    });

    // 2. Hier würden Sie normalerweise eine E-Mail senden:
    // - Mit einem E-Mail-Service wie Brevo, SendGrid, etc.
    // - An Ihre Unternehmens-E-Mail-Adresse
    // - Mit einer Bestätigungs-E-Mail an den Absender

    // Simuliere E-Mail-Versand (ersetzen Sie dies mit echter Implementation)
    const emailSent = await simulateEmailSending(validatedData);

    if (!emailSent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Fehler beim Senden der E-Mail',
        },
        { status: 500 }
      );
    }

    // Erfolgreiche Antwort
    return NextResponse.json({
      success: true,
      message: 'Kontaktanfrage erfolgreich versendet',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Ein serverseitiger Fehler ist aufgetreten',
      },
      { status: 500 }
    );
  }
}

// OPTIONS Handler für CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Hilfsfunktion zum Simulieren des E-Mail-Versands
// In der Produktion durch echte E-Mail-API ersetzen
async function simulateEmailSending(_data: ContactFormData): Promise<boolean> {
  // Simuliere Netzwerk-Delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In der Produktion hier echte E-Mail-Logik implementieren:
  // 1. E-Mail an Unternehmen senden
  // 2. Bestätigungs-E-Mail an Absender senden

  // Für jetzt immer erfolgreich zurückgeben
  return true;
}

// Beispiel für echte E-Mail-Implementation mit einem Service:
/*
async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    // Beispiel mit einem hypothetischen E-Mail-Service
    await emailService.send({
      to: 'team@ritterdigital.de',
      subject: `Neue Kontaktanfrage: ${data.subject}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>E-Mail:</strong> ${data.email}</p>
        <p><strong>Betreff:</strong> ${data.subject}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${data.message}</p>
      `,
    })

    // Bestätigungs-E-Mail an Absender
    await emailService.send({
      to: data.email,
      subject: 'Ihre Kontaktanfrage bei Ritter Digital',
      html: `
        <h2>Vielen Dank für Ihre Kontaktanfrage</h2>
        <p>Hallo ${data.name},</p>
        <p>wir haben Ihre Nachricht erhalten und werden uns zeitnah bei Ihnen melden.</p>
        <p>Mit freundlichen Grüßen<br>Das Team von Ritter Digital</p>
      `,
    })

    return true
  } catch (error) {
    console.error('E-Mail sending failed:', error)
    return false
  }
}
*/
