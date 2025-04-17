import os
import json

# Basisverzeichnis für das Projekt
BASE_DIR = r"C:\Users\DamjanSavic\Documents\WebStorm\RitterDigitalSite"

# Definiere die Verzeichnisstruktur für Pages Router
directory_structure = {
    # Root-Level Dateien
    "": [
        ".eslintrc.js",
        ".prettierrc",
        "next.config.js",
        "package.json",
        "pnpm-lock.yaml",
        "tailwind.config.js",
        "tsconfig.json",
        "README.md",
        ".env.local",
        ".gitignore",
        "next-env.d.ts",
        "postcss.config.js",
    ],

    # src Verzeichnis (Wurzel des Projekts)
    "src": [],

    # Pages Verzeichnis (Pages Router Struktur)
    "src/pages": [
        "_app.tsx",
        "_document.tsx",
        "index.tsx",
        "404.tsx",
        "500.tsx",
    ],

    # API-Routen
    "src/pages/api": [],
    "src/pages/api/contact": [
        "index.ts",
    ],
    "src/pages/api/newsletter": [
        "index.ts",
    ],
    "src/pages/api/blog": [
        "index.ts",
    ],

    # Seiten-Struktur gemäß Anforderungen
    # Home-Page
    "src/pages/home": [
        "index.tsx",
    ],
    "src/pages/home/components": [
        "Hero.tsx",
        "ServiceTeaser.tsx",
        "Benefits.tsx",
        "Clients.tsx",
        "LatestBlogPosts.tsx",
        "index.tsx",
    ],

    # Services-Page
    "src/pages/leistungen": [
        "index.tsx",
    ],
    "src/pages/leistungen/components": [
        "Hero.tsx",
        "ServiceOverview.tsx",
        "ServiceCTA.tsx",
        "index.tsx",
    ],
    "src/pages/leistungen/business-intelligence": [
        "index.tsx",
    ],
    "src/pages/leistungen/data-warehouse": [
        "index.tsx",
    ],
    "src/pages/leistungen/softwareentwicklung": [
        "index.tsx",
    ],
    "src/pages/leistungen/kuenstliche-intelligenz": [
        "index.tsx",
    ],
    "src/pages/leistungen/service": [
        "ServiceDetails.tsx",
        "ServiceHero.tsx",
        "ServiceFeatures.tsx",
        "ServiceBenefits.tsx",
        "ServiceCTA.tsx",
        "index.tsx",
    ],

    # About-Page
    "src/pages/ueber-uns": [
        "index.tsx",
    ],
    "src/pages/ueber-uns/components": [
        "Hero.tsx",
        "CompanyHistory.tsx",
        "TeamMembers.tsx",
        "Values.tsx",
        "Mission.tsx",
        "index.tsx",
    ],

    # Blog-Page
    "src/pages/blog": [
        "index.tsx",
    ],
    "src/pages/blog/components": [
        "Hero.tsx",
        "BlogList.tsx",
        "Categories.tsx",
        "Search.tsx",
        "PostCard.tsx",
        "Pagination.tsx",
        "Sidebar.tsx",
        "index.tsx",
    ],
    "src/pages/blog/[slug]": [
        "index.tsx",
    ],
    "src/pages/blog/post": [
        "PostContent.tsx",
        "PostHeader.tsx",
        "PostSidebar.tsx",
        "RelatedPosts.tsx",
        "PostComments.tsx",
        "index.tsx",
    ],

    # Career-Page
    "src/pages/karriere": [
        "index.tsx",
    ],
    "src/pages/karriere/components": [
        "Hero.tsx",
        "JobListings.tsx",
        "Benefits.tsx",
        "ApplicationProcess.tsx",
        "JobDetail.tsx",
        "ApplicationForm.tsx",
        "index.tsx",
    ],

    # Contact-Page
    "src/pages/kontakt": [
        "index.tsx",
    ],
    "src/pages/kontakt/components": [
        "Hero.tsx",
        "ContactForm.tsx",
        "ContactInfo.tsx",
        "Map.tsx",
        "index.tsx",
    ],

    # Rechtliche Seiten
    "src/pages/impressum": [
        "index.tsx",
    ],
    "src/pages/datenschutz": [
        "index.tsx",
    ],

    # Components Verzeichnis (gemeinsam genutzte Komponenten)
    "src/components": [],
    "src/components/ui": [
        "button.tsx",
        "card.tsx",
        "container.tsx",
        "form.tsx",
        "input.tsx",
        "textarea.tsx",
        "checkbox.tsx",
        "select.tsx",
        "badge.tsx",
        "dropdown.tsx",
        "modal.tsx",
        "tabs.tsx",
        "alert.tsx",
    ],
    "src/components/layout": [
        "header.tsx",
        "footer.tsx",
        "navigation.tsx",
        "mega-menu.tsx",
        "cookie-banner.tsx",
        "mobile-navigation.tsx",
        "logo.tsx",
    ],
    "src/components/common": [
        "seo.tsx",
        "cta-button.tsx",
        "section-title.tsx",
        "image-with-fallback.tsx",
        "loading-spinner.tsx",
        "error-message.tsx",
    ],

    # Hooks und Utilities
    "src/hooks": [
        "use-form.ts",
        "use-analytics.ts",
        "use-media-query.ts",
        "use-scroll.ts",
        "use-supabase.ts",
    ],

    # Lib (Hilfsfunktionen und -klassen)
    "src/lib": [
        "utils.ts",
        "constants.ts",
        "analytics.ts",
        "validation.ts",
        "api.ts",
    ],
    "src/lib/supabase": [
        "client.ts",
        "server.ts",
        "admin.ts",
        "types.ts",
    ],
    "src/lib/brevo": [
        "client.ts",
        "types.ts",
    ],

    # Typen und Schnittstellen
    "src/types": [
        "index.ts",
        "blog.ts",
        "services.ts",
        "forms.ts",
        "common.ts",
    ],

    # Styling
    "src/styles": [
        "globals.css",
        "tailwind.css",
    ],

    # Öffentliche Dateien
    "public": [
        "favicon.ico",
        "robots.txt",
        "sitemap.xml",
    ],
    "public/images": [],
    "public/images/logos": [
        "logo.svg",
        "logo-white.svg",
        "favicon.svg",
    ],
    "public/images/services": [],
    "public/images/hero": [],
    "public/images/team": [],
    "public/images/blog": [],

    # Konfigurationsdateien für verschiedene Tools
    "config": [
        "seo.ts",
        "menu.ts",
        "theme.ts",
        "brevo.ts",
        "analytics.ts",
        "supabase.ts",
    ],

    # Tests
    "tests": [
        "setup.ts",
    ],
    "tests/components": [],
    "tests/pages": [],
    "tests/api": [],

    # Dokumentation
    "docs": [
        "project-structure.md",
        "deployment.md",
        "content-management.md",
    ],
}

