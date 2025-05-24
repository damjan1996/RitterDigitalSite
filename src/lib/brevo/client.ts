// src/lib/brevo/client.ts
import {
  type ContactFormData,
  type NewsletterSubscriptionData,
  type ApiResponse,
  EmailTemplate,
} from './types';

const BREVO_API_URL = 'https://api.brevo.com/v3';

/**
 * Type definitions for Brevo API requests
 */
type EmailPayload = {
  sender: {
    name: string;
    email: string;
  };
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent?: string;
  textContent?: string;
  templateId?: number;
  params?: Record<string, unknown>;
  replyTo?: { email: string; name?: string };
  attachment?: { name: string; content: string; contentType: string }[];
  cc?: { email: string; name?: string }[];
  bcc?: { email: string; name?: string }[];
};

/**
 * Brevo API Client für E-Mail-Versand und Kontaktverwaltung
 * Stellt Funktionen für die Kommunikation mit der Brevo API bereit
 */
export class BrevoClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.BREVO_API_KEY || '';

    if (!this.apiKey) {
      console.warn('Brevo API Key nicht gesetzt. Überprüfen Sie Ihre Umgebungsvariablen.');
    }
  }

  /**
   * Führt einen API-Request gegen die Brevo API aus
   */
  private async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST',
    data?: unknown
  ): Promise<ApiResponse<T>> {
    try {
      // Prüfen, ob API-Key gesetzt ist
      if (!this.apiKey) {
        throw new Error('Brevo API Key ist nicht konfiguriert');
      }

      const response = await fetch(`${BREVO_API_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `API-Fehler: ${response.status}`);
      }

      return { success: true, data: result };
    } catch (error) {
      console.error(`Brevo API Fehler (${endpoint}):`, error);

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten',
      };
    }
  }

  /**
   * Sendet eine E-Mail über die Brevo API
   */
  async sendEmail({
    to,
    subject,
    htmlContent,
    textContent,
    templateId,
    params,
    replyTo,
    attachments,
    cc,
    bcc,
  }: {
    to: { email: string; name?: string }[];
    subject: string;
    htmlContent?: string;
    textContent?: string;
    templateId?: number;
    params?: Record<string, unknown>;
    replyTo?: { email: string; name?: string };
    attachments?: { name: string; content: string; contentType: string }[];
    cc?: { email: string; name?: string }[];
    bcc?: { email: string; name?: string }[];
  }) {
    const payload: EmailPayload = {
      sender: {
        name: 'Ritter Digital GmbH',
        email: 'kontakt@ritterdigital.de',
      },
      to,
      subject,
    };

    // Entweder Template oder direkten Inhalt verwenden
    if (templateId) {
      payload.templateId = templateId;
      if (params) {
        payload.params = params;
      }
    } else {
      if (htmlContent) {
        payload.htmlContent = htmlContent;
      }
      if (textContent) {
        payload.textContent = textContent;
      }
    }

    // Optionale Parameter
    if (replyTo) {
      payload.replyTo = replyTo;
    }
    if (attachments && attachments.length > 0) {
      payload.attachment = attachments;
    }
    if (cc && cc.length > 0) {
      payload.cc = cc;
    }
    if (bcc && bcc.length > 0) {
      payload.bcc = bcc;
    }

    return this.request('/smtp/email', 'POST', payload);
  }

  /**
   * Sendet ein Kontaktformular per E-Mail
   */
  async sendContactForm(data: ContactFormData) {
    return this.sendEmail({
      to: [
        {
          email: 'kontakt@ritterdigital.de',
          name: 'Ritter Digital GmbH',
        },
      ],
      subject: `Neue Kontaktanfrage von ${data.firstName} ${data.lastName}`,
      replyTo: {
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
      },
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
    });
  }

  /**
   * Sendet eine Bestätigungs-E-Mail an einen Kontakt
   */
  async sendConfirmationEmail(
    to: { email: string; name?: string },
    templateId: number = EmailTemplate.CONTACT_CONFIRMATION,
    params?: Record<string, unknown>
  ) {
    return this.sendEmail({
      to: [to],
      subject: 'Vielen Dank für Ihre Anfrage | Ritter Digital GmbH',
      templateId,
      params,
    });
  }

  /**
   * Fügt einen Kontakt zur Brevo-Datenbank hinzu oder aktualisiert ihn
   */
  async createOrUpdateContact(data: {
    email: string;
    attributes?: Record<string, unknown>;
    listIds?: number[];
    updateEnabled?: boolean;
  }) {
    return this.request('/contacts', 'POST', data);
  }

  /**
   * Abonniert einen Kontakt für den Newsletter
   */
  async subscribeToNewsletter(data: NewsletterSubscriptionData) {
    return this.createOrUpdateContact({
      email: data.email,
      attributes: {
        FIRSTNAME: data.firstName || '',
        LASTNAME: data.lastName || '',
        SMS: data.phone || '',
        COMPANY: data.company || '',
        SOURCE: 'Website',
        OPTIN_DATE: new Date().toISOString(),
      },
      listIds: [2], // ID der Newsletter-Liste (muss angepasst werden)
      updateEnabled: true,
    });
  }

  /**
   * Sendet eine transaktionale E-Mail
   */
  async sendTransactionalEmail(
    to: { email: string; name?: string },
    templateId: number,
    params?: Record<string, unknown>
  ) {
    return this.sendEmail({
      to: [to],
      subject: '', // Wird durch das Template überschrieben
      templateId,
      params,
    });
  }
}

// Singleton-Instanz des Brevo-Clients für die Verwendung in der Anwendung
export const brevoClient = new BrevoClient();

export default brevoClient;
