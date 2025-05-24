'use client';

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
  detailedInfo: string; // Added detailed information field
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
    video: '/videos/jtlwawi.mp4',
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

  // Replace useMobile with our own implementation using useMediaQuery
  const isMobile = useMediaQuery('(max-width: 639px)');
  // Removing unused variable
  // const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');

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

  // Go to specific panel - defined with useCallback
  const goToPanel = useCallback(
    (index: number): void => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setActiveIndex(index);

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Match this with your CSS transition duration
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

  // Pause auto-rotation when user interacts with the carousel
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

      // Determine swipe direction if sufficient movement
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // Swipe right - previous
          handleSwipe(-1);
        } else {
          // Swipe left - next
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

  return (
    <section
      className={cn('relative overflow-hidden bg-[#0A0A1A]', className)}
      style={{
        paddingTop: `${headerHeight}px`,
        minHeight: isMobile ? '100vh' : 'auto',
      }}
      id="carousel-section"
    >
      {/* Fix for ESLint "unknown property" warnings */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx>{`
        /* Core carousel styles */
        .carousel-container {
          position: relative;
          overflow: hidden;
          height: 300px;
        }

        @media (min-width: 640px) {
          .carousel-container {
            height: 350px;
          }
        }

        @media (min-width: 1024px) {
          .carousel-container {
            height: 400px;
          }
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .carousel-slide.active {
          opacity: 1;
          z-index: 1;
          pointer-events: auto;
        }

        /* Navigation buttons */
        .carousel-nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: background 0.3s;
          opacity: 0.7;
        }

        .carousel-nav-button:hover {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
        }

        .carousel-nav-button:focus {
          outline: 2px solid ${colors.accent};
          outline-offset: 2px;
        }

        .carousel-nav-button.prev {
          left: 10px;
        }

        .carousel-nav-button.next {
          right: 10px;
        }

        /* Indicator dots */
        .indicator-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .indicator-dot.active {
          background-color: white;
          width: 25px;
          border-radius: 4px;
        }

        /* Video styles */
        .video-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .service-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Hover effects */
        @media (hover: hover) {
          .carousel-nav-button {
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .carousel-container:hover .carousel-nav-button {
            opacity: 0.7;
          }

          .carousel-container:hover .carousel-nav-button:hover {
            opacity: 1;
          }
        }

        /* Service grid and cards */
        .service-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .service-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
          padding: 1.25rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .service-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .service-card.active {
          border-color: ${colors.accent};
          background: rgba(255, 122, 53, 0.1);
        }

        .service-card-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
          gap: 0.75rem;
        }

        .service-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .service-card.active .service-card-icon {
          background: ${colors.accent};
        }

        .service-card-title {
          font-weight: 600;
          font-size: 1.125rem;
          color: white;
        }

        .service-card-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .service-card-keywords {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }

        .service-card-keyword {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
        }

        .service-card.active .service-card-keyword {
          background: rgba(255, 122, 53, 0.2);
        }
      `}</style>

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
              className="carousel-container"
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={pauseAutoRotation}
              onMouseLeave={resumeAutoRotation}
              role="region"
              aria-label="Service Carousel"
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`carousel-slide ${activeIndex === index ? 'active' : ''}`}
                  aria-hidden={activeIndex !== index}
                >
                  <div className="video-container">
                    <video
                      className={`service-video service-video-${index}`}
                      src={service.video}
                      muted
                      loop
                      playsInline
                      autoPlay
                      aria-label={`Video für ${service.title}`}
                    />
                  </div>
                </div>
              ))}

              {/* Navigation buttons */}
              <button
                className="carousel-nav-button prev"
                onClick={() => handleSwipe(-1)}
                aria-label="Vorheriger Slide"
              >
                <ChevronLeft />
              </button>
              <button
                className="carousel-nav-button next"
                onClick={() => handleSwipe(1)}
                aria-label="Nächster Slide"
              >
                <ChevronRight />
              </button>
            </div>

            {/* Carousel indicators */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {services.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator-dot ${activeIndex === idx ? 'active' : ''}`}
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
                <div
                  className="absolute -left-3 top-1/2 hidden h-12 w-1.5 -translate-y-1/2 md:block"
                  style={{
                    background: `linear-gradient(to bottom, ${colors.accent}, ${colors.accent}30)`,
                  }}
                />
                <h1
                  className={cn(
                    'font-medium leading-tight tracking-tight text-white',
                    isMobile ? 'text-center text-3xl' : 'text-left text-4xl md:text-5xl'
                  )}
                >
                  {services[activeIndex]?.title}
                </h1>
              </div>

              {/* Description */}
              <p
                className={cn(
                  'mb-4 max-w-xl text-[#ccd]',
                  isMobile ? 'mx-auto text-center' : 'text-left'
                )}
              >
                {services[activeIndex]?.description}
              </p>

              {/* Detailed information - always visible */}
              <div
                className="mb-6 border-l-2 py-2 pl-4 text-white/80"
                style={{ borderColor: colors.accent }}
              >
                <p>{services[activeIndex]?.detailedInfo}</p>
              </div>

              {/* Keywords */}
              <div
                className={cn(
                  'mb-6 flex flex-wrap gap-2',
                  isMobile ? 'justify-center' : 'justify-start'
                )}
              >
                {services[activeIndex]?.keywords.map((keyword, kidx) => (
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
                  className="relative overflow-hidden rounded-full px-6 py-3 font-medium text-white transition-all duration-300"
                  size="default"
                  style={{ backgroundColor: colors.accent }}
                  onClick={() => {
                    if (services[activeIndex]) {
                      window.location.href = services[activeIndex].href || '#';
                    }
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>

                <Link href={services[activeIndex]?.href || '#'} className="group">
                  <Button
                    variant="outline"
                    className="relative rounded-full px-6 py-3 font-medium transition-all duration-300"
                    size="default"
                    style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
                  >
                    <span className="relative z-10">Kontakt</span>
                    <div
                      className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                      style={{ backgroundColor: colors.accent }}
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Service cards grid - all services visible at once */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className="mb-6 text-center text-xl font-medium text-white/70">Alle Leistungen</h3>
          <div className="service-info-grid">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className={`service-card ${activeIndex === idx ? 'active' : ''}`}
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
                <div className="service-card-header">
                  <div className="service-card-icon">{service.icon}</div>
                  <h4 className="service-card-title">{service.title}</h4>
                </div>
                <p className="service-card-description">{service.description}</p>
                <div className="service-card-keywords">
                  {service.keywords.slice(0, 2).map((keyword, kidx) => (
                    <span key={kidx} className="service-card-keyword">
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
    // Default to false for SSR
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
