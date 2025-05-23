// src/app/kontakt/page.tsx
import type { Metadata } from 'next';
import React from 'react';

import { KontaktPage } from '@/components/kontakt';

export const metadata: Metadata = {
  title: 'Kontakt | Ritter Digital GmbH',
  description:
    'Nehmen Sie Kontakt zu uns auf. Wir beraten Sie gerne zu unseren Leistungen in den Bereichen Business Intelligence, Data Warehouse, Softwareentwicklung und künstliche Intelligenz.',
  keywords: [
    'Kontakt',
    'Ritter Digital',
    'Beratung',
    'Business Intelligence',
    'Data Warehouse',
    'Softwareentwicklung',
    'Künstliche Intelligenz',
    'Oberhausen',
  ],
  openGraph: {
    title: 'Kontakt | Ritter Digital GmbH',
    description:
      'Nehmen Sie Kontakt zu uns auf. Wir beraten Sie gerne zu unseren Leistungen in den Bereichen Business Intelligence, Data Warehouse, Softwareentwicklung und künstliche Intelligenz.',
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt | Ritter Digital GmbH',
    description:
      'Nehmen Sie Kontakt zu uns auf. Wir beraten Sie gerne zu unseren Leistungen in den Bereichen Business Intelligence, Data Warehouse, Softwareentwicklung und künstliche Intelligenz.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/kontakt',
  },
};

export default function KontaktRoute() {
  return <KontaktPage />;
}