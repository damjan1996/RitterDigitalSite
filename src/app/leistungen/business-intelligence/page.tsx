// src/app/leistungen/business-intelligence/page.tsx
import type { Metadata } from 'next';
import React from 'react';

import { ServiceBenefits } from '@/components/leistungen/service/ServiceBenefits';
import { ServiceDetails } from '@/components/leistungen/service/ServiceDetails';
import { ServiceFeatures } from '@/components/leistungen/service/ServiceFeatures';
import { ServiceHero } from '@/components/leistungen/service/ServiceHero';
import { ServiceCTA } from '@/components/leistungen/ServiceCTA';

export const metadata: Metadata = {
  title: 'Business Intelligence | Ritter Digital GmbH',
  description:
    'Unsere Business Intelligence-Lösungen helfen Ihnen, versteckte Muster in Ihren Daten zu erkennen und daraus strategische Vorteile zu ziehen.',
  keywords: [
    'Business Intelligence',
    'BI',
    'Power BI',
    'Datenanalyse',
    'Reporting',
    'Dashboard',
    'Ritter Digital',
  ],
  openGraph: {
    title: 'Business Intelligence | Ritter Digital GmbH',
    description:
      'Unsere Business Intelligence-Lösungen helfen Ihnen, versteckte Muster in Ihren Daten zu erkennen und daraus strategische Vorteile zu ziehen.',
    type: 'website',
    locale: 'de_DE',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/leistungen/business-intelligence',
  },
};

export default function BusinessIntelligencePage() {
  const pageData = {
    title: 'Business Intelligence',
    subtitle: 'Datengestützte Entscheidungen für Ihren Geschäftserfolg',
    description:
      'Unsere Business Intelligence-Lösungen helfen Ihnen, versteckte Muster in Ihren Daten zu erkennen und daraus strategische Vorteile zu ziehen.',
    heroImage: '/images/services/business-intelligence-hero.jpg',
    details: {
      mainContent: `
        Business Intelligence ist weit mehr als nur Datenanalyse. Unsere BI-Lösungen bieten
        eine umfassende Plattform, mit der Sie Ihre Geschäftsdaten in strategische Erkenntnisse umwandeln können.
        
        Bei Ritter Digital verbinden wir fortschrittliche Analysetechnologien mit unserem tiefen Branchenverständnis,
        um maßgeschneiderte Business Intelligence-Lösungen zu schaffen, die perfekt auf Ihre Geschäftsanforderungen
        zugeschnitten sind.
      `,
      bulletPoints: [
        'Echtzeit-Dashboards für sofortige Einblicke',
        'Benutzerdefinierte Berichte und Analysen',
        'Automatisierte Datenaufbereitung und -integration',
        'Prädiktive Analysen für zukunftsorientierte Entscheidungen',
      ],
    },
    features: [
      {
        title: 'Datenintegration',
        description:
          'Verbinden Sie verschiedene Datenquellen zu einer einheitlichen Sicht auf Ihr Unternehmen.',
        icon: 'Database',
      },
      {
        title: 'Interaktive Dashboards',
        description:
          'Visualisieren Sie komplexe Daten mit benutzerfreundlichen, interaktiven Dashboards.',
        icon: 'BarChart',
      },
      {
        title: 'Automatisierte Berichterstellung',
        description:
          'Sparen Sie Zeit mit automatisch generierten Berichten, die genau auf Ihre Anforderungen zugeschnitten sind.',
        icon: 'FileText',
      },
      {
        title: 'Prädiktive Analysen',
        description:
          'Nutzen Sie fortschrittliche Algorithmen, um zukünftige Trends und Möglichkeiten zu identifizieren.',
        icon: 'TrendingUp',
      },
    ],
    benefits: [
      {
        title: 'Fundierte Entscheidungen',
        description:
          'Treffen Sie Entscheidungen auf Basis von Daten, nicht Bauchgefühl.',
        icon: 'Brain',
      },
      {
        title: 'Wettbewerbsvorteil',
        description:
          'Verschaffen Sie sich einen Vorsprung durch frühzeitige Erkennung von Markttrends.',
        icon: 'Award',
      },
      {
        title: 'Effizienzsteigerung',
        description:
          'Identifizieren und beheben Sie Ineffizienzen in Ihren Geschäftsprozessen.',
        icon: 'Zap',
      },
      {
        title: 'Umsatzsteigerung',
        description:
          'Erkennen Sie neue Umsatzchancen und optimieren Sie bestehende Ertragsquellen.',
        icon: 'TrendingUp',
      },
    ],
    ctaText:
      'Bereit, das volle Potenzial Ihrer Daten zu entfalten? Kontaktieren Sie uns für eine unverbindliche Beratung zu unseren Business Intelligence-Lösungen.',
  };

  return (
    <article>
      <ServiceHero
        title={pageData.title}
        subtitle={pageData.subtitle}
        description={pageData.description}
        imageUrl={pageData.heroImage}
      />

      <ServiceDetails
        title={pageData.title}
        description={pageData.details.mainContent}
        items={pageData.details.bulletPoints}
      />

      <ServiceFeatures features={pageData.features} />

      <ServiceBenefits benefits={pageData.benefits} />

      <ServiceCTA
        text={pageData.ctaText}
        buttonText='Jetzt Kontakt aufnehmen'
        buttonLink='/kontakt'
      />
    </article>
  );
}