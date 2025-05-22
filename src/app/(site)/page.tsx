// src/app/(site)/page.tsx
import type { Metadata } from 'next';

import { HomePage } from '@/components/home';

// App Router Metadata (ersetzt SEO Component)
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

// App Router Page Component (kein NextPage Type!)
export default function HomePageRoute() {
  return <HomePage />;
}