# Beispiel für package.json Inhalt als String (wird später in JSON umgewandelt)
package_json_content_str = """{
    "name": "ritter-digital-website",
    "version": "1.0.0",
    "private": true,
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
    },
    "dependencies": {
        "@hookform/resolvers": "^3.3.4",
        "@radix-ui/react-dialog": "^1.0.5",
        "@radix-ui/react-dropdown-menu": "^2.0.6",
        "@radix-ui/react-label": "^2.0.2",
        "@radix-ui/react-navigation-menu": "^1.1.4",
        "@radix-ui/react-slot": "^1.0.2",
        "@supabase/supabase-js": "^2.39.3",
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.1.0",
        "framer-motion": "^11.0.3",
        "lucide-react": "^0.323.0",
        "next": "14.1.0",
        "next-seo": "^6.4.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-hook-form": "^7.50.1",
        "tailwind-merge": "^2.2.1",
        "tailwindcss-animate": "^1.0.7",
        "zod": "^3.22.4"
    },
    "devDependencies": {
        "@types/node": "^20.11.16",
        "@types/react": "^18.2.52",
        "@types/react-dom": "^18.2.18",
        "autoprefixer": "^10.4.17",
        "eslint": "^8.56.0",
        "eslint-config-next": "14.1.0",
        "postcss": "^8.4.33",
        "prettier": "^3.2.5",
        "prettier-plugin-tailwindcss": "^0.5.11",
        "tailwindcss": "^3.4.1",
        "typescript": "^5.3.3"
    }
}"""

