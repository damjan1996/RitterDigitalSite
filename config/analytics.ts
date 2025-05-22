// config/analytics.ts
// Google Analytics Konfiguration - App Router kompatibel

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Initialisiert Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || typeof window.gtag === 'function') return;

  // Google Analytics Script dynamisch laden
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // gtag konfigurieren
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    // ✅ Remove window.location.pathname - let GA handle this automatically
    page_title: typeof document !== 'undefined' ? document.title : '',
    custom_map: { metric1: 'app_router' }, // Mark as App Router usage
  });
};

// Seitenaufrufe tracken - App Router kompatibel
export const pageview = (url: string, title?: string) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag!('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title || document.title,
  });
};

// Events tracken
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag!('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Hook für App Router Integration
export const useAnalytics = () => {
  const trackPage = (pathname: string, title?: string) => {
    if (typeof window === 'undefined') return;

    const url = `${window.location.origin}${pathname}`;
    const pageTitle = title || document.title;
    pageview(url, pageTitle);
  };

  const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', eventName, parameters);
  };

  const trackConversion = (conversionId: string, conversionValue?: number) => {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: conversionValue,
      currency: 'EUR',
    });
  };

  return {
    trackPage,
    trackEvent: event,
    trackCustomEvent,
    trackConversion,
  };
};

// App Router Page Tracking Component
export const GAPageTracker = ({ pathname, title }: { pathname: string; title?: string }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const url = `${window.location.origin}${pathname}`;
    pageview(url, title);
  }

  return null; // This is a tracking component, renders nothing
};
