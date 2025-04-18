'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section className={cn('relative overflow-hidden bg-white py-20', className)}>
      {/* Enhanced background with layered elements for depth */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white to-[#F8F9FC]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.div
          className="absolute right-0 top-0 h-full w-3/4 bg-[#F8F9FC]"
          style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        {/* Accent lines for visual interest */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 w-full"
          style={{ background: 'linear-gradient(90deg, transparent, #FF7A35, transparent)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />

        <motion.div
          className="absolute right-[10%] top-[15%] h-32 w-32 rounded-full bg-[#FF7A35]/5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[20%] left-[5%] h-24 w-24 rounded-full bg-[#3D5A73]/5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced title with gradient accent */}
          <motion.div variants={itemVariants} className="relative mb-4">
            <motion.div
              className="absolute -left-3 top-1/2 h-12 w-1.5 -translate-y-1/2 bg-gradient-to-b from-[#FF7A35] to-[#FF7A35]/30"
              initial={{ height: 0 }}
              animate={{ height: '3rem' }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#1A2027] md:text-5xl">
              {title}
              <span className="text-[#FF7A35]">.</span>
            </h1>
          </motion.div>

          {/* Enhanced subtitle with better typography */}
          <motion.p
            variants={itemVariants}
            className="mb-6 text-xl font-medium text-[#3D5A73] opacity-90"
          >
            {subtitle}
          </motion.p>

          {/* Description with animation */}
          <motion.p variants={itemVariants} className="mb-8 max-w-2xl text-lg text-[#3D5A73]/80">
            {description}
          </motion.p>

          {/* CTA Button with animation */}
          <motion.div variants={itemVariants}>
            <Link href={ctaPrimary.href} className="group">
              <Button
                className="relative overflow-hidden rounded-md bg-[#1A2027] px-8 py-6 font-medium text-white transition-all duration-300 hover:bg-[#2A3F56]"
                size="lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {ctaPrimary.text}
                  <motion.div
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 w-full bg-[#FF7A35]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative geometric shape with animation */}
      <motion.div
        className="absolute bottom-0 right-0 h-2/3 w-1/2"
        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
        animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        whileHover={{
          scale: 1.05,
          rotate: 2,
          transition: { duration: 1.2 },
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <path
            fill="#1A2027"
            d="M47.7,-61.1C62,-51.5,74.2,-36.5,79.4,-19.2C84.5,-1.9,82.5,17.6,73.6,32.5C64.8,47.4,49.1,57.7,32.4,66.2C15.7,74.8,-2,81.5,-19.1,78.9C-36.1,76.3,-52.5,64.3,-63.5,48.5C-74.5,32.8,-80,13.1,-78.2,-5.9C-76.4,-24.8,-67.2,-43,-53.3,-53C-39.3,-63,-19.7,-64.7,-0.9,-63.6C17.8,-62.4,33.5,-70.7,47.7,-61.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      {/* Additional decorative elements */}
      <motion.div
        className="absolute left-[15%] top-[30%] h-16 w-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="40" stroke="#FF7A35" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[25%] right-[25%] h-20 w-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect x="20" y="20" width="60" height="60" stroke="#3D5A73" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
