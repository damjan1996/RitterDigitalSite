// src/pages/500.tsx
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function ServerError() {
  return (
    <>
      <Head>
        <title>500 - Serverfehler | Ritter Digital GmbH</title>
        <meta name="description" content="Es ist ein Serverfehler aufgetreten." />
      </Head>

      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="mb-6 text-6xl font-bold text-primary">500</h1>
          <h2 className="mb-4 text-2xl font-semibold text-tertiary">Serverfehler</h2>
          <p className="mb-8 text-secondary">
            Es ist ein interner Serverfehler aufgetreten. Bitte versuchen Sie es später erneut oder
            kontaktieren Sie uns, falls das Problem weiterhin besteht.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="flex items-center justify-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Seite neu laden
            </Button>
            <Link href="/">
              <Button variant="default" className="flex items-center justify-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zur Startseite
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
