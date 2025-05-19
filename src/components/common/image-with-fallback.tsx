import Image from 'next/image';
import type { ImageProps } from 'next/image';
import { useState } from 'react';
import React from 'react';

import { cn } from '@/lib/utils';

// Entferne fetchpriority/fetchPriority aus der Schnittstelle ganz
interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackAlt?: string;
  wrapperClassName?: string;
  // fetchpriority und fetchPriority entfernt
}

/**
 * Erweiterte Image-Komponente mit Fallback-Funktion
 * Falls das Hauptbild nicht geladen werden kann, wird ein Fallback-Bild angezeigt
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  fallbackAlt,
  wrapperClassName,
  className,
  // fetchpriority entfernt
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | typeof src>(src);
  const [imgAlt, setImgAlt] = useState<string>(alt as string);
  const [error, setError] = useState<boolean>(false);

  const handleError = () => {
    if (!error) {
      setImgSrc(fallbackSrc);
      setImgAlt(fallbackAlt || alt);
      setError(true);
    }
  };

  return (
    <div className={cn('relative', wrapperClassName)}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        className={className}
        // fetchpriority entfernt - wird nicht mehr weitergegeben
        {...props}
        onError={handleError}
      />
    </div>
  );
};

export default ImageWithFallback;
