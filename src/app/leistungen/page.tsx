// src/app/leistungen/page.tsx
import type { Metadata } from 'next';
import React from 'react';

import { LeistungenPage } from '@/components/leistungen';

export const metadata: Metadata = {
  title: 'Unsere Leistungen | Ritter Digital GmbH',
  description:
    'Entdecken Sie unsere Leistungen in den Bereichen Business Intelligence, Data Warehouse, Softwareentwicklung und künstliche Intelligenz. Ritter Digital GmbH ist Ihr Partner für digitale Transformation.',
  keywords: [
    'Leistungen',
    'Business Intelligence',
    'Data Warehouse',
    'Softwareentwicklung',
    'Künstliche Intelligenz',
    'Digitalisierung',
    'JTL WaWi',
    'Ritter Digital',
  ],
  openGraph: {
    title: 'Unsere Leistungen | Ritter Digital GmbH',
    description:
      'Entdecken Sie unsere Leistungen in den Bereichen Business Intelligence, Data Warehouse, Softwareentwicklung und künstliche Intelligenz. Ritter Digital GmbH ist Ihr Partner für digitale Transformation.',
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unsere Leistungen | Ritter Digital GmbH',
    description:
      'Entdecken Sie unsere Leistungen in den Bereichen Business Intelligence, Data Warehouse, Softwareentwicklung und künstliche Intelligenz. Ritter Digital GmbH ist Ihr Partner für digitale Transformation.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/leistungen',
  },
};

export default function LeistungenRoute() {
  return <LeistungenPage />;
}