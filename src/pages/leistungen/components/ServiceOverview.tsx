// src/pages/leistungen/components/ServiceOverview.tsx
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Definiere die Services
const services = [
  {
    id: 'business-intelligence',
    title: 'Business Intelligence',
    description:
      'Business Intelligence ist die Grundlage für das Sammeln von Daten in Ihrem Unternehmen. Über übersichtliche Dashboards, die direkt an Ihre Datenbank angebunden sind, erhalten Sie Echtzeit-Zugriff auf entscheidende Kennzahlen.',
    imageUrl: '/images/services/business-intelligence.jpg',
    link: '/leistungen/business-intelligence',
  },
  {
    id: 'data-warehouse',
    title: 'Data Warehouse',
    description:
      'Ein Data Warehouse bildet die zentrale Datenplattform Ihres Unternehmens. Hier werden Daten aus verschiedenen Quellen zusammengeführt, bereinigt und für Analysen optimiert, um fundierte Geschäftsentscheidungen zu ermöglichen.',
    imageUrl: '/images/services/data-warehouse.jpg',
    link: '/leistungen/data-warehouse',
  },
  {
    id: 'softwareentwicklung',
    title: 'Softwareentwicklung',
    description:
      'Wir entwickeln maßgeschneiderte Softwarelösungen, die genau auf Ihre Geschäftsprozesse zugeschnitten sind. Von Webapplikationen bis hin zu komplexen Backend-Systemen – wir setzen Ihre individuellen Anforderungen um.',
    imageUrl: '/images/services/software-development.jpg',
    link: '/leistungen/softwareentwicklung',
  },
  {
    id: 'kuenstliche-intelligenz',
    title: 'Künstliche Intelligenz',
    description:
      'KI-gestützte Lösungen optimieren Ihre Prozesse und erschließen neue Geschäftspotenziale. Wir integrieren moderne KI-Technologien wie maschinelles Lernen und predictive Analytics in Ihre bestehenden Systeme.',
    imageUrl: '/images/services/artificial-intelligence.jpg',
    link: '/leistungen/kuenstliche-intelligenz',
  },
];

export const ServiceOverview: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary">
          Unsere Leistungsbereiche
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div
      className={cn(
        'group overflow-hidden rounded-lg bg-background shadow-sm transition-all duration-300 hover:shadow-md',
        'flex h-full flex-col'
      )}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-grow flex-col p-6">
        <h3 className="mb-3 text-xl font-semibold text-primary">{service.title}</h3>

        <p className="mb-6 flex-grow text-secondary">{service.description}</p>

        <Link href={service.link} className="mt-auto">
          <Button variant="default" className="flex w-full items-center justify-center">
            <span>Mehr erfahren</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceOverview;
