'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
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
  title: string;
  description: string;
}

interface ServiceBenefitsProps {
  title?: string;
  benefits: Benefit[];
  className?: string;
}

export const ServiceBenefits: React.FC<ServiceBenefitsProps> = ({
  title = 'Vorteile unserer Lösung',
  benefits = [],
  className,
}) => {
  if (!benefits || benefits.length === 0) {
    return null; // Keine Darstellung, wenn keine Benefits vorhanden sind
  }

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

  // Hover animation for benefit items
  const benefitItemVariants = {
    initial: { x: 0 },
    hover: {
      x: 5,
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  return (
    <section
      id="benefits"
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{ backgroundColor: 'white' }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute right-0 top-0 h-full w-1/2"
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
          className="absolute right-[10%] top-[15%] h-24 w-24 rounded-full"
          style={{ backgroundColor: `${colors.accent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[15%] left-[8%] h-32 w-32 rounded-full"
          style={{ backgroundColor: `${colors.secondaryAccent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <Container className="relative z-10 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
          className="mb-16"
        >
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-medium tracking-tight text-[#1A2027] md:text-4xl">
              {title}
              <span className="text-[#FF7A35]">.</span>
            </h2>
          </div>

          {/* Decorative accent line */}
          <motion.div
            className="mx-auto mt-4 h-1 w-16 rounded-full"
            style={{ backgroundColor: colors.accent }}
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group flex"
              variants={itemVariants}
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                className="mr-4 mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FF7A35]/10 text-[#FF7A35]"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,122,53,0.2)' }}
              >
                <Check className="h-5 w-5" />
              </motion.div>
              <motion.div variants={benefitItemVariants}>
                <h3 className="mb-2 text-xl font-medium text-[#1A2027]">{benefit.title}</h3>
                <p className="text-[#3D5A73]">{benefit.description}</p>
              </motion.div>
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

export default ServiceBenefits;
