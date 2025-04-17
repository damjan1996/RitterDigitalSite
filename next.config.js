/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Optimiere die Images
  images: {
    domains: ['localhost', 'ritterdigital.de', 'krqoaacidcyghxhdxtce.supabase.co'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Internationalisierung (nur Deutsch)
  i18n: {
    locales: ['de'],
    defaultLocale: 'de',
  },

  // Sicherheitsheader
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Weiterleitung für Legacy-URLs
  async redirects() {
    return [
      // Beispiel für Weiterleitung von alten WordPress-URLs
      {
        source: '/jtl-wawi',
        destination: '/leistungen',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/leistungen',
        permanent: true,
      },
      {
        source: '/business-intelligence',
        destination: '/leistungen/business-intelligence',
        permanent: true,
      },
    ];
  },

  // Webpack-Konfiguration
  webpack(config) {
    // SVG als React-Komponenten
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Experimentelle Features
  experimental: {
    // optimieren für statische Export, wenn gewünscht
    // outputStandalone: true,

    // Verbesserte Client-Router-Cache
    // optimisticClientCache: true,

    // Moderne Browserunterstützung für größere Performance
    // browsersListForSwc: true,
    // legacyBrowsers: false,
  },

  // Compile-Zeit Umgebungsvariablen für Produktionsumgebung
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Ritter Digital GmbH',
  },

  // Statische HTML-Export für Hosting ohne Node.js Server
  // output: 'standalone',

  // Konfiguriere den Pfad, unter dem die App läuft (für Subpath deployments)
  // basePath: '',

  // Konfiguriere den Pfad für Assets (z.B. für CDN)
  // assetPrefix: '',

  // Optimiere Baugröße durch Kompressierung
  compress: true,

  // Laufzeit-Konfiguration
  // serverRuntimeConfig: {
  //   // Nur auf dem Server verfügbar
  //   mySecret: process.env.MY_SECRET,
  // },

  // Geteilte Laufzeit-Konfiguration
  // publicRuntimeConfig: {
  //   // Verfügbar auf Server und Client
  //   staticFolder: '/static',
  // },
};

module.exports = nextConfig;