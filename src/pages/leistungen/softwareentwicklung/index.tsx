// src/pages/leistungen/softwareentwicklung/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import { ServiceBenefits } from '../service/ServiceBenefits';
import { ServiceCTA } from '../service/ServiceCTA';
import { ServiceDetails } from '../service/ServiceDetails';
import { ServiceFeatures } from '../service/ServiceFeatures';
import { ServiceHero } from '../service/ServiceHero';

const SoftwareentwicklungPage: NextPage = () => {
  // Softwareentwicklung Leistungsdaten
  const serviceData = {
    title: 'Softwareentwicklung',
    subtitle: 'Maßgeschneiderte Lösungen für Ihre Anforderungen',
    description:
      'Wir entwickeln maßgeschneiderte Softwarelösungen, die genau auf Ihre Geschäftsprozesse zugeschnitten sind. Von Webapplikationen bis hin zu komplexen Backend-Systemen – wir setzen Ihre individuellen Anforderungen um.',
    imageUrl: '/images/services/software-development.jpg',
    features: [
      {
        title: 'Webapplikationen',
        description:
          'Moderne, skalierbare und benutzerfreundliche Webanwendungen mit React, Next.js und anderen führenden Technologien.',
        icon: 'LayoutDashboard',
      },
      {
        title: 'Backend-Systeme',
        description:
          'Leistungsstarke und zuverlässige Backend-Lösungen mit Node.js, .NET oder Java, je nach Ihren Anforderungen.',
        icon: 'Database',
      },
      {
        title: 'API-Entwicklung',
        description:
          'RESTful und GraphQL APIs für nahtlose Integration zwischen verschiedenen Systemen und Diensten.',
        icon: 'Link',
      },
      {
        title: 'Datenbanklösungen',
        description:
          'Optimierte Datenbankstrukturen mit SQL und NoSQL-Technologien für effiziente Datenspeicherung und -abfrage.',
        icon: 'BarChart',
      },
    ],
    benefits: [
      {
        title: 'Passgenaue Lösungen',
        description:
          'Software, die exakt auf Ihre Geschäftsprozesse zugeschnitten ist, ohne Kompromisse bei Funktionalität oder Benutzerfreundlichkeit.',
      },
      {
        title: 'Skalierbarkeit',
        description:
          'Lösungen, die mit Ihrem Unternehmen mitwachsen und bei Bedarf einfach erweitert werden können.',
      },
      {
        title: 'Kosteneffizienz',
        description:
          'Reduzierte Kosten durch automatisierte Prozesse und eliminierte manuelle Arbeitsschritte.',
      },
      {
        title: 'Wettbewerbsvorteil',
        description:
          'Maßgeschneiderte Software, die Ihren spezifischen Bedürfnissen entspricht und Ihnen einen Vorsprung vor der Konkurrenz verschafft.',
      },
    ],
    videoSrc: 'https://www.youtube.com/embed/HjCoZNrzA5Q',
    ctaText:
      'Ihre Software-Idee verwirklichen? Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch über Ihr Softwareprojekt.',
    ctaDescription:
      'Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch über Ihr Softwareprojekt.',
  };

  // Technologien, die wir verwenden
  const technologies = [
    { name: 'React', icon: '/images/services/tech/react.svg' },
    { name: 'Next.js', icon: '/images/services/tech/nextjs.svg' },
    { name: 'Node.js', icon: '/images/services/tech/nodejs.svg' },
    { name: 'TypeScript', icon: '/images/services/tech/typescript.svg' },
    { name: 'PostgreSQL', icon: '/images/services/tech/postgresql.svg' },
    { name: 'Supabase', icon: '/images/services/tech/supabase.svg' },
    { name: '.NET', icon: '/images/services/tech/dotnet.svg' },
    { name: 'Java', icon: '/images/services/tech/java.svg' },
  ];

  return (
    <>
      <Head>
        <title>Softwareentwicklung | Ritter Digital GmbH</title>
        <meta
          name="description"
          content="Individuelle Softwareentwicklung von Ritter Digital - Maßgeschneiderte Lösungen für Ihre spezifischen Anforderungen mit modernsten Technologien."
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
          title="Individuelle Software für Ihren Erfolg"
          description="In der digitalen Welt von heute kann Standardsoftware oft nicht alle Anforderungen eines Unternehmens erfüllen. Unsere individuellen Softwarelösungen werden genau auf Ihre Geschäftsprozesse zugeschnitten und schaffen einen echten Mehrwert für Ihr Unternehmen."
          videoSrc={serviceData.videoSrc}
        >
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold text-primary">Unser Entwicklungsprozess:</h3>
            <ol className="space-y-4 text-secondary">
              <li className="flex items-start">
                <div className="mr-3 font-bold">1.</div>
                <span>
                  <strong className="text-primary">Anforderungsanalyse:</strong> Wir analysieren
                  gemeinsam mit Ihnen Ihre spezifischen Anforderungen und Geschäftsprozesse.
                </span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 font-bold">2.</div>
                <span>
                  <strong className="text-primary">Konzeption & Design:</strong> Wir erstellen ein
                  detailliertes Konzept und Wireframes für Ihre Softwarelösung.
                </span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 font-bold">3.</div>
                <span>
                  <strong className="text-primary">Entwicklung:</strong> Agile Entwicklung mit
                  regelmäßigen Feedbackschleifen und Iterationen.
                </span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 font-bold">4.</div>
                <span>
                  <strong className="text-primary">Testing & Qualitätssicherung:</strong>{' '}
                  Umfangreiche Tests zur Sicherstellung höchster Qualität.
                </span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 font-bold">5.</div>
                <span>
                  <strong className="text-primary">Einführung & Schulung:</strong> Reibungslose
                  Implementierung und Schulung Ihrer Mitarbeiter.
                </span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 font-bold">6.</div>
                <span>
                  <strong className="text-primary">Wartung & Support:</strong> Kontinuierliche
                  Betreuung und Weiterentwicklung Ihrer Software.
                </span>
              </li>
            </ol>
          </div>
        </ServiceDetails>

        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-primary">
              Unsere Technologien
            </h2>

            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-sm"
                >
                  <div className="relative mb-3 h-12 w-12">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-primary">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceFeatures title="Unsere Entwicklungsleistungen" features={serviceData.features} />
        <ServiceBenefits title="Vorteile individueller Software" benefits={serviceData.benefits} />
        <ServiceCTA
          text={serviceData.ctaText}
          buttonText="Jetzt Kontakt aufnehmen"
          buttonLink="/kontakt"
        />
      </div>
    </>
  );
};

export default SoftwareentwicklungPage;
