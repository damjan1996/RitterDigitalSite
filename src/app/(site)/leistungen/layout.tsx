// src/app/(site)/leistungen/layout.tsx
import type { ReactNode } from 'react';

export default function LeistungenLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className='bg-gray-50'>{children}</div>;
}
