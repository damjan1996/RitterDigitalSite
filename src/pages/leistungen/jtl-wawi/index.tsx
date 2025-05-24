// src/pages/leistungen/jtl-wawi/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import { ServiceCTA } from '../../../components/leistungen/ServiceCTA';
import { ServiceBenefits } from '../service/ServiceBenefits';
import { ServiceDetails } from '../service/ServiceDetails';
import { ServiceFeatures } from '../service/ServiceFeatures';
import { ServiceHero } from '../service/ServiceHero';

const JTLWaWiPage: NextPage = () => {
  const pageData = {
    title: 'JTL WaWi',
    subtitle: 'Effiziente Warenwirtschaft für Ihren E-Commerce-Erfolg',
    description:
      'Optimieren Sie Ihre Geschäftsprozesse mit JTL WaWi – der leistungsstarken Warenwirtschaftslösung für Online-Händler und mittelständische Unternehmen.',
    heroImage: '/images/services/jtl-wawi-hero.jpg',
    details: {
      mainContent: `
        JTL WaWi ist ein umfassendes Warenwirtschaftssystem, das speziell für die Anforderungen des 
        modernen E-Commerce entwickelt wurde. Als zertifizierter JTL-Partner unterstützen wir Sie bei der 
        Implementierung, Anpassung und Optimierung dieser leistungsstarken Lösung.
        
        Ritter Digital bietet Ihnen maßgeschneiderte JTL WaWi-Implementierungen, die perfekt auf Ihre 
        individuellen Geschäftsprozesse zugeschnitten sind. Wir helfen Ihnen, das volle Potenzial von 
        JTL WaWi zu entfalten – von der Bestandsführung über das Auftragsmanagement bis hin zu 
        automatisierten Geschäftsprozessen.
      `,
      bulletPoints: [
        'Nahtlose Integration mit allen gängigen Online-Marktplätzen und Shopsystemen',
        'Umfassendes Bestandsmanagement über mehrere Lagerorte hinweg',
        'Automatisierte Auftragsabwicklung vom Eingang bis zum Versand',
        'Detaillierte Auswertungen und Reportings für fundierte Geschäftsentscheidungen',
      ],
    },
    features: [
      {
        title: 'JTL WaWi Grundsystem',
        description:
          'Verwalten Sie Artikel, Kunden, Lieferanten und Bestellungen in einem zentralen System mit intuitiver Benutzeroberfläche.',
        icon: 'Package',
      },
      {
        title: 'JTL WMS',
        description:
          'Optimieren Sie Ihre Lagerprozesse mit dem Warehouse-Management-System für effizientes Picken, Packen und Versenden.',
        icon: 'Layers',
      },
      {
        title: 'JTL Plan & Produce',
        description:
          'Planen und steuern Sie Fertigungsprozesse mit detaillierter Stücklisten- und Produktionsauftragsverwaltung.',
        icon: 'Sliders',
      },
      {
        title: 'Multi-Channel-Anbindung',
        description:
          'Verbinden Sie JTL WaWi nahtlos mit allen relevanten Verkaufskanälen und Marktplätzen.',
        icon: 'Globe',
      },
    ],
    benefits: [
      {
        title: 'Zeitersparnis',
        description:
          'Automatisieren Sie wiederkehrende Prozesse und reduzieren Sie manuelle Eingaben.',
        icon: 'Clock',
      },
      {
        title: 'Fehlerreduzierung',
        description:
          'Minimieren Sie Fehlerquellen durch zentrale Datenhaltung und automatisierte Prozesse.',
        icon: 'CheckCircle',
      },
      {
        title: 'Skalierbarkeit',
        description: 'Wachsen Sie ohne Limits – JTL WaWi skaliert mit Ihrem Unternehmen.',
        icon: 'TrendingUp',
      },
      {
        title: 'Transparenz',
        description:
          'Behalten Sie den Überblick über alle Geschäftsprozesse mit umfassenden Reporting-Funktionen.',
        icon: 'BarChart2',
      },
    ],
    ctaText:
      'Möchten Sie Ihre Warenwirtschaft mit JTL WaWi optimieren? Unsere Experten beraten Sie gerne zu den Möglichkeiten für Ihr Unternehmen und unterstützen Sie bei der Implementierung und Anpassung.',
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

export default JTLWaWiPage;
