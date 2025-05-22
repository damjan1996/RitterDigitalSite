// pages/api/server-sitemap.xml.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ISitemapField } from 'next-sitemap';
import { getServerSideSitemap } from 'next-sitemap';

// Typedefinitionen für unsere Datenmodelle
interface ServiceCategory {
  id: string;
}

// API-Route-Handler für Next.js
export default async function handler(_req: NextApiRequest, _res: NextApiResponse) {
  try {
    // Abrufen aller Dienstleistungen (statisch definiert, da keine Supabase-Abfrage mehr)
    const services: ServiceCategory[] = [
      { id: 'business-intelligence' },
      { id: 'data-warehouse' },
      { id: 'softwareentwicklung' },
      { id: 'kuenstliche-intelligenz' },
    ];

    // Erstellen der Sitemap-Felder
    const fields: ISitemapField[] = [];

    // Services Sitemap Felder
    if (services && services.length > 0) {
      services.forEach(service => {
        fields.push({
          loc: `https://ritterdigital.de/leistungen/${service.id}`,
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.8,
        });
      });
    }

    // Fallback: Wenn keine Daten abgerufen werden konnten, statische Hauptseiten einfügen
    if (fields.length === 0) {
      fields.push(
        {
          loc: 'https://ritterdigital.de',
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: 1.0,
        },
        {
          loc: 'https://ritterdigital.de/leistungen',
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.9,
        },
        {
          loc: 'https://ritterdigital.de/leistungen/business-intelligence',
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.8,
        },
        {
          loc: 'https://ritterdigital.de/leistungen/data-warehouse',
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.8,
        },
        {
          loc: 'https://ritterdigital.de/leistungen/softwareentwicklung',
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.8,
        },
        {
          loc: 'https://ritterdigital.de/leistungen/kuenstliche-intelligenz',
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.8,
        },
        {
          loc: 'https://ritterdigital.de/ueber-uns',
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.8,
        },
        {
          loc: 'https://ritterdigital.de/kontakt',
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.8,
        }
      );
    }

    // Sitemap generieren und senden
    return getServerSideSitemap(fields);
  } catch (e) {
    console.error('Fehler bei der Sitemap-Generierung:', e);

    // Fallback für den Fehlerfall
    const fields: ISitemapField[] = [
      {
        loc: 'https://ritterdigital.de',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      },
    ];

    // Fallback Sitemap senden
    return getServerSideSitemap(fields);
  }
}