# Beispiel für tailwind.config.js Inhalt
tailwind_config_content = """/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: 'rgb(35, 40, 45)',      // Primärfarbe: Struktur (Header, Footer)
        secondary: 'rgb(80, 105, 125)',   // Sekundärfarbe: Content-Boxen
        accent: 'rgb(255, 138, 76)',      // Akzentfarbe: CTAs, Buttons
        background: 'rgb(244, 245, 246)', // Basisfarbe: Seitenhintergrund
        tertiary: 'rgb(58, 79, 102)',     // Tertiärfarbe: Ergänzende Akzente
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',  // 4px - Basierend auf 8px-Grid System
        '2': '0.5rem',   // 8px
        '3': '0.75rem',  // 12px
        '4': '1rem',     // 16px
        '5': '1.25rem',  // 20px
        '6': '1.5rem',   // 24px
        '8': '2rem',     // 32px
        '10': '2.5rem',  // 40px
        '12': '3rem',    // 48px
        '16': '4rem',    // 64px
        '20': '5rem',    // 80px
        '24': '6rem',    // 96px
        '32': '8rem',    // 128px
        '40': '10rem',   // 160px
        '48': '12rem',   // 192px
        '56': '14rem',   // 224px
        '64': '16rem',   // 256px
      },
      screens: {
        'sm': '640px',    // Smartphone
        'md': '768px',    // Kleines Tablet
        'lg': '1024px',   // Tablet/kleine Desktops
        'xl': '1280px',   // Desktop
        '2xl': '1536px',  // Große Desktops
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
}
"""

# Beispiel für next.config.js Inhalt
next_config_content = """/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'ritterdigital.de'],
  },
  i18n: {
    locales: ['de'],
    defaultLocale: 'de',
  },
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
        ],
      },
    ];
  },
};

module.exports = nextConfig;
"""

# Beispiel für .env.local Inhalt
env_local_content = """# Supabase Konfiguration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Brevo API für Kontaktformular
BREVO_API_KEY=your-brevo-api-key

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# LeadInfo
NEXT_PUBLIC_LEADINFO_ID=your-leadinfo-id

# Site URLs
NEXT_PUBLIC_SITE_URL=https://ritterdigital.de
"""

# Beispiel für .gitignore Inhalt
gitignore_content = """# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
"""

# Beispiel für _app.tsx Inhalt (für Pages Router)
app_tsx_content = """// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import { initGA, pageview } from '@/lib/analytics';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CookieBanner } from '@/components/layout/cookie-banner';

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
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </>
  );
}
"""

# Beispiel für _document.tsx Inhalt
document_tsx_content = """// src/pages/_document.tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="de">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <body className="min-h-screen bg-background font-sans antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
"""

# Beispiel für 404.tsx Inhalt
not_found_content = """// src/pages/404.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Seite nicht gefunden | Ritter Digital GmbH</title>
        <meta name="description" content="Die gesuchte Seite wurde nicht gefunden." />
      </Head>
      
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">404 - Seite nicht gefunden</h1>
        <p className="text-lg text-secondary mb-8">
          Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center rounded-md bg-accent text-white px-6 py-3 font-medium hover:bg-accent/90 transition-colors"
        >
          Zurück zur Startseite
        </Link>
      </main>
    </>
  );
}
"""

# Beispiel für index.tsx (Homepage) Inhalt
home_index_content = """// src/pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import { HomePage } from '@/pages/home';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ritter Digital GmbH | Experten für digitale Prozesse</title>
        <meta name="description" content="Ritter Digital GmbH ist Ihr Experte für digitale Prozessoptimierung, Business Intelligence und kundenspezifische Softwareentwicklung." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage />
    </>
  );
};

export default Home;
"""

# Beispiel für home/index.tsx Inhalt
home_page_content = """// src/pages/home/index.tsx
import React from 'react';
import { Hero, ServiceTeaser, Benefits, Clients, LatestBlogPosts } from './components';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ServiceTeaser />
      <Benefits />
      <Clients />
      <LatestBlogPosts />
    </>
  );
};

export default HomePage;
"""

# Beispiel für home/components/index.tsx Inhalt
home_components_index_content = """// src/pages/home/components/index.tsx
export { Hero } from './Hero';
export { ServiceTeaser } from './ServiceTeaser';
export { Benefits } from './Benefits';
export { Clients } from './Clients';
export { LatestBlogPosts } from './LatestBlogPosts';
"""

# Beispiel für Hero Komponente
hero_component_content = """// src/pages/home/components/Hero.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Hero: React.FC = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Agentur für Digitalisierung
          </h1>
          <p className="text-xl text-secondary mb-8">
            Ihr Partner für digitale Optimizierung von Prozessen und e-Commerce Lösungen
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/leistungen">
              <Button variant="accent" size="lg">Mehr erfahren</Button>
            </Link>
            <Link href="/kontakt">
              <Button variant="outline" size="lg">Kontakt</Button>
            </Link>
          </div>
        </div>
        <div className="relative h-80 md:h-96 lg:h-[500px]">
          <Image 
            src="/images/hero/digital-transformation.jpg" 
            alt="Digitale Transformation"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
};
"""

