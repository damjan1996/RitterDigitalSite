// src/components/ui/container.tsx
import React from 'react';
import type { ReactNode, ElementType } from 'react';

import { cn } from '@/lib/utils';

// Definiere die Container-Größen, Paddings und andere Optionen
type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
type PaddingSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';

// Basisprops für den Container
interface ContainerProps {
  size?: ContainerSize;
  paddingY?: PaddingSize;
  paddingX?: PaddingSize;
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  [key: string]: unknown; // Ermöglicht zusätzliche Props
}

/**
 * Container-Komponente für konsistentes Layout
 * Steuert die maximale Breite sowie den horizontalen und vertikalen Abstand
 */
export const Container = ({
  children,
  className,
  size = 'xl',
  paddingY = 'md',
  paddingX = 'md',
  as = 'div',
  ...props
}: ContainerProps): JSX.Element => {
  // Container-Größen
  const sizeClasses: Record<ContainerSize, string> = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-full',
  };

  // Vertikaler Abstand
  const paddingYClasses: Record<PaddingSize, string> = {
    none: 'py-0',
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12',
    xl: 'py-16',
  };

  // Horizontaler Abstand
  const paddingXClasses: Record<PaddingSize, string> = {
    none: 'px-0',
    sm: 'px-4',
    md: 'px-4 sm:px-6',
    lg: 'px-4 sm:px-8',
    xl: 'px-4 sm:px-10',
  };

  // Kombinierte Klassen
  const containerClasses = cn(
    'mx-auto w-full',
    sizeClasses[size],
    paddingYClasses[paddingY],
    paddingXClasses[paddingX],
    className
  );

  // Verwende React.createElement anstelle von JSX für bessere TypeScript-Kompatibilität
  return React.createElement(
    as,
    { className: containerClasses, ...props },
    children
  );
};

export default Container;
