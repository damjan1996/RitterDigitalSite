'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] to-white py-24">
      {/* Decorative elements */}
      <motion.div
        className="absolute left-0 top-0 h-1 w-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #FF7A35 50%, transparent 100%)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <motion.div
        className="absolute -left-20 top-40 h-64 w-64 rounded-full bg-[#3D5A73]/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />

      <motion.div
        className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#FF7A35]/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.7 }}
      />

      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <motion.div
          ref={containerRef}
          className="mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="mb-16 text-center" variants={titleVariants}>
            <motion.div
              className="mx-auto mb-4 h-1 w-16 bg-gradient-to-r from-[#FF7A35] to-[#FF9A65]"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <h2 className="bg-gradient-to-r from-[#1A2027] to-[#3D5A73] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              Unsere Leistungsbereiche
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </motion.div>
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
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        'group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-500',
        'flex h-full flex-col border border-[#3D5A73]/10 hover:shadow-lg hover:shadow-[#FF7A35]/10'
      )}
    >
      {/* Accent line */}
      <motion.div
        className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#FF7A35] to-[#FF9A65] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
      />

      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2027]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Image
          src={service.imageUrl || '/placeholder.svg'}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-grow flex-col p-8">
        <h3 className="mb-4 text-2xl font-semibold text-[#1A2027]">
          <span className="relative">
            {service.title}
            <motion.span
              className="absolute -left-4 top-1/2 h-6 w-1 -translate-y-1/2 bg-[#FF7A35] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              initial={{ height: 0 }}
              whileInView={{ height: 24 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            />
          </span>
        </h3>

        <p className="mb-8 flex-grow text-[#3D5A73]/80">{service.description}</p>

        <Link href={service.link} className="mt-auto">
          <Button
            variant="ghost"
            className="group relative overflow-hidden rounded-full border border-[#1A2027] px-6 py-5 text-[#1A2027] transition-all duration-300 hover:border-transparent hover:text-white"
          >
            <span className="relative z-10 flex items-center">
              <span>Mehr erfahren</span>
              <motion.div
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                initial={{ x: -5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </span>
            <motion.div
              className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-r from-[#1A2027] to-[#2A3F56] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceOverview;
