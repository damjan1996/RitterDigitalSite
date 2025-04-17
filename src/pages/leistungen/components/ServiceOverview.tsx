// src/pages/leistungen/components/ServiceOverview.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

// Definiere die Services
const services = [
    {
        id: 'business-intelligence',
        title: 'Business Intelligence',
        description: 'Business Intelligence ist die Grundlage für das Sammeln von Daten in Ihrem Unternehmen. Über übersichtliche Dashboards, die direkt an Ihre Datenbank angebunden sind, erhalten Sie Echtzeit-Zugriff auf entscheidende Kennzahlen.',
        imageUrl: '/images/services/business-intelligence.jpg',
        link: '/leistungen/business-intelligence'
    },
    {
        id: 'data-warehouse',
        title: 'Data Warehouse',
        description: 'Ein Data Warehouse bildet die zentrale Datenplattform Ihres Unternehmens. Hier werden Daten aus verschiedenen Quellen zusammengeführt, bereinigt und für Analysen optimiert, um fundierte Geschäftsentscheidungen zu ermöglichen.',
        imageUrl: '/images/services/data-warehouse.jpg',
        link: '/leistungen/data-warehouse'
    },
    {
        id: 'softwareentwicklung',
        title: 'Softwareentwicklung',
        description: 'Wir entwickeln maßgeschneiderte Softwarelösungen, die genau auf Ihre Geschäftsprozesse zugeschnitten sind. Von Webapplikationen bis hin zu komplexen Backend-Systemen – wir setzen Ihre individuellen Anforderungen um.',
        imageUrl: '/images/services/software-development.jpg',
        link: '/leistungen/softwareentwicklung'
    },
    {
        id: 'kuenstliche-intelligenz',
        title: 'Künstliche Intelligenz',
        description: 'KI-gestützte Lösungen optimieren Ihre Prozesse und erschließen neue Geschäftspotenziale. Wir integrieren moderne KI-Technologien wie maschinelles Lernen und predictive Analytics in Ihre bestehenden Systeme.',
        imageUrl: '/images/services/artificial-intelligence.jpg',
        link: '/leistungen/kuenstliche-intelligenz'
    }
];

export const ServiceOverview: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-12 text-center">
                    Unsere Leistungsbereiche
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
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
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
    return (
        <div className={cn(
            "group bg-background rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md",
            "flex flex-col h-full"
        )}>
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-primary mb-3">
                    {service.title}
                </h3>

                <p className="text-secondary mb-6 flex-grow">
                    {service.description}
                </p>

                <Link href={service.link} className="mt-auto">
                    <Button variant="accent" className="w-full flex items-center justify-center">
                        <span>Mehr erfahren</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};