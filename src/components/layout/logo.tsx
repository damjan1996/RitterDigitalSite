// src/components/layout/logo.tsx
import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'white';
  width?: number;
  height?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  width = 140,
  height = 40,
  className,
}) => {
  const logoSrc =
    variant === 'white'
      ? '/images/logos/logo-white.svg'
      : '/images/logos/logo.svg';

  return (
    <div className={cn('relative', className)}>
      <Image
        src={logoSrc}
        alt='Ritter Digital GmbH'
        width={width}
        height={height}
        className='h-auto'
        priority
      />
    </div>
  );
};

export default Logo;