# Beispiel für globals.css Inhalt
globals_css_content = """/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: 35 40 45;
    --color-secondary: 80 105 125;
    --color-accent: 255 138 76;
    --color-background: 244 245 246;
    --color-tertiary: 58 79 102;
  }

  body {
    @apply text-primary bg-background;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer components {
  .container {
    @apply px-4 mx-auto max-w-7xl;
  }
}
"""

# Beispiel für Button-Komponente
button_tsx_content = """// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-primary text-primary hover:bg-primary hover:text-white",
        secondary: "bg-secondary text-white hover:bg-secondary/80",
        ghost: "hover:bg-gray-100 hover:text-primary",
        link: "underline-offset-4 hover:underline text-primary",
        accent: "bg-accent text-white hover:bg-accent/90",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
"""

# Beispiel für header.tsx Inhalt
header_tsx_content = """// src/components/layout/header.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Navigation } from './navigation';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/logos/logo.svg" 
            alt="Ritter Digital GmbH" 
            width={150} 
            height={40}
            priority
          />
        </Link>
        
        <Navigation />
        
        <div className="hidden lg:block">
          <a 
            href="tel:+49123456789" 
            className="text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            +49 (0) 123 456 789
          </a>
        </div>
      </div>
    </header>
  );
};
"""

# Beispiel für footer.tsx Inhalt
footer_tsx_content = """// src/components/layout/footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/">
              <Image 
                src="/images/logos/logo-white.svg" 
                alt="Ritter Digital GmbH" 
                width={150} 
                height={40}
              />
            </Link>
            <p className="mt-4 text-gray-300">
              Ihr Partner für digitale Prozessoptimierung und maßgeschneiderte Software-Lösungen.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Leistungen</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/leistungen/business-intelligence" className="text-gray-300 hover:text-accent transition-colors">
                  Business Intelligence
                </Link>
              </li>
              <li>
                <Link href="/leistungen/data-warehouse" className="text-gray-300 hover:text-accent transition-colors">
                  Data Warehouse
                </Link>
              </li>
              <li>
                <Link href="/leistungen/softwareentwicklung" className="text-gray-300 hover:text-accent transition-colors">
                  Softwareentwicklung
                </Link>
              </li>
              <li>
                <Link href="/leistungen/kuenstliche-intelligenz" className="text-gray-300 hover:text-accent transition-colors">
                  Künstliche Intelligenz
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Unternehmen</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ueber-uns" className="text-gray-300 hover:text-accent transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/karriere" className="text-gray-300 hover:text-accent transition-colors">
                  Karriere
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-300 hover:text-accent transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <address className="not-italic text-gray-300">
              <p>Ritter Digital GmbH</p>
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
              <p className="mt-2">
                <a href="tel:+49123456789" className="hover:text-accent transition-colors">
                  +49 (0) 123 456 789
                </a>
              </p>
              <p>
                <a href="mailto:info@ritterdigital.de" className="hover:text-accent transition-colors">
                  info@ritterdigital.de
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Ritter Digital GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-6">
            <Link href="/impressum" className="text-gray-400 text-sm hover:text-accent transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-gray-400 text-sm hover:text-accent transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
"""

# Beispiel für cookie-banner.tsx Inhalt
cookie_banner_content = """// src/components/layout/cookie-banner.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Überprüfe, ob der Benutzer bereits zugestimmt hat
    const consentGiven = localStorage.getItem('cookie-consent');
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    // Speichere die Zustimmung in localStorage
    localStorage.setItem('cookie-consent', 'all');
    // Aktiviere Analytics
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    // Speichere die Zustimmung nur für essenzielle Cookies
    localStorage.setItem('cookie-consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 p-4 border-t">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-8">
            <h3 className="text-lg font-semibold mb-2">Wir verwenden Cookies</h3>
            <p className="text-secondary max-w-3xl">
              Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern und Analyse-Zwecken zu dienen. 
              Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies gemäß unserer{' '}
              <Link href="/datenschutz" className="text-accent underline">
                Datenschutzerklärung
              </Link>{' '}
              zu.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={handleAcceptEssential}>
              Nur essenzielle Cookies
            </Button>
            <Button variant="accent" onClick={handleAcceptAll}>
              Alle akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
"""

# Beispiel für utils.ts (cn-Funktion für Tailwind-Klassen)
utils_ts_content = """// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
"""

