// src/components/layout/cookie-banner.tsx
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { initGA } from '@/lib/analytics';
import { cn } from '@/lib/utils';

// Erweiterte Definition der Cookie-Kategorien
type ConsentLevel = 'all' | 'custom' | 'essential';

// Struktur für die verschiedenen Cookie-Typen
interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  defaultEnabled: boolean;
  cookies: CookieInfo[];
}

interface CookieInfo {
  name: string;
  purpose: string;
  provider: string;
  expiry: string;
}

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('cookie-settings');

  // Status für die Cookie-Kategorien
  const [cookieConsent, setCookieConsent] = useState<Record<string, boolean>>({
    essential: true, // Immer aktiviert
    analytics: false,
    marketing: false,
    functional: false,
  });

  // Cookie-Kategorien mit Details
  const cookieCategories: CookieCategory[] = [
    {
      id: 'essential',
      name: 'Essenziell',
      description:
        'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
      required: true,
      defaultEnabled: true,
      cookies: [
        {
          name: 'cookie-consent',
          purpose: 'Speichert Ihre Cookie-Einstellungen',
          provider: 'Ritter Digital',
          expiry: '1 Jahr',
        },
        {
          name: 'session-id',
          purpose: 'Verwaltet Ihre aktuelle Sitzung',
          provider: 'Ritter Digital',
          expiry: 'Sitzung',
        },
      ],
    },
    {
      id: 'functional',
      name: 'Funktional',
      description:
        'Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung, wie z.B. Videos und Live-Chats.',
      required: false,
      defaultEnabled: false,
      cookies: [
        {
          name: 'preferences',
          purpose: 'Speichert Ihre bevorzugten Einstellungen',
          provider: 'Ritter Digital',
          expiry: '30 Tage',
        },
        {
          name: 'language',
          purpose: 'Speichert Ihre Spracheinstellungen',
          provider: 'Ritter Digital',
          expiry: '30 Tage',
        },
      ],
    },
    {
      id: 'analytics',
      name: 'Analyse',
      description:
        'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und melden.',
      required: false,
      defaultEnabled: false,
      cookies: [
        {
          name: '_ga',
          purpose: 'Verwendet von Google Analytics zum Unterscheiden einzelner Nutzer',
          provider: 'Google',
          expiry: '2 Jahre',
        },
        {
          name: '_gid',
          purpose: 'Verwendet von Google Analytics zum Identifizieren von Nutzern',
          provider: 'Google',
          expiry: '24 Stunden',
        },
      ],
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description:
        'Diese Cookies werden verwendet, um Besucher auf Websites zu verfolgen. Die Absicht ist, Anzeigen zu zeigen, die relevant und ansprechend für den einzelnen Benutzer sind.',
      required: false,
      defaultEnabled: false,
      cookies: [
        {
          name: '_fbp',
          purpose: 'Verwendet von Facebook für Werbezwecke',
          provider: 'Facebook',
          expiry: '3 Monate',
        },
        {
          name: 'ads_prefs',
          purpose: 'Speichert Ihre Werbeeinstellungen',
          provider: 'Ritter Digital',
          expiry: '6 Monate',
        },
      ],
    },
  ];

  useEffect(() => {
    // Lade gespeicherte Einstellungen
    const loadSavedPreferences = () => {
      const storedConsent = localStorage.getItem('cookie-consent') as ConsentLevel | null;
      const storedSettings = localStorage.getItem('cookie-settings');

      if (storedSettings) {
        try {
          const parsedSettings = JSON.parse(storedSettings);
          setCookieConsent(prevState => ({
            ...prevState,
            ...parsedSettings,
          }));

          // Wenn Analytics aktiviert ist, initialisieren
          if (parsedSettings.analytics) {
            initGA();
          }
        } catch (error) {
          console.error('Fehler beim Laden der Cookie-Einstellungen:', error);
        }
      } else if (!storedConsent) {
        // Wenn noch keine Einstellungen vorhanden sind, Banner anzeigen
        setTimeout(() => setIsVisible(true), 1000);
      } else if (storedConsent === 'all') {
        // Wenn "Alle Cookies" akzeptiert wurden
        setCookieConsent({
          essential: true,
          analytics: true,
          marketing: true,
          functional: true,
        });
        initGA();
      }
    };

    loadSavedPreferences();
  }, []);

  const savePreferences = (settings: Record<string, boolean>) => {
    // Speichere Einstellungen
    localStorage.setItem('cookie-settings', JSON.stringify(settings));

    // Setze Cookie-Consent basierend auf ausgewählten Optionen
    const allAccepted = Object.entries(settings).every(
      ([key, value]) => key === 'essential' || value === true
    );

    const consentLevel: ConsentLevel = allAccepted ? 'all' : 'custom';
    localStorage.setItem('cookie-consent', consentLevel);

    // Initialisiere Analytics wenn aktiviert
    if (settings.analytics) {
      initGA();
    }

    setCookieConsent(settings);
  };

  const handleAcceptAll = () => {
    const allSettings = cookieCategories.reduce(
      (acc, category) => {
        acc[category.id] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );

    savePreferences(allSettings);
    setIsVisible(false);
    setShowSettings(false);
    initGA();
  };

  const handleAcceptEssential = () => {
    const essentialSettings = cookieCategories.reduce(
      (acc, category) => {
        acc[category.id] = category.required;
        return acc;
      },
      {} as Record<string, boolean>
    );

    savePreferences(essentialSettings);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleCustomize = () => {
    setShowSettings(true);
  };

  const handleSaveSettings = () => {
    savePreferences(cookieConsent);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleCategoryChange = (categoryId: string, isChecked: boolean) => {
    setCookieConsent(prev => ({
      ...prev,
      [categoryId]: isChecked,
    }));
  };

  // Haupt-Banner
  const renderMainBanner = () => {
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

  // Settings Modal (ohne Dialog-Komponente)
  const renderSettingsModal = () => {
    if (!showSettings) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between border-b pb-2">
            <h2 className="text-xl font-semibold">Cookie-Einstellungen</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="mb-6">
            {/* Tabs */}
            <div className="mb-4 border-b">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('cookie-settings')}
                  className={`border-b-2 pb-2 ${
                    activeTab === 'cookie-settings'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent'
                  }`}
                >
                  Einstellungen
                </button>
                <button
                  onClick={() => setActiveTab('cookie-info')}
                  className={`border-b-2 pb-2 ${
                    activeTab === 'cookie-info'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent'
                  }`}
                >
                  Informationen
                </button>
              </div>
            </div>

            {/* Settings Tab Content */}
            {activeTab === 'cookie-settings' && (
              <div className="space-y-4">
                <p className="text-sm text-secondary">
                  Sie können hier Ihre Cookie-Präferenzen anpassen. Bitte beachten Sie, dass einige
                  Cookies für die grundlegenden Funktionen der Website erforderlich sind.
                </p>

                <div className="space-y-4">
                  {cookieCategories.map(category => (
                    <div
                      key={category.id}
                      className="flex items-start space-x-3 rounded-md border p-4"
                    >
                      <input
                        type="checkbox"
                        id={`cookie-${category.id}`}
                        checked={cookieConsent[category.id]}
                        onChange={e => handleCategoryChange(category.id, e.target.checked)}
                        disabled={category.required}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <div className="space-y-1">
                        <label
                          htmlFor={`cookie-${category.id}`}
                          className="block cursor-pointer font-medium"
                        >
                          {category.name}{' '}
                          {category.required && (
                            <span className="text-xs text-accent">(Erforderlich)</span>
                          )}
                        </label>
                        <p className="text-sm text-secondary">{category.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Tab Content */}
            {activeTab === 'cookie-info' && (
              <div>
                <p className="mb-4 text-sm text-secondary">
                  Hier finden Sie detaillierte Informationen zu allen Cookies, die wir auf unserer
                  Website verwenden.
                </p>

                <div className="space-y-4">
                  {cookieCategories.map(category => (
                    <details key={category.id} className="rounded border">
                      <summary className="cursor-pointer bg-gray-50 p-3 font-medium">
                        {category.name}
                      </summary>
                      <div className="space-y-4 p-3">
                        <p className="text-sm text-secondary">{category.description}</p>

                        <div className="rounded-md border">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                  Name
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                  Zweck
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                  Anbieter
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                  Ablauf
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {category.cookies.map((cookie, index) => (
                                <tr key={index}>
                                  <td className="whitespace-nowrap px-3 py-2 text-xs">
                                    {cookie.name}
                                  </td>
                                  <td className="px-3 py-2 text-xs">{cookie.purpose}</td>
                                  <td className="whitespace-nowrap px-3 py-2 text-xs">
                                    {cookie.provider}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-2 text-xs">
                                    {cookie.expiry}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Abbrechen
            </Button>
            <Button variant="default" onClick={handleSaveSettings}>
              Einstellungen speichern
            </Button>
            <Button variant="default" onClick={handleAcceptAll}>
              Alle akzeptieren
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderMainBanner()}
      {renderSettingsModal()}
    </>
  );
};

export default CookieBanner;
