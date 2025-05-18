// src/pages/_app.tsx - SEO-optimierter App-Wrapper
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

      // Scrollen zum Seitenanfang bei Seitenwechsel (wichtig für Barrierefreiheit)
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FF7A35" />
        <meta name="msapplication-TileColor" content="#FF7A35" />
        <meta name="theme-color" content="#FFFFFF" />

        {/* Performance Optimierung: Preload wichtige Assets */}
        <link
          rel="preload"
          href="/fonts/DMSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/DMSans-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/DMSans-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preload Hero Image auf der Startseite */}
        {router.pathname === '/' && <link rel="preload" as="image" href="/images/hero-bg.webp" />}

        {/* DNS Prefetch für externe Ressourcen */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://krqoaacidcyghxhdxtce.supabase.co" />
      </Head>

      {/* Default SEO Einstellungen */}
      <DefaultSeo {...defaultSeo} />

      <ScrollProvider>
        <PageTransition>
          <div className="flex min-h-screen flex-col">
            {/* Skip to main content Link für Barrierefreiheit */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:z-50 focus:bg-white focus:p-4 focus:text-primary"
            >
              Zum Hauptinhalt springen
            </a>

            <Header />
            <main id="main-content" className="flex-grow">
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
