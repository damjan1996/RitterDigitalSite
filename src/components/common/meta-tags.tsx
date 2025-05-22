// src/components/common/meta-tags.tsx
import Head from 'next/head';
import React from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile' | 'book' | 'product';
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  category?: string;
  tags?: string[];
  locale?: string;
  siteName?: string;
  themeColor?: string;
  viewport?: string;
  robots?: string;
  alternates?: Array<{
    href: string;
    hrefLang: string;
    media?: string;
    type?: string;
  }>;
  preload?: Array<{
    href: string;
    as: string;
    type?: string;
    crossOrigin?: 'anonymous' | 'use-credentials';
    media?: string;
  }>;
  prefetch?: string[];
  preconnect?: string[];
}

/**
 * Umfassende Meta-Tags-Komponente zur flexiblen SEO-Optimierung
 * Unterstützt alle gängigen Meta-Tags für SEO, soziale Medien und Leistung
 */
export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords = [],
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noIndex = false,
  noFollow = false,
  author,
  publishedTime,
  modifiedTime,
  category,
  tags = [],
  locale = 'de_DE',
  siteName = 'Ritter Digital GmbH',
  themeColor = '#FF7A35',
  viewport = 'width=device-width, initial-scale=1, shrink-to-fit=no',
  robots,
  alternates = [],
  preload = [],
  prefetch = [],
  preconnect = [],
}) => {
  // Erstelle Robots-String basierend auf Parametern
  const robotsContent =
    robots ||
    (noIndex && noFollow
      ? 'noindex, nofollow'
      : noIndex
        ? 'noindex, follow'
        : noFollow
          ? 'index, nofollow'
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  return (
    <Head>
      {/* Grundlegende Meta-Tags */}
      {title && <title>{title}</title>}
      {description && <meta name='description' content={description} />}
      {keywords.length > 0 && (
        <meta name='keywords' content={keywords.join(', ')} />
      )}

      {/* Robots-Meta-Tag */}
      <meta name='robots' content={robotsContent} />

      {/* Viewport-Meta-Tag */}
      <meta name='viewport' content={viewport} />

      {/* Open Graph / Facebook */}
      <meta property='og:site_name' content={siteName} />
      <meta property='og:locale' content={locale} />
      <meta property='og:type' content={ogType} />
      {ogTitle && <meta property='og:title' content={ogTitle} />}
      {ogDescription && (
        <meta property='og:description' content={ogDescription} />
      )}
      {ogImage && <meta property='og:image' content={ogImage} />}
      {ogImage && <meta property='og:image:width' content='1200' />}
      {ogImage && <meta property='og:image:height' content='630' />}
      {ogUrl && <meta property='og:url' content={ogUrl} />}

      {/* Zusätzliche Artikel-Meta-Tags */}
      {ogType === 'article' && publishedTime && (
        <meta property='article:published_time' content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property='article:modified_time' content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property='article:author' content={author} />
      )}
      {ogType === 'article' && category && (
        <meta property='article:section' content={category} />
      )}
      {ogType === 'article' &&
        tags.map((tag, index) => (
          <meta
            key={`article:tag:${index}`}
            property='article:tag'
            content={tag}
          />
        ))}

      {/* Twitter */}
      <meta name='twitter:card' content={twitterCard} />
      {twitterTitle && <meta name='twitter:title' content={twitterTitle} />}
      {twitterDescription && (
        <meta name='twitter:description' content={twitterDescription} />
      )}
      {twitterImage && <meta name='twitter:image' content={twitterImage} />}
      {twitterImage && (
        <meta
          name='twitter:image:alt'
          content={twitterTitle || ogTitle || title || 'Bild'}
        />
      )}
      <meta name='twitter:site' content='@ritterdigital' />
      <meta name='twitter:creator' content='@ritterdigital' />

      {/* Autorentag */}
      {author && <meta name='author' content={author} />}

      {/* Theme-Color für Browser */}
      <meta name='theme-color' content={themeColor} />
      <meta name='msapplication-TileColor' content={themeColor} />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />

      {/* Canonical URL */}
      {canonicalUrl && <link rel='canonical' href={canonicalUrl} />}

      {/* Alternative Versionen */}
      {alternates.map((alternate, index) => (
        <link
          key={`alternate-${index}`}
          rel='alternate'
          href={alternate.href}
          hrefLang={alternate.hrefLang}
          {...(alternate.media ? { media: alternate.media } : {})}
          {...(alternate.type ? { type: alternate.type } : {})}
        />
      ))}

      {/* Preload wichtiger Ressourcen */}
      {preload.map((item, index) => (
        <link
          key={`preload-${index}`}
          rel='preload'
          href={item.href}
          as={item.as}
          {...(item.type ? { type: item.type } : {})}
          {...(item.crossOrigin ? { crossOrigin: item.crossOrigin } : {})}
          {...(item.media ? { media: item.media } : {})}
        />
      ))}

      {/* Prefetch für schnellere Navigation */}
      {prefetch.map((url, index) => (
        <link key={`prefetch-${index}`} rel='prefetch' href={url} />
      ))}

      {/* Preconnect zu externen Domains */}
      {preconnect.map((url, index) => (
        <link
          key={`preconnect-${index}`}
          rel='preconnect'
          href={url}
          crossOrigin='anonymous'
        />
      ))}
    </Head>
  );
};

export default MetaTags;
