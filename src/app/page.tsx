// app/page.tsx - VOLLSTÄNDIG KORRIGIERT
import type { Metadata } from 'next';

// Option 1: Verwende die HomePage Komponente (empfohlen)
import { HomePage } from '@/components/home';

// Option 2: Individuelle Imports (falls gewünscht)
// import { Hero } from '@/components/home/Hero';
// import { ServiceTeaser } from '@/components/home/ServiceTeaser';
// import { Benefits } from '@/components/home/Benefits';
// import { References } from '@/components/home/References';
// import { Clients } from '@/components/home/Clients';
// import { CTAForm } from '@/components/home/CTAForm';

// App Router Metadata
export const metadata: Metadata = {
  title: 'Ritter Digital GmbH | Ihr Partner für Digitalisierung',
  description:
    'Ritter Digital ist Ihr Experte für Business Intelligence, Data Warehouse, Softwareentwicklung und KI-Lösungen. Wir unterstützen Unternehmen dabei, die Potenziale der Digitalisierung zu erschließen.',
  openGraph: {
    title: 'Ritter Digital GmbH | Ihr Partner für Digitalisierung',
    description:
      'Ritter Digital ist Ihr Experte für Business Intelligence, Data Warehouse, Softwareentwicklung und KI-Lösungen.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritter Digital GmbH | Ihr Partner für Digitalisierung',
    description:
      'Ritter Digital ist Ihr Experte für Business Intelligence, Data Warehouse, Softwareentwicklung und KI-Lösungen.',
  },
};

// VOLLSTÄNDIGE strukturierte Daten für die Homepage
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ritter Digital GmbH',
  alternateName: 'RITTER Gesellschaft für digitale Geschäftsprozesse mbH',
  url: 'https://ritterdigital.de',
  logo: 'https://ritterdigital.de/images/logos/logo_ritterdigital.png',
  description:
    'Experten für JTL WaWi, Business Intelligence und Softwareentwicklung. Über 20 Jahre Erfahrung in der Digitalisierung von Geschäftsprozessen.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Essener Straße 2-24',
    addressLocality: 'Oberhausen',
    postalCode: '46047',
    addressCountry: 'DE',
    addressRegion: 'NRW',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+49-208-306-74-850',
    contactType: 'customer service',
    email: 'team@ritterdigital.de',
    availableLanguage: ['German'],
  },
  sameAs: [
    'https://www.linkedin.com/company/ritter-digital',
    'https://www.xing.com/companies/ritterdigital',
  ],
  foundingDate: '2003',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '10-50',
  },
  serviceArea: {
    '@type': 'Place',
    name: 'Deutschland',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digitale Dienstleistungen',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Intelligence',
          description: 'Datenbasierte Entscheidungen für strategische Vorteile',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Data Warehouse',
          description: 'Zentrale Datenverwaltung für effiziente Analysen',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Softwareentwicklung',
          description: 'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Künstliche Intelligenz',
          description: 'Intelligente Automatisierung und Optimierung',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'JTL WaWi',
          description: 'Professionelle JTL-Lösungen und Integrationen',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digitalisierung',
          description: 'Digitale Transformation für zukunftsfähige Unternehmen',
        },
      },
    ],
  },
};

// App Router Page Component
export default function Page() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Option 1: Verwende HomePage Komponente (empfohlen) */}
      <HomePage />

      {/* Option 2: Individuelle Komponenten (auskommentiert) */}
      {/*
      <Hero />
      <ServiceTeaser />
      <Benefits />
      <References />
      <Clients />
      <CTAForm />
      */}
    </>
  );
}
