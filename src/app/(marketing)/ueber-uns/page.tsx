// src/app/(marketing)/ueber-uns/page.tsx
import type { Metadata } from 'next';
import React from 'react';

import { UeberUnsPage } from '@/components/pages/ueber-uns';

export const metadata: Metadata = {
  title: 'Über uns | Ritter Digital GmbH',
  description:
    'Lernen Sie Ritter Digital GmbH kennen - seit über 20 Jahren Ihr verlässlicher Partner für digitale Transformation, Business Intelligence und maßgeschneiderte Softwarelösungen.',
  keywords: [
    'Ritter Digital',
    'Über uns',
    'Unternehmen',
    'Team',
    'Geschichte',
    'Mission',
    'Vision',
    'Werte',
    'digitale Transformation',
    'Business Intelligence',
    'Softwareentwicklung',
  ],
  openGraph: {
    title: 'Über uns | Ritter Digital GmbH',
    description:
      'Lernen Sie Ritter Digital GmbH kennen - seit über 20 Jahren Ihr verlässlicher Partner für digitale Transformation, Business Intelligence und maßgeschneiderte Softwarelösungen.',
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Über uns | Ritter Digital GmbH',
    description:
      'Lernen Sie Ritter Digital GmbH kennen - seit über 20 Jahren Ihr verlässlicher Partner für digitale Transformation, Business Intelligence und maßgeschneiderte Softwarelösungen.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/ueber-uns',
  },
};

export default function UeberUnsRoute() {
  return <UeberUnsPage />;
}
