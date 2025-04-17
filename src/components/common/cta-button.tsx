// src/components/common/cta-button.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import type { ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Definiere die gültigen Variant-Typen, die von der Button-Komponente unterstützt werden
// Wichtig: 'accent' wurde entfernt, da es nicht vom Button-Komponente unterstützt wird
type ButtonVariantType = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSizeType = 'default' | 'sm' | 'lg' | 'icon';

interface CTAButtonProps extends Omit<ButtonProps, 'asChild' | 'variant' | 'size'> {
  href: string;
  label: string;
  icon?: boolean;
  isExternal?: boolean;
  className?: string;
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
}

/**
 * Eine wiederverwendbare Call-to-Action Button Komponente
 * mit optionaler Icon-Anzeige und externer/interner Link-Behandlung
 */
export const CTAButton: React.FC<CTAButtonProps> = ({
  href,
  label,
  icon = true,
  isExternal = false,
  className,
  variant = 'default', // Default statt accent
  size = 'lg',
  ...props
}) => {
  const buttonContent = (
    <>
      {label}
      {icon && <ArrowRight className="ml-2 h-4 w-4" />}
    </>
  );

  const buttonClassName = cn('font-medium', className);

  if (isExternal) {
    return (
      <Button asChild variant={variant} size={size} className={buttonClassName} {...props}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {buttonContent}
        </a>
      </Button>
    );
  }

  return (
    <Button asChild variant={variant} size={size} className={buttonClassName} {...props}>
      <Link href={href}>{buttonContent}</Link>
    </Button>
  );
};

export default CTAButton;
