'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

interface HeroProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  className?: string;
  scrollToJobs?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'Karriere bei Ritter Digital',
  subtitle = 'Werden Sie Teil unseres Teams und gestalten Sie die digitale Transformation mit uns',
  imageUrl = '/images/hero/career-hero.jpg',
  className,
  scrollToJobs,
}) => {
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

  // Staggered animation variants for better visual flow
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section
      className={cn(
        'relative flex min-h-[80vh] flex-col justify-center overflow-hidden bg-white',
        className
      )}
      style={{ paddingTop: `${headerHeight}px` }}
    >
      {/* Enhanced background with layered elements for depth */}
      <div className="absolute inset-0 h-full w-full">
        {/* Background image with overlay */}
        {imageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt="Karriere bei Ritter Digital"
              fill
              className="object-cover"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#1A2027]/90 to-[#1A2027]/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            />
          </div>
        )}

        {/* Decorative elements */}
        <motion.div
          className="absolute right-[10%] top-[15%] h-32 w-32 rounded-full bg-[#FF7A35]/10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[15%] left-[8%] h-24 w-24 rounded-full bg-[#3D5A73]/10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.2, delay: 1 }}
        />

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
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <motion.div
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            {/* Enhanced title with gradient accent */}
            <div className="relative mb-2">
              <motion.div
                className="absolute -left-3 top-1/2 h-12 w-1.5 -translate-y-1/2 bg-gradient-to-b from-[#FF7A35] to-[#FF7A35]/30"
                initial={{ height: 0 }}
                animate={{ height: '3rem' }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <h1 className="text-4xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                {title}
                <span className="text-[#FF7A35]">.</span>
              </h1>
            </div>

            {/* Enhanced subtitle with better typography */}
            {subtitle && (
              <motion.p
                variants={itemVariants}
                className="mb-10 max-w-xl text-lg text-white/90 md:text-xl"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Enhanced CTA section with modern button designs */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={scrollToJobs}
                  className="group relative overflow-hidden rounded-md bg-[#FF7A35] px-8 py-6 font-medium text-white shadow-lg shadow-[#FF7A35]/25 transition-all duration-300 hover:bg-[#FF7A35]/90"
                  size="lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Offene Stellen ansehen
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
                    className="absolute bottom-0 left-0 h-1 w-full bg-white/20"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                <Link href="/kontakt">
                  <Button
                    variant="outline"
                    className="relative rounded-md border-white px-8 py-6 font-medium text-white transition-all duration-300 hover:border-[#FF7A35] hover:bg-white/10"
                    size="lg"
                  >
                    <span className="relative z-10">Initiativbewerbung</span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-[#FF7A35]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Career benefits showcase - similar to services showcase but with career benefits */}
          <motion.div variants={itemVariants} className="hidden lg:block">
            <div className="relative h-full w-full">
              <motion.div
                className="relative h-full w-full overflow-hidden rounded-lg bg-white/10 p-8 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Decorative elements */}
                <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-bl from-[#FF7A35]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 h-16 w-16 bg-gradient-to-tr from-[#3D5A73]/10 to-transparent" />

                <h3 className="mb-6 text-2xl font-medium text-white">
                  Ihre Vorteile<span className="text-[#FF7A35]">.</span>
                </h3>

                {/* Career benefits list */}
                <div className="space-y-4">
                  {[
                    {
                      title: 'Flexible Arbeitszeiten',
                      description: 'Work-Life-Balance steht bei uns an erster Stelle',
                      icon: '🕒',
                    },
                    {
                      title: 'Remote-Arbeit',
                      description: 'Arbeiten Sie von überall aus',
                      icon: '🏠',
                    },
                    {
                      title: 'Weiterbildung',
                      description: 'Kontinuierliche Lernmöglichkeiten und Entwicklung',
                      icon: '📚',
                    },
                    {
                      title: 'Teamevents',
                      description: 'Regelmäßige Team-Building-Aktivitäten',
                      icon: '🎉',
                    },
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 rounded-lg bg-white/5 p-4 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.2 + index * 0.1 },
                      }}
                      whileHover={{
                        y: -5,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF7A35]/20 text-xl">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{benefit.title}</h4>
                        <p className="text-sm text-white/70">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced "learn more" button */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link
                    href="/karriere/benefits"
                    className="group inline-flex items-center gap-2 font-medium text-white transition-colors hover:text-[#FF7A35]"
                  >
                    <span>Mehr über unsere Benefits</span>
                    <motion.div
                      className="flex items-center justify-center rounded-full bg-white/10 p-1 text-white"
                      whileHover={{
                        x: 5,
                        backgroundColor: '#FF7A35',
                        color: 'white',
                      }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile benefits showcase */}
        <motion.div variants={itemVariants} className="mt-8 block lg:hidden">
          <div className="relative w-full overflow-hidden rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-xl font-medium text-white">
              Ihre Vorteile<span className="text-[#FF7A35]">.</span>
            </h3>

            <div className="space-y-3">
              {['Flexible Arbeitszeiten', 'Remote-Arbeit', 'Weiterbildung', 'Teamevents'].map(
                (benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 rounded-md bg-white/5 p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.2 + index * 0.1 },
                    }}
                  >
                    <div className="h-2 w-2 rounded-full bg-[#FF7A35]" />
                    <span className="text-sm text-white">{benefit}</span>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="relative mt-12 md:mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-12"
          >
            {[
              { value: '20+', label: 'Jahre Erfahrung' },
              { value: '50+', label: 'Mitarbeiter' },
              { value: '100+', label: 'Erfolgreiche Projekte' },
              { value: '4.8', label: 'Kunstar Rating' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center rounded-lg bg-white/10 px-6 py-4 text-center backdrop-blur-sm"
                whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <span className="text-3xl font-medium text-white">
                  {stat.value}
                  {index === 3 ? (
                    <span className="text-[#FF7A35]">/5</span>
                  ) : (
                    <span className="text-[#FF7A35]"></span>
                  )}
                </span>
                <span className="text-sm text-white/70">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
