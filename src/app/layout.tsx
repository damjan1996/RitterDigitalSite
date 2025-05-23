// src/app/(site)/layout.tsx - Vereinfacht für bessere Kompatibilität
import type { ReactNode } from 'react';

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className='min-h-screen bg-white'>
      {children}
    </div>
  );
}