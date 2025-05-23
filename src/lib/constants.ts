// src/lib/constants.ts

/**
 * Anwendungskonstanten für die RITTER Gesellschaft für digitale Geschäftsprozesse mbH Website
 */

// Allgemeine Informationen
export const SITE_NAME = 'RITTER Gesellschaft für digitale Geschäftsprozesse mbH';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ritterdigital.de';
export const SITE_DESCRIPTION =
  'Experten für digitale Prozessoptimierung, Business Intelligence, Data Warehouse und kundenspezifische Softwareentwicklung.';

// Kontaktinformationen
export const CONTACT_INFO = {
  email: 'team@ritterdigital.de',
  phone: '(+49) 0208 306 74 850',
  address: {
    street: 'Essener Straße 2-24',
    zip: '46047',
    city: 'Oberhausen',
    country: 'Deutschland',
  },
  socialMedia: {
    linkedin: 'https://www.linkedin.com/company/ritter-digital-gmbh/',
    xing: 'https://www.xing.com/pages/ritterdigitalgmbh',
  },
};

// Leistungen
export const SERVICES = [
  {
    id: 'business-intelligence',
    title: 'Business Intelligence',
    shortDescription: 'Datenbasierte Entscheidungsfindung für strategische Vorteile.',
    slug: '/leistungen/business-intelligence',
  },
  {
    id: 'data-warehouse',
    title: 'Data Warehouse',
    shortDescription: 'Zentrale Datenverwaltung für effiziente Analysen.',
    slug: '/leistungen/data-warehouse',
  },
  {
    id: 'softwareentwicklung',
    title: 'Softwareentwicklung',
    shortDescription: 'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse.',
    slug: '/leistungen/softwareentwicklung',
  },
  {
    id: 'kuenstliche-intelligenz',
    title: 'Künstliche Intelligenz',
    shortDescription: 'Intelligente Automatisierung und Optimierung.',
    slug: '/leistungen/kuenstliche-intelligenz',
  },
];

// Vorteile/Benefits
export const BENEFITS = [
  {
    title: 'Stručnost u digitalnim procesima',
    description: 'Optimizujemo vaše poslovne procese za maksimalnu efikasnost i rast',
  },
  {
    title: 'Donošenje odluka na osnovu podataka',
    description: 'Pružamo vam pravovremene uvide koji vode ka profitabilnijim poslovnim odlukama',
  },
  {
    title: 'Prilagođena rešenja',
    description: 'Razvijamo softver koji tačno odgovara vašim jedinstvenim poslovnim potrebama',
  },
  {
    title: 'Dokazano iskustvo',
    description: '20+ godina iskustva i više od 90 zadovoljnih klijenata širom sveta',
  },
  {
    title: 'Dugoročno partnerstvo',
    description:
      'Ne nudimo samo rešenja, već i kontinuiranu podršku za održivi rast vašeg poslovanja',
  },
];

// Blog-Kategorien entfernt

// Standardwerte für Paginierung
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
};

// Lokalisierung
export const LOCALES = {
  de: {
    code: 'de',
    name: 'Deutsch',
    default: true,
  },
};

// Cookie-Einstellungen
export const COOKIE_CONSENT_KEY = 'cookie-consent';
export const COOKIE_CONSENT_OPTIONS = {
  ESSENTIAL: 'essential',
  ALL: 'all',
};

// Formular-Fehlermeldungen
export const FORM_ERRORS = {
  REQUIRED: 'Dieses Feld ist erforderlich.',
  EMAIL: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  PHONE: 'Bitte geben Sie eine gültige Telefonnummer ein.',
  MIN_LENGTH: (min: number) => `Bitte geben Sie mindestens ${min} Zeichen ein.`,
  MAX_LENGTH: (max: number) => `Bitte geben Sie maximal ${max} Zeichen ein.`,
  PRIVACY: 'Bitte akzeptieren Sie die Datenschutzbestimmungen.',
};

// Benanntes Objekt für den Export
export const constants = {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  CONTACT_INFO,
  SERVICES,
  BENEFITS,
  // BLOG_CATEGORIES entfernt
  PAGINATION,
  LOCALES,
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_OPTIONS,
  FORM_ERRORS,
};

export default constants;
