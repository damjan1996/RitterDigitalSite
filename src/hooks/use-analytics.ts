'use client';

// src/hooks/use-analytics.ts
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useCallback } from 'react';

import { event as gaEvent, pageview } from '@/lib/analytics';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Hook für Google Analytics Integration (App Router Version)
 * Verfolgt automatisch Seitenaufrufe und bietet Funktionen zum Tracking von Ereignissen
 */
export const useAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Seitenaufrufe verfolgen
  useEffect(() => {
    // Konstruiere die vollständige URL für Tracking mit null-Check
    const searchString = searchParams?.toString() || '';
    const url = pathname + (searchString ? `?${searchString}` : '');

    if (process.env.NODE_ENV === 'production') {
      pageview(url);
    }
  }, [pathname, searchParams]);

  // Funktion zum Tracking von benutzerdefinierten Ereignissen
  const trackEvent = useCallback(
    ({ action, category, label, value }: AnalyticsEvent) => {
      if (process.env.NODE_ENV === 'production') {
        gaEvent({ action, category, label, value });
      }
    },
    []
  );

  // Vordefinierte Ereignisse
  const trackContactFormSubmission = useCallback(() => {
    trackEvent({
      action: 'form_submission',
      category: 'contact',
      label: 'contact_form',
    });
  }, [trackEvent]);

  const trackDownload = useCallback(
    (documentName: string) => {
      trackEvent({
        action: 'download',
        category: 'engagement',
        label: documentName,
      });
    },
    [trackEvent]
  );

  const trackExternalLinkClick = useCallback(
    (url: string) => {
      trackEvent({
        action: 'click',
        category: 'outbound',
        label: url,
      });
    },
    [trackEvent]
  );

  const trackServiceInterest = useCallback(
    (serviceName: string) => {
      trackEvent({
        action: 'view',
        category: 'service',
        label: serviceName,
      });
    },
    [trackEvent]
  );

  const trackPageView = useCallback(
    (url?: string) => {
      // Null-safe Behandlung von searchParams
      const searchString = searchParams?.toString() || '';
      const trackingUrl =
        url || pathname + (searchString ? `?${searchString}` : '');

      if (process.env.NODE_ENV === 'production') {
        pageview(trackingUrl);
      }
    },
    [pathname, searchParams]
  );

  return {
    trackEvent,
    trackContactFormSubmission,
    trackDownload,
    trackExternalLinkClick,
    trackServiceInterest,
    trackPageView,
  };
};

export default useAnalytics;
