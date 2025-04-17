// src/components/layout/header.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { MobileNavigation } from './mobile-navigation';

export interface HeaderProps {
  transparent?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ transparent = false, className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Überwache das Scrollen und füge Schatten hinzu, wenn gescrollt wird
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Verhindere Scrollen, wenn das mobile Menü geöffnet ist
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.3 + i * 0.1,
        ease: 'easeOut',
      },
    }),
  };

  const contactVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.header
      className={cn(
        'fixed left-0 right-0 top-0 z-40 w-full transition-all duration-300',
        transparent && !isScrolled ? 'bg-transparent' : 'bg-white',
        isScrolled && 'border-b border-gray-100 shadow-none',
        isMenuOpen && 'bg-white',
        className
      )}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="container mx-auto py-3">
        <div className="flex items-center justify-between">
          {/* Logo with animation */}
          <motion.div variants={logoVariants}>
            <Link href="/" className="relative z-50 flex items-center gap-2">
              <motion.div
                className="flex h-7 w-7 items-center justify-center bg-black text-xs font-normal text-white"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                R²
              </motion.div>
              <span
                className={cn(
                  'text-base font-normal tracking-tight transition-colors duration-300',
                  transparent && !isScrolled && !isMenuOpen ? 'text-white' : 'text-black'
                )}
              >
                Ritter Digital
              </span>
            </Link>
          </motion.div>

          {/* Main Navigation - Centered with staggered animation */}
          <div className="hidden justify-center lg:flex">
            <nav>
              <ul className="flex space-x-12">
                {['Home', 'About', 'Services'].map((item, index) => (
                  <motion.li key={item} custom={index} variants={navItemVariants} className="group">
                    <Link
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className={cn(
                        'relative text-sm font-normal transition-colors',
                        transparent && !isScrolled
                          ? 'text-white hover:text-gray-200'
                          : 'text-gray-500 hover:text-black'
                      )}
                    >
                      <span className="relative inline-block">
                        {item}
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Link and Phone Number - Right with animation */}
          <motion.div className="hidden items-center space-x-6 lg:flex" variants={contactVariants}>
            {/* Phone Number */}
            <motion.a
              href="tel:+4912345678"
              className={cn(
                'flex items-center gap-2 text-sm font-normal transition-colors',
                transparent && !isScrolled
                  ? 'text-white hover:text-gray-200'
                  : 'text-gray-500 hover:text-black'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +49 123 456 78
            </motion.a>

            {/* Contact Button with fixed hover */}
            <Link href="/kontakt" className="group relative">
              <motion.div
                className={cn(
                  'relative z-10 px-4 py-2 text-sm font-normal transition-colors',
                  transparent && !isScrolled
                    ? 'text-white group-hover:text-gray-200'
                    : 'text-gray-500 group-hover:text-black'
                )}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                Kontakt
              </motion.div>
              <span
                className={cn(
                  'absolute inset-0 border border-current opacity-0 transition-all duration-300 group-hover:opacity-100',
                  transparent && !isScrolled ? 'border-white' : 'border-black'
                )}
              ></span>
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle with animation */}
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <MobileNavigation
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
              isDark={transparent && !isScrolled}
            />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
