// src/pages/ueber-uns/components/CompanyHistory.tsx
import Image from 'next/image';
import React from 'react';

// Meilensteine in der Unternehmensgeschichte
const milestones = [
  {
    year: 2005,
    title: 'Gründung der Ritter Digital GmbH',
    description:
      'Die Ritter Digital GmbH wurde von Hans Ritter mit der Vision gegründet, kleinen und mittelständischen Unternehmen bei der Digitalisierung zu unterstützen.',
    image: '/images/about/founding.jpg',
  },
  {
    year: 2008,
    title: 'Spezialisierung auf E-Commerce',
    description:
      'Mit dem Aufkommen neuer E-Commerce-Plattformen begann unsere Spezialisierung auf digitale Handelslösungen und Prozessoptimierung.',
    image: '/images/about/ecommerce.jpg',
  },
  {
    year: 2012,
    title: 'Expansion des Dienstleistungsportfolios',
    description:
      'Wir erweiterten unser Angebot um Business Intelligence und Datenanalyse-Lösungen, um unseren Kunden noch tiefere Einblicke in ihre Geschäftsprozesse zu ermöglichen.',
    image: '/images/about/expansion.jpg',
  },
  {
    year: 2016,
    title: 'Internationalisierung',
    description:
      'Mit der Gewinnung erster internationaler Kunden begann unsere Expansion über den deutschsprachigen Raum hinaus.',
    image: '/images/about/international.jpg',
  },
  {
    year: 2020,
    title: 'Entwicklung KI-basierter Lösungen',
    description:
      'Wir begannen mit der Integration künstlicher Intelligenz in unsere Dienstleistungen, um noch innovativere und effizientere Lösungen anzubieten.',
    image: '/images/about/ai-solutions.jpg',
  },
  {
    year: 2024,
    title: 'Heute',
    description:
      'Heute ist die Ritter Digital GmbH ein etablierter Partner für digitale Transformation mit über 90 zufriedenen Kunden weltweit und einem vielfältigen Portfolio an maßgeschneiderten Lösungen.',
    image: '/images/about/today.jpg',
  },
];

export const CompanyHistory: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-primary">Unsere Geschichte</h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-secondary">
          Seit über 20 Jahren unterstützen wir Unternehmen bei ihrer digitalen Transformation. Hier
          sind einige wichtige Meilensteine auf unserem Weg.
        </p>

        <div className="space-y-16">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
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
                  <div className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 font-bold text-white">
                    {milestone.year}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <h3 className="mb-3 text-2xl font-semibold text-primary">{milestone.title}</h3>
                <p className="text-secondary">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
