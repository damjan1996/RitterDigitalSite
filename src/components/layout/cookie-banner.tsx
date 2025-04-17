// src/components/layout/cookie-banner.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { initGA } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type ConsentLevel = 'all' | 'essential' | null;

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [consentLevel, setConsentLevel] = useState<ConsentLevel>(null);

  useEffect(() => {
    // Prüfe DSGVO-Cookie-Consent beim ersten Laden
    const storedConsent = localStorage.getItem('cookie-consent') as ConsentLevel;
    setConsentLevel(storedConsent);

    // Zeige Banner nur an, wenn keine Zustimmung gespeichert ist
    if (!storedConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000); // Leichte Verzögerung für bessere UX

      return () => clearTimeout(timer);
    }

    // Wenn bereits "all" Zustimmung vorhanden, initialisiere Analytics
    if (storedConsent === 'all') {
      initGA();
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setConsentLevel('all');
    setIsVisible(false);
    initGA(); // Initialisiere Analytics
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setConsentLevel('essential');
    setIsVisible(false);
  };

  const handleCustomize = () => {
    // Hier könnte ein Modal für detailliertere Cookie-Einstellungen geöffnet werden
    // Für jetzt einfach als Platzhalter
    alert('Diese Funktion zur individuellen Cookie-Einstellung wird in Kürze verfügbar sein.');
  };

  if (!isVisible) return null;

  return (
      <div className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200",
          "transform transition-transform duration-300",
          isVisible ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="container mx-auto py-4 px-4 md:py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1 max-w-3xl">
              <h3 className="text-lg font-semibold mb-2">Datenschutzhinweis</h3>
              <p className="text-secondary text-sm md:text-base mb-2">
                Wir verwenden Cookies und ähnliche Technologien auf unserer Website, um das Nutzererlebnis zu verbessern und unsere Dienste zu optimieren. Einige sind erforderlich, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.
              </p>
              <p className="text-sm text-tertiary">
                Weitere Informationen finden Sie in unserer{' '}
                <Link href="/datenschutz" className="text-accent underline">
                  Datenschutzerklärung
                </Link>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAcceptEssential}
                  className="whitespace-nowrap"
              >
                Nur essenzielle Cookies
              </Button>

              <Button
                  variant="accent"
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