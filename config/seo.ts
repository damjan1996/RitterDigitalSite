// config/seo.ts
// SEO-Konfiguration für die Website

// Basis-Metadaten für die gesamte Website
export const defaultSeo = {
  title: 'RITTER Gesellschaft für digitale Geschäftsprozesse mbH | Experten für digitale Prozesse',
  titleTemplate: '%s | RITTER Gesellschaft für digitale Geschäftsprozesse mbH',
  description:
    'RITTER Gesellschaft für digitale Geschäftsprozesse mbH ist Ihr Experte für digitale Prozessoptimierung, Business Intelligence, Data Warehouse und kundenspezifische Softwareentwicklung.',
  canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ritterdigital.de',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ritterdigital.de',
    site_name: 'RITTER Gesellschaft für digitale Geschäftsprozesse mbH',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ritterdigital.de'}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'RITTER Gesellschaft für digitale Geschäftsprozesse mbH',
      },
    ],
  },
  twitter: {
    handle: '@RitterDigital',
    site: '@RitterDigital',
    cardType: 'summary_large_image',
  },
};

// Seitenspezifische Metadaten
export const pageSeo = {
  home: {
    title:
      'RITTER Gesellschaft für digitale Geschäftsprozesse mbH | Experten für digitale Prozesse',
    description:
      'RITTER Gesellschaft für digitale Geschäftsprozesse mbH ist Ihr Experte in der Welt des Handels und der damit verbundenen digitalen Geschäftsprozesse. Mit maßgeschneiderten Softwarelösungen revolutionieren wir die Prozessoptimierung und Digitalisierung für kleine und mittelständische Unternehmen.',
  },
  leistungen: {
    title: 'Unsere Leistungen | Digitale Lösungen für Ihr Unternehmen',
    description:
      'Entdecken Sie unsere maßgeschneiderten digitalen Lösungen: Business Intelligence, Data Warehouse, Softwareentwicklung und Künstliche Intelligenz für Ihr Unternehmen.',
  },
  businessIntelligence: {
    title: 'Business Intelligence | Datenbasierte Entscheidungsfindung',
    description:
      'Unsere Business Intelligence Lösungen verwandeln Ihre Daten in wertvolle Erkenntnisse für fundierte Geschäftsentscheidungen und strategische Vorteile.',
  },
  dataWarehouse: {
    title: 'Data Warehouse | Zentrale Datenverwaltung für Unternehmen',
    description:
      'Mit unseren Data Warehouse Lösungen schaffen wir eine zentrale Datenbasis für Ihr Unternehmen und ermöglichen eine effiziente Analyse und Verwaltung Ihrer Geschäftsdaten.',
  },
  softwareentwicklung: {
    title: 'Softwareentwicklung | Maßgeschneiderte Lösungen',
    description:
      'Wir entwickeln maßgeschneiderte Softwarelösungen, die exakt auf Ihre Geschäftsprozesse zugeschnitten sind und Ihre digitale Transformation vorantreiben.',
  },
  kuenstlicheIntelligenz: {
    title: 'Künstliche Intelligenz | Intelligente Automatisierung',
    description:
      'Unsere KI-Lösungen automatisieren komplexe Prozesse, optimieren Ressourcen und erschließen neue Geschäftsmöglichkeiten für Ihr Unternehmen.',
  },
  ueberUns: {
    title: 'Über Uns | RITTER Gesellschaft für digitale Geschäftsprozesse mbH',
    description:
      'Lernen Sie das Team und die Geschichte der RITTER Gesellschaft für digitale Geschäftsprozesse mbH kennen – Ihr Partner für digitale Transformation und Prozessoptimierung seit über 20 Jahren.',
  },
  blog: {
    title: 'Blog | Neuigkeiten und Fachwissen',
    description:
      'In unserem Blog teilen wir Fachwissen, Trends und praxisnahe Tipps aus den Bereichen Digitalisierung, Business Intelligence und Prozessoptimierung.',
  },
  karriere: {
    title: 'Karriere | Jobs bei RITTER Gesellschaft für digitale Geschäftsprozesse mbH',
    description:
      'Entdecken Sie spannende Karrieremöglichkeiten bei der RITTER Gesellschaft für digitale Geschäftsprozesse mbH und werden Sie Teil unseres Teams von Digitalexperten.',
  },
  kontakt: {
    title: 'Kontakt | RITTER Gesellschaft für digitale Geschäftsprozesse mbH',
    description:
      'Nehmen Sie Kontakt mit uns auf und erfahren Sie, wie wir Ihr Unternehmen bei der digitalen Transformation unterstützen können.',
  },
};

// Schema.org / JSON-LD Daten
export const schemaData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RITTER Gesellschaft für digitale Geschäftsprozesse mbH',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ritterdigital.de',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ritterdigital.de'}/images/logos/logo.svg`,
    sameAs: [
      'https://www.linkedin.com/company/ritter-digital-gmbh/',
      'https://www.xing.com/pages/ritterdigitalgmbh',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '(+49) 0208 306 74 850',
      contactType: 'customer service',
      email: 'team@ritterdigital.de',
      availableLanguage: ['German'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Essener Straße 2-24',
      addressLocality: 'Oberhausen',
      postalCode: '46047',
      addressCountry: 'DE',
    },
  },
};
