'use client';

import { motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

// Refined color palette - consistent with other components
const colors = {
  primary: '#1A2027', // Darker primary for better contrast
  secondary: '#3D5A73', // Richer secondary color
  accent: '#FF7A35', // Warmer accent for better visibility
  background: '#FFFFFF', // White background
  secondaryAccent: '#2A3F56', // Deeper secondary accent
};

export interface HeaderProps {
  transparent?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ transparent = false, className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

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

  // Setze den aktiven Link basierend auf dem aktuellen Pfad
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') {
      setActiveLink('Startseite');
    } else if (path.includes('ueber-uns')) {
      setActiveLink('Über Uns');
    } else if (path.includes('leistungen')) {
      setActiveLink('Leistungen');
    } else if (path.includes('blog')) {
      setActiveLink('Blog');
    } else if (path.includes('kontakt')) {
      setActiveLink('Kontakt');
    }
  }, []);

  const navItems = [
    { name: 'Leistungen', path: '/leistungen' },
    { name: 'Über Uns', path: '/ueber-uns' },
    { name: 'Blog', path: '/blog' },
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
      <Container className="py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link href="/" className="relative z-50 flex items-center">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <img
                  src="/images/logos/logo_ritterdigital.png"
                  alt="Ritter Digital Logo"
                  className="h-12 w-auto"
                />
              </motion.div>
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="hidden lg:block">
            <nav>
              <ul className="flex space-x-10">
                {navItems.map(item => (
                  <li key={item.name} className="group">
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
                        const path = window.location.pathname;
                        if (path.includes('ueber-uns') && item.name === 'Über Uns') return;
                        if (path.includes('leistungen') && item.name === 'Leistungen') return;
                        if (path.includes('blog') && item.name === 'Blog') return;
                        if (path.includes('kontakt') && item.name === 'Kontakt') return;
                        setActiveLink('');
                      }}
                    >
                      <span className="relative inline-block">
                        {item.name}
                        <span
                          className={cn(
                            'absolute -bottom-1 left-0 h-[1px] transition-all duration-200',
                            activeLink === item.name ? 'w-full' : 'w-0 group-hover:w-full'
                          )}
                          style={{
                            backgroundColor: transparent && !isScrolled ? 'white' : colors.accent,
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
          <div className="hidden items-center space-x-6 lg:flex">
            {/* Phone Number */}
            <a
              href="tel:+4912345678"
              className={cn(
                'flex items-center gap-2 text-sm font-medium transition-colors duration-200',
                transparent && !isScrolled
                  ? 'text-white hover:text-gray-200'
                  : 'text-[#3D5A73] hover:text-[#1A2027]'
              )}
            >
              <Phone className="h-4 w-4" />
              +49 123 456 78
            </a>

            {/* Contact Button */}
            <Link href="/kontakt">
              <Button
                variant="outline"
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
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200',
                transparent && !isScrolled
                  ? 'text-white hover:text-gray-200'
                  : 'text-[#1A2027] hover:text-[#3D5A73]'
              )}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <motion.div
        className={cn(
          'fixed inset-0 z-30 flex flex-col bg-white p-6 pt-24',
          isMenuOpen ? 'block' : 'hidden'
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex flex-col space-y-6">
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.path}
              className="text-lg font-normal text-[#1A2027] transition-colors duration-200 hover:text-[#FF7A35]"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="text-lg font-normal text-[#1A2027] transition-colors duration-200 hover:text-[#FF7A35]"
            onClick={() => setIsMenuOpen(false)}
          >
            Kontakt
          </Link>
        </nav>

        <div className="mt-auto">
          <a
            href="tel:+4912345678"
            className="flex items-center gap-2 text-[#3D5A73] transition-colors duration-200 hover:text-[#1A2027]"
            onClick={() => setIsMenuOpen(false)}
          >
            <Phone className="h-4 w-4" />
            +49 123 456 78
          </a>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
