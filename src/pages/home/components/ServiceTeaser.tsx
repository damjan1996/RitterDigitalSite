'use client';

// src/pages/home/components/ServiceTeaser.tsx
import {
  ArrowRight,
  BarChart3,
  Brain,
  Code2,
  Database,
  ChevronLeft,
  ChevronRight,
  Workflow,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Colors - maintained from original components
const colors = {
  primary: '#23282D',
  secondary: '#50697D',
  accent: '#FF7A35',
  muted: '#F8F9FC',
  background: '#FFFFFF',
  darkBg: '#0F0F15',
};

// Define service type
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  href: string;
  video: string;
  keywords: string[];
  detailedInfo: string;
}

// Service definitions
const defaultServices: Service[] = [
  {
    id: 5,
    title: 'Digitalisierung',
    description: 'Transformation analoger Prozesse in digitale Workflows.',
    icon: <Workflow className="h-6 w-6" />,
    color: colors.secondary,
    href: '/leistungen/digitalisierung',
    video: '/videos/digitalisierung.mp4',
    keywords: ['Prozessoptimierung', 'Automatisierung', 'Effizienz', 'Innovation'],
    detailedInfo:
      'Unsere Digitalisierungsexperten helfen Ihnen dabei, analoge Prozesse zu identifizieren und in effiziente digitale Abläufe umzuwandeln. Durch die Digitalisierung Ihrer Workflows reduzieren wir Fehlerquellen, beschleunigen Abläufe und steigern die Effizienz Ihres Unternehmens.',
  },
  {
    id: 1,
    title: 'Business Intelligence',
    description: 'Datenbasierte Entscheidungen für strategische Vorteile.',
    icon: <BarChart3 className="h-6 w-6" />,
    color: colors.secondary,
    href: '/leistungen/business-intelligence',
    video: '/videos/businessintelligence.mp4',
    keywords: ['Power BI', 'Integration', 'Visualisierung', 'Analyse'],
    detailedInfo:
      'Mit unseren Business Intelligence Lösungen verwandeln wir Ihre Daten in wertvolle Erkenntnisse. Wir implementieren leistungsstarke BI-Tools wie Power BI, erstellen intuitive Dashboards und entwickeln aussagekräftige Berichte, die Ihre Geschäftsdaten visualisieren.',
  },
  {
    id: 2,
    title: 'Data Warehouse',
    description: 'Zentrale Datenverwaltung für effiziente Analysen.',
    icon: <Database className="h-6 w-6" />,
    color: colors.secondary,
    href: '/leistungen/data-warehouse',
    video: '/videos/datawarehouse.mp4',
    keywords: ['Struktur', 'Integration', 'Skalierung', 'Optimierung'],
    detailedInfo:
      'Unser Data Warehouse Service konsolidiert Ihre Unternehmensdaten an einem zentralen Ort und schafft eine einheitliche Datenbasis für Analysen und Berichte. Wir entwerfen skalierbare Data Warehouse Architekturen, die mit Ihrem Unternehmen wachsen.',
  },
  {
    id: 3,
    title: 'Softwareentwicklung',
    description: 'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse.',
    icon: <Code2 className="h-6 w-6" />,
    color: colors.accent,
    href: '/leistungen/softwareentwicklung',
    video: '/videos/softwaredevelopment.mp4',
    keywords: ['Python/React', 'Programme', 'Webapps', 'Scripts'],
    detailedInfo:
      'Unsere Softwareentwickler erstellen maßgeschneiderte Anwendungen, die exakt auf Ihre Anforderungen zugeschnitten sind. Von leistungsstarken Webanwendungen mit React bis hin zu skalierbaren Backend-Systemen mit Python – wir entwickeln Software, die Ihre Geschäftsprozesse optimal unterstützt.',
  },
  {
    id: 4,
    title: 'Künstliche Intelligenz',
    description: 'Intelligente Automatisierung und Optimierung.',
    icon: <Brain className="h-6 w-6" />,
    color: colors.primary,
    href: '/leistungen/kuenstliche-intelligenz',
    video: '/videos/artificialintelligence.mp4',
    keywords: ['Automatisierung', 'Content', 'Training', 'Beratung'],
    detailedInfo:
      'Mit unseren KI-Lösungen erschließen Sie das volle Potenzial moderner Technologien für Ihr Unternehmen. Wir entwickeln intelligente Automatisierungslösungen, implementieren maschinelles Lernen zur Datenanalyse und erstellen KI-gestützte Prognosemodelle.',
  },
  {
    id: 6,
    title: 'JTL WaWi',
    description: 'Professionelle Warenwirtschaft für Ihren Online-Handel.',
    icon: <ShoppingCart className="h-6 w-6" />,
    color: colors.accent,
    href: '/leistungen/jtl-wawi',
    video: '/videos/jtl.mp4',
    keywords: ['E-Commerce', 'ERP', 'Bestandsmanagement', 'Auftragsabwicklung'],
    detailedInfo:
      'Als zertifizierter JTL-Partner bieten wir professionelle Implementierung und Anpassung des JTL-Warenwirtschaftssystems für Ihren Online-Handel. Wir unterstützen Sie bei der nahtlosen Integration von JTL WaWi mit Ihren bestehenden Shop-Systemen und optimieren Ihre Lager- und Bestandsverwaltung.',
  },
];

