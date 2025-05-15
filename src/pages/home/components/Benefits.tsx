'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type React from 'react'; // Fix: Import React

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Define colors locally to match other components
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
  description?: string;
  icon?: JSX.Element;
}

interface BenefitsProps {
  title?: string;
  description?: string;
  benefits?: BenefitItem[];
  className?: string;
  ctaText?: string;
  ctaHref?: string;
}

export const Benefits: React.FC<BenefitsProps> = ({
  title = 'Warum Unternehmen sich für Ritter Digital entscheiden',
  description = 'Als Geschäftsführer treffen Sie bessere Entscheidungen. Käufer optimieren den Bestand und automatisieren den Einkauf. Lageristen verbessern die Lieferketten.',
  benefits = [],
  className,
  ctaText = 'Mehr erfahren',
  ctaHref = '/leistungen',
}) => {
  const isMobile = useMobile();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Default benefits if none provided
  const displayBenefits =
    benefits.length > 0
      ? benefits
      : [
          {
            title: 'Fachkenntnisse in digitalen Prozessen',
            description: 'Wir verfügen über langjährige Expertise in der Digitalisierung.',
          },
          {
            title: 'Angepasste Lösungen',
            description: 'Unsere Lösungen werden Ihren Anforderungen nach entwickelt.',
          },
          {
            title: 'Langfristige Partnerschaft',
            description: 'Wir begleiten Sie über den gesamten Prozess und darüber hinaus.',
          },
          {
            title: 'Entscheidungen durch Daten treffen',
            description: 'Nutzen Sie Ihre Daten für fundierte Geschäftsentscheidungen.',
          },
        ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.section
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{
        backgroundColor: colors.background,
        background: `linear-gradient(120deg, ${colors.background} 0%, ${colors.backgroundAlt} 100%)`,
      }}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      aria-labelledby="benefits-title"
      role="region"
    >
      <Container className="relative z-10 max-w-6xl">
        {/* Section header with accent line - similar to Hero component */}
        <div className="mb-12 flex items-center gap-3">
          <motion.div
            className="h-px w-8 sm:w-12"
            style={{ backgroundColor: colors.accent }}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: isMobile ? 32 : 48, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          />
          <motion.span
            className="text-xs font-medium uppercase tracking-wider sm:text-sm"
            style={{ color: colors.secondary }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Unsere Vorteile
          </motion.span>
        </div>

        <div className="flex flex-col items-start gap-16 lg:flex-row lg:gap-24">
          {/* Left side: Content */}
          <motion.div
            className="w-full lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {/* Title with accent styling similar to Hero component */}
            <div className="relative mb-6">
              <motion.div
                className="absolute -left-3 top-1/2 h-12 w-1.5 -translate-y-1/2"
                style={{
                  background: `linear-gradient(to bottom, ${colors.accent}, ${colors.accent}30)`,
                }}
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: '3rem', opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
              />
              <motion.h2
                id="benefits-title"
                className="text-3xl font-medium md:text-4xl"
                style={{ color: colors.primary }}
                variants={titleVariants}
              >
                {title}
                <span style={{ color: colors.accent }}>.</span>
              </motion.h2>
            </div>

            <motion.p
              className="mb-10 text-base md:text-lg"
              style={{ color: colors.secondary }}
              variants={itemVariants}
            >
              {description}
            </motion.p>

            {/* Benefits list with hover effects similar to ServiceTeaser */}
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {displayBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="group relative rounded-lg p-4 transition-all duration-300"
                  style={{
                    backgroundColor: hoverIndex === index ? `${colors.accent}08` : 'transparent',
                    borderLeft:
                      hoverIndex === index ? `2px solid ${colors.accent}` : '2px solid transparent',
                  }}
                  variants={itemVariants}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  whileHover={{ x: 5, transition: { duration: 0.2, ease: 'easeOut' } }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full"
                      style={{
                        backgroundColor:
                          hoverIndex === index ? colors.accent : `${colors.accent}10`,
                        color: hoverIndex === index ? 'white' : colors.accent,
                      }}
                      animate={{
                        scale: [1, hoverIndex === index ? 1.1 : 1],
                        backgroundColor:
                          hoverIndex === index
                            ? [null, colors.accent]
                            : [null, `${colors.accent}10`],
                      }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>

                    <div className="flex-1">
                      <motion.h3
                        className="text-lg font-medium transition-colors"
                        style={{ color: colors.primary }}
                      >
                        {benefit.title}
                      </motion.h3>

                      {benefit.description && (
                        <div className="h-auto overflow-hidden">
                          <motion.p
                            className="mt-1 text-sm transition-colors"
                            style={{ color: colors.secondary }}
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: hoverIndex === index ? 1 : 0,
                              y: hoverIndex === index ? 0 : -5,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: [0.25, 0.1, 0.25, 1],
                              opacity: { delay: hoverIndex === index ? 0.1 : 0 },
                            }}
                          >
                            {benefit.description}
                          </motion.p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA button similar to ServiceTeaser */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <Link href={ctaHref} className="group">
                <Button
                  className="relative overflow-hidden rounded-full px-6 py-3 font-medium text-white transition-all duration-300"
                  size="lg"
                  style={{
                    backgroundColor: colors.accent,
                    boxShadow: '0 4px 14px rgba(255, 122, 53, 0.25)',
                  }}
                >
                  <motion.span
                    className="absolute inset-0 bg-black/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {ctaText}
                    <motion.div
                      className="transition-transform duration-300"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side: Illustration with animation effects similar to Hero */}
          <motion.div
            className="relative w-full overflow-hidden rounded-xl lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="relative rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Image
                src="/modern-office-building.png"
                alt="Ritter Digital Firmenzentrale"
                width={600}
                height={500}
                className="w-full rounded-lg object-cover transition-all duration-300"
              />
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent to-[#FF7A35]/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* Stats overlay similar to Hero component */}
            <motion.div
              className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.div
                className="flex flex-col items-center justify-center rounded-lg bg-white/90 p-3 text-center shadow-md backdrop-blur-sm"
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                  y: -2,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <motion.span
                  className="text-2xl font-medium"
                  style={{ color: colors.primary }}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  20<span style={{ color: colors.accent }}>+</span>
                </motion.span>
                <motion.span
                  className="mt-1 text-xs"
                  style={{ color: colors.secondary }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  Jahre Erfahrung
                </motion.span>
              </motion.div>

              <motion.div
                className="flex flex-col items-center justify-center rounded-lg bg-white/90 p-3 text-center shadow-md backdrop-blur-sm"
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                  y: -2,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <motion.span
                  className="text-2xl font-medium"
                  style={{ color: colors.primary }}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  250<span style={{ color: colors.accent }}>+</span>
                </motion.span>
                <motion.span
                  className="mt-1 text-xs"
                  style={{ color: colors.secondary }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  Erfolgreiche Projekte
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Subtle background elements similar to original Benefits */}
      <motion.div
        className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full"
        style={{ backgroundColor: `${colors.accent}05` }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          ease: 'easeInOut',
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
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          delay: 1,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-40 right-10 h-24 w-24 rounded-full opacity-30"
        style={{ backgroundColor: `${colors.accent}08` }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          delay: 2,
          ease: 'easeInOut',
        }}
      />
    </motion.section>
  );
};

export default Benefits;
