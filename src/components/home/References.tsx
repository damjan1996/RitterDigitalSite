'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

// Define colors locally to avoid import issues
const colors = {
  primary: '#23282D',
  secondary: '#50697D',
  accent: '#FF7A35',
  background: '#FFFFFF',
  backgroundAlt: '#F8F9FC',
  muted: '#F8F9FC',
};

interface Reference {
  name: string;
  logo: string;
}

interface CaseStudy {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface ReferencesProps {
  title?: string;
  references?: Reference[];
  caseStudy?: CaseStudy;
  className?: string;
}

export const References: React.FC<ReferencesProps> = ({
  title = 'Vertraut von',
  references = [],
  caseStudy = {
    title: 'Erfolgreiche Projekte sprechen für uns',
    subtitle: 'VERTRAUEN WIRD DURCH ERGEBNISSE AUFGEBAUT',
    description:
      'Die digitale Transformation der Rudolf Flume Technik GmbH zeigt, wie wir Unternehmen zukunftsfähig machen. Durch maßgeschneiderte JTL-Lösungen und Business Intelligence Tools haben wir die Prozesse optimiert. Mit gesteigerter Effizienz konnte unser Kunde seine Marktposition ausbauen.',
    image: '/meeting-image.jpg',
  },
  className,
}) => {
  // Default references if none provided
  const displayReferences =
    references.length > 0
      ? references
      : [
          { name: 'GIS', logo: '/logos/gis-logo.png' },
          { name: 'LIN-IT', logo: '/logos/lin-it-logo.png' },
          { name: 'HOMA', logo: '/logos/homa-logo.png' },
          { name: 'RITTER', logo: '/logos/ritter-logo.png' },
          { name: 'FLUME TECHNIK', logo: '/logos/flume-technik-logo.png' },
        ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
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

  return (
    <section
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{ backgroundColor: colors.background }}
    >
      <Container className="relative z-10 max-w-6xl">
        {/* Logos Section */}
        <motion.div
          className="mb-24 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h3 className="mb-12 text-xl font-normal text-[#6B7280]" variants={titleVariants}>
            {title}
          </motion.h3>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {displayReferences.map((reference, index) => (
              <motion.div
                key={index}
                className="flex h-12 items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                {/* Logo placeholder */}
                <div className="h-8 w-32 text-center text-[#6B7280]">{reference.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="mx-auto mb-24 h-px w-full max-w-3xl bg-gray-200" />

        {/* Case Study Section */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left side: Image */}
          <motion.div
            className="relative w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-sm border border-gray-200">
              {/* Image */}
              <div className="aspect-[4/3] w-full">
                <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}>
                  <Image
                    src="/meeting-image.jpg"
                    alt="Team meeting"
                    width={600}
                    height={450}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right side: Content */}
          <motion.div
            className="w-full lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p
              className="mb-2 text-sm font-medium uppercase tracking-wider text-[#6B7280]"
              variants={itemVariants}
            >
              {caseStudy.subtitle}
            </motion.p>

            <motion.h2
              className="mb-6 text-3xl font-medium md:text-4xl"
              style={{ color: colors.primary }}
              variants={titleVariants}
            >
              {caseStudy.title}
            </motion.h2>

            <motion.p
              className="text-base leading-relaxed md:text-lg"
              style={{ color: colors.secondary }}
              variants={itemVariants}
            >
              {caseStudy.description}
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default References;
