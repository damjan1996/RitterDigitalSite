// src/components/common/seo.tsx
'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation'; // ✅ App Router import
import React from 'react';

import { defaultSeo, pageSeo, schemaData } from '@/config/seo';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  pageType?: keyof typeof pageSeo;
  schema?: object;
}

/**
 * SEO-Komponente für einheitliches Metadaten-Management
 * Kombiniert die Standard-Einstellungen mit seitenspezifischen Angaben
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage,
  noindex = false,
  pageType,
  schema,
}) => {
  const pathname = usePathname(); // ✅ App Router hook

  // Verwende seitenspezifische Daten, wenn ein pageType angegeben ist
  const pageMetadata = pageType ? pageSeo[pageType] : null;

  // Ermittle die endgültigen Metadaten mit Fallbacks
  const metaTitle = title || pageMetadata?.title || defaultSeo.title;
  const metaDescription =
    description || pageMetadata?.description || defaultSeo.description;
  const metaCanonical = canonical || `${defaultSeo.canonical}${pathname}`; // ✅ Use pathname instead of router.asPath
  const metaOgImage = ogImage || defaultSeo.openGraph.images[0].url;

  // Schema.org JSON-LD Daten
  const jsonLd = schema || schemaData.organization;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name='description' content={metaDescription} />
      <link rel='canonical' href={metaCanonical} />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content={metaCanonical} />
      <meta property='og:title' content={metaTitle} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:image' content={metaOgImage} />
      <meta property='og:site_name' content={defaultSeo.openGraph.site_name} />
      <meta property='og:locale' content={defaultSeo.openGraph.locale} />

      {/* Twitter */}
      <meta name='twitter:card' content={defaultSeo.twitter.cardType} />
      <meta name='twitter:site' content={defaultSeo.twitter.site} />
      <meta name='twitter:title' content={metaTitle} />
      <meta name='twitter:description' content={metaDescription} />
      <meta name='twitter:image' content={metaOgImage} />

      {/* Steuerung der Indexierung */}
      {noindex && <meta name='robots' content='noindex,nofollow' />}

      {/* JSON-LD für strukturierte Daten */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};

export default SEO;
