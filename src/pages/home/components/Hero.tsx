'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Brain, ChevronRight, Code2, Database } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

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

// Service definitions with videos
const services = [
  {
    id: 1,
    title: 'Business Intelligence',
    description: 'Datenbasierte Entscheidungen für strategische Vorteile.',
    icon: <BarChart3 className="h-6 w-6" />,
    color: colors.secondary,
    href: '/leistungen/business-intelligence',
    video: '/videos/businessintelligence.mp4',
  },
  {
    id: 2,
    title: 'Data Warehouse',
    description: 'Zentrale Datenverwaltung für effiziente Analysen.',
    icon: <Database className="h-6 w-6" />,
    color: colors.secondary,
    href: '/leistungen/data-warehouse',
    video: '/videos/datawarehouse.mp4',
  },
  {
    id: 3,
    title: 'Softwareentwicklung',
    description: 'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse.',
    icon: <Code2 className="h-6 w-6" />,
    color: colors.accent,
    href: '/leistungen/softwareentwicklung',
    video: '/videos/softwaredevelopment.mp4',
  },
  {
    id: 4,
    title: 'Künstliche Intelligenz',
    description: 'Intelligente Automatisierung und Optimierung.',
    icon: <Brain className="h-6 w-6" />,
    color: colors.primary,
    href: '/leistungen/kuenstliche-intelligenz',
    video: '/videos/artificialintelligence.mp4',
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

  // Preload videos
  useEffect(() => {
    setReady(false);
    const preloadDiv = document.createElement('div');
    preloadDiv.style.position = 'absolute';
    preloadDiv.style.width = '0';
    preloadDiv.style.height = '0';
    preloadDiv.style.overflow = 'hidden';
    preloadDiv.style.opacity = '0';
    preloadDiv.style.pointerEvents = 'none';

    services.forEach((service, index) => {
      const video = document.createElement('video');
      video.muted = true;
      video.autoplay = true;
      video.preload = 'auto';
      video.loop = true;
      video.id = `preload-video-${index}`;
      video.src = service.video;
      video.load();

      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          // Silent error handling
        });
      }

      preloadDiv.appendChild(video);
    });

    document.body.appendChild(preloadDiv);

    const timer = setTimeout(() => {
      setReady(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (preloadDiv && preloadDiv.parentNode) {
        preloadDiv.parentNode.removeChild(preloadDiv);
      }
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

  // Play current video
  const playCurrentVideo = (index: number) => {
    try {
      const cachedVideo = document.getElementById(`preload-video-${index}`) as HTMLVideoElement;
      const displayVideo = document.getElementById(`display-video-${index}`) as HTMLVideoElement;

      [cachedVideo, displayVideo].forEach(video => {
        if (video) {
          video.currentTime = 0;
          video.muted = true;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              if (video) {
                video.muted = true;
                video.play();
              }
            });
          }
        }
      });
    } catch (e) {
      // Silent error handling
    }
  };

  // Effect for switching between services
  useEffect(() => {
    if (ready) {
      setTimeout(() => {
        playCurrentVideo(activeService);
      }, 50);
    }
  }, [activeService, ready]);

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
        'relative flex min-h-screen flex-col justify-center overflow-hidden bg-white',
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

      <Container className="relative z-10 flex flex-1 flex-col justify-center px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <motion.div
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            {/* Title with accent */}
            <div className="relative mb-2">
              <motion.div
                className="absolute -left-3 top-1/2 h-12 w-1.5 -translate-y-1/2"
                style={{
                  background: `linear-gradient(to bottom, ${colors.accent}, ${colors.accent}30)`,
                }}
                initial={{ height: 0 }}
                animate={{ height: '3rem' }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <h1
                className="text-4xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl"
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
                className="mb-10 max-w-xl text-lg md:text-xl"
                style={{ color: colors.secondary }}
              >
                {subtitle}
              </motion.p>
            )}

            {/* Mobile services showcase - MOVED UP */}
            {isMobile && (
              <motion.div
                variants={itemVariants}
                className="mb-8"
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <div className="relative w-full overflow-hidden rounded-lg bg-white py-6 pl-0 pr-6 shadow-md">
                  <div className="relative w-full">
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
                          {/* Horizontal layout for mobile */}
                          <div className="flex items-start gap-4 pl-4">
                            {/* Icon and text */}
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-3">
                                <div
                                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
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
                              <p className="mb-4 text-sm" style={{ color: colors.secondary }}>
                                {service.description}
                              </p>
                            </div>

                            {/* Video for mobile */}
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg shadow-sm">
                              <video
                                id={`mobile-display-video-${index}`}
                                className="h-full w-full rounded-lg object-cover"
                                muted
                                autoPlay
                                playsInline
                                loop
                                src={service.video}
                              >
                                <source src={service.video} type="video/mp4" />
                              </video>
                            </div>
                          </div>

                          {/* Mobile learn more link */}
                          <Link
                            href={service.href}
                            className="mt-4 inline-flex items-center gap-2 pl-4 font-medium transition-colors"
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
                      ))}
                  </div>

                  <div className="mt-6 flex gap-3 px-4">
                    {services.map((service, index) => (
                      <button
                        key={index}
                        className="group relative h-2 flex-1 overflow-hidden rounded-full"
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

            {/* CTA buttons - MOVED BELOW CAROUSEL */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
              <Link href={ctaPrimary.href} className="group">
                <Button
                  className="relative overflow-hidden rounded-md px-8 py-6 font-medium text-white transition-all duration-300"
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

              <Link href={ctaSecondary.href} className="group">
                <Button
                  variant="outline"
                  className="relative rounded-md px-8 py-6 font-medium transition-all duration-300"
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
                {/* Service navigation */}
                <div className="mb-8 flex gap-3">
                  {services.map((service, index) => (
                    <motion.button
                      key={index}
                      className="group relative h-2 w-16 overflow-hidden rounded-full"
                      style={{ backgroundColor: colors.muted }}
                      onClick={() => setActiveService(index)}
                      whileHover={{ scale: 1.05 }}
                      aria-label={`Wechseln zu ${service.title}`}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: service.color }}
                        initial={{ scaleX: index === activeService ? 1 : 0 }}
                        animate={{ scaleX: index === activeService ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div
                        className="absolute inset-0 origin-left rounded-full"
                        style={{ backgroundColor: `${colors.secondary}20` }}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  ))}
                </div>

                {/* Service Content */}
                <div className="h-72">
                  <div className="relative h-full w-full">
                    {ready &&
                      services.map((service, index) => (
                        <div
                          key={index}
                          className={cn(
                            'absolute inset-0 h-full w-full transition-opacity duration-300',
                            index === activeService ? 'z-10 opacity-100' : 'z-0 opacity-0'
                          )}
                        >
                          <div className="flex h-full flex-col justify-between">
                            {/* Main content */}
                            <div className="flex flex-1 gap-6">
                              {/* Left side: Icon and Text */}
                              <div className="flex flex-1 flex-col justify-center">
                                <div className="mb-4 flex items-start gap-4">
                                  <div
                                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                      backgroundColor: `${service.color}10`,
                                      color: service.color,
                                    }}
                                  >
                                    {service.icon}
                                  </div>

                                  <div>
                                    <h3
                                      className="mb-2 text-2xl font-medium"
                                      style={{ color: colors.primary }}
                                    >
                                      {service.title}
                                      <span style={{ color: colors.accent }}>.</span>
                                    </h3>

                                    <p style={{ color: colors.secondary }}>{service.description}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Video */}
                              <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-lg shadow-md">
                                <video
                                  id={`display-video-${index}`}
                                  className="h-full w-full rounded-lg object-cover"
                                  muted
                                  autoPlay
                                  playsInline
                                  loop
                                  src={service.video}
                                >
                                  <source src={service.video} type="video/mp4" />
                                </video>
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
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="relative mt-12 md:mt-20 lg:mt-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 1 }}
        >
          <motion.div variants={itemVariants} className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-12" style={{ backgroundColor: colors.accent }}></div>
              <span
                className="text-sm font-medium uppercase tracking-wider"
                style={{ color: colors.secondary }}
              >
                Unsere Expertise
              </span>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <motion.div
                className="flex items-center gap-3 rounded-lg border bg-white px-4 py-2 shadow-sm"
                style={{ borderColor: `${colors.accent}20` }}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(255,122,53,0.1)',
                }}
              >
                <span className="text-3xl font-medium" style={{ color: colors.primary }}>
                  20<span style={{ color: colors.accent }}>+</span>
                </span>
                <span className="text-sm" style={{ color: colors.secondary }}>
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
                <span className="text-3xl font-medium" style={{ color: colors.primary }}>
                  90<span style={{ color: colors.accent }}>+</span>
                </span>
                <span className="text-sm" style={{ color: colors.secondary }}>
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
                <span className="text-3xl font-medium" style={{ color: colors.primary }}>
                  250<span style={{ color: colors.accent }}>+</span>
                </span>
                <span className="text-sm" style={{ color: colors.secondary }}>
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
