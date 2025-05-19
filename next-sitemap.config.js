// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ritterdigital.de',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/server-sitemap.xml', '/404', '/500', '/api/*', '/admin/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      // Zusätzliche dynamische Sitemaps
      'https://ritterdigital.de/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/internal/', '/*.json$', '/*.xml$'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/internal/'],
      },
    ],
  },
  transform: async (config, path) => {
    // Spezielle Regeln für bestimmte Pfade
    // Standardmäßig ist die Priorität 0.7
    let priority = config.priority;
    let changefreq = config.changefreq;

    // Anpassung der Priorität und Änderungshäufigkeit für bestimmte Seiten
    if (path === '/') {
      // Höchste Priorität für die Startseite
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/leistungen') && !path.includes('/')) {
      // Hohe Priorität für Hauptleistungsseite
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/leistungen/')) {
      // Hohe Priorität für einzelne Leistungsseiten
      priority = 0.8;
      changefreq = 'weekly';
      // Blog-Einträge entfernt
    } else if (path.includes('/ueber-uns') || path.includes('/kontakt')) {
      // Mittlere Priorität für Über-uns- und Kontaktseiten
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.includes('/datenschutz') || path.includes('/impressum')) {
      // Niedrigere Priorität für rechtliche Seiten
      priority = 0.5;
      changefreq = 'yearly';
    }

    return {
      loc: path, // Ort/URL der Seite
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs || [],
    };
  },
};
