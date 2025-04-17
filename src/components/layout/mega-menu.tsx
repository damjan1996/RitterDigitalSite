// src/components/layout/mega-menu.tsx
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { MenuItem } from '@/config/menu';
import { cn } from '@/lib/utils';

interface MegaMenuProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ item, isOpen, onClose }) => {
  if (!item.submenu || item.submenu.length === 0) return null;

  // Ermittle Bild-URLs basierend auf dem Service-Namen
  const getServiceImage = (title: string): string => {
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    return `/images/services/${slug}.jpg`;
  };

  return (
    <div
      className={cn(
        'absolute left-0 right-0 top-full z-30 overflow-hidden border-t border-gray-100 bg-white shadow-lg transition-all duration-300',
        isOpen ? 'max-h-[500px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
      )}
    >
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-primary">{item.title}</h3>
            <p className="mb-6 text-secondary">
              Entdecken Sie unsere innovativen Lösungen für Ihr Unternehmen. Wir bieten
              maßgeschneiderte Services, die genau auf Ihre Anforderungen zugeschnitten sind.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {item.submenu.map(subItem => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className="group flex items-start rounded-md p-3 transition-colors hover:bg-gray-50"
                  onClick={onClose}
                >
                  <ChevronRight className="mr-2 mt-0.5 h-5 w-5 transform text-accent transition-transform group-hover:translate-x-1" />
                  <div>
                    <h4 className="font-medium text-primary transition-colors group-hover:text-accent">
                      {subItem.title}
                    </h4>
                    <p className="mt-1 text-sm text-secondary">
                      {getServiceDescription(subItem.title)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden grid-cols-2 gap-4 md:grid">
            {item.submenu.slice(0, 4).map(subItem => (
              <div key={subItem.href} className="relative h-40 overflow-hidden rounded-md">
                <Image
                  src={getServiceImage(subItem.title)}
                  alt={subItem.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  onError={e => {
                    // Fallback für fehlende Bilder
                    (e.target as HTMLImageElement).src = '/images/services/default.jpg';
                  }}
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
                  <span className="p-3 font-medium text-white">{subItem.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Hilfsfunktion für Service-Beschreibungen
const getServiceDescription = (title: string): string => {
  switch (title) {
    case 'Business Intelligence':
      return 'Datenbasierte Entscheidungsfindung für strategische Vorteile.';
    case 'Data Warehouse':
      return 'Zentrale Datenverwaltung für effiziente Analysen.';
    case 'Softwareentwicklung':
      return 'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse.';
    case 'Künstliche Intelligenz':
      return 'Intelligente Automatisierung und Optimierung.';
    default:
      return 'Innovative Lösungen für Ihr Unternehmen.';
  }
};

export default MegaMenu;
