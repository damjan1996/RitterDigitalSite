'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
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

interface BenefitItem {
  title: string;
}

interface BenefitsProps {
  title?: string;
  description?: string;
  benefits?: BenefitItem[];
  className?: string;
}

export const Benefits: React.FC<BenefitsProps> = ({
  title = 'Warum Unternehmen sich für Ritter Digital entscheiden',
  description = 'Als Geschäftsführer treffen Sie bessere Entscheidungen. Käufer optimieren den Bestand und automatisieren den Einkauf. Lageristen verbessern die Lieferketten.',
  benefits = [],
  className,
}) => {
  // Default benefits if none provided
  const displayBenefits =
    benefits.length > 0
      ? benefits
      : [
          {
            title: 'Fachkenntnisse in digitalen Prozessen',
          },
          {
            title: 'Angepasste Lösungen',
          },
          {
            title: 'Langfristige Partnerschaft',
          },
          {
            title: 'Entscheidungen auf der Grundlage von Daten treffen',
          },
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

  // Hover variants for benefit items
  const benefitItemVariants = {
    initial: { scale: 1, x: 0 },
    hover: {
      scale: 1.02,
      x: 5,
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  // Pulsing animation for check icons
  const checkIconVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.15, 1],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      },
    },
  };

  // Image hover effect
  const imageVariants = {
    initial: { filter: 'brightness(1)', scale: 1 },
    hover: {
      filter: 'brightness(1.1)',
      scale: 1.03,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.section
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{
        backgroundColor: colors.background,
        background: `linear-gradient(120deg, ${colors.background} 0%, ${colors.backgroundAlt} 50%, ${colors.background} 100%)`,
        backgroundSize: '200% 200%',
      }}
      initial="initial"
      whileHover="hover"
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%'],
        transition: { duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse' },
      }}
    >
      <Container className="relative z-10 max-w-6xl">
        <div className="flex flex-col items-start gap-16 lg:flex-row lg:gap-24">
          {/* Left side: Content */}
          <motion.div
            className="w-full lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="mb-6 text-3xl font-medium md:text-4xl"
              style={{ color: colors.primary }}
              variants={titleVariants}
            >
              {title}
            </motion.h2>

            <motion.p
              className="mb-10 text-base md:text-lg"
              style={{ color: colors.secondary }}
              variants={itemVariants}
            >
              {description}
            </motion.p>

            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {displayBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 rounded-lg p-2 transition-colors"
                  variants={itemVariants}
                  initial="initial"
                  whileHover="hover"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <motion.div
                    className="mt-0.5 flex h-5 w-5 items-center justify-center"
                    style={{ color: colors.accent }}
                    variants={checkIconVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <Check className="h-5 w-5" />
                  </motion.div>

                  <motion.p
                    className="text-base transition-colors"
                    style={{ color: colors.secondary }}
                    variants={benefitItemVariants}
                  >
                    {benefit.title}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side: Illustration */}
          <motion.div
            className="relative w-full overflow-hidden rounded-xl lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="relative"
              variants={imageVariants}
              initial="initial"
              whileHover="hover"
            >
              <Image
                src="/images/firmenzentrale.png"
                alt="Digital Circuit Illustration"
                width={600}
                height={500}
                className="w-full transition-all duration-300"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-transparent to-[#FF7A35]/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Subtle background elements */}
      <motion.div
        className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full"
        style={{ backgroundColor: `${colors.accent}05` }}
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
        className="absolute -top-20 right-20 h-40 w-40 rounded-full"
        style={{ backgroundColor: `${colors.secondary}05` }}
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
    </motion.section>
  );
};

export default Benefits;
