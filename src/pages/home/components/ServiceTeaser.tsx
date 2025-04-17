// src/pages/home/components/ServiceTeaser.tsx
import { motion } from 'framer-motion';
import { ArrowRight, Database, Code, BarChart3, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { SectionTitle } from '@/components/common/section-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SERVICES } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Farbdefinitionen aus dem Farbschema - konsistent mit Hero.tsx
const colors = {
  primary: '#23282D', // Primarna boja za strukturiranje
  secondary: '#50697D', // Glavna boja za pozadinske
  accent: '#FF8A4C', // Akcentna boja za isticanje
  background: '#F4F5F8', // Osnovna boja za pozadinu
  secondaryAccent: '#3A4F66', // Sekundarna akcentna boja
};

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
  image?: string;
}

interface ServiceTeaserProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
  className?: string;
}

export const ServiceTeaser: React.FC<ServiceTeaserProps> = ({
  title = 'Unsere Leistungen',
  subtitle = 'Maßgeschneiderte digitale Lösungen für Ihr Unternehmen',
  services = [],
  className,
}) => {
  // Default-Services verwenden, wenn keine angegeben wurden
  const displayServices =
    services.length > 0
      ? services
      : [
          {
            id: 'business-intelligence',
            title: 'Business Intelligence',
            description: 'Datenbasierte Entscheidungsfindung für strategische Vorteile.',
            icon: <BarChart3 className="h-8 w-8 text-[#FF8A4C]" />,
            slug: '/leistungen/business-intelligence',
            image: '/images/services/business-intelligence.jpg',
          },
          {
            id: 'data-warehouse',
            title: 'Data Warehouse',
            description: 'Zentrale Datenverwaltung für effiziente Analysen.',
            icon: <Database className="h-8 w-8 text-[#3A4F66]" />,
            slug: '/leistungen/data-warehouse',
            image: '/images/services/data-warehouse.jpg',
          },
          {
            id: 'softwareentwicklung',
            title: 'Softwareentwicklung',
            description: 'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse.',
            icon: <Code className="h-8 w-8 text-[#FF8A4C]" />,
            slug: '/leistungen/softwareentwicklung',
            image: '/images/services/software-development.jpg',
          },
          {
            id: 'kuenstliche-intelligenz',
            title: 'Künstliche Intelligenz',
            description: 'Intelligente Automatisierung und Optimierung.',
            icon: <BrainCircuit className="h-8 w-8 text-[#3A4F66]" />,
            slug: '/leistungen/kuenstliche-intelligenz',
            image: '/images/services/artificial-intelligence.jpg',
          },
        ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
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
  };

  return (
    <section className={cn('bg-white py-16 md:py-24', className)}>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
        >
          <SectionTitle title={title} subtitle={subtitle} align="center" className="mb-12" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {displayServices.map((service, index) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card className="h-full overflow-hidden border border-[#F4F5F8] shadow-sm transition-all duration-500 hover:shadow-lg">
                <motion.div
                  className="relative h-48 w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  {service.image ? (
                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#F4F5F8]">
                      {service.icon}
                    </div>
                  )}
                  {/* Subtiler Overlay-Effekt */}
                  <div className="absolute inset-0 bg-[#23282D] bg-opacity-0 transition-all duration-300 hover:bg-opacity-5" />

                  {/* Subtiler Farbakzent in der Ecke */}
                  <div
                    className={`absolute right-0 top-0 h-1 w-12 ${index % 2 === 0 ? 'bg-[#FF8A4C]' : 'bg-[#3A4F66]'}`}
                  ></div>
                </motion.div>

                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`rounded-full ${index % 2 === 0 ? 'bg-[#FF8A4C]/10' : 'bg-[#3A4F66]/10'} mt-1 p-3`}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor:
                          index % 2 === 0 ? 'rgba(255, 138, 76, 0.2)' : 'rgba(58, 79, 102, 0.2)',
                        transition: { duration: 0.3 },
                      }}
                    >
                      {service.icon}
                    </motion.div>

                    <div>
                      <motion.h3
                        className="mb-2 text-xl font-bold text-[#23282D]"
                        whileHover={{
                          x: 3,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {service.title}
                      </motion.h3>

                      <p className="mb-4 text-[#50697D]">{service.description}</p>

                      <Link href={service.slug} className="inline-block">
                        <motion.div
                          className="group relative"
                          whileHover={{ x: 3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="ghost"
                            className={`h-auto p-0 ${index % 2 === 0 ? 'text-[#FF8A4C]' : 'text-[#3A4F66]'} hover:text-[#23282D]`}
                          >
                            <span className="relative inline-block">
                              Mehr erfahren
                              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
                            </span>
                            <motion.span
                              className="ml-2 inline-flex"
                              animate={{ x: [0, 3, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'easeInOut',
                              }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.span>
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={buttonVariants}
        >
          <Link href="/leistungen">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="default"
                size="lg"
                className="rounded-none bg-[#23282D] px-8 py-3 font-normal text-white transition-all duration-300 hover:bg-[#3A4F66]"
              >
                Alle Leistungen entdecken
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default ServiceTeaser;
