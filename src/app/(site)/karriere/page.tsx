// src/app/(site)/ueber-uns/page.tsx
'use client';

import Head from 'next/head';
import React from 'react';

import { UeberUnsPage } from '@/components/pages/ueber-uns';

export default function UeberUnsRoute() {
  return (
    <>
      <Head>
        <title>Über uns | Ritter Digital GmbH</title>
        <meta
          name="description"
          content="Lernen Sie Ritter Digital GmbH kennen - seit über 20 Jahren Ihr verlässlicher Partner für digitale Transformation, Business Intelligence und maßgeschneiderte Softwarelösungen."
        />
        <meta
          name="keywords"
          content="Ritter Digital, Über uns, Unternehmen, Team, Geschichte, Mission, Vision, Werte, digitale Transformation, Business Intelligence, Softwareentwicklung"
        />
        <meta property="og:title" content="Über uns | Ritter Digital GmbH" />
        <meta
          property="og:description"
          content="Lernen Sie Ritter Digital GmbH kennen - seit über 20 Jahren Ihr verlässlicher Partner für digitale Transformation, Business Intelligence und maßgeschneiderte Softwarelösungen."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Über uns | Ritter Digital GmbH" />
        <meta
          name="twitter:description"
          content="Lernen Sie Ritter Digital GmbH kennen - seit über 20 Jahren Ihr verlässlicher Partner für digitale Transformation, Business Intelligence und maßgeschneiderte Softwarelösungen."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="/ueber-uns" />
      </Head>
      <UeberUnsPage />
    </>
  );
}
