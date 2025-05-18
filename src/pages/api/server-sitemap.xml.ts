// pages/api/server-sitemap.xml.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ISitemapField } from 'next-sitemap';
import { getServerSideSitemap } from 'next-sitemap';

// Typedefinitionen für unsere Datenmodelle
interface BlogPost {
  slug: string;
  updated_at?: string;
  published_at?: string;
}

interface ServiceCategory {
  id: string;
}

// API-Route-Handler für Next.js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Abrufen aller veröffentlichten Blog-Posts
    const blogPostsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?select=slug,updated_at,published_at&published=true`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          'Content-Type': 'application/json',
        },
      }
    );
    const blogPosts: BlogPost[] = await blogPostsResponse.json();

    // Abrufen aller Dienstleistungen
    const servicesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/categories?select=id`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          'Content-Type': 'application/json',
        },
      }
    );
    const services: ServiceCategory[] = await servicesResponse.json();

    // Erstellen der Sitemap-Felder
    const fields: ISitemapField[] = [];

    // Blog Post Sitemap Felder
    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach(post => {
        fields.push({
          loc: `https://ritterdigital.de/blog/${post.slug}`,
          lastmod: post.updated_at || post.published_at || new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.7,
        });
      });
    }

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
          loc: 'https://ritterdigital.de/blog',
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
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
