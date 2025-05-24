// src/components/common/seo-image.tsx
import type { ImageProps } from 'next/image';
import React, { useState } from 'react';

import { OptimizedImage } from '@/components/common/optimized-image';
import { cn } from '@/lib/utils';

interface SEOImageProps extends Omit<ImageProps, 'onError' | 'loading' | 'priority'> {
  fallbackSrc?: string;
  fallbackAlt?: string;
  wrapperClassName?: string;
  lazyLoad?: boolean;
  enablePriority?: boolean;
  sizes?: string;
  eager?: boolean;
}

/**
 * SEO-optimierte Bild-Komponente mit folgenden Features:
 * - Automatisches Fallback-Bild bei Ladefehler
 * - Optimierte Lazy-Loading-Strategie
 * - Korrekte srcSet und sizes Attribute
 * - Automatische Größenanpassung
 * - Alt-Text-Unterstützung für Barrierefreiheit
 * - Workaround für Next.js 14.1.0 fetchPriority Bug
 */
export const SEOImage: React.FC<SEOImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  fallbackAlt,
  wrapperClassName,
  className,
  width,
  height,
  lazyLoad = true,
  enablePriority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  eager = false,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | typeof src>(src);
  const [imgAlt, setImgAlt] = useState<string>(alt as string);
  const [error, setError] = useState<boolean>(false);

  // Fehlerbehandlung: Fallback-Bild laden wenn Original-Bild fehlschlägt
  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (!error) {
      console.warn(`Image failed to load: ${src}, using fallback`);
      setImgSrc(fallbackSrc);
      setImgAlt(fallbackAlt || alt);
      setError(true);
    }
  };

  // Ermittle die optimale loading-Strategie
  // enablePriority überschreibt lazyLoad, eager lädt das Bild sofort
  const shouldUsePriority = enablePriority || eager;

  // Stelle sicher, dass alt immer einen Wert hat für ESLint
  const finalAlt = imgAlt || alt || '';

  return (
    <div className={cn('relative', wrapperClassName)}>
      <OptimizedImage
        src={imgSrc}
        alt={finalAlt} // Explizit definiert für ESLint
        className={cn('transition-opacity duration-300', className)}
        onError={handleError}
        width={width}
        height={height}
        enablePriority={shouldUsePriority}
        sizes={sizes}
        loading={shouldUsePriority ? 'eager' : lazyLoad ? 'lazy' : 'eager'}
        {...props}
      />

      {/* Strukturierte Daten für Suchmaschinen */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            contentUrl: typeof src === 'string' ? src : '',
            name: finalAlt,
            width: width,
            height: height,
          }),
        }}
      />
    </div>
  );
};

export default SEOImage;
