// config/brevo.ts
// Brevo API Konfiguration für E-Mail-Versand

export const BREVO_API_KEY = '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';
export const BREVO_API_URL = 'https://api.brevo.com/v3';

export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
    privacy: boolean;
}

// Eine Funktion, um E-Mails über die Brevo API zu versenden
export const sendContactEmail = async (data: ContactFormData): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': BREVO_API_KEY,
            },
            body: JSON.stringify({
                sender: {
                    name: 'Ritter Digital GmbH Website',
                    email: 'kontakt@ritterdigital.de',
                },
                to: [
                    {
                        email: 'kontakt@ritterdigital.de', // Empfänger-E-Mail-Adresse
                        name: 'Ritter Digital GmbH',
                    },
                ],
                replyTo: {
                    email: data.email,
                    name: `${data.firstName} ${data.lastName}`,
                },
                subject: `Neue Kontaktanfrage von ${data.firstName} ${data.lastName}`,
                htmlContent: `
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Telefon:</strong> ${data.phone}</p>` : ''}
          ${data.company ? `<p><strong>Unternehmen:</strong> ${data.company}</p>` : ''}
          <p><strong>Nachricht:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          <p><strong>Datenschutz:</strong> ${data.privacy ? 'Akzeptiert' : 'Nicht akzeptiert'}</p>
        `,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Fehler beim Senden der E-Mail');
        }

        return { success: true };
    } catch (error) {
        console.error('Fehler beim Senden der Kontaktanfrage:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten'
        };
    }
};

// Funktion für Newsletter-Anmeldungen (falls benötigt)
export const subscribeToNewsletter = async (email: string, firstName?: string, lastName?: string) => {
    try {
        const response = await fetch(`${BREVO_API_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': BREVO_API_KEY,
            },
            body: JSON.stringify({
                email,
                attributes: {
                    FIRSTNAME: firstName || '',
                    LASTNAME: lastName || '',
                },
                listIds: [2], // ID der Newsletter-Liste (muss angepasst werden)
                updateEnabled: true,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Fehler beim Abonnieren des Newsletters');
        }

        return { success: true };
    } catch (error) {
        console.error('Fehler beim Newsletter-Abonnement:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten'
        };
    }
};