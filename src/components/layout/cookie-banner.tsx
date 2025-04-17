// src/components/layout/cookie-banner.tsx
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { initGA } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type ConsentLevel = 'all' | 'essential';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent') as ConsentLevel | null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (!storedConsent) {
      // Wenn noch keine Zustimmung gegeben, Banner nach kurzer Verzögerung anzeigen
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    } else if (storedConsent === 'all') {
      // Wenn "Alle Cookies" bereits akzeptiert, Analytics initialisieren
      initGA();
    }

    // Cleanup: lösche ggf. den Timer
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setIsVisible(false);
    initGA(); // Analytics nachträglich initialisieren
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setIsVisible(false);
  };

  const handleCustomize = () => {
    // Platzhalter für ein Modal oder weitere Einstellungen
    alert('Diese Funktion zur individuellen Cookie-Einstellung wird in Kürze verfügbar sein.');
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-lg',
        'transform transition-transform duration-300',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="max-w-3xl flex-1">
            <h3 className="mb-2 text-lg font-semibold">Datenschutzhinweis</h3>
            <p className="mb-2 text-sm text-secondary md:text-base">
              Wir verwenden Cookies und ähnliche Technologien auf unserer Website, um das
              Nutzererlebnis zu verbessern und unsere Dienste zu optimieren. Einige sind
              erforderlich, während andere uns helfen, diese Website und Ihre Erfahrung zu
              verbessern.
            </p>
            <p className="text-sm text-tertiary">
              Weitere Informationen finden Sie in unserer{' '}
              <Link href="/datenschutz" className="text-accent underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAcceptEssential}
              className="whitespace-nowrap"
            >
              Nur essenzielle Cookies
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={handleAcceptAll}
              className="whitespace-nowrap"
            >
              Alle akzeptieren
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleCustomize}
              className="whitespace-nowrap"
            >
              Anpassen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
