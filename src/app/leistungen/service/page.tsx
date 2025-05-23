// Option 1: Als Utility-Datei (empfohlen)
// lib/service-components.ts oder components/leistungen/service/index.ts

import { ServiceBenefits } from '@/components/leistungen/service/ServiceBenefits';
import { ServiceDetails } from '@/components/leistungen/service/ServiceDetails';
import { ServiceFeatures } from '@/components/leistungen/service/ServiceFeatures';
import { ServiceHero } from '@/components/leistungen/service/ServiceHero';
import { ServiceCTA } from '@/components/leistungen/ServiceCTA';

// Exportiere alle Service-Komponenten für einfachere Imports
export {
  ServiceHero,
  ServiceDetails,
  ServiceFeatures,
  ServiceBenefits,
  ServiceCTA,
};

// ============================================================================

// Option 2: Als Page-Komponente (falls Route /leistungen/service gewünscht)
// app/leistungen/service/page.tsx

import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unsere Services | Ritter Digital GmbH',
  description: 'Übersicht über alle Serviceleistungen von Ritter Digital - von Digitalisierung bis Künstliche Intelligenz.',
};

export default function Page() {
  const services = [
    {
      title: 'Digitalisierung',
      description: 'Optimierte Prozesse für maximale Effizienz und Wachstum',
      href: '/leistungen/digitalisierung',
      icon: '🔄',
    },
    {
      title: 'Künstliche Intelligenz',
      description: 'Smarte Technologien für Ihren Geschäftserfolg',
      href: '/leistungen/kuenstliche-intelligenz',
      icon: '🧠',
    },
    // Weitere Services können hier hinzugefügt werden
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Unsere Services
        </h1>
        <p className="text-lg text-secondary max-w-2xl mx-auto">
          Entdecken Sie unser umfassendes Leistungsspektrum für Ihre digitale Transformation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold text-primary mb-2">
              {service.title}
            </h2>
            <p className="text-secondary">
              {service.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}