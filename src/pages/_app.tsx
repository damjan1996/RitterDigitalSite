// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { useEffect } from 'react';
import '@/styles/globals.css';

// Layout-Komponenten
import { CookieBanner } from '@/components/layout/cookie-banner';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
// Analytics
import { defaultSeo } from '@/config/seo';
import { initGA, pageview } from '@/lib/analytics';

// SEO-Konfiguration

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

      <DefaultSeo {...defaultSeo} />

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
