// src/pages/ueber-uns/components/CompanyHistory.tsx
import React from 'react';
import Image from 'next/image';

// Meilensteine in der Unternehmensgeschichte
const milestones = [
    {
        year: 2005,
        title: 'Gründung der Ritter Digital GmbH',
        description: 'Die Ritter Digital GmbH wurde von Hans Ritter mit der Vision gegründet, kleinen und mittelständischen Unternehmen bei der Digitalisierung zu unterstützen.',
        image: '/images/about/founding.jpg'
    },
    {
        year: 2008,
        title: 'Spezialisierung auf E-Commerce',
        description: 'Mit dem Aufkommen neuer E-Commerce-Plattformen begann unsere Spezialisierung auf digitale Handelslösungen und Prozessoptimierung.',
        image: '/images/about/ecommerce.jpg'
    },
    {
        year: 2012,
        title: 'Expansion des Dienstleistungsportfolios',
        description: 'Wir erweiterten unser Angebot um Business Intelligence und Datenanalyse-Lösungen, um unseren Kunden noch tiefere Einblicke in ihre Geschäftsprozesse zu ermöglichen.',
        image: '/images/about/expansion.jpg'
    },
    {
        year: 2016,
        title: 'Internationalisierung',
        description: 'Mit der Gewinnung erster internationaler Kunden begann unsere Expansion über den deutschsprachigen Raum hinaus.',
        image: '/images/about/international.jpg'
    },
    {
        year: 2020,
        title: 'Entwicklung KI-basierter Lösungen',
        description: 'Wir begannen mit der Integration künstlicher Intelligenz in unsere Dienstleistungen, um noch innovativere und effizientere Lösungen anzubieten.',
        image: '/images/about/ai-solutions.jpg'
    },
    {
        year: 2024,
        title: 'Heute',
        description: 'Heute ist die Ritter Digital GmbH ein etablierter Partner für digitale Transformation mit über 90 zufriedenen Kunden weltweit und einem vielfältigen Portfolio an maßgeschneiderten Lösungen.',
        image: '/images/about/today.jpg'
    },
];

export const CompanyHistory: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-6 text-center">Unsere Geschichte</h2>
                <p className="text-lg text-secondary mb-12 max-w-3xl mx-auto text-center">
                    Seit über 20 Jahren unterstützen wir Unternehmen bei ihrer digitalen Transformation. Hier sind einige wichtige Meilensteine auf unserem Weg.
                </p>

                <div className="space-y-16">
                    {milestones.map((milestone, index) => (
                        <div
                            key={milestone.year}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                        >
                            <div className="w-full md:w-1/2">
                                <div className="relative overflow-hidden rounded-lg shadow-md">
                                    <div className="aspect-[4/3]">
                                        <Image
                                            src={milestone.image}
                                            alt={milestone.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Year Badge */}
                                    <div className="absolute top-4 left-4 bg-accent text-white font-bold py-1 px-3 rounded-full">
                                        {milestone.year}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2">
                                <h3 className="text-2xl font-semibold text-primary mb-3">
                                    {milestone.title}
                                </h3>
                                <p className="text-secondary">
                                    {milestone.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};