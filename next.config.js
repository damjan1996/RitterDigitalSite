/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Deaktiviere problematische experimentelle Features
  experimental: {
    // Entferne optimizePackageImports - kann Chunk-Probleme verursachen
    // turbo wird automatisch deaktiviert ohne --turbo Flag
  },

  // Vereinfachte ESLint/TypeScript Konfiguration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Vereinfachte Webpack-Konfiguration
  webpack(config, { dev, isServer }) {
    // SVG Support
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Client-side fallbacks
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    // Vereinfachte Chunk-Konfiguration für Development
    if (dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Einzelner Chunk für bessere Stabilität in Development
            bundle: {
              name: 'bundle',
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }

    return config;
  },

  // Vereinfachte Image-Konfiguration
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
    ],
    formats: ['image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Vereinfachte Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },

  // Vereinfachte Redirects
  async redirects() {
    return [
      {
        source: '/jtl-wawi',
        destination: '/leistungen/jtl-wawi',
        permanent: true,
      },
      {
        source: '/business-intelligence',
        destination: '/leistungen/business-intelligence',
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
    ];
  },

  // Basis-Konfiguration für Stabilität
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // Entferne serverExternalPackages - kann Probleme verursachen
  // Entferne transpilePackages - kann Konflikte verursachen
  // Entferne output standalone - nur für Production nötig

  // Environment Variables
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Ritter Digital GmbH',
    NEXT_PUBLIC_SITE_URL: 'https://ritterdigital.de',
  },

  // Compiler-Optionen nur für Production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;