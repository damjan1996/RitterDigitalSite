// src/app/not-found.tsx
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h2 className='mb-4 text-4xl font-bold'>404</h2>
        <p className='mb-6 text-gray-600'>
          Diese Seite konnte nicht gefunden werden.
        </p>
        <Button asChild>
          <Link href='/'>Zurück zur Startseite</Link>
        </Button>
      </div>
    </div>
  );
}