interface ServiceTeaserProps {
  title?: string;
  services?: Service[];
  className?: string;
}

export function ServiceTeaser({
                                title = 'Unsere Leistungen im Überblick',
                                services = defaultServices,
                                className,
                              }: ServiceTeaserProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Custom hook for media queries
  const isMobile = useMediaQuery('(max-width: 639px)');

  // Get header height
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

  // Go to specific panel
  const goToPanel = useCallback(
    (index: number): void => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setActiveIndex(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    },
    [isTransitioning]
  );

  // Auto rotation
  useEffect(() => {
    if (!isTransitioning) {
      const rotationDelay = isMobile ? 5000 : 7000;
      autoRotateTimerRef.current = setTimeout(() => {
        goToPanel((activeIndex + 1) % services.length);
      }, rotationDelay);
    }

    return () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
    };
  }, [activeIndex, isTransitioning, isMobile, services.length, goToPanel]);

  // Pause auto-rotation when user interacts
  const pauseAutoRotation = useCallback(() => {
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }
  }, []);

  // Resume auto-rotation after user interaction
  const resumeAutoRotation = useCallback(() => {
    pauseAutoRotation();
    const rotationDelay = isMobile ? 5000 : 7000;
    autoRotateTimerRef.current = setTimeout(() => {
      goToPanel((activeIndex + 1) % services.length);
    }, rotationDelay);
  }, [pauseAutoRotation, isMobile, goToPanel, activeIndex, services.length]);

  // Handle swipe navigation
  const handleSwipe = useCallback(
    (direction: number): void => {
      pauseAutoRotation();
      const nextIndex = (activeIndex + direction + services.length) % services.length;
      goToPanel(nextIndex);
      resumeAutoRotation();
    },
    [pauseAutoRotation, activeIndex, services.length, goToPanel, resumeAutoRotation]
  );

  // Touch handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
      pauseAutoRotation();
    },
    [pauseAutoRotation]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          handleSwipe(-1);
        } else {
          handleSwipe(1);
        }
      } else {
        resumeAutoRotation();
      }
    },
    [touchStartX, handleSwipe, resumeAutoRotation]
  );

  // Ensure videos play correctly
  useEffect(() => {
    const videos = document.querySelectorAll(`.service-video-${activeIndex}`);
    videos.forEach(video => {
      if (video instanceof HTMLVideoElement) {
        video.play().catch(error => {
          console.error('Video play error:', error);
        });
      }
    });
  }, [activeIndex]);

  const currentService = services[activeIndex];

  return (
    <section
      className={cn('relative overflow-hidden bg-gray-900', className)}
      style={{
        paddingTop: `${headerHeight}px`,
        minHeight: isMobile ? '100vh' : 'auto',
      }}
      id="carousel-section"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 py-6 md:px-6">
        {/* Section title */}
        <h2
          className={cn(
            'mb-6 text-xl font-medium text-white/70',
            isMobile ? 'text-center' : 'text-left md:text-2xl'
          )}
        >
          {title}
        </h2>

        {/* Main content area */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left column - Video carousel */}
          <div className="order-2 md:order-1">
            <div
              className="relative aspect-video overflow-hidden rounded-lg bg-gray-800"
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={pauseAutoRotation}
              onMouseLeave={resumeAutoRotation}
              role="region"
              aria-label="Service Carousel"
            >
              {/* Video slides */}
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={cn(
                    'absolute inset-0 transition-opacity duration-500',
                    activeIndex === index ? 'opacity-100' : 'opacity-0'
                  )}
                  aria-hidden={activeIndex !== index}
                >
                  <video
                    className={`service-video-${index} h-full w-full object-cover`}
                    src={service.video}
                    muted
                    loop
                    playsInline
                    autoPlay
                    aria-label={`Video für ${service.title}`}
                  />
                </div>
              ))}

              {/* Navigation buttons */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all duration-200 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                onClick={() => handleSwipe(-1)}
                aria-label="Vorheriger Slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all duration-200 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                onClick={() => handleSwipe(1)}
                aria-label="Nächster Slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Carousel indicators */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {services.map((_, idx) => (
                <button
                  key={idx}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all duration-200',
                    activeIndex === idx
                      ? 'bg-orange-500 w-4'
                      : 'bg-white/30 hover:bg-white/50'
                  )}
                  onClick={() => {
                    pauseAutoRotation();
                    goToPanel(idx);
                    resumeAutoRotation();
                  }}
                  aria-label={`Gehe zu Slide ${idx + 1}`}
                  aria-current={activeIndex === idx ? 'true' : 'false'}
                />
              ))}
            </div>
          </div>

          {/* Right column - Active service details */}
          <div className="order-1 md:order-2">
            <div className="flex flex-col">
              {/* Title with accent line */}
              <div className="relative mb-4">
                <div className="absolute -left-3 top-1/2 hidden h-12 w-1.5 -translate-y-1/2 bg-gradient-to-b from-orange-500 to-orange-500/30 md:block" />
                <h1
                  className={cn(
                    'font-medium leading-tight tracking-tight text-white',
                    isMobile ? 'text-center text-3xl' : 'text-left text-4xl md:text-5xl'
                  )}
                >
                  {currentService?.title}
                </h1>
              </div>

              {/* Description */}
              <p
                className={cn(
                  'mb-4 max-w-xl text-gray-300',
                  isMobile ? 'mx-auto text-center' : 'text-left'
                )}
              >
                {currentService?.description}
              </p>

              {/* Detailed information */}
              <div className="mb-6 border-l-2 border-orange-500 py-2 pl-4 text-white/80">
                <p>{currentService?.detailedInfo}</p>
              </div>

              {/* Keywords */}
              <div
                className={cn(
                  'mb-6 flex flex-wrap gap-2',
                  isMobile ? 'justify-center' : 'justify-start'
                )}
              >
                {currentService?.keywords.map((keyword, kidx) => (
                  <span
                    key={kidx}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-white/80"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div
                className={cn(
                  'mt-4 flex flex-wrap gap-4',
                  isMobile ? 'justify-center' : 'justify-start'
                )}
              >
                <Button
                  className="relative overflow-hidden rounded-full bg-orange-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-orange-600"
                  size="default"
                  onClick={() => {
                    if (currentService) {
                      window.location.href = currentService.href || '#';
                    }
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>

                <Link href="/kontakt" className="group">
                  <Button
                    variant="outline"
                    className="relative rounded-full border-white/20 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                    size="default"
                  >
                    <span className="relative z-10">Kontakt</span>
                    <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-orange-500 transition-transform duration-300 group-hover:scale-x-100" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Service cards grid - all services visible at once */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className="mb-6 text-center text-xl font-medium text-white/70">Alle Leistungen</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className={cn(
                  'cursor-pointer rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-orange-500/50 hover:bg-white/10',
                  activeIndex === idx && 'border-orange-500 bg-orange-500/10'
                )}
                onClick={() => {
                  pauseAutoRotation();
                  goToPanel(idx);
                  resumeAutoRotation();
                }}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    pauseAutoRotation();
                    goToPanel(idx);
                    resumeAutoRotation();
                  }
                }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200',
                      activeIndex === idx ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/70'
                    )}
                  >
                    {service.icon}
                  </div>
                  <h4 className="font-medium text-white">{service.title}</h4>
                </div>
                <p className="mb-3 text-sm text-white/70">{service.description}</p>
                <div className="flex flex-wrap gap-1">
                  {service.keywords.slice(0, 2).map((keyword, kidx) => (
                    <span
                      key={kidx}
                      className="rounded-md bg-white/5 px-2 py-1 text-xs text-white/60"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Custom hook for media queries
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setMatches(false);
      return;
    }

    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export default ServiceTeaser;