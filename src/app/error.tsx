// src/app/error.tsx
'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">Etwas ist schiefgelaufen!</h2>
        <Button onClick={() => reset()}>Erneut versuchen</Button>
      </div>
    </div>
  );
}
