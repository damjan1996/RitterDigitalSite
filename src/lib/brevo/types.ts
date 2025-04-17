// src/lib/brevo/types.ts

/**
 * Allgemeine API-Antwort
 */
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

/**
 * Daten aus dem Kontaktformular
 */
export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
    privacy: boolean;
}

/**
 * Daten für die Newsletter-Anmeldung
 */
export interface NewsletterSubscriptionData {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    company?: string;
    privacy: boolean;
}

/**
 * E-Mail-Anhang
 */
export interface EmailAttachment {
    name: string;
    content: string; // Base64-kodierter Inhalt
    contentType: string;
}

/**
 * Vordefinierte E-Mail-Templates in Brevo
 */
export enum EmailTemplate {
    CONTACT_CONFIRMATION = 1, // Kontaktformular-Bestätigung
    NEWSLETTER_CONFIRMATION = 2, // Newsletter-Anmeldung-Bestätigung
    PASSWORD_RESET = 3, // Passwort-Reset (falls benötigt)
    WELCOME_EMAIL = 4, // Willkommens-E-Mail
}

/**
 * Brevo-Listentypen
 */
export enum ListType {
    NEWSLETTER = 2, // Newsletter-Liste
    LEADS = 3, // Leads-Liste
    CLIENTS = 4, // Kunden-Liste
}

/**
 * Brevo-Kontakt
 */
export interface BrevoContact {
    email: string;
    attributes?: {
        FIRSTNAME?: string;
        LASTNAME?: string;
        SMS?: string;
        COMPANY?: string;
        [key: string]: any;
    };
    listIds?: number[];
    updateEnabled?: boolean;
}