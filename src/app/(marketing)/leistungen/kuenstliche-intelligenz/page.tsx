// src/pages/leistungen/kuenstliche-intelligenz/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import { ServiceCTA } from '@/components/leistungen/ServiceCTA';
import { ServiceBenefits } from '@/pages/leistungen/service/ServiceBenefits';
import { ServiceDetails } from '@/pages/leistungen/service/ServiceDetails';
import { ServiceFeatures } from '@/pages/leistungen/service/ServiceFeatures';
import { ServiceHero } from '@/pages/leistungen/service/ServiceHero';

const KuenstlicheIntelligenzPage: NextPage = () => {
  // KI-Leistungsdaten
  const serviceData = {
    title: 'Künstliche Intelligenz',
    subtitle: 'Smarte Technologien für Ihren Geschäftserfolg',
    description:
      'KI-gestützte Lösungen optimieren Ihre Prozesse und erschließen neue Geschäftspotenziale. Wir integrieren moderne KI-Technologien wie maschinelles Lernen und predictive Analytics in Ihre bestehenden Systeme.',
    imageUrl: '/images/services/artificial-intelligence.jpg',
    features: [
      {
        title: 'Maschinelles Lernen',
        description:
          'Automatisierte Analyse großer Datenmengen zur Erkennung von Mustern und Vorhersage zukünftiger Trends.',
        icon: 'Brain',
      },
      {
        title: 'Natürliche Sprachverarbeitung',
        description:
          'Entwicklung intelligenter Chatbots und Textanalyse-Tools für verbesserte Kundenkommunikation.',
        icon: 'MessageSquare',
      },
      {
        title: 'Predictive Analytics',
        description:
          'Vorhersagemodelle für fundierte Entscheidungen in Bereichen wie Vertrieb, Marketing und Logistik.',
        icon: 'TrendingUp',
      },
      {
        title: 'Computer Vision',
        description:
          'Bilderkennungssysteme für Qualitätskontrolle, Automatisierung und Sicherheit.',
        icon: 'Camera',
      },
    ],
    benefits: [
      {
        title: 'Prozessautomatisierung',
        description:
          'Reduzieren Sie manuelle Arbeit durch intelligente Automatisierung repetitiver Aufgaben.',
      },
      {
        title: 'Bessere Prognosen',
        description:
          'Treffen Sie datenbasierte Vorhersagen über zukünftige Entwicklungen und Trends.',
      },
      {
        title: 'Erhöhte Effizienz',
        description:
          'Optimieren Sie Ihre Ressourcen durch intelligente Entscheidungsunterstützung.',
      },
      {
        title: 'Wettbewerbsvorteil',
        description:
          'Erschließen Sie neue Geschäftsmöglichkeiten durch innovative KI-gestützte Lösungen.',
      },
    ],
    videoSrc: 'https://www.youtube.com/embed/HjCoZNrzA5Q',
    ctaText:
      'Bereit für die KI-Revolution? Kontaktieren Sie uns für ein Beratungsgespräch darüber, wie KI-Technologien Ihr Unternehmen voranbringen können.',
    ctaDescription:
      'Kontaktieren Sie uns für ein Beratungsgespräch darüber, wie KI-Technologien Ihr Unternehmen voranbringen können.',
  };

  const useCases = [
    {
      title: 'Bedarfsprognose',
      description:
        'KI-Algorithmen analysieren historische Verkaufsdaten und externe Faktoren, um präzise Bedarfsprognosen zu erstellen und Lagerbestände zu optimieren.',
      imageUrl: '/images/services/ai-usecase-1.jpg',
    },
    {
      title: 'Kundensegmentierung',
      description:
        'Maschinelles Lernen identifiziert Kundensegmente basierend auf Kaufverhalten und Präferenzen für zielgerichtetes Marketing.',
      imageUrl: '/images/services/ai-usecase-2.jpg',
    },
    {
      title: 'Anomalieerkennung',
      description:
        'KI-Systeme erkennen automatisch Abweichungen in Prozessen oder Daten, um Qualitätsprobleme oder Betrug frühzeitig zu identifizieren.',
      imageUrl: '/images/services/ai-usecase-3.jpg',
    },
  ];

  return (
    <>
      <Head>
        <title>Künstliche Intelligenz | Ritter Digital GmbH</title>
        <meta
          name="description"
          content="KI-Lösungen von Ritter Digital - Nutzen Sie das Potenzial künstlicher Intelligenz, um Ihre Geschäftsprozesse zu optimieren und neue Wachstumschancen zu erschließen."
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
          title="Intelligente Lösungen für komplexe Herausforderungen"
          description="Künstliche Intelligenz revolutioniert die Art und Weise, wie Unternehmen arbeiten. Unsere KI-Lösungen kombinieren modernste Technologien mit fundiertem Branchenwissen, um maßgeschneiderte Anwendungen zu entwickeln, die messbare Geschäftsergebnisse liefern."
          videoSrc={serviceData.videoSrc}
        >
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold text-primary">
              Unser Leistungsspektrum im KI-Bereich:
            </h3>
            <ul className="space-y-2 text-secondary">
              <li className="flex items-start">
                <div className="mr-2 text-accent">•</div>
                <span>Entwicklung maßgeschneiderter KI-Modelle</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 text-accent">•</div>
                <span>Integration von KI in bestehende Geschäftsprozesse</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 text-accent">•</div>
                <span>Predictive Analytics für datenbasierte Entscheidungen</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 text-accent">•</div>
                <span>Chatbots und virtuelle Assistenten</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 text-accent">•</div>
                <span>Beratung zur KI-Strategie und -Implementation</span>
              </li>
            </ul>
          </div>
        </ServiceDetails>

        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-primary">
              Anwendungsbereiche
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {useCases.map((useCase, index) => (
                <div key={index} className="overflow-hidden rounded-lg bg-white shadow-sm">
                  <div className="relative h-48">
                    <Image
                      src={useCase.imageUrl}
                      alt={useCase.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-primary">{useCase.title}</h3>
                    <p className="text-secondary">{useCase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceFeatures title="Funktionen unserer KI-Lösungen" features={serviceData.features} />
        <ServiceBenefits
          title="Vorteile von KI für Ihr Unternehmen"
          benefits={serviceData.benefits}
        />
        <ServiceCTA
          text={serviceData.ctaText}
          buttonText="Jetzt Kontakt aufnehmen"
          buttonLink="/kontakt"
        />
      </div>
    </>
  );
};

export default KuenstlicheIntelligenzPage;
