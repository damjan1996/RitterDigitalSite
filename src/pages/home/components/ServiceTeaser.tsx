'use client';

import { ArrowRight, BarChart3, Brain, Code2, Database } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
// Fix OrbitControls import
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

// Service definitions with videos and keywords
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
    keywords: ['Architektur', 'Integration', 'Skalierung', 'Optimierung'],
  },
  {
    id: 3,
    title: 'Softwareentwicklung',
    description: 'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse.',
    icon: <Code2 className="h-6 w-6" />,
    color: colors.accent,
    href: '/leistungen/softwareentwicklung',
    video: '/videos/softwaredevelopment.mp4',
    keywords: ['Python / React', 'Programme', 'Webanwendungen', 'Scripts'],
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
  const [headerHeight, setHeaderHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const carouselRef = useRef<THREE.Object3D | null>(null);
  const videoTexturesRef = useRef<THREE.VideoTexture[]>([]);
  const videoElementsRef = useRef<HTMLVideoElement[]>([]);
  const panelsRef = useRef<THREE.Mesh[]>([]);
  const targetRotationRef = useRef(0);
  const targetRotationOnPointerDownRef = useRef(0);
  const pointerXOnPointerDownRef = useRef(0);
  const isDraggingRef = useRef(false);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useMobile();
  // Fix isMobile ? false : true pattern
  const useHigherQuality = !isMobile;
  const dragAreaRef = useRef<HTMLElement | null>(null);
  const touchStartXRef = useRef(0);

  // Preload videos and initialize Three.js scene
  useEffect(() => {
    // Get header height for proper spacing
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    // Preload videos with lower resolution/quality for mobile
    const videoElements = services.map(service => {
      const video = document.createElement('video');
      video.src = service.video;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';

      // Reduce video quality for mobile
      if (isMobile) {
        video.setAttribute('playsinline', '');
      }

      // Track loading progress
      video.addEventListener('loadeddata', () => {
        setVideosLoaded(prev => prev + 1);
      });

      video.load();
      return video;
    });

    videoElementsRef.current = videoElements;

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }

      // Clean up videos
      videoElements.forEach(video => {
        video.pause();
        video.removeAttribute('src');
        video.load();
      });
    };
  }, [isMobile, services]);

  // Go to specific panel - optimized for mobile
  const goToPanel = (index: number): void => {
    if (!carouselRef.current) return;

    const targetAngle = index * (Math.PI / 2);

    const currentAngle = targetRotationRef.current % (2 * Math.PI);
    let angleDiff = -targetAngle - currentAngle;

    if (Math.abs(angleDiff) > Math.PI) {
      angleDiff = angleDiff > 0 ? angleDiff - 2 * Math.PI : angleDiff + 2 * Math.PI;
    }

    targetRotationRef.current = targetRotationRef.current + angleDiff;
    setActiveIndex(index);
  };

  // Effect for auto rotation - slower on mobile for better visibility
  useEffect(() => {
    if (isReady && !isDragging) {
      // Longer rotation time on mobile for better readability
      const rotationDelay = isMobile ? 15000 : 10000;

      autoRotateTimerRef.current = setTimeout(() => {
        const nextIndex = (activeIndex + 1) % services.length;
        targetRotationRef.current += Math.PI / 2;
        setActiveIndex(nextIndex);
      }, rotationDelay);

      return () => {
        if (autoRotateTimerRef.current) {
          clearTimeout(autoRotateTimerRef.current);
        }
      };
    }

    // Add explicit empty return for when condition isn't met
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isDragging, isReady, isMobile, services.length]);

  // Initialize Three.js when videos are loaded
  useEffect(() => {
    if (videosLoaded === services.length && canvasRef.current && !sceneRef.current) {
      initThreeJs();
    }
  }, [videosLoaded, isMobile, services.length]);

  // Handle window resize with debounce for better performance on mobile
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (cameraRef.current && rendererRef.current && containerRef.current) {
          const width = containerRef.current.clientWidth;
          const height = containerRef.current.clientHeight;

          cameraRef.current.aspect = width / height;
          cameraRef.current.updateProjectionMatrix();

          rendererRef.current.setSize(width, height);
        }
      }, 250); // Debounce resize events for mobile performance
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Scroll hijacking for carousel navigation
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    const container = containerRef.current;
    let lastScrollTime = 0;
    let isScrollLocked = false;
    let hasTriggeredCarousel = false;

    // Check if section is fully visible in viewport
    const isFullyVisible = () => {
      const rect = container.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    };

    // Check if user has viewed all slides
    const hasViewedAllSlides = () => {
      return activeIndex === services.length - 1;
    };

    // Handle normal page scrolling
    const handleScroll = () => {
      // If already viewed all slides, don't restrict scrolling
      if (hasViewedAllSlides()) {
        isScrollLocked = false;
        return;
      }

      // If not yet in carousel mode but section is fully visible, enter carousel mode
      if (!hasTriggeredCarousel && isFullyVisible()) {
        hasTriggeredCarousel = true;
        isScrollLocked = true;
      }

      // If in carousel mode but not at last slide, prevent scrolling past the section
      if (hasTriggeredCarousel && isScrollLocked && !hasViewedAllSlides()) {
        // Keep user at the current scroll position
        window.scrollTo(0, window.scrollY);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // If we've seen all slides or haven't triggered carousel, allow normal scrolling
      if (hasViewedAllSlides() || !hasTriggeredCarousel) {
        return;
      }

      // If carousel is active and section is fully visible
      if (hasTriggeredCarousel && isFullyVisible()) {
        const now = Date.now();
        const scrollDelay = isMobile ? 800 : 500;

        // Throttle scroll events
        if (now - lastScrollTime < scrollDelay) return;

        // Determine scroll direction and navigate carousel
        if (e.deltaY > 0) {
          // Scrolling down
          e.preventDefault();
          const next = Math.min(activeIndex + 1, services.length - 1);
          goToPanel(next);
          lastScrollTime = now;

          // If just reached the last slide, release the scroll lock
          if (next === services.length - 1) {
            isScrollLocked = false;
          }
        } else if (e.deltaY < 0 && activeIndex > 0) {
          // Scrolling up
          e.preventDefault();
          const next = Math.max(activeIndex - 1, 0);
          goToPanel(next);
          lastScrollTime = now;
        }
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isReady, activeIndex, services.length, isMobile]);

  // Initialize Three.js scene with mobile optimizations
  const initThreeJs = (): void => {
    if (!containerRef.current || !canvasRef.current) return;

    // Fix React Hook dependency warning
    const currentIsMobile = isMobile;

    // Create scene with reduced complexity for mobile
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050510);
    sceneRef.current = scene;

    // Create camera with mobile-specific positioning
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);

    // Position camera - better for mobile viewing
    if (currentIsMobile) {
      // Centered and pulled back for better mobile view
      camera.position.set(0, 20, 450);
    } else {
      camera.position.set(150, 50, 400);
    }
    cameraRef.current = camera;

    // Create renderer with lower pixel ratio for mobile
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: !isMobile, // Disable antialiasing on mobile for performance
      alpha: true,
      powerPreference: 'high-performance', // Better for mobile GPUs
    });
    renderer.setSize(width, height);
    // Lower pixel ratio for mobile
    renderer.setPixelRatio(
      currentIsMobile ? Math.min(1.5, window.devicePixelRatio) : window.devicePixelRatio
    );
    renderer.shadowMap.enabled = !currentIsMobile; // Disable shadows on mobile for better performance
    rendererRef.current = renderer;

    // Create orbit controls with reduced sensitivity for mobile
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = currentIsMobile ? 0.1 : 0.05; // More damping on mobile for smoother motion
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enabled = false;
    controlsRef.current = controls;

    // Simplified lighting for mobile
    const ambientIntensity = currentIsMobile ? 1.0 : 0.8; // Brighter ambient light on mobile
    const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
    scene.add(ambientLight);

    // Reduce number of lights on mobile for performance
    if (!currentIsMobile) {
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.7);
      directionalLight1.position.set(0, 10, 10);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight2.position.set(10, 5, 0);
      scene.add(directionalLight2);

      const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.3);
      directionalLight3.position.set(-10, 5, -5);
      scene.add(directionalLight3);
    } else {
      // Just one directional light for mobile
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(0, 10, 10);
      scene.add(directionalLight);
    }

    // Create carousel - centered on mobile
    const carousel = new THREE.Object3D();
    carousel.position.x = currentIsMobile ? 0 : 170;
    carousel.position.y = currentIsMobile ? -30 : 0; // Lower position on mobile for better framing
    carousel.position.z = currentIsMobile ? 0 : 100;
    carouselRef.current = carousel;
    scene.add(carousel);

    // Create video textures and panels
    const videoTextures: THREE.VideoTexture[] = [];
    const panels: THREE.Mesh[] = [];

    // Smaller cube for mobile
    const boxSize = currentIsMobile ? 80 : 110; // Even smaller on mobile

    services.forEach((service, index) => {
      // Create video texture
      const videoElement = videoElementsRef.current[index];
      videoElement.play().catch(() => {
        // Silent catch - errors are expected on some browsers without user interaction
      });

      const videoTexture = new THREE.VideoTexture(videoElement);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBAFormat;

      videoTexture.wrapS = THREE.ClampToEdgeWrapping;
      videoTexture.wrapT = THREE.ClampToEdgeWrapping;

      videoTextures.push(videoTexture);

      // Panel size with 16:9 ratio
      const panelWidth = boxSize;
      const panelHeight = boxSize * 0.5625;

      // Lower geometry detail on mobile
      const segmentCount = 1; // Same for both mobile and desktop for simplicity
      const panelGeometry = new THREE.PlaneGeometry(
        panelWidth,
        panelHeight,
        segmentCount,
        segmentCount
      );

      // Create material with video texture
      const panelMaterial = new THREE.MeshBasicMaterial({
        map: videoTexture,
        side: THREE.DoubleSide,
      });

      // Create mesh
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);

      // Cube formation with wider spacing for mobile
      const offset = boxSize / 2 + (currentIsMobile ? 10 : 5);

      // Position panels with optimized mobile placement
      switch (index) {
        case 0: // Front
          panel.position.z = offset;
          panel.rotation.y = 0;
          break;
        case 1: // Right
          panel.position.x = offset;
          panel.rotation.y = -Math.PI / 2;
          break;
        case 2: // Back
          panel.position.z = -offset;
          panel.rotation.y = Math.PI;
          break;
        case 3: // Left
          panel.position.x = -offset;
          panel.rotation.y = Math.PI / 2;
          break;
      }

      carousel.add(panel);
      panels.push(panel);
    });

    videoTexturesRef.current = videoTextures;
    panelsRef.current = panels;

    // Animation loop with framerate limiting for mobile
    let lastFrame = 0;
    // Cap at 30fps on mobile for battery/performance
    const frameLimit = currentIsMobile ? 33.33 : 0; // ~30fps for mobile, unlimited for desktop

    const animate = (timestamp: number) => {
      // Throttle frames on mobile
      if (currentIsMobile) {
        const elapsed = timestamp - lastFrame;
        if (elapsed < frameLimit) {
          requestAnimationFrame(animate);
          return;
        }
        lastFrame = timestamp;
      }

      requestAnimationFrame(animate);

      if (controlsRef.current && controlsRef.current.enabled) {
        controlsRef.current.update();
      } else if (!isDraggingRef.current && carouselRef.current) {
        // Smoother rotation on mobile
        const rotationSpeed = currentIsMobile ? 0.03 : 0.05;
        carouselRef.current.rotation.y +=
          (targetRotationRef.current - carouselRef.current.rotation.y) * rotationSpeed;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate(0);

    // Go to first panel with smoother transition on mobile
    goToPanel(0);
    setIsReady(true);
  };

  // Mobile-specific touch handlers
  const onTouchStart = (event: React.TouchEvent) => {
    if (!isMobile) return;

    // Prevent default touch behavior to avoid scroll interference
    event.preventDefault();

    // Store the initial touch position
    touchStartXRef.current = event.touches[0].clientX;

    setIsDragging(true);
    isDraggingRef.current = true;

    // Clear auto-rotation timer
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }

    // Store initial rotation
    targetRotationOnPointerDownRef.current = targetRotationRef.current;
  };

  const onTouchMove = (event: React.TouchEvent) => {
    if (!isDraggingRef.current || !isMobile) return;

    // Calculate horizontal movement
    const touchX = event.touches[0].clientX;
    const deltaX = touchX - touchStartXRef.current;

    // Adjust rotation based on touch movement - increased sensitivity for mobile
    const sensitivity = 0.01;
    targetRotationRef.current = targetRotationOnPointerDownRef.current + deltaX * sensitivity;

    // Update carousel rotation directly for responsive feel
    if (carouselRef.current) {
      carouselRef.current.rotation.y = targetRotationRef.current;
    }
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (!isMobile) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    // Detect swipe direction and snap to nearest panel
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;

    // Lower threshold for mobile to make swiping more responsive
    const swipeThreshold = 20;

    if (Math.abs(deltaX) > swipeThreshold) {
      let newIndex = activeIndex;

      if (deltaX > 0) {
        // Swipe right - previous panel
        newIndex = (activeIndex - 1 + services.length) % services.length;
      } else {
        // Swipe left - next panel
        newIndex = (activeIndex + 1) % services.length;
      }

      goToPanel(newIndex);
    } else {
      // No significant swipe, snap back to current panel
      goToPanel(activeIndex);
    }
  };

  // Enhanced mouse/pointer event handlers for desktop
  const onPointerDown = (event: React.PointerEvent) => {
    // Use touch handlers for mobile
    if (isMobile) return;

    if (
      event.target instanceof Element &&
      event.target.tagName.toLowerCase() !== 'a' &&
      event.target.tagName.toLowerCase() !== 'button' &&
      !event.target.closest('a') &&
      !event.target.closest('button')
    ) {
      event.preventDefault();
      event.stopPropagation();

      if (document.body) {
        document.body.style.overflow = 'hidden';
      }

      setIsDragging(true);
      isDraggingRef.current = true;

      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }

      const docWidth = window.innerWidth;
      const x = (event.clientX / docWidth) * 2 - 1;

      pointerXOnPointerDownRef.current = x;
      targetRotationOnPointerDownRef.current = targetRotationRef.current;

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!isDraggingRef.current) return;

    event.preventDefault();

    const docWidth = window.innerWidth;
    const x = (event.clientX / docWidth) * 2 - 1;

    targetRotationRef.current =
      targetRotationOnPointerDownRef.current - (pointerXOnPointerDownRef.current - x) * 6;

    if (carouselRef.current) {
      carouselRef.current.rotation.y = targetRotationRef.current;
    }
  };

  const onPointerUp = (event: PointerEvent) => {
    isDraggingRef.current = false;
    setIsDragging(false);

    if (document.body) {
      document.body.style.overflow = '';
    }

    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);

    if (carouselRef.current) {
      const startX = pointerXOnPointerDownRef.current;
      const currentX = (event.clientX / window.innerWidth) * 2 - 1;
      const movementDifference = currentX - startX;

      const threshold = 0.01;

      let newIndex = activeIndex;

      if (movementDifference > threshold) {
        newIndex = (activeIndex - 1 + services.length) % services.length;
      } else if (movementDifference < -threshold) {
        newIndex = (activeIndex + 1) % services.length;
      }

      goToPanel(newIndex);
    }
  };

  // Handle mobile swipe navigation with return value
  const handleSwipe = (direction = 1): void => {
    const nextIndex = (activeIndex + direction + services.length) % services.length;
    goToPanel(nextIndex);
  };

  return (
    <section
      className={cn(
        'relative flex min-h-screen cursor-grab flex-col justify-center overflow-hidden active:cursor-grabbing',
        className
      )}
      style={{
        paddingTop: `${headerHeight}px`,
        background: '#0A0A1A',
      }}
      ref={dragAreaRef as React.RefObject<HTMLElement>}
      onPointerDown={onPointerDown}
      onTouchStart={isMobile ? onTouchStart : undefined}
      onTouchMove={isMobile ? onTouchMove : undefined}
      onTouchEnd={isMobile ? onTouchEnd : undefined}
      id="carousel-section"
    >
      {/* Apply styles using className approach instead of jsx global */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .drag-active .drag-indicator {
          opacity: 0.8;
        }

        .cursor-grab {
          cursor: grab;
        }
        .active\\:cursor-grabbing:active {
          cursor: grabbing !important;
        }

        /* Mobile indicators */
        .mobile-indicator {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-top: 12px;
        }

        .mobile-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .mobile-indicator-dot.active {
          background-color: white;
          width: 20px;
          border-radius: 4px;
        }

        /* Swipe hint animation for mobile */
        @keyframes swipeHint {
          0% {
            transform: translateX(0);
            opacity: 0.7;
          }
          50% {
            transform: translateX(10px);
            opacity: 1;
          }
          100% {
            transform: translateX(0);
            opacity: 0.7;
          }
        }

        .swipe-hint {
          animation: swipeHint 2s infinite ease-in-out;
        }
      `,
        }}
      />

      {/* Three.js Container with touch events */}
      <div
        ref={containerRef}
        className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
        onPointerDown={isMobile ? undefined : onPointerDown}
        onTouchStart={isMobile ? onTouchStart : undefined}
        onTouchMove={isMobile ? onTouchMove : undefined}
        onTouchEnd={isMobile ? onTouchEnd : undefined}
        style={{ touchAction: 'none', zIndex: 5 }}
      >
        <canvas ref={canvasRef} className="block h-full w-full transition-all duration-300" />

        {/* Mobile swipe hint - only shown initially */}
        {isMobile && isReady && activeIndex === 0 && (
          <div className="pointer-events-none absolute bottom-1/4 left-0 right-0 flex items-center justify-center">
            <div className="swipe-hint rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="text-sm text-white">Zum Wischen</span>
              <span className="ml-2 text-white">{'\u2192'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Overlay - Mobile optimized positioning */}
      <Container className="relative z-10 flex flex-1 flex-col justify-center px-4 py-8 md:px-6 lg:py-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
          {/* Text content - moved higher on mobile */}
          <div className={cn('flex flex-col justify-center', isMobile ? 'mt-0 pt-0' : '')}>
            {/* Section title */}
            <h2 className="mb-6 text-center text-xl font-medium text-white/70 md:text-left md:text-2xl">
              {title}
            </h2>

            {/* Top categories navigation - desktop only */}
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

            {/* Mobile-specific service icon */}
            {isMobile && services[activeIndex] && (
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-white/10 p-3">
                  <div className="text-white">{services[activeIndex].icon}</div>
                </div>
              </div>
            )}

            {/* Title container - centered on mobile */}
            <div className={cn('relative', isMobile ? 'mb-4 mt-2 text-center' : 'mb-2')}>
              {/* Title accent bar - hidden on mobile */}
              {!isMobile && (
                <div
                  className="absolute -left-3 top-1/2 h-12 w-1.5 -translate-y-1/2"
                  style={{
                    background: `linear-gradient(to bottom, ${colors.accent}, ${colors.accent}30)`,
                  }}
                />
              )}

              {/* Main title */}
              <h1
                className={cn(
                  'font-medium leading-tight tracking-tight',
                  isMobile ? 'text-2xl' : 'text-4xl md:text-5xl lg:text-6xl'
                )}
                style={{ color: '#fff' }}
              >
                {services[activeIndex]?.title}
              </h1>
            </div>

            {/* Service description - centered and shorter on mobile */}
            <p
              className={cn(
                'max-w-xl md:text-xl',
                isMobile ? 'mx-auto mb-6 text-center text-sm' : 'mb-10 text-lg'
              )}
              style={{ color: '#ccd' }}
            >
              {services[activeIndex]?.description}
            </p>

            {/* Service keywords */}
            <div className="mb-6 flex flex-wrap justify-center gap-2 md:justify-start">
              {services[activeIndex]?.keywords.map((keyword, kidx) => (
                <span
                  key={kidx}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-white/80"
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* CTA buttons - centered on mobile */}
            <div
              className={cn(
                'flex gap-4',
                isMobile ? 'mb-6 flex-col items-center justify-center' : 'mt-8 flex-wrap'
              )}
            >
              <Button
                className={cn(
                  'relative overflow-hidden rounded-full font-medium text-white transition-all duration-300',
                  isMobile ? 'w-full max-w-xs px-6 py-3' : 'px-6 py-3 md:px-8 md:py-6'
                )}
                size={isMobile ? 'default' : 'lg'}
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

              {/* Secondary CTA - shown on mobile as well but with different styling */}
              <Link
                href={services[activeIndex]?.href || '#'}
                className={cn('group', isMobile ? 'w-full max-w-xs' : '')}
              >
                <Button
                  variant="outline"
                  className={cn(
                    'relative rounded-full font-medium transition-all duration-300',
                    isMobile ? 'w-full px-6 py-3' : 'px-8 py-6'
                  )}
                  size={isMobile ? 'default' : 'lg'}
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

            {/* Mobile-specific indicators - more prominent on mobile */}
            {isMobile ? (
              <div className="mobile-indicator">
                {services.map((_, idx) => (
                  <button
                    key={idx}
                    className={cn('mobile-indicator-dot', activeIndex === idx ? 'active' : '')}
                    onClick={() => goToPanel(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            ) : (
              // Desktop indicators
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

          {/* Right column - spacer for Three.js canvas */}
          <div className="hidden lg:block"></div>
        </div>
      </Container>

      {/* Loading indicator - centered better on mobile */}
      {!isReady && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80">
          <div className="text-center text-white">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
            <p>Laden {Math.round((videosLoaded / services.length) * 100)}%</p>
          </div>
        </div>
      )}

      {/* Mobile-specific swipe buttons - for users who prefer tapping */}
      {isMobile && isReady && (
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-12">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
            onClick={() => handleSwipe(-1)}
            aria-label="Previous"
          >
            <span className="text-white">{'\u2190'}</span>
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
            onClick={() => handleSwipe(1)}
            aria-label="Next"
          >
            <span className="text-white">{'\u2192'}</span>
          </button>
        </div>
      )}
    </section>
  );
}

export default ServiceTeaser;
