// src/pages/404.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <>
            <Head>
                <title>404 - Seite nicht gefunden | Ritter Digital GmbH</title>
                <meta name="description" content="Die gesuchte Seite wurde nicht gefunden." />
            </Head>

            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
                    <h2 className="text-2xl font-semibold text-tertiary mb-4">Seite nicht gefunden</h2>
                    <p className="text-secondary mb-8">
                        Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
                        Bitte versuchen Sie es mit der Navigation oder kehren Sie zur Startseite zurück.
                    </p>
                    <Link href="/">
                        <Button variant="accent" className="flex items-center mx-auto">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Zurück zur Startseite
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}