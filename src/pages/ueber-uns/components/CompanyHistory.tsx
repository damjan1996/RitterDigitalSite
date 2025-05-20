'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

// Refined color palette - consistent with other components
const colors = {
  primary: '#1A2027', // Darker primary for better contrast
  secondary: '#3D5A73', // Richer secondary color
  accent: '#FF7A35', // Warmer accent for better visibility
  background: '#F8F9FC', // Lighter background for better contrast
  secondaryAccent: '#2A3F56', // Deeper secondary accent
};

// Meilensteine in der Unternehmensgeschichte
const milestones = [
  {
    year: 2005,
    title: 'Gründung der Ritter Digital GmbH',
    description:
      'Die Ritter Digital GmbH wurde von Hans Ritter mit der Vision gegründet, kleinen und mittelständischen Unternehmen bei der Digitalisierung zu unterstützen.',
    image: '/images/founding.jpg',
  },
  {
    year: 2008,
    title: 'Spezialisierung auf E-Commerce',
    description:
      'Mit dem Aufkommen neuer E-Commerce-Plattformen begann unsere Spezialisierung auf digitale Handelslösungen und Prozessoptimierung.',
    image: '/images/onlineretail.jpg',
  },
  {
    year: 2012,
    title: 'Expansion des Dienstleistungsportfolios',
    description:
      'Wir erweiterten unser Angebot um Business Intelligence und Datenanalyse-Lösungen, um unseren Kunden noch tiefere Einblicke in ihre Geschäftsprozesse zu ermöglichen.',
    image: '/images/expansion.jpg',
  },
  {
    year: 2016,
    title: 'Internationalisierung',
    description:
      'Mit der Gewinnung erster internationaler Kunden begann unsere Expansion über den deutschsprachigen Raum hinaus.',
    image: '/images/internationalisation.jpg',
  },
  {
    year: 2020,
    title: 'Entwicklung KI-basierter Lösungen',
    description:
      'Wir begannen mit der Integration künstlicher Intelligenz in unsere Dienstleistungen, um noch innovativere und effizientere Lösungen anzubieten.',
    image: '/images/implementingai.jpg',
  },
  {
    year: 2024,
    title: 'Heute',
    description:
      'Heute ist die Ritter Digital GmbH ein etablierter Partner für digitale Transformation mit über 90 zufriedenen Kunden weltweit und einem vielfältigen Portfolio an maßgeschneiderten Lösungen.',
    image: '/images/largeoffice.jpg',
  },
];

interface CompanyHistoryProps {
  className?: string;
}

export const CompanyHistory: React.FC<CompanyHistoryProps> = ({ className }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <section
      id="history"
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{ backgroundColor: 'white' }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2"
          style={{
            clipPath: 'polygon(0 0, 90% 0, 70% 100%, 0 100%)',
            backgroundColor: colors.background,
            opacity: 0.5,
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute left-[10%] top-[15%] h-24 w-24 rounded-full"
          style={{ backgroundColor: `${colors.accent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[15%] right-[8%] h-32 w-32 rounded-full"
          style={{ backgroundColor: `${colors.secondaryAccent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <Container className="relative z-10 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
          className="mb-16 text-center"
        >
          <h2 className="mx-auto max-w-3xl text-3xl font-medium tracking-tight text-[#1A2027] md:text-4xl">
            Unsere Geschichte
            <span className="text-[#FF7A35]">.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[#3D5A73]">
            Seit über 20 Jahren unterstützen wir Unternehmen bei ihrer digitalen Transformation.
            Hier sind einige wichtige Meilensteine auf unserem Weg.
          </p>

          {/* Decorative accent line */}
          <motion.div
            className="mx-auto mt-6 h-1 w-16 rounded-full"
            style={{ backgroundColor: colors.accent }}
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className="space-y-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className={`flex flex-col items-center gap-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              variants={itemVariants}
            >
              <div className="w-full md:w-1/2">
                <motion.div
                  className="relative overflow-hidden rounded-lg bg-white p-4 shadow-lg"
                  whileHover={{
                    y: -5,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Decorative elements */}
                  <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-bl from-[#FF7A35]/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 h-16 w-16 bg-gradient-to-tr from-[#3D5A73]/10 to-transparent" />

                  <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src={milestone.image || '/placeholder.svg'}
                      alt={milestone.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Year Badge */}
                  <motion.div
                    className="absolute -left-2 -top-2 rounded-lg bg-[#FF7A35] px-4 py-2 font-bold text-white shadow-md"
                    whileHover={{
                      y: -3,
                      boxShadow: '0 10px 25px rgba(255,122,53,0.3)',
                      transition: { duration: 0.2 },
                    }}
                  >
                    {milestone.year}
                  </motion.div>
                </motion.div>
              </div>

              <div className="w-full md:w-1/2">
                <motion.div className="relative mb-4" whileHover={{ x: index % 2 === 0 ? 5 : -5 }}>
                  <motion.div
                    className={`absolute ${
                      index % 2 === 0 ? '-left-3' : '-right-3'
                    } top-1/2 h-12 w-1.5 -translate-y-1/2 bg-gradient-to-b from-[#FF7A35] to-[#FF7A35]/30`}
                    initial={{ height: 0 }}
                    whileInView={{ height: '3rem' }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                  <h3 className="text-2xl font-medium text-[#1A2027]">
                    {milestone.title}
                    <span className="text-[#FF7A35]">.</span>
                  </h3>
                </motion.div>
                <p className="text-lg text-[#3D5A73]">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Animated background elements */}
      <motion.div
        className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-[#FF7A35]/5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className="absolute -top-20 right-20 h-40 w-40 rounded-full bg-[#3D5A73]/5"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          delay: 1,
        }}
      />
    </section>
  );
};

export default CompanyHistory;
