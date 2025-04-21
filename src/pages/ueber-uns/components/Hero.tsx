'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

// Refined color palette - consistent with homepage
const colors = {
  primary: '#1A2027', // Darker primary for better contrast
  secondary: '#3D5A73', // Richer secondary color
  accent: '#FF7A35', // Warmer accent for better visibility
  background: '#F8F9FC', // Lighter background for better contrast
  secondaryAccent: '#2A3F56', // Deeper secondary accent
};

export const Hero: React.FC = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  // Get header height for proper spacing
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

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
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.8 + i * 0.1,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section className={cn('relative overflow-hidden')} style={{ paddingTop: `${headerHeight}px` }}>
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

      <Container className="relative z-10 py-20 md:py-28">
        <motion.div
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Left column - Text content */}
          <motion.div className="max-w-3xl" variants={containerVariants}>
            {/* Enhanced title with gradient accent */}
            <motion.div className="relative mb-4" variants={itemVariants}>
              <motion.div
                className="absolute -left-3 top-1/2 h-12 w-1.5 -translate-y-1/2 bg-gradient-to-b from-[#FF7A35] to-[#FF7A35]/30"
                initial={{ height: 0 }}
                animate={{ height: '3rem' }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <h1 className="text-4xl font-medium leading-tight tracking-tight text-[#1A2027] md:text-5xl lg:text-6xl">
                Über Ritter Digital
                <span className="text-[#FF7A35]">.</span>
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="mb-6 text-xl text-[#3D5A73]">
              Ihr Partner für digitale Optimierung von Prozessen und maßgeschneiderte
              Softwarelösungen
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg text-[#3D5A73]/80">
              Seit über 20 Jahren unterstützen wir Unternehmen bei der Digitalisierung ihrer
              Geschäftsprozesse und entwickeln individuelle Lösungen, die echten Mehrwert schaffen.
              Mit über 90 zufriedenen Kunden und einem Team aus erfahrenen Experten setzen wir auf
              langfristige Partnerschaften und nachhaltige Erfolge.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="mt-8">
              <Link href="/kontakt" className="group">
                <Button
                  className="relative overflow-hidden rounded-md bg-[#1A2027] px-8 py-6 font-medium text-white transition-all duration-300 hover:bg-[#2A3F56]"
                  size="lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Kontakt aufnehmen
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

          {/* Right column - Image */}
          <motion.div
            className="relative hidden lg:block lg:h-[500px]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{
                y: -5,
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative h-full w-full">
                <motion.div
                  className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#FF7A35]/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-[#3D5A73]/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                />
                <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/about/team-collage.jpg"
                    alt="Das Team von Ritter Digital"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Statistiken-Banner unter dem Hero */}
      <motion.div
        className="relative mt-8 w-full py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {[
              { value: '20+', label: 'Jahre Erfahrung' },
              { value: '90+', label: 'Zufriedene Kunden' },
              { value: '25+', label: 'Experten im Team' },
              { value: '150+', label: 'Erfolgreiche Projekte' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={statsVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex flex-col items-center rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <motion.div
                  className="mb-2 text-3xl font-bold text-[#1A2027]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <span>{stat.value.split('+')[0]}</span>
                  <span className="text-[#FF7A35]">+</span>
                </motion.div>
                <div className="text-sm text-[#3D5A73]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.div>
    </section>
  );
};

export default Hero;
