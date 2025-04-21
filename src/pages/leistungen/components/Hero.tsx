'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import type React from 'react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'Unsere Leistungen',
  subtitle = 'Nutzen Sie das volle Potenzial Ihrer Digitalisierung',
  description = 'Wir kombinieren modernste Technologien mit tiefgreifendem Branchenwissen, um maßgeschneiderte Lösungen zu liefern, die Ihren spezifischen Anforderungen entsprechen und nachhaltiges Wachstum und verbesserte Wettbewerbsfähigkeit sicherstellen.',
  ctaPrimary = {
    text: 'Kontakt aufnehmen',
    href: '/kontakt',
  },
  className,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.section
      ref={containerRef}
      className={cn('relative flex min-h-[100vh] items-center justify-center bg-white', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background elements - Minimalist version */}
      <div className="absolute inset-0 z-0">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f8fafc] opacity-60" />

        {/* Accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #FF7A35 50%, transparent 100%)',
            opacity,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
        />
      </div>

      {/* Content container */}
      <div className="container relative z-10 mx-auto px-6 py-16 md:px-8">
        <motion.div
          className="mx-auto max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y, opacity }}
        >
          {/* Title with animated accent */}
          <motion.div variants={itemVariants} className="relative mb-12 text-center">
            <motion.div
              className="absolute left-1/2 top-0 h-12 w-1 -translate-x-1/2 -translate-y-full bg-gradient-to-b from-[#FF7A35] to-transparent"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 48, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
            <h1 className="bg-gradient-to-r from-[#1A2027] to-[#3D5A73] bg-clip-text pb-2 text-center text-5xl font-bold leading-relaxed tracking-tight text-transparent md:text-6xl lg:text-7xl">
              {title}
              <span className="ml-1 inline-block text-[#FF7A35]">.</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mb-6 text-center text-xl font-medium text-[#3D5A73] md:text-2xl"
          >
            {subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mb-10 text-center text-lg text-[#3D5A73]/80 md:text-xl"
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Link href={ctaPrimary.href} className="group">
              <Button
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#1A2027] to-[#2A3F56] px-8 py-6 text-lg font-medium text-white transition-all duration-500 hover:shadow-lg hover:shadow-[#FF7A35]/20"
                size="lg"
              >
                <span className="relative z-10">{ctaPrimary.text}</span>
                <motion.div
                  className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-r from-[#FF7A35] to-[#FF9A65] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
