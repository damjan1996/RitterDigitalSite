// src/app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { newsletterSchema, type NewsletterData } from '@/lib/validation';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validierung mit Zod
    let validatedData: NewsletterData;
    try {
      validatedData = newsletterSchema.parse(body);
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
          } as ErrorResponse,
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Ungültige Formulardaten',
        } as ErrorResponse,
        { status: 400 }
      );
    }

    // Newsletter-Anmeldung verarbeiten
    const subscriptionResult = await processNewsletterSubscription(validatedData);

    if (!subscriptionResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: subscriptionResult.error || 'Fehler bei der Newsletter-Anmeldung',
        } as ErrorResponse,
        { status: 500 }
      );
    }

    // Log der Anmeldung
    console.log('Neue Newsletter-Anmeldung:', {
      email: validatedData.email,
      name: validatedData.firstName
        ? `${validatedData.firstName} ${validatedData.lastName || ''}`.trim()
        : undefined,
      timestamp: new Date().toISOString(),
    });

    // Erfolgreiche Antwort
    return NextResponse.json({
      success: true,
      message: 'Newsletter-Anmeldung erfolgreich',
      alreadySubscribed: subscriptionResult.alreadySubscribed,
    } as SuccessResponse);
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Ein serverseitiger Fehler ist aufgetreten',
      } as ErrorResponse,
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

// Hilfsfunktion zur Newsletter-Anmeldung
async function processNewsletterSubscription(data: NewsletterData): Promise<{
  success: boolean;
  error?: string;
  alreadySubscribed?: boolean;
}> {
  try {
    // Simuliere Newsletter-Service-Integration
    // In der Produktion hier echte Newsletter-API implementieren:
    // 1. Prüfen ob E-Mail bereits angemeldet ist
    // 2. Anmeldung an Newsletter-Service senden
    // 3. Bestätigungs-E-Mail senden

    // Simuliere Netzwerk-Delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simuliere 10% Chance auf bereits vorhandene E-Mail
    const alreadyExists = Math.random() < 0.1;

    if (alreadyExists) {
      return {
        success: true,
        alreadySubscribed: true,
      };
    }

    // Simuliere erfolgreiche Anmeldung
    await simulateConfirmationEmail(data);

    return {
      success: true,
      alreadySubscribed: false,
    };
  } catch (error) {
    console.error('Newsletter subscription processing failed:', error);
    return {
      success: false,
      error: 'Fehler bei der Newsletter-Anmeldung',
    };
  }
}

// Hilfsfunktion zum Senden der Bestätigungs-E-Mail
async function simulateConfirmationEmail(data: NewsletterData): Promise<void> {
  // Simuliere E-Mail-Versand
  await new Promise(resolve => setTimeout(resolve, 300));

  console.log('Bestätigungs-E-Mail gesendet an:', data.email);

  // In der Produktion hier echte E-Mail-Logik implementieren
}

// Beispiel für echte Newsletter-Implementation:
/*
async function subscribeToNewsletter(data: NewsletterData): Promise<{
  success: boolean
  error?: string
  alreadySubscribed?: boolean
}> {
  try {
    // 1. Newsletter-Service API aufrufen (z.B. Mailchimp, Brevo, etc.)
    const response = await fetch('https://api.newsletter-service.com/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEWSLETTER_API_KEY}`,
      },
      body: JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        tags: ['website-signup'],
        doubleOptIn: true, // DSGVO-konform
      }),
    })

    if (!response.ok) {
      if (response.status === 409) {
        return {
          success: true,
          alreadySubscribed: true,
        }
      }
      throw new Error(`Newsletter API error: ${response.status}`)
    }

    const result = await response.json()

    return {
      success: true,
      alreadySubscribed: false,
    }

  } catch (error) {
    console.error('Newsletter API error:', error)
    return {
      success: false,
      error: 'Newsletter service unavailable',
    }
  }
}
*/
