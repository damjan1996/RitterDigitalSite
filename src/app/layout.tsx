// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Ritter Digital - Ihr Partner für digitale Transformation',
    template: '%s | Ritter Digital',
  },
  description:
    'Experten für JTL WaWi, Business Intelligence und Softwareentwicklung. Über 20 Jahre Erfahrung in der Digitalisierung von Geschäftsprozessen.',
  keywords: ['JTL WaWi', 'Business Intelligence', 'Softwareentwicklung', 'Digitalisierung'],
  authors: [{ name: 'Ritter Digital GmbH' }],
  creator: 'Ritter Digital GmbH',
  publisher: 'Ritter Digital GmbH',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://ritter-digital.de',
    siteName: 'Ritter Digital',
    title: 'Ritter Digital - Ihr Partner für digitale Transformation',
    description: 'Experten für JTL WaWi, Business Intelligence und Softwareentwicklung.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
