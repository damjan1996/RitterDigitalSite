// src/app/page.tsx
import type { Metadata } from 'next';

import { Benefits } from '@/components/home/Benefits';
import { Clients } from '@/components/home/Clients';
import { CTAForm } from '@/components/home/CTAForm';
import { Hero } from '@/components/home/Hero';
import { References } from '@/components/home/References';
import { ServiceTeaser } from '@/components/home/ServiceTeaser';

export const metadata: Metadata = {
  title: 'Ritter Digital - Ihr Partner für digitale Transformation',
  description:
    'Experten für JTL WaWi, Business Intelligence und Softwareentwicklung. Über 20 Jahre Erfahrung in der Digitalisierung von Geschäftsprozessen.',
  keywords: [
    'JTL WaWi',
    'Business Intelligence',
    'Softwareentwicklung',
    'Digitalisierung',
    'E-Commerce',
  ],
  openGraph: {
    title: 'Ritter Digital - Ihr Partner für digitale Transformation',
    description: 'Experten für JTL WaWi, Business Intelligence und Softwareentwicklung.',
    url: 'https://ritter-digital.de',
    siteName: 'Ritter Digital',
    images: [
      {
        url: 'https://ritter-digital.de/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ritter Digital GmbH',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritter Digital - Ihr Partner für digitale Transformation',
    description: 'Experten für JTL WaWi, Business Intelligence und Softwareentwicklung.',
    images: ['https://ritter-digital.de/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://ritter-digital.de',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Structured Data für die Homepage
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ritter Digital GmbH',
  alternateName: 'RITTER Gesellschaft für digitale Geschäftsprozesse mbH',
  url: 'https://ritter-digital.de',
  logo: 'https://ritter-digital.de/images/logos/logo_ritterdigital.png',
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

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <Hero />
      <ServiceTeaser />
      <Benefits />
      <References />
      <Clients />
      <CTAForm />
    </>
  );
}
