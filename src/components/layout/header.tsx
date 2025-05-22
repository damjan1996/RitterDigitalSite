// src/components/layout/header.tsx - FIXED VERSION
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ✅ App Router import
import type React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

// Refined color palette - consistent with other components
const colors = {
  primary: '#1A2027',
  secondary: '#3D5A73',
  accent: '#FF7A35',
  background: '#FFFFFF',
  secondaryAccent: '#2A3F56',
};

export interface HeaderProps {
  transparent?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  transparent = false,
  className,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  // ✅ App Router way to get pathname
  const pathname = usePathname();

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

  // ✅ Setze den aktiven Link basierend auf dem pathname
  useEffect(() => {
    if (pathname === '/') {
      setActiveLink('Startseite');
    } else if (pathname.includes('ueber-uns')) {
      setActiveLink('Über uns');
    } else if (pathname.includes('leistungen')) {
      setActiveLink('Leistungen');
    } else if (pathname.includes('kontakt')) {
      setActiveLink('Kontakt');
    } else {
      setActiveLink('');
    }
  }, [pathname]); // ✅ Abhängig von pathname, nicht window.location

  const navItems = [
    { name: 'Leistungen', path: '/leistungen' },
    { name: 'Über uns', path: '/ueber-uns' },
  ];

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-40 w-full transition-all duration-300',
        transparent && !isScrolled ? 'bg-transparent' : 'bg-white',
        isScrolled && 'border-b border-gray-100 shadow-sm',
        isMenuOpen && 'bg-white',
        className
      )}
    >
      <Container className='px-4 py-4 sm:px-6'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div>
            <Link href='/' className='relative flex items-center'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src='/images/logos/logo_ritterdigital.png'
                  alt='Ritter Digital Logo'
                  width={120}
                  height={48}
                  className='h-10 w-auto sm:h-12'
                />
              </motion.div>
            </Link>
          </div>

          {/* Main Navigation */}
          <div className='hidden lg:block'>
            <nav>
              <ul className='flex space-x-10'>
                {navItems.map(item => (
                  <li key={item.name} className='group'>
                    <Link
                      href={item.path}
                      className={cn(
                        'relative py-2 text-sm font-medium transition-colors duration-200',
                        transparent && !isScrolled
                          ? 'text-white hover:text-gray-200'
                          : 'text-[#3D5A73] hover:text-[#1A2027]'
                      )}
                      onMouseEnter={() => setActiveLink(item.name)}
                      onMouseLeave={() => {
                        // ✅ Verwende pathname statt window.location.pathname
                        if (
                          pathname.includes('ueber-uns') &&
                          item.name === 'Über uns'
                        )
                          return;
                        if (
                          pathname.includes('leistungen') &&
                          item.name === 'Leistungen'
                        )
                          return;
                        if (
                          pathname.includes('kontakt') &&
                          item.name === 'Kontakt'
                        )
                          return;
                        setActiveLink('');
                      }}
                    >
                      <span className='relative inline-block'>
                        {item.name}
                        <span
                          className={cn(
                            'absolute -bottom-1 left-0 h-[1px] transition-all duration-200',
                            activeLink === item.name
                              ? 'w-full'
                              : 'w-0 group-hover:w-full'
                          )}
                          style={{
                            backgroundColor:
                              transparent && !isScrolled
                                ? 'white'
                                : colors.accent,
                          }}
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Link and Phone Number */}
          <div className='hidden items-center space-x-6 lg:flex'>
            {/* Phone Number */}
            <a
              href='tel:+4912345678'
              className={cn(
                'flex items-center gap-2 text-sm font-medium transition-colors duration-200',
                transparent && !isScrolled
                  ? 'text-white hover:text-gray-200'
                  : 'text-[#3D5A73] hover:text-[#1A2027]'
              )}
            >
              <Phone className='h-4 w-4' />
              +49 123 456 78
            </a>

            {/* Contact Button */}
            <Link href='/kontakt'>
              <Button
                variant='outline'
                className={cn(
                  'rounded-sm border px-5 py-2 text-sm transition-all duration-300',
                  transparent && !isScrolled
                    ? 'border-white text-white hover:bg-white hover:text-[#1A2027]'
                    : 'border-[#1A2027] text-[#1A2027] hover:bg-[#1A2027] hover:text-white'
                )}
              >
                Kontakt
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className='lg:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200',
                transparent && !isScrolled
                  ? 'text-white hover:bg-white/10'
                  : 'text-[#1A2027] hover:bg-gray-100',
                isMenuOpen && 'bg-gray-100'
              )}
              aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              {isMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu with AnimatePresence for clean exit animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className='fixed inset-0 z-30 bg-black/10 backdrop-blur-[2px]'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className='fixed inset-y-0 right-0 z-40 flex w-[280px] flex-col bg-white shadow-lg'
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <div className='flex h-[72px] items-center justify-between border-b border-gray-100 px-6'>
                <span className='text-sm font-medium text-gray-500'>Menü</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className='flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100'
                  aria-label='Menü schließen'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>

              <nav className='mt-6 flex flex-col px-6'>
                {navItems.map(item => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className='border-b border-gray-100 py-4 text-base font-normal text-[#1A2027] transition-colors hover:text-[#FF7A35]'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href='/kontakt'
                  className='border-b border-gray-100 py-4 text-base font-normal text-[#1A2027] transition-colors hover:text-[#FF7A35]'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kontakt
                </Link>
              </nav>

              <div className='mt-auto p-6'>
                <a
                  href='tel:+4912345678'
                  className='flex items-center justify-center gap-2 rounded-md border border-gray-200 p-3 text-[#3D5A73] transition-colors hover:border-gray-300 hover:text-[#1A2027]'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className='h-4 w-4' />
                  <span className='font-medium'>+49 123 456 78</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
