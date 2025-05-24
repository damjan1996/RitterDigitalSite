// src/pages/leistungen/digitalisierung/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import { ServiceCTA } from '../../../components/leistungen/ServiceCTA';
import { ServiceBenefits } from '../service/ServiceBenefits';
import { ServiceDetails } from '../service/ServiceDetails';
import { ServiceFeatures } from '../service/ServiceFeatures';
import { ServiceHero } from '../service/ServiceHero';

const DigitalisierungPage: NextPage = () => {
  const pageData = {
    title: 'Digitalisierung',
    subtitle: 'Optimierte Prozesse für maximale Effizienz und Wachstum',
    description:
      'Unsere maßgeschneiderten Digitalisierungslösungen transformieren Ihre analogen Prozesse in effiziente, skalierbare digitale Workflows.',
    heroImage: '/images/services/digitalisierung-hero.jpg',
    details: {
      mainContent: `
        Digitalisierung ist mehr als nur der Einsatz neuer Technologien. Es geht um die grundlegende 
        Neugestaltung Ihrer Geschäftsprozesse, um in der digitalen Wirtschaft erfolgreich zu sein.
        
        Bei Ritter Digital kombinieren wir tiefes Prozessverständnis mit modernster Technologie, 
        um Ihre individuellen Herausforderungen zu lösen und Ihnen einen nachhaltigen Wettbewerbsvorteil zu verschaffen.
        Wir begleiten Sie auf jedem Schritt Ihrer digitalen Transformation - von der strategischen Planung 
        bis zur technischen Umsetzung.
      `,
      bulletPoints: [
        'Ganzheitliche Prozessoptimierung',
        'Implementierung maßgeschneiderter Softwarelösungen',
        'Nahtlose Integration bestehender Systeme',
        'Digitale Transformation mit messbaren Ergebnissen',
      ],
    },
    features: [
      {
        title: 'Prozessanalyse & -optimierung',
        description:
          'Wir identifizieren Ineffizienzen und entwickeln optimierte digitale Prozesse für Ihr Unternehmen.',
        icon: 'GitBranch',
      },
      {
        title: 'Maßgeschneiderte Software',
        description:
          'Entwicklung individueller Softwarelösungen, die exakt auf Ihre Geschäftsanforderungen zugeschnitten sind.',
        icon: 'Code',
      },
      {
        title: 'Systemintegration',
        description:
          'Verbinden Sie bestehende Systeme zu einer nahtlosen digitalen Infrastruktur ohne Informationssilos.',
        icon: 'Link',
      },
      {
        title: 'E-Commerce-Optimierung',
        description:
          'Maximieren Sie Ihren Online-Erfolg durch optimierte Verkaufsprozesse und Kundeninteraktionen.',
        icon: 'ShoppingCart',
      },
    ],
    benefits: [
      {
        title: 'Steigerung der Effizienz',
        description:
          'Reduzieren Sie manuelle Tätigkeiten und beschleunigen Sie Ihre Geschäftsprozesse.',
        icon: 'Clock',
      },
      {
        title: 'Kosteneinsparung',
        description: 'Senken Sie operative Kosten durch automatisierte, fehlerresistente Prozesse.',
        icon: 'DollarSign',
      },
      {
        title: 'Skalierbarkeit',
        description:
          'Schaffen Sie die Grundlage für nachhaltiges Wachstum durch skalierbare digitale Lösungen.',
        icon: 'TrendingUp',
      },
      {
        title: 'Zukunftssicherheit',
        description:
          'Bleiben Sie wettbewerbsfähig in einer sich schnell wandelnden digitalen Geschäftswelt.',
        icon: 'Shield',
      },
    ],
    ctaText:
      'Bereit, Ihr Unternehmen durch digitale Transformation auf die nächste Stufe zu heben? Kontaktieren Sie uns für eine individuelle Beratung zu Ihren Digitalisierungsmöglichkeiten.',
  };

  return (
    <>
      <Head>
        <title>{pageData.title} | Ritter Digital GmbH</title>
        <meta name="description" content={pageData.description} />
      </Head>

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
          buttonText="Jetzt Kontakt aufnehmen"
          buttonLink="/kontakt"
        />
      </article>
    </>
  );
};

export default DigitalisierungPage;
