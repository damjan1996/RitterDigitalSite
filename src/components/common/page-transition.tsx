// src/components/common/page-transition.tsx
'use client';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

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
      src="/images/logos/logo_ritterdigital.png"
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
  const [showLogo, setShowLogo] = useState(false); // Start with logo hidden
  const [showContent, setShowContent] = useState(true); // Start with content shown
  const { setIsTransitioning } = useScrollContext();
  const [isAnimating, setIsAnimating] = useState(false);

  // Vereinfachte Erstinitialisierung - wichtig für Deployment-Stabilität
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initial Logo kurz anzeigen, dann Content direkt einblenden
    setShowLogo(true);
    setIsAnimating(true);
    setIsTransitioning(true);

    // Sicherstellen, dass die Animation nicht stecken bleibt
    const initialSafetyTimeout = setTimeout(() => {
      setShowLogo(false);
      setShowContent(true);
      setIsAnimating(false);
      setIsTransitioning(false);
    }, 1000); // Nach 1 Sekunde immer anzeigen, egal was passiert

    // Nach kurzer Zeit standardmäßig einblenden
    const normalTimeout = setTimeout(() => {
      setShowLogo(false);
      setShowContent(true);
      setIsAnimating(false);
      setIsTransitioning(false);
    }, 800);

    return () => {
      clearTimeout(initialSafetyTimeout);
      clearTimeout(normalTimeout);
    };
  }, [setIsTransitioning]);

  // Vereinfachte Router-Events - nur Änderung erkennen, keine komplexen Animationen
  useEffect(() => {
    if (typeof window === 'undefined' || !router.isReady) return;

    const handleRouteChange = () => {
      // Beim Routenwechsel kurz Logo anzeigen
      setShowLogo(true);
      setShowContent(false);
      setIsAnimating(true);
      setIsTransitioning(true);

      // Nach kurzer Zeit immer einblenden
      setTimeout(() => {
        setShowLogo(false);
        setShowContent(true);
        setIsAnimating(false);
        setIsTransitioning(false);

        // Scroll zurücksetzen
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 800);
    };

    // Sicherstellen, dass bei Fehlern die Seite trotzdem angezeigt wird
    const handleRouteError = () => {
      setShowLogo(false);
      setShowContent(true);
      setIsAnimating(false);
      setIsTransitioning(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeError', handleRouteError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeError', handleRouteError);
    };
  }, [router.events, router.isReady, setIsTransitioning]);

  // Body-Klassen für Animation
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

              {/* Subtle glow effect */}
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