# Beispiel für analytics.ts
analytics_ts_content = """// src/lib/analytics.ts
// Google Analytics Implementierung

// Typisierung für window mit dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Google Analytics initialisieren
export const initGA = (): void => {
  if (typeof window === 'undefined') return;

  const consentGiven = localStorage.getItem('cookie-consent');
  if (consentGiven !== 'all') return;

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID fehlt in den Umgebungsvariablen.');
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true, // DSGVO-konform
    cookie_expires: 28 * 24 * 60 * 60, // Cookie-Lebensdauer: 28 Tage
  });

  // LeadInfo aktivieren, wenn vorhanden
  const LEADINFO_ID = process.env.NEXT_PUBLIC_LEADINFO_ID;
  if (LEADINFO_ID) {
    loadLeadInfo(LEADINFO_ID);
  }
};

// Seitenaufrufe tracken
export const pageview = (url: string): void => {
  if (typeof window === 'undefined') return;

  const consentGiven = localStorage.getItem('cookie-consent');
  if (consentGiven !== 'all') return;

  window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Events tracken
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}): void => {
  if (typeof window === 'undefined') return;

  const consentGiven = localStorage.getItem('cookie-consent');
  if (consentGiven !== 'all') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// LeadInfo laden
const loadLeadInfo = (leadInfoId: string): void => {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://cdn.leadinfo.net/ping.js`;
  script.onload = () => {
    // @ts-ignore
    window.Leadinfo?.trackPage(leadInfoId);
  };
  document.head.appendChild(script);
};
"""

def create_project_structure():
    """
    Erstellt die gesamte Projektstruktur mit allen Ordnern und Dateien.
    """
    os.makedirs(BASE_DIR, exist_ok=True)

    # Erstelle Verzeichnisse und leere Dateien
    for directory, files in directory_structure.items():
        dir_path = os.path.join(BASE_DIR, directory)

        # Erstelle Verzeichnis, wenn es noch nicht existiert
        if directory and not os.path.exists(dir_path):
            os.makedirs(dir_path, exist_ok=True)

        # Erstelle leere Dateien
        for file in files:
            file_path = os.path.join(BASE_DIR, directory, file)
            with open(file_path, 'w', encoding='utf-8') as f:
                # Füge Standardinhalt für einige Dateien hinzu
                if file == 'package.json':
                    f.write(package_json_content_str)
                elif file == 'tailwind.config.js':
                    f.write(tailwind_config_content)
                elif file == 'next.config.js':
                    f.write(next_config_content)
                elif file == '.env.local':
                    f.write(env_local_content)
                elif file == '.gitignore':
                    f.write(gitignore_content)
                elif file == '_app.tsx' and directory == 'src/pages':
                    f.write(app_tsx_content)
                elif file == '_document.tsx' and directory == 'src/pages':
                    f.write(document_tsx_content)
                elif file == '404.tsx' and directory == 'src/pages':
                    f.write(not_found_content)
                elif file == 'index.tsx' and directory == 'src/pages':
                    f.write(home_index_content)
                elif file == 'index.tsx' and directory == 'src/pages/home':
                    f.write(home_page_content)
                elif file == 'index.tsx' and directory == 'src/pages/home/components':
                    f.write(home_components_index_content)
                elif file == 'Hero.tsx' and directory == 'src/pages/home/components':
                    f.write(hero_component_content)
                elif file == 'globals.css' and directory == 'src/styles':
                    f.write(globals_css_content)
                elif file == 'button.tsx' and directory == 'src/components/ui':
                    f.write(button_tsx_content)
                elif file == 'header.tsx' and directory == 'src/components/layout':
                    f.write(header_tsx_content)
                elif file == 'footer.tsx' and directory == 'src/components/layout':
                    f.write(footer_tsx_content)
                elif file == 'cookie-banner.tsx' and directory == 'src/components/layout':
                    f.write(cookie_banner_content)
                elif file == 'utils.ts' and directory == 'src/lib':
                    f.write(utils_ts_content)
                elif file == 'analytics.ts' and directory == 'src/lib':
                    f.write(analytics_ts_content)
                else:
                    # Für alle anderen Dateien nur ein Kommentar mit dem Dateipfad
                    file_ext = os.path.splitext(file)[1]
                    if file_ext in ['.ts', '.tsx', '.js', '.jsx']:
                        f.write(f"// {os.path.join(directory, file)}\n")
                    elif file_ext in ['.css']:
                        f.write(f"/* {os.path.join(directory, file)} */\n")
                    elif file_ext in ['.md']:
                        f.write(f"# {os.path.join(directory, file)}\n")

    print(f"Projektstruktur wurde erfolgreich erstellt in {BASE_DIR}")

if __name__ == "__main__":
    create_project_structure()