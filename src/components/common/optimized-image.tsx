// src/components/common/optimized-image.tsx
import Image from 'next/image';
import type { ImageProps } from 'next/image';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

// Explizit fetchPriority und priority aus ImageProps ausschließen
interface OptimizedImageProps extends Omit<ImageProps, 'priority' | 'fetchPriority'> {
  fallbackSrc?: string;
  fallbackAlt?: string;
  wrapperClassName?: string;
  enablePriority?: boolean;
}

/**
 * Optimierte Image-Komponente, die das fetchPriority-Problem in Next.js 14.1.0 umgeht
 * und zusätzliche Features für bessere Performance und UX bietet
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.svg',
  fallbackAlt,
  wrapperClassName,
  className,
  enablePriority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading,
  onError,
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
      // Call external onError handler if provided
      if (onError) {
        onError(event);
      }
    }
  };

  // Stelle sicher, dass alt immer einen Wert hat für ESLint
  const finalAlt = imgAlt || alt || '';

  // Bereinige alle Props, die Probleme verursachen könnten
  const cleanProps = { ...props };
  // Entferne explizit alle möglichen fetchPriority-Varianten
  delete (cleanProps as any).fetchPriority;
  delete (cleanProps as any).fetchpriority;

  return (
    <div className={cn('relative', wrapperClassName)}>
      <Image
        {...cleanProps}
        src={imgSrc}
        alt={finalAlt}
        className={cn('transition-opacity duration-300', className)}
        onError={handleError}
        sizes={sizes}
        // Verwende loading statt priority für bessere Kompatibilität
        loading={enablePriority ? 'eager' : loading || 'lazy'}
        // Explizit priority und fetchPriority NICHT setzen
      />

      {/* Strukturierte Daten für Suchmaschinen */}
      {typeof src === 'string' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ImageObject',
              contentUrl: src,
              name: finalAlt,
              width: props.width,
              height: props.height,
            }),
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
