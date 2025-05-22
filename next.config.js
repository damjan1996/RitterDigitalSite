// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Optimiere die Images - wichtig für Core Web Vitals
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ritterdigital.de',
      },
      {
        protocol: 'https',
        hostname: 'www.ritterdigital.de',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Sicherheitsheader für SEO und Sicherheit
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
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          }
        ],
      },
      // Spezifische Headers für statische Assets
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Weiterleitung für Legacy-URLs und kanonische URLs
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
      {
        source: '/it-beratung',
        destination: '/leistungen',
        permanent: true,
      },
      {
        source: '/software',
        destination: '/leistungen/softwareentwicklung',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/leistungen',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/ueber-uns',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/ueber-uns',
        permanent: true,
      },
      {
        source: '/kontaktformular',
        destination: '/kontakt',
        permanent: true,
      },
      // Entferne trailing slash für kanonische URLs
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
      },
      // Umleitung von www zu non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.ritterdigital.de',
          },
        ],
        destination: 'https://ritterdigital.de/:path*',
        permanent: true,
      },
      // Alte Leistungs-URLs
      {
        source: '/leistung/:slug',
        destination: '/leistungen/:slug',
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

  // Compile-Zeit Umgebungsvariablen für Produktionsumgebung
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Ritter Digital GmbH',
    NEXT_PUBLIC_SITE_URL: 'https://ritterdigital.de',
  },

  // Optimiere Baugröße durch Kompressierung
  compress: true,

  // Erweiterte Buildoptimierungen
  poweredByHeader: false, // Remove X-Powered-By header für Sicherheit
  productionBrowserSourceMaps: false, // Deaktiviere Sourcemaps in Produktion

  // Output-Konfiguration für bessere Vercel-Kompatibilität
  output: 'standalone',

  // Transpilation von Packages falls nötig
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

module.exports = nextConfig;