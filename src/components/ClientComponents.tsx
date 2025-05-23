// src/components/ClientComponents.tsx
'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Motion Provider - nur client-side
const MotionProvider = dynamic(() => import('@/components/providers/MotionProvider'), {
  ssr: false,
  loading: () => null
});

// Cookie Banner - nur client-side
const CookieBanner = dynamic(() => import('@/components/layout/cookie-banner').then(mod => ({ default: mod.CookieBanner })), {
  ssr: false,
  loading: () => null
});

interface ClientComponentsProps {
  children: ReactNode;
}

export default function ClientComponents({ children }: ClientComponentsProps) {
  return (
    <MotionProvider>
      {children}
      <CookieBanner />
    </MotionProvider>
  );
}