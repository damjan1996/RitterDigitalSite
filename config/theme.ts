// config/theme.ts
// Theme-Konfiguration für die Website

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper-Funktion zum Zusammenführen von Tailwind-Klassen
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

// Farbpalette der Ritter Digital GmbH
export const colors = {
    primary: 'rgb(35, 40, 45)',      // Primärfarbe für Struktur (Header, Footer)
    secondary: 'rgb(80, 105, 125)',   // Sekundärfarbe für Content-Boxen
    accent: 'rgb(255, 138, 76)',      // Akzentfarbe für CTAs, Buttons
    background: 'rgb(244, 245, 246)', // Basisfarbe für Seitenhintergrund
    tertiary: 'rgb(58, 79, 102)',     // Tertiärfarbe für Akzente
};

// Nur helles Theme konfigurieren (ohne Umschaltoption)
export const theme = {
    mode: 'light',
    colors,
    fonts: {
        sans: 'Inter, sans-serif',
    },
    fontWeights: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
    borderRadius: {
        small: '0.25rem',  // 4px
        medium: '0.5rem',  // 8px
        large: '1rem',     // 16px
    },
    spacing: {
        0: '0',
        1: '0.25rem',  // 4px - Basierend auf 8px-Grid System
        2: '0.5rem',   // 8px
        3: '0.75rem',  // 12px
        4: '1rem',     // 16px
        5: '1.25rem',  // 20px
        6: '1.5rem',   // 24px
        8: '2rem',     // 32px
        10: '2.5rem',  // 40px
        12: '3rem',    // 48px
        16: '4rem',    // 64px
        20: '5rem',    // 80px
        24: '6rem',    // 96px
        32: '8rem',    // 128px
        40: '10rem',   // 160px
        48: '12rem',   // 192px
        56: '14rem',   // 224px
        64: '16rem',   // 256px
    },
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    transitions: {
        default: '0.3s ease',
        fast: '0.15s ease',
        slow: '0.5s ease',
    },
    breakpoints: {
        sm: '640px',    // Smartphone
        md: '768px',    // Kleines Tablet
        lg: '1024px',   // Tablet/kleine Desktops
        xl: '1280px',   // Desktop
        '2xl': '1536px',  // Große Desktops
    },
};

// Export des Themes
export default theme;