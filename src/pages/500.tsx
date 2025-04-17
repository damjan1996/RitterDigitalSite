// src/pages/500.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ServerError() {
    return (
        <>
            <Head>
                <title>500 - Serverfehler | Ritter Digital GmbH</title>
                <meta name="description" content="Es ist ein Serverfehler aufgetreten." />
            </Head>

            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <h1 className="text-6xl font-bold text-primary mb-6">500</h1>
                    <h2 className="text-2xl font-semibold text-tertiary mb-4">Serverfehler</h2>
                    <p className="text-secondary mb-8">
                        Es ist ein interner Serverfehler aufgetreten.
                        Bitte versuchen Sie es später erneut oder kontaktieren Sie uns,
                        falls das Problem weiterhin besteht.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                            className="flex items-center justify-center"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Seite neu laden
                        </Button>
                        <Link href="/">
                            <Button variant="accent" className="flex items-center justify-center">
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