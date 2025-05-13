'use client';

import {
  ArrowRight,
  BarChart3,
  Brain,
  Code2,
  Database,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useMobile } from '@/hooks/use-mobile';
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
  icon: JSX.Element;
  color: string;
  href: string;
  video: string;
  keywords: string[];
}

// Service definitions
const defaultServices: Service[] = [
  {
    id: 1,
    title: 'Business Intelligence',
    description: 'Datenbasierte Entscheidungen für strategische Vorteile.',
    icon: <BarChart3 className="h-6 w-6" />,
    color: colors.secondary,
    href: '/leistungen/business-intelligence',
    video: '/videos/businessintelligence.mp4',
    keywords: ['Power BI', 'Integration', 'Visualisierung', 'Analyse'],
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
  const isMobile = useMobile();

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
  }, [activeIndex, isTransitioning, isMobile, services.length]);

  // Go to specific panel
  const goToPanel = (index: number): void => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveIndex(index);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match this with your CSS transition duration
  };

  // Handle swipe navigation
  const handleSwipe = (direction: number): void => {
    const nextIndex = (activeIndex + direction + services.length) % services.length;
    goToPanel(nextIndex);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
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
    }
  };

  return (
    <section
      className={cn('relative overflow-hidden', className)}
      style={{
        paddingTop: `${headerHeight}px`,
        background: '#0A0A1A',
        height: 'auto',
        minHeight: isMobile ? '100vh' : 'auto',
      }}
      id="carousel-section"
    >
      {/* Custom CSS styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .carousel-container {
            position: relative;
            overflow: hidden;
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
          }
          
          .carousel-slide.active {
            opacity: 1;
            z-index: 1;
          }
          
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
          }
          
          .carousel-nav-button:hover {
            background: rgba(255, 255, 255, 0.2);
          }
          
          .carousel-nav-button.prev {
            left: 10px;
          }
          
          .carousel-nav-button.next {
            right: 10px;
          }
          
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
          
          @media (min-width: 768px) {
            .carousel-container {
              height: 400px;
            }
          }
          
          @media (max-width: 767px) {
            .carousel-container {
              height: 300px;
            }
          }
          
          .video-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 8px;
          }
          
          .service-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `,
        }}
      />

      <Container className="relative z-10 flex flex-col px-4 py-6 md:px-6">
        <div
          className={cn(
            isMobile ? 'flex flex-col' : 'grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16'
          )}
        >
          {/* Left column - content */}
          <div className="flex flex-col justify-center">
            {/* Section title */}
            <h2
              className={cn(
                'mb-6 text-xl font-medium text-white/70',
                isMobile ? 'text-center' : 'md:text-left md:text-2xl'
              )}
            >
              {title}
            </h2>

            {/* Service icon for mobile */}
            {isMobile && (
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-white/10 p-3">
                  <div className="text-white">{services[activeIndex].icon}</div>
                </div>
              </div>
            )}

            {/* Desktop navigation tabs */}
            {!isMobile && (
              <div className="mb-6 hidden gap-4 text-white/60 md:flex">
                {services.map((service, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      'text-sm transition-colors',
                      activeIndex === idx ? 'text-white' : 'hover:text-white/80'
                    )}
                    onClick={() => goToPanel(idx)}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            )}

            {/* Title container */}
            <div className="relative mb-2">
              {!isMobile && (
                <div
                  className="absolute -left-3 top-1/2 h-12 w-1.5 -translate-y-1/2"
                  style={{
                    background: `linear-gradient(to bottom, ${colors.accent}, ${colors.accent}30)`,
                  }}
                />
              )}

              <h1
                className={cn(
                  'font-medium leading-tight tracking-tight',
                  isMobile ? 'text-center text-2xl' : 'text-4xl md:text-5xl lg:text-6xl'
                )}
                style={{ color: '#fff' }}
              >
                {services[activeIndex]?.title}
              </h1>
            </div>

            {/* Service description */}
            <p
              className={cn(
                'mb-6 max-w-xl',
                isMobile ? 'mx-auto text-center text-sm' : 'text-lg md:text-xl'
              )}
              style={{ color: '#ccd' }}
            >
              {services[activeIndex]?.description}
            </p>

            {/* Service keywords */}
            <div
              className={cn(
                'mb-6 flex flex-wrap gap-2',
                isMobile ? 'justify-center' : 'md:justify-start'
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

            {/* Desktop CTA buttons */}
            {!isMobile && (
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  className="relative overflow-hidden rounded-full px-6 py-3 font-medium text-white transition-all duration-300 md:px-8 md:py-6"
                  size="lg"
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
                    className="relative rounded-full px-8 py-6 font-medium transition-all duration-300"
                    size="lg"
                    style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
                  >
                    <span className="relative z-10">Kontakt</span>
                    <div
                      className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
                      style={{ backgroundColor: colors.accent }}
                    />
                  </Button>
                </Link>
              </div>
            )}

            {/* Desktop indicators */}
            {!isMobile && (
              <div className="mt-16 flex items-center gap-3">
                {services.map((_, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      'h-1 rounded-full transition-all duration-200',
                      activeIndex === idx ? 'w-16 bg-white' : 'w-8 bg-white/20 hover:bg-white/40'
                    )}
                    onClick={() => goToPanel(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right column - Carousel */}
          <div className="mt-6 lg:mt-0">
            <div
              className="carousel-container"
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`carousel-slide ${activeIndex === index ? 'active' : ''}`}
                >
                  <div className="video-container">
                    <video
                      className="service-video"
                      src={service.video}
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  </div>
                </div>
              ))}

              {/* Navigation buttons */}
              <button
                className="carousel-nav-button prev"
                onClick={() => handleSwipe(-1)}
                aria-label="Previous slide"
              >
                <ChevronLeft />
              </button>
              <button
                className="carousel-nav-button next"
                onClick={() => handleSwipe(1)}
                aria-label="Next slide"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile indicators - Adjusted for more dots */}
        {isMobile && (
          <div className="mt-6 flex justify-center gap-1">
            {services.map((_, idx) => (
              <button
                key={idx}
                className={`indicator-dot ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => goToPanel(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mobile CTA buttons */}
        {isMobile && (
          <div className="mt-6 flex flex-col items-center justify-center gap-4">
            <Button
              className="w-full max-w-xs overflow-hidden rounded-full px-6 py-3 font-medium text-white transition-all duration-300"
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

            <Link href={services[activeIndex]?.href || '#'} className="w-full max-w-xs">
              <Button
                variant="outline"
                className="w-full rounded-full px-6 py-3 font-medium transition-all duration-300"
                size="default"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
              >
                <span className="relative z-10">Kontakt</span>
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

export default ServiceTeaser;
