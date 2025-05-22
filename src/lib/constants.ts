// src/lib/constants.ts

// Fehlermeldungen für Formulare
export const FORM_ERRORS = {
  MIN_LENGTH: (min: number) => `Mindestens ${min} Zeichen erforderlich`,
  MAX_LENGTH: (max: number) => `Maximal ${max} Zeichen erlaubt`,
  EMAIL: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
  PRIVACY: 'Sie müssen der Datenschutzerklärung zustimmen',
  REQUIRED: 'Dieses Feld ist erforderlich',
  PHONE: 'Bitte geben Sie eine gültige Telefonnummer ein',
  URL: 'Bitte geben Sie eine gültige URL ein',
  PASSWORD_MISMATCH: 'Die Passwörter stimmen nicht überein',
  WEAK_PASSWORD: 'Das Passwort ist zu schwach',
  INVALID_FORMAT: 'Ungültiges Format',
} as const;

// Erfolgsmeldungen
export const SUCCESS_MESSAGES = {
  CONTACT_SENT: 'Ihre Nachricht wurde erfolgreich versendet',
  NEWSLETTER_SUBSCRIBED:
    'Sie haben sich erfolgreich für unseren Newsletter angemeldet',
  PASSWORD_RESET:
    'Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail gesendet',
  PROFILE_UPDATED: 'Ihr Profil wurde erfolgreich aktualisiert',
  SETTINGS_SAVED: 'Ihre Einstellungen wurden gespeichert',
} as const;

// API Endpunkte
export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
  NEWSLETTER: '/api/newsletter',
  BLOG: '/api/blog',
  AUTH: '/api/auth',
} as const;

// Website URL
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ritter-digital.de';

// Unternehmensinformationen
export const COMPANY_INFO = {
  NAME: 'Ritter Digital GmbH',
  FULL_NAME: 'RITTER Gesellschaft für digitale Geschäftsprozesse mbH',
  WEBSITE: SITE_URL,
  EMAIL: 'team@ritterdigital.de',
  PHONE: '+49 208 306 74 850',
  ADDRESS: {
    STREET: 'Essener Straße 2-24',
    CITY: 'Oberhausen',
    ZIP: '46047',
    COUNTRY: 'Deutschland',
    REGION: 'NRW',
  },
  FOUNDING_YEAR: 2003,
  SOCIAL_MEDIA: {
    LINKEDIN: 'https://www.linkedin.com/company/ritter-digital',
    XING: 'https://www.xing.com/companies/ritterdigital',
  },
} as const;

