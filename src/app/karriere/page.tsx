// src/app/karriere/page.tsx
import type { Metadata } from 'next';
import React from 'react';

import { KarrierePageComponent } from '@/components/karriere';

export const metadata: Metadata = {
  title: 'Karriere | Ritter Digital GmbH',
  description:
    'Werden Sie Teil unseres Teams bei Ritter Digital GmbH. Entdecken Sie spannende Karrieremöglichkeiten in den Bereichen Business Intelligence, Softwareentwicklung und digitale Transformation.',
  keywords: [
    'Karriere',
    'Jobs',
    'Stellenangebote',
    'Ritter Digital',
    'Business Intelligence',
    'Softwareentwicklung',
    'Digitalisierung',
    'Team',
    'Bewerbung',
  ],
  openGraph: {
    title: 'Karriere | Ritter Digital GmbH',
    description:
      'Werden Sie Teil unseres Teams bei Ritter Digital GmbH. Entdecken Sie spannende Karrieremöglichkeiten in den Bereichen Business Intelligence, Softwareentwicklung und digitale Transformation.',
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karriere | Ritter Digital GmbH',
    description:
      'Werden Sie Teil unseres Teams bei Ritter Digital GmbH. Entdecken Sie spannende Karrieremöglichkeiten in den Bereichen Business Intelligence, Softwareentwicklung und digitale Transformation.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/karriere',
  },
};

export default function KarrierePage() {
  return <KarrierePageComponent />;
}