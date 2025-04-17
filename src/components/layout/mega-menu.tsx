// src/components/layout/mega-menu.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/config/menu';

interface MegaMenuProps {
    item: MenuItem;
    isOpen: boolean;
    onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
                                                      item,
                                                      isOpen,
                                                      onClose
                                                  }) => {
    if (!item.submenu || item.submenu.length === 0) return null;

    // Ermittle Bild-URLs basierend auf dem Service-Namen
    const getServiceImage = (title: string): string => {
        const slug = title.toLowerCase().replace(/\s+/g, '-');
        return `/images/services/${slug}.jpg`;
    };

    return (
        <div
            className={cn(
                "absolute left-0 right-0 top-full bg-white shadow-lg border-t border-gray-100 transition-all duration-300 z-30 overflow-hidden",
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            )}
        >
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-4">{item.title}</h3>
                        <p className="text-secondary mb-6">
                            Entdecken Sie unsere innovativen Lösungen für Ihr Unternehmen. Wir bieten maßgeschneiderte Services, die genau auf Ihre Anforderungen zugeschnitten sind.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.submenu.map((subItem) => (
                                <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className="group flex items-start p-3 rounded-md hover:bg-gray-50 transition-colors"
                                    onClick={onClose}
                                >
                                    <ChevronRight className="h-5 w-5 text-accent mt-0.5 mr-2 transform group-hover:translate-x-1 transition-transform" />
                                    <div>
                                        <h4 className="font-medium text-primary group-hover:text-accent transition-colors">
                                            {subItem.title}
                                        </h4>
                                        <p className="text-sm text-secondary mt-1">
                                            {getServiceDescription(subItem.title)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:grid grid-cols-2 gap-4">
                        {item.submenu.slice(0, 4).map((subItem) => (
                            <div key={subItem.href} className="relative h-40 overflow-hidden rounded-md">
                                <Image
                                    src={getServiceImage(subItem.title)}
                                    alt={subItem.title}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                    onError={(e) => {
                                        // Fallback für fehlende Bilder
                                        (e.target as HTMLImageElement).src = '/images/services/default.jpg';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                    <span className="text-white p-3 font-medium">{subItem.title}</span>
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