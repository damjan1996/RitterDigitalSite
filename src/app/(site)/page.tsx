// src/app/(site)/page.tsx - Server Component Lösung
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

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

// Dynamischer Import mit Next.js dynamic
const HomePage = dynamic(
  () => import('@/components/home').then(mod => mod.HomePage),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

// App Router Page Component
export default function HomePageRoute() {
  return <HomePage />;
}
