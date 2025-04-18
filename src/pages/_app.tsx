// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { useEffect } from 'react';
import '@/styles/globals.css';

// Layout-Komponenten
import PageTransition from '@/components/common/page-transition';
import { ScrollProvider } from '@/components/common/scroll-context';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
// Analytics
import { defaultSeo } from '@/config/seo';
import { initGA, pageview } from '@/lib/analytics';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Google Analytics initialisieren und Ereignisse verfolgen
  useEffect(() => {
    // Google Analytics initialisieren
    initGA();

    // Beim ersten Laden tracken
    pageview(window.location.pathname);

    // Bei Routenwechseln tracken
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <DefaultSeo {...defaultSeo} />

      <ScrollProvider>
        <PageTransition>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">
              <Component {...pageProps} />
            </main>
            <Footer />
            <CookieBanner />
          </div>
        </PageTransition>
      </ScrollProvider>
    </>
  );
}
