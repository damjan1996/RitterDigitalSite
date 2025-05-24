// src/components/common/image-with-fallback.tsx
import Image from 'next/image';
import type { ImageProps } from 'next/image';
import { useState } from 'react';
import React from 'react';

import { cn } from '@/lib/utils';

// Explizit fetchpriority/fetchPriority und priority aus der Schnittstelle ausschließen
interface ImageWithFallbackProps
  extends Omit<ImageProps, 'onError' | 'priority' | 'fetchPriority'> {
  fallbackSrc?: string;
  fallbackAlt?: string;
  wrapperClassName?: string;
  // Alle fetchpriority-Varianten explizit ausgeschlossen
}

/**
 * Erweiterte Image-Komponente mit Fallback-Funktion
 * Falls das Hauptbild nicht geladen werden kann, wird ein Fallback-Bild angezeigt
 * Kompatibel mit React 18.2.0 und Next.js 14.1.0
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.svg',
  fallbackAlt,
  wrapperClassName,
  className,
  loading,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | typeof src>(src);
  const [imgAlt, setImgAlt] = useState<string>(alt as string);
  const [error, setError] = useState<boolean>(false);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (!error) {
      console.warn(`Image failed to load: ${src}, using fallback`);
      setImgSrc(fallbackSrc);
      setImgAlt(fallbackAlt || alt);
      setError(true);
    }
  };

  // Bereinige alle Props, die Probleme verursachen könnten
  const cleanProps = { ...props };
  // Entferne explizit alle möglichen fetchPriority-Varianten
  delete (cleanProps as any).fetchPriority;
  delete (cleanProps as any).fetchpriority;
  delete (cleanProps as any).priority;

  return (
    <div className={cn('relative', wrapperClassName)}>
      <Image
        {...cleanProps}
        src={imgSrc}
        alt={imgAlt}
        className={className}
        loading={loading || 'lazy'}
        onError={handleError}
        // Explizit fetchPriority und priority NICHT setzen
      />
    </div>
  );
};

export default ImageWithFallback;
