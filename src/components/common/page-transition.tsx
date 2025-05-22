// src/components/common/page-transition.tsx
'use client';

import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // ✅ App Router import
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
    className='relative z-10'
  >
    <Image
      src='/images/logos/logo_ritterdigital.png'
      alt='Ritter Digital'
      width={280}
      height={90}
      priority
      className='brightness-125 filter'
    />
  </motion.div>
);

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname(); // ✅ App Router hook
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const { setIsTransitioning } = useScrollContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  // ✅ App Router compatible transition logic
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only show transition for route changes, not initial load
    if (displayChildren !== children) {
      setIsAnimating(true);
      setIsTransitioning(true);
      setShowLogo(true);
      setShowContent(false);

      // Update children after a brief delay
      const updateChildrenTimer = setTimeout(() => {
        setDisplayChildren(children);
      }, 300);

      // Complete transition
      const completeTransitionTimer = setTimeout(() => {
        setShowLogo(false);
        setShowContent(true);
        setIsAnimating(false);
        setIsTransitioning(false);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 600);

      return () => {
        clearTimeout(updateChildrenTimer);
        clearTimeout(completeTransitionTimer);
      };
    }
    // ✅ Explicitly return undefined when condition is not met
    return undefined;
  }, [children, displayChildren, setIsTransitioning]);

  // ✅ Handle pathname changes for App Router
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Brief animation on route change
    setIsAnimating(true);
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsAnimating(false);
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname, setIsTransitioning]); // ✅ Listen to pathname changes

  // Initial load setup
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Brief initial animation
    setShowLogo(true);
    setIsAnimating(true);
    setIsTransitioning(true);

    const initialTimer = setTimeout(() => {
      setShowLogo(false);
      setShowContent(true);
      setIsAnimating(false);
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(initialTimer);
  }, [setIsTransitioning]);

  // Body classes for animation
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
      <AnimatePresence mode='wait'>
        {showLogo && (
          <motion.div
            key='logo-container'
            className='pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-white'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: customEase }}
          >
            <div className='flex items-center justify-center'>
              <Logo />

              {/* Subtle glow effect */}
              <motion.div
                className='from-[#FF7A35]/3 to-[#3D5A73]/3 absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r blur-2xl'
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

      <AnimatePresence mode='wait'>
        {showContent && (
          <motion.div
            key={pathname} // ✅ Use pathname as key for App Router
            className='relative z-0 min-h-screen'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: customEase,
            }}
          >
            <div className={isAnimating ? 'pointer-events-none' : ''}>
              {displayChildren}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
