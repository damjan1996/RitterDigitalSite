// src/components/common/seo-image.tsx
import Image from 'next/image';
import type { ImageProps } from 'next/image';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

interface SEOImageProps extends Omit<ImageProps, 'onError' | 'loading'> {
  fallbackSrc?: string;
  fallbackAlt?: string;
  wrapperClassName?: string;
  lazyLoad?: boolean;
  priority?: boolean;
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
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  eager = false,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | typeof src>(src);
  const [imgAlt, setImgAlt] = useState<string>(alt as string);
  const [error, setError] = useState<boolean>(false);

  // Fehlerbehandlung: Fallback-Bild laden wenn Original-Bild fehlschlägt
  const handleError = () => {
    if (!error) {
      console.warn(`Image failed to load: ${src}, using fallback`);
      setImgSrc(fallbackSrc);
      setImgAlt(fallbackAlt || alt);
      setError(true);
    }
  };

  // Ermittle die optimale loading-Strategie
  // priority überschreibt lazyLoad, eager lädt das Bild sofort
  const loadingStrategy = priority
    ? undefined // Next.js verwendet automatisch eager loading für priority images
    : eager
      ? 'eager'
      : lazyLoad
        ? 'lazy'
        : undefined;

  return (
    <div className={cn('relative', wrapperClassName)}>
      <Image
        src={imgSrc}
        alt={imgAlt || 'Bild'} // Stelle sicher, dass immer ein Alt-Text vorhanden ist
        className={cn('transition-opacity duration-300', className)}
        onError={handleError}
        width={width}
        height={height}
        loading={loadingStrategy}
        priority={priority}
        sizes={sizes}
        // Zusätzliche Attribute für bessere Ladezeiten und CLS-Prävention
        placeholder={priority ? 'blur' : undefined}
        blurDataURL={
          priority &&
          typeof src === 'string' &&
          (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png'))
            ? `data:image/svg+xml;base64,${Buffer.from(
                `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#e2e8f0"/></svg>`
              ).toString('base64')}`
            : undefined
        }
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
            name: alt,
            width: width,
            height: height,
          }),
        }}
      />
    </div>
  );
};

export default SEOImage;
