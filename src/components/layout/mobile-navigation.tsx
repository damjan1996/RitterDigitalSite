'use client';

// src/components/layout/mobile-navigation.tsx
import { ChevronDown, Mail, Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Ersetzt useRouter aus next/router
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Definiere die Menüstruktur direkt in der Komponente
const mainMenuItems = [
  {
    title: 'Startseite',
    href: '/',
  },
  {
    title: 'Leistungen',
    href: '/leistungen',
    submenu: [
      {
        title: 'Business Intelligence',
        href: '/leistungen/business-intelligence',
      },
      {
        title: 'Data Warehouse',
        href: '/leistungen/data-warehouse',
      },
      {
        title: 'Softwareentwicklung',
        href: '/leistungen/softwareentwicklung',
      },
      {
        title: 'Künstliche Intelligenz',
        href: '/leistungen/kuenstliche-intelligenz',
      },
    ],
  },
  {
    title: 'Über Uns',
    href: '/ueber-uns',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
];

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  isDark?: boolean;
}

const MobileNavigation = ({ isOpen, setIsOpen, isDark = false }: MobileNavigationProps) => {
  const pathname = usePathname(); // usePathname aus next/navigation anstatt useRouter
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const toggleMenu = () => {
    if (setIsOpen) {
      setIsOpen(!isOpen);
    }
    if (openSubmenu) setOpenSubmenu(null);
  };

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const handleLinkClick = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
    setOpenSubmenu(null);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
        className="flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        {isOpen ? (
          <X className={cn('h-6 w-6', isDark ? 'text-white' : 'text-primary')} />
        ) : (
          <Menu className={cn('h-6 w-6', isDark ? 'text-white' : 'text-primary')} />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        role="button"
        tabIndex={0}
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={toggleMenu}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleMenu();
          }
        }}
        aria-label="Menü-Overlay schließen"
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          'fixed bottom-0 right-0 top-0 z-50 w-full max-w-sm transform overflow-y-auto bg-white transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} aria-label="Menü schließen" className="p-2">
            <X className="h-6 w-6 text-primary" />
          </button>
        </div>

        <div className="px-6 pb-12">
          <nav className="mb-8">
            <ul className="space-y-1">
              {mainMenuItems.map(item => (
                <li key={item.href} className="border-b border-gray-100 py-2">
                  {item.submenu ? (
                    <div>
                      <button
                        className={cn(
                          'flex w-full items-center justify-between py-2 text-left font-medium',
                          pathname.startsWith(item.href)
                            ? 'text-accent'
                            : 'text-primary hover:text-accent'
                        )}
                        onClick={() => toggleSubmenu(item.title)}
                      >
                        {item.title}
                        <ChevronDown
                          className={cn(
                            'h-5 w-5 transition-transform',
                            openSubmenu === item.title && 'rotate-180'
                          )}
                        />
                      </button>

                      {/* Submenu */}
                      <div
                        className={cn(
                          'mt-1 overflow-hidden transition-all duration-300',
                          openSubmenu === item.title ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        )}
                      >
                        <ul className="space-y-2 py-2 pl-4">
                          {item.submenu.map(subItem => (
                            <li key={subItem.href}>
                              <Link
                                href={subItem.href}
                                className={cn(
                                  'block py-1.5 text-sm',
                                  pathname === subItem.href
                                    ? 'font-medium text-accent'
                                    : 'text-secondary hover:text-accent'
                                )}
                                onClick={handleLinkClick}
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-2 font-medium',
                        pathname === item.href ? 'text-accent' : 'text-primary hover:text-accent'
                      )}
                      onClick={handleLinkClick}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontakt */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <Phone className="mr-3 h-5 w-5 text-accent" />
              <a href="tel:+491234567890" className="text-primary hover:text-accent">
                +49 (0) 123 456 7890
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="mr-3 h-5 w-5 text-accent" />
              <a href="mailto:kontakt@ritterdigital.de" className="text-primary hover:text-accent">
                kontakt@ritterdigital.de
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Link href="/kontakt" onClick={handleLinkClick}>
              <Button variant="default" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Kontakt aufnehmen
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
