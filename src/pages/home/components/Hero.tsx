'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Brain, ChevronRight, Code2, Database, Server } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Colors - angepasst an das Branding von Ritter Digital
const colors = {
  primary: '#23282D',
  secondary: '#50697D',
  accent: '#FF7A35',
  muted: '#F8F9FC',
  background: '#FFFFFF',
  darkBg: '#0A0A1A',
};

// Service definitions with videos and images - angepasst an die tatsächlichen Dienstleistungen
const services = [
  {
    id: 1,
    title: 'Digitalisierung',
    description: 'Digitale Transformation für zukunftsfähige Unternehmen.',
    icon: <Code2 className="h-6 w-6" />,
    color: colors.accent,
    href: '/leistungen/digitalisierung',
    image: '/digital-transformation.png',
    video: '/videos/digitalisierung.mp4',
    keywords: ['Prozesse', 'Transformation', 'Innovation', 'Effizienz'],
  },
  {
    id: 2,
    title: 'Business Intelligence',
    description: 'Datenbasierte Entscheidungen für strategische Vorteile.',
    icon: <BarChart3 className="h-6 w-6" />,
    color: colors.accent,
    href: '/leistungen/business-intelligence',
    image: '/business-intelligence-dashboard.png',
    video: '/videos/businessintelligence.mp4',
    keywords: ['Power BI', 'Integration', 'Visualisierung', 'Analyse'],
  },
  {
    id: 3,
    title: 'Data Warehouse',
    description: 'Zentrale Datenverwaltung für effiziente Analysen.',
    icon: <Database className="h-6 w-6" />,
    color: colors.accent,
    href: '/leistungen/data-warehouse',
    image: '/placeholder.svg?key=ejf8y',
    video: '/videos/datawarehouse.mp4',
    keywords: ['Struktur', 'Integration', 'Skalierung', 'Optimierung'],
  },
  {
    id: 4,
    title: 'Software Entwicklung',
    description: 'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse.',
    icon: <Code2 className="h-6 w-6" />,
    color: colors.accent,
    href: '/leistungen/software-development',
    image: '/software-development-code.png',
    video: '/videos/softwaredevelopment.mp4',
    keywords: ['Python/React', 'Programme', 'Webapps', 'Scripts'],
  },
  {
    id: 5,
    title: 'Künstliche Intelligenz',
    description: 'Intelligente Automatisierung und Optimierung.',
    icon: <Brain className="h-6 w-6" />,
    color: colors.accent,
    href: '/leistungen/kuenstliche-intelligenz',
    image: '/artificial-intelligence-concept.png',
    video: '/videos/artificialintelligence.mp4',
    keywords: ['Automatisierung', 'Content', 'Training', 'Beratung'],
  },
  {
    id: 6,
    title: 'JTL WaWi',
    description: 'Professionelle JTL-Lösungen und Integrationen.',
    icon: <Server className="h-6 w-6" />,
    color: colors.accent,
    href: '/leistungen/jtl',
    image: '/placeholder.svg?key=hdwaz',
    video: '/videos/jtl.mp4',
    keywords: ['Integration', 'E-Commerce', 'Warenwirtschaft', 'Automatisierung'],
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
  const [pauseRotation, setPauseRotation] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Implement useMobile hook directly in the component
  const [isMobile, setIsMobile] = useState(false);

  // Fügen Sie eine responsive Anpassung für mobile Geräte hinzu
  useEffect(() => {
    // Function to check if viewport is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Consider mobile if less than md breakpoint
    };

    // Check on mount
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add click handler to pause rotation
  useEffect(() => {
    const handleClick = () => {
      setPauseRotation(true);
      // Resume rotation after 15 seconds
      setTimeout(() => {
        setPauseRotation(false);
      }, 15000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Auto-rotate services with improved performance
  useEffect(() => {
    if (!isInView || pauseRotation) return; // Only auto-rotate when in view and not paused

    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 5000); // Change service every 5 seconds

    return () => clearInterval(interval);
  }, [isInView, pauseRotation]);

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
    const timer = setTimeout(() => {
      setReady(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Preload videos for smoother transitions
  useEffect(() => {
    if (ready) {
      // Preload the active video and the next one
      const nextIndex = (activeService + 1) % services.length;

      if (videoRefs.current[activeService]) {
        videoRefs.current[activeService]?.play().catch(() => {
          // Silent catch for autoplay restrictions
        });
      }

      if (videoRefs.current[nextIndex]) {
        videoRefs.current[nextIndex]?.load();
      }
    }
  }, [activeService, ready]);

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
    onSwipedLeft: () => setActiveService(prev => (prev + 1) % services.length),
    onSwipedRight: () => setActiveService(prev => (prev - 1 + services.length) % services.length),
    trackMouse: false,
    trackTouch: true,
    delta: 10,
    swipeDuration: 500,
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

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative flex min-h-[calc(100svh-80px)] flex-col justify-center overflow-hidden',
        className
      )}
      style={{
        paddingTop: `${headerHeight}px`,
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FC 100%)',
      }}
      aria-label="Ritter Digital Services"
    >
      {/* Background elements */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.2 }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient id="grid" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#23282D" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#23282D" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <pattern id="smallGrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path
                d="M 5 0 L 0 0 0 5"
                fill="none"
                stroke="#23282D"
                strokeWidth="0.2"
                opacity="0.1"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </motion.div>

        {/* Accent glow */}
        <motion.div
          className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-accent opacity-5 blur-[100px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        <motion.div
          className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-500 opacity-5 blur-[100px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />
      </div>

      <div className="container relative z-10 flex flex-1 flex-col justify-center px-4 py-6 md:px-6 md:py-16 lg:py-24">
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
              <h1 className="text-3xl font-medium leading-tight tracking-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
                {title}
                <span className="text-accent">.</span>
              </h1>
            </div>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                variants={itemVariants}
                className="mb-6 max-w-xl text-base text-secondary sm:text-lg md:mb-10 md:text-xl"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Service tags - angelehnt an die Tags auf der Website */}
            <motion.div variants={itemVariants} className="mb-8 hidden flex-wrap gap-2 md:flex">
              <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-secondary shadow-sm">
                Struktur
              </span>
              <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-secondary shadow-sm">
                Integration
              </span>
              <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-secondary shadow-sm">
                Skalierung
              </span>
              <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-secondary shadow-sm">
                Optimierung
              </span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 md:gap-4"
            >
              <Link href={ctaPrimary.href} className="group">
                <Button
                  className="relative h-auto w-full overflow-hidden rounded-md bg-primary px-6 py-4 font-medium text-white transition-all duration-300 sm:py-5"
                  size="lg"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
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

              <Link href={ctaSecondary.href} className="group">
                <Button
                  variant="outline"
                  className="relative h-auto w-full rounded-md border-gray-300 px-6 py-4 font-medium text-secondary transition-all duration-300 sm:py-5"
                  size="lg"
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

          {/* Services Showcase mit Sidebar - angepasst an das Design der Website */}
          <motion.div
            variants={itemVariants}
            className="relative h-[400px] md:h-[500px]"
            {...swipeHandlers}
          >
            <div className="relative h-full w-full overflow-hidden rounded-lg shadow-md">
              {/* Sidebar für Dienstleistungen - nur für Desktop */}
              {!isMobile && (
                <div className="absolute bottom-0 left-0 top-0 z-10 w-[220px] border-r border-gray-100 bg-gray-50">
                  <div className="flex h-full flex-col">
                    <div className="px-4 pb-2 pt-4 text-sm font-medium text-secondary">
                      Unsere Leistungen
                    </div>
                    <div className="flex-1 overflow-auto">
                      <nav className="flex flex-col">
                        {services.map((service, index) => (
                          <button
                            key={index}
                            className={cn(
                              'relative flex items-center gap-3 px-4 py-3 text-left transition-colors',
                              index === activeService
                                ? 'bg-white text-primary'
                                : 'text-secondary hover:bg-white hover:text-primary'
                            )}
                            onClick={() => setActiveService(index)}
                          >
                            <div
                              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md"
                              style={{
                                backgroundColor:
                                  index === activeService ? `${colors.accent}15` : '#F0F0F5',
                                color: index === activeService ? colors.accent : colors.secondary,
                              }}
                            >
                              {service.icon}
                            </div>
                            <span className="text-sm font-medium">{service.title}</span>
                            {index === activeService && (
                              <motion.div
                                className="absolute bottom-0 left-0 top-0 w-1 rounded-r-full"
                                style={{ backgroundColor: colors.accent }}
                                layoutId="activeSidebar"
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                              />
                            )}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              )}

              {/* Video background */}
              <div className={cn('absolute inset-0 h-full w-full', !isMobile && 'pl-[220px]')}>
                {ready &&
                  services.map((service, index) => (
                    <div
                      key={index}
                      className={cn(
                        'absolute inset-0 h-full w-full transition-opacity duration-700',
                        index === activeService ? 'opacity-100' : 'opacity-0'
                      )}
                    >
                      {service.video ? (
                        <video
                          ref={el => {
                            videoRefs.current[index] = el;
                          }}
                          src={service.video}
                          className="h-full w-full object-cover"
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <Image
                          src={service.image || '/placeholder.svg'}
                          alt=""
                          fill
                          className="h-full w-full object-cover"
                        />
                      )}

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>
                  ))}
              </div>

              {/* Service content - angepasst an das Design der Website */}
              <div
                className={cn(
                  'absolute bottom-0 right-0 p-6 text-white',
                  !isMobile && 'left-[220px]'
                )}
              >
                <div className="mb-2 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${colors.accent}30`,
                    }}
                  >
                    {services[activeService].icon}
                  </div>
                  <h3 className="text-xl font-medium">
                    {services[activeService].title}
                    <span className="text-accent">.</span>
                  </h3>
                </div>

                <p className="mb-4 text-gray-200">{services[activeService].description}</p>

                <Link
                  href={services[activeService].href}
                  className="group inline-flex items-center gap-2 font-medium text-white transition-colors"
                >
                  <span>Mehr erfahren</span>
                  <motion.div
                    className="flex items-center justify-center rounded-full"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile service indicators */}
        <div className="mt-6 flex justify-center gap-1 md:hidden">
          {services.map((_, idx) => (
            <button
              key={idx}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-200',
                activeService === idx ? 'w-6 bg-accent' : 'bg-secondary/20'
              )}
              onClick={() => setActiveService(idx)}
              aria-label={`Go to ${services[idx].title}`}
            />
          ))}
        </div>

        {/* Stats section - angepasst an das Design der Website */}
        <motion.div
          className="relative mt-16 md:mt-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.8 }}
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-12 bg-gray-300"></div>
              <span className="text-xs font-medium uppercase tracking-wider text-secondary">
                Unsere Expertise
              </span>
              <div className="h-px w-12 bg-gray-300"></div>
            </div>

            {/* Statistics */}
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
              <motion.div
                className="flex flex-col items-center justify-center py-6 text-center"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                }}
              >
                <span className="text-4xl font-medium text-primary md:text-5xl">
                  20<span className="text-accent">+</span>
                </span>
                <span className="mt-2 text-sm text-secondary">Jahre Erfahrung</span>
              </motion.div>

              <motion.div
                className="flex flex-col items-center justify-center py-6 text-center"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                }}
              >
                <span className="text-4xl font-medium text-primary md:text-5xl">
                  90<span className="text-accent">+</span>
                </span>
                <span className="mt-2 text-sm text-secondary">Zufriedene Kunden</span>
              </motion.div>

              <motion.div
                className="flex flex-col items-center justify-center py-6 text-center"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                }}
              >
                <span className="text-4xl font-medium text-primary md:text-5xl">
                  250<span className="text-accent">+</span>
                </span>
                <span className="mt-2 text-sm text-secondary">Erfolgreiche Projekte</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
