// src/pages/404.tsx
import { ArrowLeft } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Seite nicht gefunden | Ritter Digital GmbH</title>
        <meta name="description" content="Die gesuchte Seite wurde nicht gefunden." />
      </Head>

      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="mb-6 text-6xl font-bold text-primary">404</h1>
          <h2 className="mb-4 text-2xl font-semibold text-tertiary">Seite nicht gefunden</h2>
          <p className="mb-8 text-secondary">
            Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben. Bitte versuchen Sie
            es mit der Navigation oder kehren Sie zur Startseite zurück.
          </p>
          <Link href="/">
            <Button variant="default" className="mx-auto flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
