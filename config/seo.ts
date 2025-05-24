// src/config/seo.ts
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants';

/**
 * Standard-SEO-Einstellungen für die gesamte Website
 */
export const defaultSeo = {
  title: 'Ritter Digital GmbH | Experten für digitale Prozesse',
  description:
    'Ritter Digital GmbH ist Ihr Partner für digitale Optimierung von Prozessen und maßgeschneiderte Softwarelösungen. Spezialisiert auf Business Intelligence, Data Warehouse, Softwareentwicklung und künstliche Intelligenz.',
  canonical: SITE_URL,
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: SITE_URL,
    site_name: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    handle: '@ritterdigital',
    site: '@ritterdigital',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'author',
      content: SITE_NAME,
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#FF7A35',
    },
  ],
};

/**
 * Spezifische SEO-Einstellungen für verschiedene Seitentypen
 */
export const pageSeo = {
  home: {
    title: 'Ritter Digital GmbH | Experten für digitale Prozesse',
    description:
      'Willkommen bei Ritter Digital, Ihrem Partner für digitale Transformation und Optimierung von Geschäftsprozessen. Maßgeschneiderte Lösungen für Ihren Erfolg.',
  },
  leistungen: {
    title: 'Unsere Leistungen | Ritter Digital GmbH',
    description:
      'Entdecken Sie unser umfassendes Angebot an digitalen Dienstleistungen: Business Intelligence, Data Warehouse, Softwareentwicklung und KI-Lösungen.',
  },
  'business-intelligence': {
    title: 'Business Intelligence Lösungen | Ritter Digital GmbH',
    description:
      'Unsere maßgeschneiderten Business Intelligence Lösungen helfen Ihnen, fundierte Geschäftsentscheidungen auf Basis von Daten zu treffen.',
  },
  'data-warehouse': {
    title: 'Data Warehouse Lösungen | Ritter Digital GmbH',
    description:
      'Mit unseren Data Warehouse Lösungen schaffen Sie eine zentrale Datenbasis für effiziente Analysen und datengestützte Entscheidungen.',
  },
  'software-entwicklung': {
    title: 'Maßgeschneiderte Softwareentwicklung | Ritter Digital GmbH',
    description:
      'Wir entwickeln individuelle Softwarelösungen, die perfekt auf Ihre Geschäftsprozesse und Anforderungen zugeschnitten sind.',
  },
  'kuenstliche-intelligenz': {
    title: 'KI-Lösungen für Ihr Unternehmen | Ritter Digital GmbH',
    description:
      'Nutzen Sie die Potenziale künstlicher Intelligenz für Ihr Unternehmen – von Automatisierung bis zu intelligenten Analysesystemen.',
  },
  'ueber-uns': {
    title: 'Über uns | Ritter Digital GmbH',
    description:
      'Lernen Sie Ritter Digital kennen – Ihr Partner für digitale Transformation mit über 20 Jahren Erfahrung und mehr als 90 zufriedenen Kunden.',
  },
  // Blog-Eintrag entfernt
  kontakt: {
    title: 'Kontakt | Ritter Digital GmbH',
    description:
      'Nehmen Sie Kontakt mit uns auf – wir freuen uns auf Ihre Anfrage und beraten Sie gerne zu Ihren individuellen Digitalisierungsprojekten.',
  },
  datenschutz: {
    title: 'Datenschutz | Ritter Digital GmbH',
    description:
      'Informationen zum Datenschutz und zur Verwendung Ihrer personenbezogenen Daten auf unserer Website.',
  },
  impressum: {
    title: 'Impressum | Ritter Digital GmbH',
    description: 'Gesetzliche Angaben zum Betreiber der Website der Ritter Digital GmbH.',
  },
};

/**
 * Schema.org JSON-LD Strukturdaten für verschiedene Seitentypen
 */
export const schemaData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ritter Digital GmbH',
    alternateName: 'RITTER Gesellschaft für digitale Geschäftsprozesse mbH',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logos/logo_ritterdigital.png`,
    sameAs: [
      'https://www.linkedin.com/company/ritter-digital-gmbh/',
      'https://www.xing.com/pages/ritterdigitalgmbh',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4902083067485',
        contactType: 'customer service',
        availableLanguage: ['German', 'English'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Essener Straße 2-24',
      postalCode: '46047',
      addressLocality: 'Oberhausen',
      addressCountry: 'DE',
    },
  },

  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#LocalBusiness`,
    name: 'Ritter Digital GmbH',
    image: `${SITE_URL}/images/logos/logo_ritterdigital.png`,
    url: SITE_URL,
    telephone: '+4902083067485',
    email: 'team@ritterdigital.de',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Essener Straße 2-24',
      postalCode: '46047',
      addressLocality: 'Oberhausen',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.481,
      longitude: 6.8497,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    ],
  },

  webPage: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: defaultSeo.title,
    description: defaultSeo.description,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    inLanguage: 'de-DE',
    datePublished: '2023-01-01T00:00:00+00:00',
    dateModified: new Date().toISOString(),
  },

  professionalService: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#professionalservice`,
    name: 'Ritter Digital GmbH',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logos/logo_ritterdigital.png`,
    image: `${SITE_URL}/images/og-image.jpg`,
    telephone: '+4902083067485',
    email: 'team@ritterdigital.de',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Essener Straße 2-24',
      postalCode: '46047',
      addressLocality: 'Oberhausen',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.481,
      longitude: 6.8497,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dienstleistungen',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Business Intelligence',
          description: 'Datenbasierte Entscheidungsfindung für strategische Vorteile.',
          url: `${SITE_URL}/leistungen/business-intelligence`,
        },
        {
          '@type': 'Offer',
          name: 'Data Warehouse',
          description: 'Zentrale Datenverwaltung für effiziente Analysen.',
          url: `${SITE_URL}/leistungen/data-warehouse`,
        },
        {
          '@type': 'Offer',
          name: 'Softwareentwicklung',
          description: 'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse.',
          url: `${SITE_URL}/leistungen/softwareentwicklung`,
        },
        {
          '@type': 'Offer',
          name: 'Künstliche Intelligenz',
          description: 'Intelligente Automatisierung und Optimierung.',
          url: `${SITE_URL}/leistungen/kuenstliche-intelligenz`,
        },
      ],
    },
  },

  // Blog-Schema entfernt

  // Schema für Dienstleistungen
  service: (service: Record<string, unknown>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.description,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      url: `${SITE_URL}/leistungen/${service.slug}`,
      image: service.featured_image,
      areaServed: {
        '@type': 'Country',
        name: 'Germany',
      },
    };
  },

  // Schema für FAQ-Seiten
  faqPage: (faqs: { question: string; answer: string }[]) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  },

  // Schema für Kontaktseite
  contactPage: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${SITE_URL}/kontakt`,
    description: 'Kontaktieren Sie Ritter Digital für Ihre digitalen Projekte',
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      telephone: '+4902083067485',
      email: 'team@ritterdigital.de',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Essener Straße 2-24',
        postalCode: '46047',
        addressLocality: 'Oberhausen',
        addressCountry: 'DE',
      },
    },
  },
};

export default defaultSeo;
