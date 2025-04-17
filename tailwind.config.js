/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        // Primäre Farbpalette
        primary: 'rgb(35, 40, 45)',      // Primärfarbe: Struktur (Header, Footer)
        secondary: 'rgb(80, 105, 125)',   // Sekundärfarbe: Content-Boxen
        accent: 'rgb(255, 138, 76)',      // Akzentfarbe: CTAs, Buttons
        background: 'rgb(244, 245, 246)', // Basisfarbe: Seitenhintergrund
        tertiary: 'rgb(58, 79, 102)',     // Tertiärfarbe: Ergänzende Akzente

        // Border Farbe für UI-Komponenten
        border: 'rgb(229, 231, 235)',     // Hellgrau für Borders

        // Status-Farben
        success: {
          light: '#ecfdf5',
          DEFAULT: '#10b981',
          dark: '#065f46',
        },
        warning: {
          light: '#fffbeb',
          DEFAULT: '#f59e0b',
          dark: '#92400e',
        },
        error: {
          light: '#fef2f2',
          DEFAULT: '#ef4444',
          dark: '#991b1b',
        },
        info: {
          light: '#eff6ff',
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
        },

        // Graustufen
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      spacing: {
        // 8px Grid-System für konsistente Abstände
        '0': '0',
        '1': '0.25rem',  // 4px
        '2': '0.5rem',   // 8px
        '3': '0.75rem',  // 12px
        '4': '1rem',     // 16px
        '5': '1.25rem',  // 20px
        '6': '1.5rem',   // 24px
        '8': '2rem',     // 32px
        '10': '2.5rem',  // 40px
        '12': '3rem',    // 48px
        '16': '4rem',    // 64px
        '20': '5rem',    // 80px
        '24': '6rem',    // 96px
        '32': '8rem',    // 128px
        '40': '10rem',   // 160px
        '48': '12rem',   // 192px
        '56': '14rem',   // 224px
        '64': '16rem',   // 256px
      },
      borderRadius: {
        'sm': '0.125rem',     // 2px
        DEFAULT: '0.25rem',   // 4px
        'md': '0.375rem',     // 6px
        'lg': '0.5rem',       // 8px
        'xl': '0.75rem',      // 12px
        '2xl': '1rem',        // 16px
        '3xl': '1.5rem',      // 24px
        'full': '9999px',     // Vollständig rund
      },
      screens: {
        'sm': '640px',     // Smartphone
        'md': '768px',     // Kleines Tablet
        'lg': '1024px',    // Tablet/kleine Desktops
        'xl': '1280px',    // Desktop
        '2xl': '1536px',   // Große Desktops
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(35, 40, 45)',
            a: {
              color: 'rgb(255, 138, 76)',
              '&:hover': {
                color: 'rgb(235, 118, 56)',
              },
            },
            h1: {
              color: 'rgb(35, 40, 45)',
              fontWeight: 500,
            },
            h2: {
              color: 'rgb(35, 40, 45)',
              fontWeight: 500,
            },
            h3: {
              color: 'rgb(35, 40, 45)',
              fontWeight: 500,
            },
            h4: {
              color: 'rgb(35, 40, 45)',
              fontWeight: 500,
            },
            blockquote: {
              color: 'rgb(80, 105, 125)',
              borderLeftColor: 'rgb(255, 138, 76)',
            },
            code: {
              color: 'rgb(58, 79, 102)',
              backgroundColor: 'rgb(244, 245, 246)',
              padding: '0.25rem',
              borderRadius: '0.25rem',
            },
          },
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutToRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutToLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideOutToTop: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideOutToBottom: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        fadeOut: 'fadeOut 0.3s ease-in-out',
        slideInFromRight: 'slideInFromRight 0.3s ease-in-out',
        slideOutToRight: 'slideOutToRight 0.3s ease-in-out',
        slideInFromLeft: 'slideInFromLeft 0.3s ease-in-out',
        slideOutToLeft: 'slideOutToLeft 0.3s ease-in-out',
        slideInFromTop: 'slideInFromTop 0.3s ease-in-out',
        slideOutToTop: 'slideOutToTop 0.3s ease-in-out',
        slideInFromBottom: 'slideInFromBottom 0.3s ease-in-out',
        slideOutToBottom: 'slideOutToBottom 0.3s ease-in-out',
      },
      zIndex: {
        '0': 0,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
        '60': 60,
        '70': 70,
        '80': 80,
        '90': 90,
        '100': 100,
        'auto': 'auto',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // Für bessere Animationen
  ],
};