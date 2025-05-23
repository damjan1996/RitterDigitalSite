// next.config.js - Optimiert für Vercel Deployment
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ESLint Warnungen während Build ignorieren für Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript Errors während Build ignorieren (nur für den ersten Deploy)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Experimental features für Next.js 15
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Server External Packages für bessere Kompatibilität
  serverExternalPackages: ['three'],

  // Output-Konfiguration nur für Vercel
  output: process.env.VERCEL ? 'standalone' : undefined,

  // Image-Optimierung
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
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security Headers
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
        ],
      },
      // Static Assets Caching
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
    ];
  },

  // Redirects für SEO
  async redirects() {
    return [
      // Legacy URLs
      {
        source: '/jtl-wawi',
        destination: '/leistungen/jtl-wawi',
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
      // Remove trailing slash
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
      },
      // www to non-www redirect
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
    ];
  },

  // Webpack Konfiguration
  webpack(config, { isServer }) {
    // SVG als React Components
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

    // Optimierung für Production
    if (config.mode === 'production') {
      config.optimization = {
        ...config.optimization,
        sideEffects: false,
      };
    }

    return config;
  },

  // Environment Variables
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Ritter Digital GmbH',
    NEXT_PUBLIC_SITE_URL: 'https://ritterdigital.de',
  },

  // Production optimizations
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // Transpile packages that need it
  transpilePackages: ['@react-three/fiber', '@react-three/drei'],

  // Optimierung für Vercel
  generateEtags: false,

  // Compiler-Optionen
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;