// src/components/home/Hero.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

// Farbdefinitionen aus dem Farbschema
const colors = {
  primary: '#23282D', // Primarna boja za strukturiranje
  secondary: '#50697D', // Glavna boja za pozadinske
  accent: '#FF8A4C', // Akcentna boja za isticanje
  background: '#F4F5F8', // Osnovna boja za pozadinu
  secondaryAccent: '#3A4F66', // Sekundarna akcentna boja
};

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'Agentur für Digitalisierung',
  subtitle = '',
  ctaPrimary = {
    text: 'Mehr erfahren',
    href: '/leistungen',
  },
  ctaSecondary = {
    text: 'Kontakt',
    href: '/kontakt',
  },
  className,
}) => {
  return (
    <section
      className={cn(
        'relative flex h-screen flex-col justify-center overflow-hidden bg-white',
        className
      )}
    >
      {/* Animated diagonal background element */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="clip-path-diagonal absolute bottom-0 right-0 h-full w-full bg-[#F4F5F8]"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        />
        {/* Subtile Akzentlinie */}
        <motion.div
          className="absolute bottom-0 right-0 h-1 w-full bg-[#FF8A4C]"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, delay: 1.0, ease: 'easeOut' }}
        />
      </motion.div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="pt-0">
            {/* Animated main title with subtle accent */}
            <motion.h1
              className="mb-6 text-5xl font-normal leading-tight tracking-tight text-[#23282D]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {title}
              <span className="text-[#FF8A4C]">.</span>
            </motion.h1>

            {/* Animated subtitle with subtle accent color */}
            {subtitle && (
              <motion.p
                className="mb-8 text-xl text-[#50697D]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                {subtitle}
              </motion.p>
            )}

            {/* Animated CTAs with hover effects and accent colors */}
            <motion.div
              className="mt-12 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Link href={ctaPrimary.href}>
                <motion.div
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="rounded-none bg-[#23282D] px-8 py-3 font-normal text-white transition-all duration-300 hover:bg-[#3A4F66]">
                    {ctaPrimary.text}
                  </Button>
                </motion.div>
              </Link>

              <Link href={ctaSecondary.href}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    className="group relative rounded-none px-4 py-3 font-normal text-[#50697D] transition-colors duration-300 after:block after:h-0.5 after:w-0 after:bg-[#FF8A4C] after:transition-all after:content-[''] hover:bg-transparent hover:text-[#23282D] hover:after:w-full"
                  >
                    <span className="relative z-10">{ctaSecondary.text}</span>
                    <span className="absolute inset-0 border-0 border-[#3A4F66] opacity-0 transition-all duration-300 group-hover:border group-hover:opacity-100"></span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Animated right side image with accent gradient */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative h-full w-full">
              <motion.div
                className="absolute right-0 h-full w-full rounded-none bg-gradient-to-br from-[#F4F5F8] to-[#50697D]/10"
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  transition: { duration: 0.3 },
                }}
              >
                {/* Subtle accent corner */}
                <div className="absolute right-0 top-0 h-16 w-16 bg-[#FF8A4C]/10"></div>
                {/* Placeholder for the image */}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Animated trust section with accent colors */}
        <motion.div
          className="relative mt-32 pt-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <div className="flex flex-col items-start gap-4">
            <motion.span
              className="text-xs uppercase tracking-wider text-[#3A4F66]"
              whileHover={{ color: colors.accent, transition: { duration: 0.3 } }}
            >
              Trusted by Clients
            </motion.span>

            {/* Animated client logos with accent colors */}
            <div className="mb-4 flex items-center gap-3">
              {[1, 2, 3, 4].map((i, index) => (
                <motion.div
                  key={i}
                  className={cn(
                    'h-10 w-10 rounded-full',
                    index === 1 ? 'bg-[#FF8A4C]/20' : 'bg-[#50697D]/20'
                  )}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.0 + i * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: index === 1 ? '#FF8A4C' : '#3A4F66',
                    transition: { duration: 0.2 },
                  }}
                />
              ))}
            </div>

            {/* Animated 20+ statistic with accent */}
            <motion.div
              className="flex items-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            >
              <span className="text-3xl font-normal text-[#23282D]">
                20<span className="text-[#FF8A4C]">+</span>
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated additional client logos with accent colors */}
        <motion.div
          className="mt-8 flex items-center gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
        >
          {[1, 2].map((i, index) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 text-[#50697D]"
              whileHover={{
                color: index === 0 ? '#FF8A4C' : '#3A4F66',
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className={cn(
                  'h-6 w-6 rounded-full',
                  index === 0 ? 'bg-[#FF8A4C]/20' : 'bg-[#3A4F66]/20'
                )}
                whileHover={{
                  backgroundColor: index === 0 ? '#FF8A4C' : '#3A4F66',
                  transition: { duration: 0.3 },
                }}
              />
              <span className="text-sm">Logoipsum</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Fixed: Moved the style to a regular style element with className rather than jsx global properties */}
      <style>
        {`
          .clip-path-diagonal {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%, 0% 85%);
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
