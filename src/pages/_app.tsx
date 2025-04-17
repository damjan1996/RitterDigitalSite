// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import '@/styles/globals.css';

// Layout-Komponenten
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CookieBanner } from '@/components/layout/cookie-banner';

// Analytics
import { initGA, pageview } from '@/lib/analytics';

// SEO-Konfiguration
import { defaultSEO } from '@/config/seo';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Google Analytics initialisieren
    initGA();

    // Beim ersten Laden der Seite tracken
    pageview(window.location.pathname);

    // Bei Routenwechsel tracken
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <DefaultSeo {...defaultSEO} />

        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </>
  );
}