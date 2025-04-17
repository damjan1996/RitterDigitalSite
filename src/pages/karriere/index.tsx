// src/pages/karriere/index.tsx
import React, { useRef } from 'react';
import Head from 'next/head';
import {
    Hero,
    JobListings,
    Benefits,
    ApplicationProcess
} from './components';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/common/seo';

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
            <section className="py-16 bg-accent text-white">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Bereit, Ihre Karriere bei uns zu starten?
                            </h2>
                            <p className="text-white/90 text-lg">
                                Wir suchen talentierte Mitarbeiter, die unsere Leidenschaft für innovative digitale Lösungen teilen. Bewerben Sie sich jetzt und werden Sie Teil unseres Teams!
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
        props: {}
    };
}