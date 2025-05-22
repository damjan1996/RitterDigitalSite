'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  Coffee,
  Heart,
  Home,
  Laptop,
  GraduationCap,
  CalendarDays,
  Users,
} from 'lucide-react';
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

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BenefitsProps {
  title?: string;
  subtitle?: string;
  benefits?: Benefit[];
  className?: string;
}

export const Benefits: React.FC<BenefitsProps> = ({
  title = 'Vorteile bei Ritter Digital',
  subtitle = 'Neben spannenden Projekten und einem dynamischen Arbeitsumfeld bieten wir Ihnen zahlreiche weitere Benefits',
  benefits = [],
  className,
}) => {
  // Standard-Vorteile, falls keine angegeben wurden
  const defaultBenefits: Benefit[] = [
    {
      icon: <Clock className='h-6 w-6' />,
      title: 'Flexible Arbeitszeiten',
      description:
        'Gestalten Sie Ihre Arbeitszeit flexibel und vereinbaren Sie berufliche und private Verpflichtungen optimal.',
    },
    {
      icon: <Home className='h-6 w-6' />,
      title: 'Remote-Arbeit',
      description:
        'Arbeiten Sie teilweise oder vollständig von zu Hause aus - wir fördern ortsunabhängiges Arbeiten.',
    },
    {
      icon: <Laptop className='h-6 w-6' />,
      title: 'Moderne Ausstattung',
      description:
        'Wir stellen Ihnen hochwertige Hardware und Software zur Verfügung, damit Sie optimal arbeiten können.',
    },
    {
      icon: <GraduationCap className='h-6 w-6' />,
      title: 'Weiterbildung',
      description:
        'Regelmäßige interne und externe Schulungen und ein großzügiges Budget für Ihre persönliche Weiterentwicklung.',
    },
    {
      icon: <Coffee className='h-6 w-6' />,
      title: 'Kostenlose Getränke',
      description:
        'Genießen Sie kostenlose Getränke wie Kaffee, Tee und Wasser in unserem Büro.',
    },
    {
      icon: <Heart className='h-6 w-6' />,
      title: 'Gesundheitsangebote',
      description:
        'Wir bieten Zuschüsse zum Fitnessstudio und regelmäßige Gesundheitsaktionen an.',
    },
    {
      icon: <CalendarDays className='h-6 w-6' />,
      title: '30 Tage Urlaub',
      description:
        'Genießen Sie 30 Tage Urlaub pro Jahr, um Ihre Batterien wieder aufzuladen.',
    },
    {
      icon: <Users className='h-6 w-6' />,
      title: 'Team-Events',
      description:
        'Regelmäßige Team-Events und Feiern stärken den Zusammenhalt und sorgen für Spaß neben der Arbeit.',
    },
  ];

  const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits;

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
      id='benefits'
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{ backgroundColor: 'white' }}
    >
      {/* Background decorative elements */}
      <div className='absolute inset-0 h-full w-full'>
        <motion.div
          className='absolute right-0 top-0 h-full w-1/2'
          style={{
            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 10% 100%)',
            backgroundColor: colors.background,
            opacity: 0.5,
          }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.5 }}
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
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
          className='mb-16'
        >
          <div className='text-center'>
            <h2 className='mb-4 text-3xl font-medium tracking-tight text-[#1A2027] md:text-4xl'>
              {title}
              <span className='text-[#FF7A35]'>.</span>
            </h2>
            <p className='mx-auto max-w-3xl text-[#3D5A73]'>{subtitle}</p>
          </div>

          {/* Decorative accent line */}
          <motion.div
            className='mx-auto mt-4 h-1 w-16 rounded-full'
            style={{ backgroundColor: colors.accent }}
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {displayBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              className='group relative overflow-hidden rounded-lg border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:border-[#1A2027]/20 hover:shadow-lg'
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                transition: { duration: 0.3 },
              }}
            >
              {/* Decorative corner accent */}
              <motion.div
                className='absolute right-0 top-0 h-16 w-16'
                style={{
                  clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                  backgroundColor: index % 2 === 0 ? '#FF7A35' : '#3D5A73',
                  opacity: 0.05,
                }}
                whileHover={{ opacity: 0.1 }}
              />

              <div className='flex flex-col items-center text-center'>
                <motion.div
                  className='mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110'
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? '#FF7A35/10' : '#3D5A73/10',
                  }}
                >
                  <div
                    style={{ color: index % 2 === 0 ? '#FF7A35' : '#3D5A73' }}
                  >
                    {benefit.icon}
                  </div>
                </motion.div>

                <h3 className='mb-3 text-xl font-medium text-[#1A2027]'>
                  {benefit.title}
                </h3>
                <p className='text-[#3D5A73]'>{benefit.description}</p>
              </div>
            </motion.div>
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

export default Benefits;
