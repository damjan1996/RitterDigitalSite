'use client';

// src/components/layout/navigation.tsx
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type React from 'react';
import { useState, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

import { MegaMenu } from './mega-menu';

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

export const Navigation: React.FC = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Schließe Menü bei Route-Wechsel
  useEffect(() => {
    const handleRouteChange = () => {
      setActiveItem(null);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Bereinige Timeout bei Unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveItem(title);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 300);
  };

  return (
    <nav className="relative" onMouseLeave={handleMouseLeave}>
      <ul className="flex items-center space-x-8">
        {mainMenuItems.map(item => (
          <li
            key={item.href}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.title)}
          >
            <Link
              href={item.href}
              className={cn(
                'flex items-center py-2 font-medium transition-colors',
                router.pathname === item.href || router.pathname.startsWith(`${item.href}/`)
                  ? 'text-accent'
                  : 'text-primary hover:text-accent'
              )}
            >
              {item.title}
              {item.submenu && (
                <ChevronDown
                  className={cn(
                    'ml-1 h-4 w-4 transition-transform',
                    activeItem === item.title && 'rotate-180'
                  )}
                />
              )}
            </Link>

            {/* Untermenü oder MegaMenu */}
            {item.submenu &&
              activeItem === item.title &&
              (item.submenu.length > 3 ? (
                <MegaMenu
                  item={item}
                  isOpen={activeItem === item.title}
                  onClose={() => setActiveItem(null)}
                />
              ) : (
                <div
                  className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-md bg-white py-2 shadow-lg"
                  onMouseEnter={() => handleMouseEnter(item.title)}
                >
                  {item.submenu.map(subItem => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        'block px-4 py-2 text-sm transition-colors',
                        router.pathname === subItem.href
                          ? 'bg-gray-50 text-accent'
                          : 'text-primary hover:bg-gray-50 hover:text-accent'
                      )}
                      onClick={() => setActiveItem(null)}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              ))}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
