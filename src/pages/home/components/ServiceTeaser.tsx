'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BrainCircuit, Code, Database } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

// Refined color palette - consistent with Hero.tsx
const colors = {
  primary: '#1A2027', // Darker primary for better contrast
  secondary: '#3D5A73', // Richer secondary color
  accent: '#FF7A35', // Warmer accent for better visibility
  background: '#F8F9FC', // Lighter background for better contrast
  secondaryAccent: '#2A3F56', // Deeper secondary accent
};

// Service interface definition
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
  iconBgColor?: string;
}

interface ServiceTeaserProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
  className?: string;
}

// Default services data
const defaultServices: Service[] = [
  {
    id: 'software-entwicklung',
    title: 'Softwareentwicklung',
    description: 'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse.',
    icon: <Code className="h-6 w-6" style={{ color: '#1A2027' }} />,
    slug: '/leistungen/softwareentwicklung',
    iconBgColor: '#E5E7EB',
  },
  {
    id: 'business-intelligence',
    title: 'Business Intelligence',
    description: 'Datenbasierte Entscheidungsfindung für strategische Vorteile.',
    icon: <BarChart3 className="h-6 w-6" style={{ color: '#1A2027' }} />,
    slug: '/leistungen/business-intelligence',
    iconBgColor: '#E5E7EB',
  },
  {
    id: 'data-warehouse',
    title: 'Data Warehouse',
    description: 'Zentrale Datenverwaltung für effiziente Analysen.',
    icon: <Database className="h-6 w-6" style={{ color: '#1A2027' }} />,
    slug: '/leistungen/data-warehouse',
    iconBgColor: '#E5E7EB',
  },
  {
    id: 'kuenstliche-intelligenz',
    title: 'Künstliche Intelligenz',
    description: 'Intelligente Automatisierung und Optimierung.',
    icon: <BrainCircuit className="h-6 w-6" style={{ color: '#FF7A35' }} />,
    slug: '/leistungen/kuenstliche-intelligenz',
    iconBgColor: '#FFECE3',
  },
];

// Animation variants
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  title: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  button: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.6,
      },
    },
  },
};

export const ServiceTeaser: React.FC<ServiceTeaserProps> = ({
  title = 'Entfalten Sie das volle Potenzial Ihrer Digitalisierung',
  subtitle = 'MASSGESCHNEIDERTE LÖSUNGEN FÜR DIGITALE HERAUSFORDERUNGEN',
  services = [],
  className,
}) => {
  // Use default services if none provided
  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section className={cn('py-16 md:py-24', className)} style={{ backgroundColor: 'white' }}>
      <Container className="max-w-6xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={animations.title}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#3D5A73]">
            {subtitle}
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-medium tracking-tight text-[#1A2027] md:text-4xl">
            {title}
          </h2>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={animations.container}
        >
          {displayServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* "All services" button */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.button}
        >
          <Link href="/leistungen">
            <Button
              variant="outline"
              className="rounded-full border-[#E5E7EB] px-8 py-6 font-medium text-[#1A2027] transition-all duration-300 hover:border-[#1A2027]"
              size="lg"
            >
              Alle Leistungen entdecken
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

// Extract ServiceCard as a separate component for better readability
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <motion.div variants={animations.item}>
      <Link href={service.slug} className="group">
        <div
          className="flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-white p-8 transition-all duration-300 hover:border-[#1A2027]/20 hover:shadow-sm"
          style={{
            backgroundImage: "url('/subtle-pattern.png')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="mb-6 flex items-start gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-md"
              style={{ backgroundColor: service.iconBgColor || '#E5E7EB' }}
            >
              {service.icon}
            </div>
            <div>
              <h3 className="mb-2 text-xl font-medium text-[#1A2027]">{service.title}</h3>
              <p className="text-base text-[#3D5A73]">{service.description}</p>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-2 text-[#3D5A73] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-sm font-medium">Mehr erfahren</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceTeaser;
