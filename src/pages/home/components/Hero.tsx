'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Brain, ChevronRight, Code2, Database } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable'; // Add this import for swipe gestures

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Colors - assuming this will be moved to a constants file
const colors = {
  primary: '#23282D',
  secondary: '#50697D',
  accent: '#FF7A35',
  muted: '#F8F9FC',
  background: '#FFFFFF',
};

// Service definitions with images
const services = [
  {
    id: 1,
    title: 'Business Intelligence',
    description: 'Datenbasierte Entscheidungen für strategische Vorteile.',
    icon: <BarChart3 className="h-6 w-6" />,
    color: colors.secondary,
    href: '/leistungen/business-intelligence',
    image: '/business-intelligence-dashboard.png',
  },
  {
    id: 2,
    title: 'Data Warehouse',
    description: 'Zentrale Datenverwaltung für effiziente Analysen.',
    icon: <Database className="h-6 w-6" />,
    color: colors.secondary,
    href: '/leistungen/data-warehouse',
    image: '/placeholder.svg?key=1vwne',
  },
  {
    id: 3,
    title: 'Softwareentwicklung',
    description: 'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse.',
    icon: <Code2 className="h-6 w-6" />,
    color: colors.accent,
    href: '/leistungen/softwareentwicklung',
    image: '/software-development-code.png',
  },
  {
    id: 4,
    title: 'Künstliche Intelligenz',
    description: 'Intelligente Automatisierung und Optimierung.',
    icon: <Brain className="h-6 w-6" />,
    color: colors.primary,
    href: '/leistungen/kuenstliche-intelligenz',
    image: '/placeholder.svg?key=40avc',
  },
  {
    id: 5,
    title: 'Digitalisierung',
    description: 'Digitale Transformation für zukunftsfähige Unternehmen.',
    icon: <Code2 className="h-6 w-6" />,
    color: colors.secondary,
    href: '/leistungen/digitalisierung',
    image: '/digital-transformation-concept.png',
  },
  {
    id: 6,
    title: 'JTL',
    description: 'Professionelle JTL-Lösungen und Integrationen.',
    icon: <Database className="h-6 w-6" />,
    color: colors.primary,
    href: '/leistungen/jtl',
    image: '/placeholder.svg?key=9iv9g',
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

export function Hero({
  title = 'Ritter Digital',
  subtitle = 'Ihr Partner für digitale Prozesse.',
  ctaPrimary = {
    text: 'Mehr erfahren',
    href: '/leistungen',
  },
  ctaSecondary = {
    text: 'Kontakt',
    href: '/kontakt',
  },
  className,
}: HeroProps) {
  const [activeService, setActiveService] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [ready, setReady] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isMobile = useMobile();

  // Auto-rotate services
  useEffect(() => {
    if (!isMobile) return; // Only auto-rotate on mobile

    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 5000); // Change service every 5 seconds

    return () => clearInterval(interval);
  }, [isMobile]);

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

  // Set ready state after component mounts
  useEffect(() => {
    // Simplified - no video preloading to avoid errors
    const timer = setTimeout(() => {
      setReady(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Intersection Observer to trigger animations when in view
  useEffect(() => {
    const sectionElement = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (isMobile) {
        setActiveService(prev => (prev + 1) % services.length);
      }
    },
    onSwipedRight: () => {
      if (isMobile) {
        setActiveService(prev => (prev - 1 + services.length) % services.length);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

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

  // Handle previous and next service transitions
  const goToPrevService = () => {
    setActiveService(prev => (prev - 1 + services.length) % services.length);
  };

  const goToNextService = () => {
    setActiveService(prev => (prev + 1) % services.length);
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative flex min-h-[calc(100svh)] flex-col justify-center overflow-hidden bg-white',
        className
      )}
      style={{ paddingTop: `${headerHeight}px` }}
    >
      {/* Clean, minimal background */}
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

        {/* Subtle accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center px-4 py-6 md:px-6 md:py-16 lg:py-24">
        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            {/* Title with accent */}
            <div className="relative mb-2">
              <motion.div
                className="absolute -left-2 top-1/2 h-12 w-1.5 -translate-y-1/2 sm:-left-3"
                style={{
                  background: `linear-gradient(to bottom, ${colors.accent}, ${colors.accent}30)`,
                }}
                initial={{ height: 0 }}
                animate={{ height: '3rem' }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <h1
                className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ color: colors.primary }}
              >
                {title}
                <span style={{ color: colors.accent }}>.</span>
              </h1>
            </div>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                variants={itemVariants}
                className="mb-6 max-w-xl text-base sm:text-lg md:mb-10 md:text-xl"
                style={{ color: colors.secondary }}
              >
                {subtitle}
              </motion.p>
            )}

            {/* Mobile services showcase - Improved for touch */}
            {isMobile && (
              <motion.div
                variants={itemVariants}
                className="mb-6 md:mb-8"
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                {...swipeHandlers}
              >
                <div className="relative w-full overflow-hidden rounded-lg bg-white py-5 shadow-md">
                  {/* Navigation controls - New for mobile */}
                  <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2">
                    <button
                      onClick={goToPrevService}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"
                      aria-label="Vorheriger Service"
                    >
                      <ChevronRight
                        className="h-4 w-4 rotate-180"
                        style={{ color: colors.primary }}
                      />
                    </button>
                  </div>
                  <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2">
                    <button
                      onClick={goToNextService}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"
                      aria-label="Nächster Service"
                    >
                      <ChevronRight className="h-4 w-4" style={{ color: colors.primary }} />
                    </button>
                  </div>

                  <div className="relative w-full px-4">
                    {ready &&
                      services.map((service, index) => (
                        <div
                          key={index}
                          className={cn(
                            'transition-all duration-300',
                            index === activeService
                              ? 'relative z-10 opacity-100'
                              : 'absolute inset-0 z-0 opacity-0'
                          )}
                        >
                          {/* Service content - Improved layout */}
                          <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-4">
                            {/* Image with larger size for better visibility */}
                            <div className="mb-4 h-32 w-full overflow-hidden rounded-lg shadow-sm sm:mb-0 sm:h-28 sm:w-28 sm:flex-shrink-0">
                              <img
                                src={service.image || '/placeholder.svg'}
                                alt={service.title}
                                className="h-full w-full rounded-lg object-cover"
                              />
                            </div>

                            {/* Icon and text - Moved right of image on SM */}
                            <div className="flex flex-col sm:flex-1">
                              <div className="mb-2 flex items-center justify-center gap-3 sm:justify-start">
                                <div
                                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12"
                                  style={{
                                    backgroundColor: `${service.color}10`,
                                    color: service.color,
                                  }}
                                >
                                  {service.icon}
                                </div>
                                <h3
                                  className="text-xl font-medium"
                                  style={{ color: colors.primary }}
                                >
                                  {service.title}
                                  <span style={{ color: colors.accent }}>.</span>
                                </h3>
                              </div>
                              <p
                                className="mb-4 text-center text-sm sm:text-left"
                                style={{ color: colors.secondary }}
                              >
                                {service.description}
                              </p>

                              {/* Mobile learn more link */}
                              <Link
                                href={service.href}
                                className="mx-auto mt-1 inline-flex items-center gap-2 font-medium transition-colors sm:mx-0"
                                style={{ color: colors.primary }}
                              >
                                <span>Mehr erfahren</span>
                                <motion.div
                                  className="flex items-center justify-center rounded-full p-1"
                                  style={{ backgroundColor: colors.muted }}
                                  whileHover={{ x: 5 }}
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </motion.div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Pagination indicators - Improved styling */}
                  <div className="mt-5 flex justify-center gap-2 px-4">
                    {services.map((service, index) => (
                      <button
                        key={index}
                        className="group relative h-2 w-6 overflow-hidden rounded-full"
                        style={{ backgroundColor: colors.muted }}
                        onClick={() => setActiveService(index)}
                        aria-label={`Wechseln zu ${service.title}`}
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
            )}

            {/* CTA buttons - Made touch-friendly */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap gap-3 md:mt-8 md:gap-4"
            >
              <Link href={ctaPrimary.href} className="group w-full sm:w-auto">
                <Button
                  className="relative h-auto w-full overflow-hidden rounded-md px-6 py-4 font-medium text-white transition-all duration-300 sm:px-8 sm:py-6"
                  size="lg"
                  style={{ backgroundColor: colors.primary }}
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
                    className="absolute bottom-0 left-0 h-1 w-full"
                    style={{ backgroundColor: colors.accent }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>

              <Link href={ctaSecondary.href} className="group w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="relative h-auto w-full rounded-md px-6 py-4 font-medium transition-all duration-300 sm:px-8 sm:py-6"
                  size="lg"
                  style={{ borderColor: `${colors.secondary}30`, color: colors.secondary }}
                >
                  <span className="relative z-10">{ctaSecondary.text}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
                    style={{ backgroundColor: colors.accent }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Services Showcase for desktop */}
          <motion.div variants={itemVariants} className="hidden lg:block">
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
                {/* Service navigation - CHANGED TO VERTICAL */}
                <div className="flex h-full">
                  {/* Vertical navigation sidebar */}
                  <div className="mr-6 flex flex-col gap-4 border-r pr-4">
                    {services.map((service, index) => (
                      <button
                        key={index}
                        className={cn(
                          'group flex items-center gap-3 rounded-md px-3 py-2 text-left transition-colors',
                          index === activeService
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        )}
                        onClick={() => setActiveService(index)}
                        aria-label={`Wechseln zu ${service.title}`}
                      >
                        <div
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md"
                          style={{
                            backgroundColor: `${service.color}10`,
                            color: service.color,
                          }}
                        >
                          {service.icon}
                        </div>
                        <span className="text-sm font-medium">{service.title}</span>
                      </button>
                    ))}
                  </div>

                  {/* Service Content */}
                  <div className="flex-1">
                    <div className="relative h-full w-full">
                      {ready &&
                        services.map((service, index) => (
                          <div
                            key={index}
                            className={cn(
                              'transition-opacity duration-300',
                              index === activeService
                                ? 'relative z-10 opacity-100'
                                : 'absolute inset-0 z-0 opacity-0'
                            )}
                          >
                            <div className="flex h-full flex-col justify-between">
                              {/* Main content */}
                              <div className="flex flex-1 flex-col">
                                {/* Service details */}
                                <div className="mb-4">
                                  <h3
                                    className="mb-2 text-2xl font-medium"
                                    style={{ color: colors.primary }}
                                  >
                                    {service.title}
                                    <span style={{ color: colors.accent }}>.</span>
                                  </h3>

                                  <p style={{ color: colors.secondary }}>{service.description}</p>
                                </div>

                                {/* Image (replacing video) */}
                                <div className="relative mt-4 h-40 w-full overflow-hidden rounded-lg shadow-md">
                                  <img
                                    src={service.image || '/placeholder.svg'}
                                    alt={service.title}
                                    className="h-full w-full rounded-lg object-cover"
                                  />
                                </div>
                              </div>

                              {/* Learn more link */}
                              <div className="mt-6">
                                <Link
                                  href={service.href}
                                  className="group inline-flex items-center gap-2 font-medium transition-colors"
                                  style={{ color: colors.primary }}
                                >
                                  <span>Mehr erfahren</span>
                                  <motion.div
                                    className="flex items-center justify-center rounded-full p-1"
                                    style={{ backgroundColor: colors.muted }}
                                    whileHover={{
                                      x: 5,
                                      backgroundColor: `${colors.accent}20`,
                                      transition: { duration: 0.2 },
                                    }}
                                  >
                                    <ArrowRight className="h-4 w-4" />
                                  </motion.div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats section - Made responsive */}
        <motion.div
          className="relative mt-8 md:mt-16 lg:mt-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 1 }}
        >
          <motion.div variants={itemVariants} className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 sm:w-12" style={{ backgroundColor: colors.accent }}></div>
              <span
                className="text-xs font-medium uppercase tracking-wider sm:text-sm"
                style={{ color: colors.secondary }}
              >
                Unsere Expertise
              </span>
            </div>

            {/* Statistics - Improved for mobile */}
            <div className="grid w-full grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4 md:gap-8">
              <motion.div
                className="flex items-center gap-3 rounded-lg border bg-white px-4 py-2 shadow-sm"
                style={{ borderColor: `${colors.accent}20` }}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(255,122,53,0.1)',
                }}
              >
                <span
                  className="text-2xl font-medium sm:text-3xl"
                  style={{ color: colors.primary }}
                >
                  20<span style={{ color: colors.accent }}>+</span>
                </span>
                <span className="text-xs sm:text-sm" style={{ color: colors.secondary }}>
                  Jahre Erfahrung
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 rounded-lg border bg-white px-4 py-2 shadow-sm"
                style={{ borderColor: `${colors.secondary}20` }}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(80,105,125,0.1)',
                }}
              >
                <span
                  className="text-2xl font-medium sm:text-3xl"
                  style={{ color: colors.primary }}
                >
                  90<span style={{ color: colors.accent }}>+</span>
                </span>
                <span className="text-xs sm:text-sm" style={{ color: colors.secondary }}>
                  Zufriedene Kunden
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 rounded-lg border bg-white px-4 py-2 shadow-sm"
                style={{ borderColor: `${colors.secondary}20` }}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(58,79,102,0.1)',
                }}
              >
                <span
                  className="text-2xl font-medium sm:text-3xl"
                  style={{ color: colors.primary }}
                >
                  250<span style={{ color: colors.accent }}>+</span>
                </span>
                <span className="text-xs sm:text-sm" style={{ color: colors.secondary }}>
                  Erfolgreiche Projekte
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;
