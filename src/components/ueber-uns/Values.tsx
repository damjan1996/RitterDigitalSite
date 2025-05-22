'use client';

import { motion } from 'framer-motion';
import {
  Lightbulb,
  Handshake,
  BarChart,
  ShieldCheck,
  RefreshCw,
  Users,
} from 'lucide-react';
import type React from 'react';
import type { ElementType } from 'react';

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

// Unternehmenswerte
const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Wir streben danach, stets an der Spitze technologischer Entwicklungen zu stehen und diese für unsere Kunden nutzbar zu machen.',
  },
  {
    icon: Handshake,
    title: 'Partnerschaft',
    description:
      'Wir sehen uns als langfristigen Partner unserer Kunden und arbeiten gemeinsam an ihrem nachhaltigen Erfolg.',
  },
  {
    icon: BarChart,
    title: 'Exzellenz',
    description:
      'Wir setzen höchste Qualitätsstandards in allen Bereichen unserer Arbeit und streben stets nach herausragenden Ergebnissen.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrität',
    description:
      'Wir handeln ehrlich, transparent und ethisch in allen geschäftlichen Beziehungen und Entscheidungen.',
  },
  {
    icon: RefreshCw,
    title: 'Agilität',
    description:
      'Wir passen uns schnell an sich ändernde Marktbedingungen an und entwickeln flexible Lösungen für die Herausforderungen unserer Kunden.',
  },
  {
    icon: Users,
    title: 'Kundenorientierung',
    description:
      'Der Erfolg unserer Kunden steht im Mittelpunkt all unserer Aktivitäten. Ihre Zufriedenheit ist unser wichtigstes Ziel.',
  },
];

interface ValuesProps {
  className?: string;
}

export const Values: React.FC<ValuesProps> = ({ className }) => {
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
      id='values'
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{ backgroundColor: colors.background }}
    >
      {/* Background decorative elements */}
      <div className='absolute inset-0 h-full w-full'>
        <motion.div
          className='absolute right-0 top-0 h-full w-1/2'
          style={{
            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 10% 100%)',
            backgroundColor: 'white',
            opacity: 0.7,
          }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className='absolute right-[10%] top-[15%] h-24 w-24 rounded-full'
          style={{ backgroundColor: `${colors.accent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className='absolute bottom-[15%] left-[8%] h-32 w-32 rounded-full'
          style={{ backgroundColor: `${colors.secondaryAccent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <Container className='relative z-10 max-w-6xl'>
        {/* Section header */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
          className='mb-16 text-center'
        >
          <h2 className='mx-auto max-w-3xl text-3xl font-medium tracking-tight text-[#1A2027] md:text-4xl'>
            Unsere Werte
            <span className='text-[#FF7A35]'>.</span>
          </h2>
          <p className='mx-auto mt-4 max-w-3xl text-lg text-[#3D5A73]'>
            Diese Grundprinzipien leiten unser tägliches Handeln und definieren
            die Art und Weise, wie wir mit unseren Kunden, Partnern und
            Mitarbeitern zusammenarbeiten.
          </p>

          {/* Decorative accent line */}
          <motion.div
            className='mx-auto mt-6 h-1 w-16 rounded-full'
            style={{ backgroundColor: colors.accent }}
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} />
          ))}
        </motion.div>
      </Container>

      {/* Animated background elements */}
      <motion.div
        className='absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-[#FF7A35]/5'
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
        className='absolute -top-20 right-20 h-40 w-40 rounded-full bg-[#3D5A73]/5'
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

interface ValueCardProps {
  value: {
    icon: ElementType;
    title: string;
    description: string;
  };
  index: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ value, index }) => {
  const Icon = value.icon;

  return (
    <motion.div
      className='group relative overflow-hidden rounded-lg border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:border-[#1A2027]/20 hover:shadow-lg'
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.1, ease: 'easeOut' },
        },
      }}
      whileHover={{
        y: -5,
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        transition: { duration: 0.3 },
      }}
    >
      <div
        className='mb-6 flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110'
        style={{
          backgroundColor: index % 2 === 0 ? '#FF7A35/10' : '#3D5A73/10',
        }}
      >
        <Icon
          className='h-6 w-6'
          style={{ color: index % 2 === 0 ? '#FF7A35' : '#3D5A73' }}
        />
      </div>

      <h3 className='mb-3 text-xl font-medium text-[#1A2027]'>{value.title}</h3>
      <p className='text-[#3D5A73]'>{value.description}</p>
    </motion.div>
  );
};

export default Values;