// Navigation Menü
export const NAVIGATION = {
  MAIN: [
    { href: '/', label: 'Startseite' },
    {
      href: '/leistungen',
      label: 'Leistungen',
      submenu: [
        {
          href: '/leistungen/business-intelligence',
          label: 'Business Intelligence',
        },
        { href: '/leistungen/data-warehouse', label: 'Data Warehouse' },
        {
          href: '/leistungen/softwareentwicklung',
          label: 'Softwareentwicklung',
        },
        {
          href: '/leistungen/kuenstliche-intelligenz',
          label: 'Künstliche Intelligenz',
        },
        { href: '/leistungen/digitalisierung', label: 'Digitalisierung' },
        { href: '/leistungen/jtl-wawi', label: 'JTL WaWi' },
      ],
    },
    { href: '/ueber-uns', label: 'Über uns' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
  FOOTER: [
    { href: '/impressum', label: 'Impressum' },
    { href: '/datenschutz', label: 'Datenschutz' },
    { href: '/agb', label: 'AGB' },
  ],
} as const;

// Dienstleistungen
export const SERVICES = {
  BUSINESS_INTELLIGENCE: {
    title: 'Business Intelligence',
    description: 'Datenbasierte Entscheidungen für strategische Vorteile',
    href: '/leistungen/business-intelligence',
    keywords: ['Power BI', 'Integration', 'Visualisierung', 'Analyse'],
  },
  DATA_WAREHOUSE: {
    title: 'Data Warehouse',
    description: 'Zentrale Datenverwaltung für effiziente Analysen',
    href: '/leistungen/data-warehouse',
    keywords: ['Struktur', 'Integration', 'Skalierung', 'Optimierung'],
  },
  SOFTWARE_DEVELOPMENT: {
    title: 'Softwareentwicklung',
    description: 'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse',
    href: '/leistungen/softwareentwicklung',
    keywords: ['Python/React', 'Programme', 'Webapps', 'Scripts'],
  },
  ARTIFICIAL_INTELLIGENCE: {
    title: 'Künstliche Intelligenz',
    description: 'Intelligente Automatisierung und Optimierung',
    href: '/leistungen/kuenstliche-intelligenz',
    keywords: ['Automatisierung', 'Content', 'Training', 'Beratung'],
  },
  DIGITALIZATION: {
    title: 'Digitalisierung',
    description: 'Digitale Transformation für zukunftsfähige Unternehmen',
    href: '/leistungen/digitalisierung',
    keywords: ['Prozesse', 'Transformation', 'Innovation', 'Effizienz'],
  },
  JTL_WAWI: {
    title: 'JTL WaWi',
    description: 'Professionelle JTL-Lösungen und Integrationen',
    href: '/leistungen/jtl-wawi',
    keywords: [
      'Integration',
      'E-Commerce',
      'Warenwirtschaft',
      'Automatisierung',
    ],
  },
} as const;

// Cookie-Kategorien
export const COOKIE_CATEGORIES = {
  ESSENTIAL: 'essential',
  FUNCTIONAL: 'functional',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
} as const;

// Analytics-Ereignistypen
export const ANALYTICS_EVENTS = {
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  NEWSLETTER_SUBSCRIBE: 'newsletter_subscribe',
  DOWNLOAD: 'download',
  EXTERNAL_LINK_CLICK: 'external_link_click',
  SERVICE_VIEW: 'service_view',
  CTA_CLICK: 'cta_click',
} as const;

// Theme-Farben
export const THEME_COLORS = {
  PRIMARY: '#23282D',
  SECONDARY: '#50697D',
  ACCENT: '#FF7A35',
  BACKGROUND: '#FFFFFF',
  MUTED: '#F8F9FC',
  TERTIARY: '#3A4F66',
} as const;

// Breakpoints für responsive Design
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

// E-Mail-Templates
export const EMAIL_TEMPLATES = {
  CONTACT_CONFIRMATION: 'contact_confirmation',
  NEWSLETTER_WELCOME: 'newsletter_welcome',
  PASSWORD_RESET: 'password_reset',
} as const;

// Validierungsregeln
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_MESSAGE_LENGTH: 2000,
  MAX_NAME_LENGTH: 100,
  MIN_NAME_LENGTH: 2,
  MAX_SUBJECT_LENGTH: 200,
} as const;

// SEO-Konstanten
export const SEO = {
  DEFAULT_TITLE: 'Ritter Digital - Ihr Partner für digitale Transformation',
  DEFAULT_DESCRIPTION:
    'Experten für JTL WaWi, Business Intelligence und Softwareentwicklung. Über 20 Jahre Erfahrung in der Digitalisierung von Geschäftsprozessen.',
  DEFAULT_KEYWORDS: [
    'JTL WaWi',
    'Business Intelligence',
    'Softwareentwicklung',
    'Digitalisierung',
    'E-Commerce',
  ],
  SITE_NAME: 'Ritter Digital',
  TWITTER_HANDLE: '@ritterdigital',
} as const;

// Export everything as default object
export const constants = {
  SITE_URL,
  FORM_ERRORS,
  SUCCESS_MESSAGES,
  API_ENDPOINTS,
  COMPANY_INFO,
  NAVIGATION,
  SERVICES,
  COOKIE_CATEGORIES,
  ANALYTICS_EVENTS,
  THEME_COLORS,
  BREAKPOINTS,
  EMAIL_TEMPLATES,
  VALIDATION_RULES,
  SEO,
} as const;

export default constants;
