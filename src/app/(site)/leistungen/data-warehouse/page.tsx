// src/pages/leistungen/data-warehouse/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import { ServiceCTA } from '@/components/leistungen';
import { ServiceBenefits } from '@/components/leistungen/service/ServiceBenefits';
import { ServiceDetails } from '@/components/leistungen/service/ServiceDetails';
import { ServiceFeatures } from '@/components/leistungen/service/ServiceFeatures';
import { ServiceHero } from '@/components/leistungen/service/ServiceHero';

const DataWarehousePage: NextPage = () => {
  // Data Warehouse Leistungsdaten
  const serviceData = {
    title: 'Data Warehouse',
    subtitle: 'Zentrale Datenhaltung für optimale Analysen',
    description:
      'Ein Data Warehouse bildet die zentrale Datenplattform Ihres Unternehmens. Hier werden Daten aus verschiedenen Quellen zusammengeführt, bereinigt und für Analysen optimiert, um fundierte Geschäftsentscheidungen zu ermöglichen.',
    imageUrl: '/images/services/data-warehouse.jpg',
    features: [
      {
        title: 'Datenintegration',
        description:
          'Zusammenführung von Daten aus verschiedenen Quellen wie ERP-Systemen, CRM, Webshops und externen Diensten.',
        icon: 'Database',
      },
      {
        title: 'Datenbereinigung',
        description:
          'Automatisierte Prozesse zur Bereinigung und Standardisierung Ihrer Daten für höchste Qualität.',
        icon: 'Sparkles',
      },
      {
        title: 'ETL-Prozesse',
        description:
          'Effiziente Extraktion, Transformation und Ladeprozesse für reibungslose Datenflüsse.',
        icon: 'ArrowRightLeft',
      },
      {
        title: 'Skalierbare Architektur',
        description:
          'Zukunftssichere Lösungen, die mit Ihrem Unternehmen und Datenvolumen mitwachsen.',
        icon: 'BarChart4',
      },
    ],
    benefits: [
      {
        title: 'Einheitliche Datenbasis',
        description: 'Single Point of Truth für alle Unternehmensdaten und -berichte.',
      },
      {
        title: 'Verbesserte Datenqualität',
        description: 'Durch automatisierte Bereinigungs- und Validierungsprozesse.',
      },
      {
        title: 'Schnellere Analysen',
        description: 'Optimierte Datenstrukturen für performante Abfragen und Berichte.',
      },
      {
        title: 'Historische Vergleiche',
        description:
          'Langfristige Datenhaltung ermöglicht zeitbasierte Analysen und Trenderkennungen.',
      },
    ],
    videoSrc: 'https://www.youtube.com/embed/HjCoZNrzA5Q',
    ctaText:
      'Zentralisieren Sie Ihre Unternehmensdaten. Kontaktieren Sie uns für ein individuelles Konzept zur Implementierung oder Optimierung Ihres Data Warehouse.',
    ctaDescription:
      'Kontaktieren Sie uns für ein individuelles Konzept zur Implementierung oder Optimierung Ihres Data Warehouse.',
  };

  return (
    <>
      <Head>
        <title>Data Warehouse | Ritter Digital GmbH</title>
        <meta
          name="description"
          content="Data Warehouse Lösungen von Ritter Digital - Zentralisieren und optimieren Sie Ihre Unternehmensdaten für bessere Business Intelligence und datengetriebene Entscheidungen."
        />
      </Head>

      <div>
        <ServiceHero
          title={serviceData.title}
          subtitle={serviceData.subtitle}
          description={serviceData.description}
          imageUrl={serviceData.imageUrl}
        />

        <ServiceDetails
          title="Zentralisierte Datenhaltung für Ihr Unternehmen"
          description="Ein Data Warehouse ist mehr als nur eine Datenbank - es ist das zentrale Nervensystem Ihrer Dateninfrastruktur. Unsere Data Warehouse-Lösungen ermöglichen es Ihnen, Daten aus unterschiedlichsten Quellen zu konsolidieren und in wertvolle Geschäftserkenntnisse umzuwandeln."
          videoSrc={serviceData.videoSrc}
        >
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold text-primary">
              Unser Leistungsumfang umfasst:
            </h3>
            <ul className="space-y-2 text-secondary">
              <li className="flex items-start">
                <div className="mr-2 text-accent">•</div>
                <span>Konzeption und Implementierung neuer Data Warehouse-Systeme</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 text-accent">•</div>
                <span>Migration bestehender Datenbestände</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 text-accent">•</div>
                <span>ETL-Prozesse (Extraktion, Transformation, Laden)</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 text-accent">•</div>
                <span>Datenqualitätsmanagement</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 text-accent">•</div>
                <span>Integration mit Business Intelligence-Tools</span>
              </li>
            </ul>
          </div>
        </ServiceDetails>

        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-primary">
              Data Warehouse Architektur
            </h2>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mx-auto max-w-3xl">
                <Image
                  src="/images/services/data-warehouse-architecture.jpg"
                  alt="Data Warehouse Architektur"
                  width={1200}
                  height={675}
                  className="rounded-md object-contain"
                />
              </div>
              <p className="mt-4 text-center text-secondary">
                Typische Architektur eines modernen Data Warehouse Systems mit ETL-Prozessen und
                Business Intelligence-Anbindung
              </p>
            </div>
          </div>
        </section>

        <ServiceFeatures
          title="Funktionen unserer Data Warehouse-Lösungen"
          features={serviceData.features}
        />
        <ServiceBenefits title="Vorteile eines Data Warehouse" benefits={serviceData.benefits} />
        <ServiceCTA
          text={serviceData.ctaText}
          buttonText="Jetzt Kontakt aufnehmen"
          buttonLink="/kontakt"
        />
      </div>
    </>
  );
};

export default DataWarehousePage;
