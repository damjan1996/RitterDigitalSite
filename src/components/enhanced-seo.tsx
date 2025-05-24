// src/components/enhanced-seo.tsx
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { defaultSeo, pageSeo, schemaData } from '@/config/seo';

interface EnhancedSEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  noindex?: boolean;
  pageType?: keyof typeof pageSeo;
  schema?: object;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  articleTags?: string[];
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

/**
 * Erweiterte SEO-Komponente für optimiertes Metadaten-Management
 * Kombiniert die Standard-Einstellungen mit seitenspezifischen Angaben
 * und unterstützt zusätzliche SEO-Features wie Breadcrumbs und erweiterte Meta-Tags
 */
export const EnhancedSEO: React.FC<EnhancedSEOProps> = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  pageType,
  schema,
  keywords = [],
  publishedTime,
  modifiedTime,
  author,
  articleTags = [],
  breadcrumbs = [],
}) => {
  const router = useRouter();

  // Verwende seitenspezifische Daten, wenn ein pageType angegeben ist
  const pageMetadata = pageType ? pageSeo[pageType] : null;

  // Ermittle die endgültigen Metadaten mit Fallbacks
  const metaTitle = title || pageMetadata?.title || defaultSeo.title;
  const metaDescription = description || pageMetadata?.description || defaultSeo.description;
  const metaCanonical = canonical || `${defaultSeo.canonical}${router.asPath}`;
  const metaOgImage = ogImage || defaultSeo.openGraph.images[0].url;

  // Schema.org JSON-LD Daten
  const jsonLd = schema || schemaData.organization;

  // Erstelle Breadcrumbs JSON-LD wenn Breadcrumbs angegeben sind
  const breadcrumbsLd = breadcrumbs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((breadcrumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: breadcrumb.name,
          item: breadcrumb.url,
        })),
      }
    : null;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={metaCanonical} />

      {/* Suchmaschinen-spezifische Meta-Tags */}
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={metaCanonical} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={defaultSeo.openGraph.site_name} />
      <meta property="og:locale" content={defaultSeo.openGraph.locale} />

      {/* Zusätzliche Tags für Artikel */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && <meta property="article:author" content={author} />}
      {ogType === 'article' &&
        articleTags.map((tag, index) => (
          <meta key={`tag-${index}`} property="article:tag" content={tag} />
        ))}

      {/* Twitter */}
      <meta name="twitter:card" content={defaultSeo.twitter.cardType} />
      <meta name="twitter:site" content={defaultSeo.twitter.site} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaOgImage} />
      <meta name="twitter:image:alt" content={metaTitle} />
      {defaultSeo.twitter.handle && (
        <meta name="twitter:creator" content={defaultSeo.twitter.handle} />
      )}

      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#FF7A35" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />

      {/* JSON-LD für strukturierte Daten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs JSON-LD wenn vorhanden */}
      {breadcrumbsLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
      )}
    </Head>
  );
};

export default EnhancedSEO;
