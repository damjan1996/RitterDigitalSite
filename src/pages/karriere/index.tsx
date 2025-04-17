// src/pages/karriere/index.tsx
import Head from 'next/head';
import React, { useRef } from 'react';

import { SEO } from '@/components/common/seo';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

import { Hero, JobListings, Benefits, ApplicationProcess } from './components';

export default function KarrierePage() {
  // Referenz für das Scrollen zu den Stellenangeboten
  const jobListingsRef = useRef<HTMLDivElement>(null);

  const scrollToJobs = () => {
    jobListingsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Karriere"
        description="Entdecken Sie Karrieremöglichkeiten bei der Ritter Digital GmbH und werden Sie Teil unseres innovativen Teams."
        pageType="karriere"
      />

      {/* Hero-Sektion */}
      <Hero scrollToJobs={scrollToJobs} />

      {/* Benefits */}
      <Benefits />

      {/* Stellenangebote */}
      <div ref={jobListingsRef}>
        <JobListings />
      </div>

      {/* Bewerbungsprozess */}
      <ApplicationProcess />

      {/* Call-to-Action */}
      <section className="bg-accent py-16 text-white">
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-2xl">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Bereit, Ihre Karriere bei uns zu starten?
              </h2>
              <p className="text-lg text-white/90">
                Wir suchen talentierte Mitarbeiter, die unsere Leidenschaft für innovative digitale
                Lösungen teilen. Bewerben Sie sich jetzt und werden Sie Teil unseres Teams!
              </p>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="whitespace-nowrap border-white text-white hover:bg-white hover:text-accent"
              onClick={scrollToJobs}
            >
              Zu den Stellenangeboten
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {},
  };
}
