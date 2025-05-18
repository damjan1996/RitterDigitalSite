// src/pages/_document.tsx - SEO-optimierter Document-Wrapper
import Document, { Html, Head, Main, NextScript, type DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="de" dir="ltr">
        <Head>
          {/* Zeichensatz und Renderingmodus */}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {/* Preconnect zu Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* DM Sans Font laden (Regular 400, Medium 500, Bold 700) */}
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          />

          {/* Favicon-Set - vollständig und optimiert */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FF7A35" />
          <meta name="apple-mobile-web-app-title" content="Ritter Digital" />
          <meta name="application-name" content="Ritter Digital" />
          <meta name="msapplication-TileColor" content="#FF7A35" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta name="msapplication-config" content="/browserconfig.xml" />

          {/* Social Media Verifikation */}
          <meta name="google-site-verification" content="REPLACE_WITH_YOUR_CODE" />

          {/* Open Graph Standard-Einstellungen */}
          <meta property="og:locale" content="de_DE" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Ritter Digital GmbH" />

          {/* Twitter Standard-Einstellungen */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@ritterdigital" />

          {/* PWA Meta Tags */}
          <meta name="theme-color" content="#FF7A35" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="format-detection" content="telephone=no" />

          {/* Barrierefreiheit */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <body className="bg-background font-sans text-primary antialiased">
          <Main />
          <NextScript />

          {/* Strukturiertes Daten-Markup für die Organisation */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Ritter Digital GmbH',
                alternateName: 'RITTER Gesellschaft für digitale Geschäftsprozesse mbH',
                url: 'https://ritterdigital.de',
                logo: 'https://ritterdigital.de/images/logos/logo_ritterdigital.png',
                sameAs: [
                  'https://www.linkedin.com/company/ritter-digital-gmbh/',
                  'https://www.xing.com/pages/ritterdigitalgmbh',
                ],
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Essener Straße 2-24',
                  postalCode: '46047',
                  addressLocality: 'Oberhausen',
                  addressCountry: 'DE',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+4902083067485',
                  contactType: 'customer service',
                  availableLanguage: ['German', 'English'],
                },
              }),
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
