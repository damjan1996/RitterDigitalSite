// src/pages/index.tsx - Optimierte Startseite
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { schemaData } from '@/config/seo';

import { HomePage } from '../pages/home/components/index';

const Home: NextPage = () => {
  // Kombiniere Standard-Schema mit der Website-Info
  // Typensichere Verarbeitung der Schema-Daten
  const combinedSchema = {
    ...schemaData.organization,
    // Typgerechte Überprüfung und Hinzufügen der optionalen Schema-Daten
    ...((schemaData as Record<string, unknown>).professionalService || {}),
    ...((schemaData as Record<string, unknown>).website || {}),
  };

  return (
    <>
      <NextSeo
        title="Ritter Digital GmbH | Experten für digitale Prozesse"
        description="Ritter Digital GmbH ist Ihr Partner für digitale Optimierung von Prozessen und maßgeschneiderte Softwarelösungen. Spezialisiert auf Business Intelligence, Data Warehouse, Softwareentwicklung und künstliche Intelligenz."
        canonical="https://ritterdigital.de/"
        openGraph={{
          url: 'https://ritterdigital.de/',
          title: 'Ritter Digital GmbH | Experten für digitale Prozesse',
          description:
            'Ritter Digital GmbH ist Ihr Partner für digitale Optimierung von Prozessen und maßgeschneiderte Softwarelösungen.',
          images: [
            {
              url: 'https://ritterdigital.de/images/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Ritter Digital GmbH',
              type: 'image/jpeg',
            },
          ],
          site_name: 'Ritter Digital GmbH',
          type: 'website',
          locale: 'de_DE',
        }}
        twitter={{
          handle: '@ritterdigital',
          site: '@ritterdigital',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'Business Intelligence, Data Warehouse, Softwareentwicklung, Künstliche Intelligenz, digitale Prozesse, Digitalisierung, Datenanalyse, Business Analytics, BI Reporting, KI-Lösungen, Prozessoptimierung',
          },
          {
            name: 'author',
            content: 'Ritter Digital GmbH',
          },
          {
            name: 'format-detection',
            content: 'telephone=no',
          },
        ]}
        robotsProps={{
          nosnippet: false,
          notranslate: false,
          noimageindex: false,
          noarchive: false,
          maxSnippet: -1,
          maxImagePreview: 'large',
          maxVideoPreview: -1,
        }}
      />

      {/* JSON-LD strukturierte Daten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedSchema),
        }}
      />

      <HomePage />
    </>
  );
};

export default Home;
