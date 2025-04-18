'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BarChart3, Brain, ChevronRight, Code2, Database } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

// Refined color palette with better contrast and visual hierarchy
const colors = {
  primary: '#1A2027', // Darker primary for better contrast
  secondary: '#3D5A73', // Richer secondary color
  accent: '#FF7A35', // Warmer accent for better visibility
  background: '#F8F9FC', // Lighter background for better contrast
  secondaryAccent: '#2A3F56', // Deeper secondary accent
};

// Enhanced service definitions with more descriptive icons
const services = [
  {
    id: 1,
    title: 'Business Intelligence',
    description: 'Datengestützte Einblicke für fundierte Geschäftsentscheidungen',
    icon: <BarChart3 className="h-6 w-6" />,
    color: '#FF7A35',
  },
  {
    id: 2,
    title: 'Data Warehouse',
    description: 'Zentrale Datenspeicherung für effiziente Analysen',
    icon: <Database className="h-6 w-6" />,
    color: '#3D5A73',
  },
  {
    id: 3,
    title: 'Softwareentwicklung',
    description: 'Maßgeschneiderte Lösungen für Ihre individuellen Anforderungen',
    icon: <Code2 className="h-6 w-6" />,
    color: '#2A3F56',
  },
  {
    id: 4,
    title: 'Künstliche Intelligenz',
    description: 'Innovative KI-Lösungen für zukunftsorientierte Unternehmen',
    icon: <Brain className="h-6 w-6" />,
    color: '#1A2027',
  },
];

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
  subtitle = 'Innovative Lösungen für Ihre digitale Transformation',
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
  const [activeService, setActiveService] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
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

  // Automatic service rotation with pause on hover
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovering]);

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section
      className={cn(
        'relative flex min-h-screen flex-col justify-center overflow-hidden bg-white',
        className
      )}
      style={{ paddingTop: `${headerHeight}px` }}
    >
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
              <h1 className="text-4xl font-medium leading-tight tracking-tight text-[#1A2027] md:text-5xl lg:text-6xl">
                {title}
                <span className="text-[#FF7A35]">.</span>
              </h1>
            </div>

            {/* Enhanced subtitle with better typography */}
            {subtitle && (
              <motion.p
                variants={itemVariants}
                className="mb-10 max-w-xl text-lg text-[#3D5A73] md:text-xl"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Enhanced CTA section with modern button designs */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
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

              <Link href={ctaSecondary.href} className="group">
                <Button
                  variant="outline"
                  className="relative rounded-md border-[#3D5A73]/30 px-8 py-6 font-medium text-[#3D5A73] transition-all duration-300 hover:border-[#FF7A35] hover:text-[#1A2027]"
                  size="lg"
                >
                  <span className="relative z-10">{ctaSecondary.text}</span>
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

          {/* Enhanced Services Showcase with improved visual design */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative h-full w-full">
              <motion.div
                className="relative h-full w-full overflow-hidden rounded-lg bg-white p-8 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Decorative elements */}
                <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-bl from-[#FF7A35]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 h-16 w-16 bg-gradient-to-tr from-[#3D5A73]/10 to-transparent" />

                {/* Service navigation with improved indicators */}
                <div className="mb-8 flex gap-3">
                  {services.map((service, index) => (
                    <motion.button
                      key={index}
                      className="group relative h-2 w-16 overflow-hidden rounded-full bg-[#F8F9FC]"
                      onClick={() => setActiveService(index)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: service.color }}
                        initial={{ scaleX: index === activeService ? 1 : 0 }}
                        animate={{ scaleX: index === activeService ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div
                        className="absolute inset-0 origin-left rounded-full bg-[#3D5A73]/20"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  ))}
                </div>

                {/* Enhanced service content with better animations */}
                <div className="h-72">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeService}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="flex h-full flex-col justify-between"
                    >
                      <div>
                        <motion.div
                          className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg"
                          style={{
                            backgroundColor: `${services[activeService].color}10`,
                            color: services[activeService].color,
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {services[activeService].icon}
                        </motion.div>

                        <motion.h3
                          className="mb-4 text-2xl font-medium text-[#1A2027]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {services[activeService].title}
                          <span className="text-[#FF7A35]">.</span>
                        </motion.h3>

                        <motion.p
                          className="text-[#3D5A73]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {services[activeService].description}
                        </motion.p>
                      </div>

                      {/* Enhanced "learn more" button */}
                      <motion.div
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Link
                          href={`/leistungen/${services[activeService].title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="group inline-flex items-center gap-2 font-medium text-[#1A2027] transition-colors hover:text-[#FF7A35]"
                        >
                          <span>Mehr erfahren</span>
                          <motion.div
                            className="flex items-center justify-center rounded-full bg-[#F8F9FC] p-1"
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
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile services showcase */}
        <motion.div variants={itemVariants} className="mt-8 block lg:hidden">
          <div className="relative w-full overflow-hidden rounded-lg bg-white p-6 shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${services[activeService].color}10`,
                      color: services[activeService].color,
                    }}
                  >
                    {services[activeService].icon}
                  </div>
                  <h3 className="text-xl font-medium text-[#1A2027]">
                    {services[activeService].title}
                    <span className="text-[#FF7A35]">.</span>
                  </h3>
                </div>
                <p className="mt-4 text-[#3D5A73]">{services[activeService].description}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex gap-3">
              {services.map((service, index) => (
                <button
                  key={index}
                  className="group relative h-2 flex-1 overflow-hidden rounded-full bg-[#F8F9FC]"
                  onClick={() => setActiveService(index)}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: service.color }}
                    initial={{ scaleX: index === activeService ? 1 : 0 }}
                    animate={{ scaleX: index === activeService ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced trust section with modern design */}
        <motion.div
          className="relative mt-12 md:mt-20 lg:mt-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          <motion.div variants={itemVariants} className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#FF7A35]"></div>
              <span className="text-sm font-medium uppercase tracking-wider text-[#3D5A73]">
                Trusted by Clients
              </span>
            </div>

            {/* Enhanced client logos with better visual design */}
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              {[1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`h-12 w-12 rounded-lg ${
                      i % 2 === 0
                        ? 'bg-gradient-to-br from-[#FF7A35]/20 to-[#FF7A35]/5'
                        : 'bg-gradient-to-br from-[#3D5A73]/20 to-[#3D5A73]/5'
                    }`}
                    whileHover={{
                      boxShadow:
                        i % 2 === 0
                          ? '0 0 20px rgba(255,122,53,0.2)'
                          : '0 0 20px rgba(61,90,115,0.2)',
                    }}
                  />
                  <span className="text-sm font-medium text-[#1A2027]">
                    {i % 2 === 0 ? 'Client' : 'Partner'} {i}
                  </span>
                </motion.div>
              ))}

              {/* Enhanced statistics with better visual hierarchy */}
              <motion.div
                className="ml-4 flex items-center gap-3 rounded-lg border border-[#FF7A35]/20 bg-white px-4 py-2 shadow-sm"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(255,122,53,0.1)',
                }}
              >
                <span className="text-3xl font-medium text-[#1A2027]">
                  20<span className="text-[#FF7A35]">+</span>
                </span>
                <span className="text-sm text-[#3D5A73]">Jahre Erfahrung</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
