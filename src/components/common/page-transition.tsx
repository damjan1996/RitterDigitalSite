// src/components/common/page-transition.tsx
'use client';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useCallback, useRef } from 'react';

import { useScrollContext } from './scroll-context';

interface PageTransitionProps {
  children?: React.ReactNode;
}

const customEase = cubicBezier(0.25, 0.1, 0.25, 1);

const Logo = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: customEase },
    }}
    exit={{
      opacity: 0,
      scale: 1.2,
      transition: { duration: 0.3, ease: customEase },
    }}
    className="relative z-10"
  >
    <Image
      src="/images/logos/rd_logo.png"
      alt="Ritter Digital"
      width={280}
      height={90}
      priority
      className="brightness-125 filter"
    />
  </motion.div>
);

const PageTransition = ({ children }: PageTransitionProps) => {
  const router = useRouter();
  const [showLogo, setShowLogo] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { setIsTransitioning } = useScrollContext();
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentPath, setCurrentPath] = useState('');

  // Refs für Timer und Sicherheits-Timeout
  const logoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const contentTimerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialisierungs-Flag
  const isInitializedRef = useRef(false);

  // Notfall-Funktion: Stellt sicher, dass die Animation nicht stecken bleibt
  const forceCompleteTransition = useCallback(() => {
    // console.log entfernt
    setShowLogo(false);
    setShowContent(true);
    setIsAnimating(false);
    setIsTransitioning(false);
  }, [setIsTransitioning]);

  const resetScroll = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, []);

  const clearAllTimers = useCallback(() => {
    if (logoTimerRef.current) {
      clearTimeout(logoTimerRef.current);
      logoTimerRef.current = null;
    }

    if (contentTimerRef.current) {
      clearTimeout(contentTimerRef.current);
      contentTimerRef.current = null;
    }

    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
  }, []);

  const startTransition = useCallback(() => {
    // Alle Timer stoppen
    clearAllTimers();

    // Zustand für Animation setzen
    setIsAnimating(true);
    setIsTransitioning(true);
    setShowContent(false);
    setShowLogo(true);

    // Sicherheits-Timeout reduziert: Transition nach max. 2 Sekunden erzwingen
    safetyTimeoutRef.current = setTimeout(() => {
      forceCompleteTransition();
    }, 2000);
  }, [setIsTransitioning, clearAllTimers, forceCompleteTransition]);

  const finishTransition = useCallback(() => {
    setShowContent(true);

    // Kleinere Verzögerung bevor Logo ausgeblendet wird
    logoTimerRef.current = setTimeout(() => {
      setShowLogo(false);

      // Interaktionen erst nach Logo-Animation wieder aktivieren
      contentTimerRef.current = setTimeout(() => {
        setIsAnimating(false);
        setIsTransitioning(false);
      }, 200); // Reduziert von 300ms auf 200ms
    }, 50); // Reduziert von 100ms auf 50ms

    resetScroll();

    // Sicherheits-Timeout löschen, da Transition regulär beendet wurde
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
  }, [setIsTransitioning, resetScroll]);

  // Erster Seitenaufruf
  useEffect(() => {
    // Sicherstellen, dass dieser Code nur im Browser ausgeführt wird
    if (typeof window === 'undefined') return;

    // Warte auf Router-Bereitschaft
    if (!router.isReady) return;

    // Sicherstellen, dass der Übergang nicht zu früh erzwungen wird
    const initialSafety = setTimeout(() => {
      if (!isInitializedRef.current) {
        forceCompleteTransition();
      }
    }, 2500);

    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      setCurrentPath(router.asPath);

      // Übergang starten
      startTransition();

      // Nach 500ms Inhalt einblenden (reduziert von 700ms)
      contentTimerRef.current = setTimeout(() => {
        finishTransition();
      }, 500);
    }

    return () => {
      clearTimeout(initialSafety);
      clearAllTimers();
    };
  }, [
    router.isReady,
    router.asPath,
    startTransition,
    finishTransition,
    clearAllTimers,
    forceCompleteTransition,
  ]);

  // Router-Event-Handler
  useEffect(() => {
    if (!router.isReady || !isInitializedRef.current) return;

    const handleRouteChangeStart = (url: string) => {
      // Prüfe auf echten Routenwechsel (nicht nur Hash/Anker)
      if (url.split('#')[0] === currentPath.split('#')[0]) return;

      startTransition();
    };

    const handleRouteChangeComplete = (url: string, { shallow }: { shallow: boolean }) => {
      // Aktualisiere aktuellen Pfad
      setCurrentPath(url);

      // Bei einem Shallow-Update direkt finishen ohne Verzögerung
      if (shallow) {
        finishTransition();
        return;
      }

      // Starte Animation-Sequence nach kurzem Delay
      // damit die Route vollständig geladen ist
      setTimeout(() => {
        finishTransition();
      }, 300); // Reduziert von 400ms auf 300ms
    };

    // Fallback für Fehler beim Routenwechsel
    const handleRouteChangeError = (_: string, { shallow }: { shallow: boolean }) => {
      // console.error entfernt
      forceCompleteTransition();
    };

    // Router-Events abonnieren
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
      clearAllTimers();
    };
  }, [
    router.events,
    router.isReady,
    currentPath,
    startTransition,
    finishTransition,
    clearAllTimers,
    forceCompleteTransition,
  ]);

  // Body und HTML-Klassen während Animation setzen
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isAnimating) {
      document.body.classList.add('animating');
      document.documentElement.classList.add('transitioning');
    } else {
      document.body.classList.remove('animating');
      document.documentElement.classList.remove('transitioning');
    }

    return () => {
      document.body.classList.remove('animating');
      document.documentElement.classList.remove('transitioning');
    };
  }, [isAnimating]);

  // Scroll-Position während Animation blockieren
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleTransitionScrolling = (_: Event) => {
      if (isAnimating) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('scroll', handleTransitionScrolling);

    return () => {
      window.removeEventListener('scroll', handleTransitionScrolling);
    };
  }, [isAnimating]);

  return (
    <div
      className={`relative bg-white ${isAnimating ? 'pointer-events-none' : ''}`}
      style={{ minHeight: '100vh' }}
    >
      <AnimatePresence mode="wait">
        {showLogo && (
          <motion.div
            key="logo-container"
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: customEase }}
          >
            <div className="flex items-center justify-center">
              <Logo />

              {/* Refined subtle glow effect */}
              <motion.div
                className="from-[#FF7A35]/3 to-[#3D5A73]/3 absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r blur-2xl"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{
                  scale: 1.1,
                  opacity: 0.8,
                  transition: {
                    duration: 0.9,
                    ease: 'easeOut',
                  },
                }}
                exit={{
                  scale: 0.6,
                  opacity: 0,
                  transition: {
                    duration: 0.5,
                    ease: 'easeIn',
                  },
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key="content-container"
            className="relative z-0 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: customEase,
            }}
          >
            <div className={isAnimating ? 'pointer-events-none' : ''}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
