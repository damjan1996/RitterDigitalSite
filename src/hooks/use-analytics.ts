// src/hooks/use-analytics.ts
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { event as gaEvent, pageview } from '@/lib/analytics';

interface AnalyticsEvent {
    action: string;
    category: string;
    label?: string;
    value?: number;
}

/**
 * Hook für Google Analytics Integration
 * Verfolgt automatisch Seitenaufrufe und bietet Funktionen zum Tracking von Ereignissen
 */
export const useAnalytics = () => {
    const router = useRouter();

    // Seitenaufrufe verfolgen
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (process.env.NODE_ENV === 'production') {
                pageview(url);
            }
        };

        // Initialen Seitenaufruf tracken
        handleRouteChange(router.asPath);

        // Bei Routenwechsel tracken
        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.asPath, router.events]);

    // Funktion zum Tracking von benutzerdefinierten Ereignissen
    const trackEvent = useCallback(({ action, category, label, value }: AnalyticsEvent) => {
        if (process.env.NODE_ENV === 'production') {
            gaEvent({ action, category, label, value });
        } else {
            console.log('Analytics Event (Dev):', { action, category, label, value });
        }
    }, []);

    // Vordefinierte Ereignisse
    const trackContactFormSubmission = useCallback(() => {
        trackEvent({
            action: 'form_submission',
            category: 'contact',
            label: 'contact_form'
        });
    }, [trackEvent]);

    const trackDownload = useCallback((documentName: string) => {
        trackEvent({
            action: 'download',
            category: 'engagement',
            label: documentName
        });
    }, [trackEvent]);

    const trackExternalLinkClick = useCallback((url: string) => {
        trackEvent({
            action: 'click',
            category: 'outbound',
            label: url
        });
    }, [trackEvent]);

    const trackServiceInterest = useCallback((serviceName: string) => {
        trackEvent({
            action: 'view',
            category: 'service',
            label: serviceName
        });
    }, [trackEvent]);

    return {
        trackEvent,
        trackContactFormSubmission,
        trackDownload,
        trackExternalLinkClick,
        trackServiceInterest
    };
};

export default useAnalytics;