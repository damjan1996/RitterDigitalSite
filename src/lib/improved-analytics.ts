// src/lib/improved-analytics.ts
import { SITE_URL } from './constants';

// Typdeklaration für Google Analytics und andere Tracking-Dienste
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    Leadinfo?: {
      trackPage: (id: string) => void;
    };
    _paq?: any[];
    fbq?: any;
    clarity?: any;
  }
}

// Google Analytics Tracking ID
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// LeadInfo Tracking ID
export const LEADINFO_ID = process.env.NEXT_PUBLIC_LEADINFO_ID;

// Matomo/Piwik Analytics URL und Site ID
export const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
export const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

// Microsoft Clarity Tracking ID
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

// Facebook Pixel ID
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// Prüft, ob Consent gegeben wurde
const hasConsent = (category: 'analytics' | 'marketing' | 'functional'): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const consentString = localStorage.getItem('cookie-consent');

    // Wenn expliziter Consent für alle Cookies
    if (consentString === 'all') return true;

    // Wenn Cookie-Einstellungen detaillierter gespeichert wurden
    if (consentString?.startsWith('{')) {
      const consentSettings = JSON.parse(consentString);
      return !!consentSettings[category];
    }

    return false;
  } catch (error) {
    console.error('Error checking consent:', error);
    return false;
  }
};

/**
 * Initialisiert Google Analytics 4
 */
export const initGA = (): void => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || window.gtag) return;

  // Prüfe Consent
  if (!hasConsent('analytics')) return;

  // Fügt das Google Analytics Script dynamisch ein
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialisiert das gtag-Objekt
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    anonymize_ip: true, // DSGVO-konform
    cookie_flags: 'SameSite=None;Secure',
    send_page_view: false, // Verhindert doppelte Pageviews
    transport_url: 'https://www.googletagmanager.com', // Definiert explizite Domain (für CNAME-Setup)
    cookie_domain: 'auto', // Automatische Cookie-Domain
    cookie_expires: 28 * 24 * 60 * 60, // Cookie-Ablauf in Sekunden (28 Tage)
  });

  // Erweiterte E-Commerce-Tracking aktivieren (falls benötigt)
  // window.gtag('require', 'ec');

  // Consent-Mode aktivieren
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'granted', // Bereits geprüft
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500, // Wartet max. 500ms auf weitere Consent-Updates
  });

  console.log('Google Analytics initialized');
};

/**
 * Initialisiert LeadInfo für B2B-Lead-Tracking
 */
export const initLeadInfo = (): void => {
  if (!LEADINFO_ID || typeof window === 'undefined') return;

  // Prüfe Consent
  if (!hasConsent('marketing')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn.leadinfo.net/ping.js';
  script.onload = () => {
    window.Leadinfo?.trackPage(LEADINFO_ID);
  };
  document.head.appendChild(script);

  console.log('LeadInfo initialized');
};

/**
 * Initialisiert Microsoft Clarity für Heatmaps und Session-Aufzeichnung
 */
export const initMicrosoftClarity = (): void => {
  if (!CLARITY_ID || typeof window === 'undefined') return;

  // Prüfe Consent
  if (!hasConsent('analytics')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.clarity.ms/tag/' + CLARITY_ID;
  document.head.appendChild(script);

  console.log('Microsoft Clarity initialized');
};

/**
 * Initialisiert Facebook Pixel
 */
export const initFacebookPixel = (): void => {
  if (!FB_PIXEL_ID || typeof window === 'undefined') return;

  // Prüfe Consent
  if (!hasConsent('marketing')) return;

  // Facebook Pixel Code
  window.fbq = function (...args: unknown[]) {
    (window.fbq as any).callMethod
      ? (window.fbq as any).callMethod.apply(window.fbq, args)
      : (window.fbq as any).queue.push(args);
  };

  if (!(window.fbq as any).callMethod) {
    (window.fbq as any) = function (...args: unknown[]) {
      (window.fbq as any).queue.push(args);
    };
    (window.fbq as any).push = window.fbq;
    (window.fbq as any).loaded = true;
    (window.fbq as any).version = '2.0';
    (window.fbq as any).queue = [];
  }

  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');

  // Pixel Script hinzufügen
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  console.log('Facebook Pixel initialized');
};

/**
 * Initialisiert Matomo/Piwik Analytics
 */
export const initMatomo = (): void => {
  if (!MATOMO_URL || !MATOMO_SITE_ID || typeof window === 'undefined') return;

  // Prüfe Consent
  if (!hasConsent('analytics')) return;

  // Matomo Tracking Code
  window._paq = window._paq || [];

  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  window._paq.push(['requireConsent']);
  window._paq.push(['setDocumentTitle', document.title]);
  window._paq.push(['disableCookies']); // Cookies nur aktivieren, wenn Consent gegeben
  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);

  // Consent bereits geprüft
  window._paq.push(['rememberConsentGiven']);

  (function () {
    const u = MATOMO_URL;
    window._paq.push(['setTrackerUrl', u + 'matomo.php']);
    window._paq.push(['setSiteId', MATOMO_SITE_ID]);
    const d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.src = u + 'matomo.js';
    s.parentNode?.insertBefore(g, s);
  })();

  console.log('Matomo initialized');
};

/**
 * Initialisiere alle Analytics-Dienste
 */
export const initAllAnalytics = (): void => {
  // Inizialisiere alle Tracking-Tools
  initGA();
  initLeadInfo();
  initMicrosoftClarity();
  initFacebookPixel();
  initMatomo();
};

/**
 * Update Consent-Status für alle Tracking-Dienste
 */
export const updateConsentStatus = (
  analytics: boolean = false,
  marketing: boolean = false,
  functional: boolean = true
): void => {
  // Google Analytics Consent aktualisieren
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      functionality_storage: functional ? 'granted' : 'denied',
      personalization_storage: marketing ? 'granted' : 'denied',
    });
  }

  // Matomo Consent aktualisieren
  if (window._paq) {
    if (analytics) {
      window._paq.push(['rememberConsentGiven']);
    } else {
      window._paq.push(['forgetConsentGiven']);
    }
  }

  // Lade Tracking-Skripte nach, falls Consent gegeben
  if (analytics && !window.gtag) {
    initGA();
    initMicrosoftClarity();
    initMatomo();
  }

  if (marketing && !window.Leadinfo) {
    initLeadInfo();
    initFacebookPixel();
  }

  console.log('Consent status updated', { analytics, marketing, functional });
};

/**
 * Trackt einen Seitenaufruf in allen Analytics-Diensten
 */
export const trackPageView = (url: string, title?: string): void => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('config', GA_TRACKING_ID || '', {
      page_path: url,
      page_title: title || document.title,
      page_location: SITE_URL + url,
    });
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }

  // Matomo
  if (window._paq) {
    window._paq.push(['setCustomUrl', url]);
    window._paq.push(['setDocumentTitle', title || document.title]);
    window._paq.push(['trackPageView']);
  }

  // LeadInfo
  if (window.Leadinfo) {
    window.Leadinfo.trackPage(LEADINFO_ID || '');
  }

  console.log('Page view tracked', { url, title });
};

/**
 * Trackt ein Ereignis in Google Analytics
 */
export const trackEvent = ({
  action,
  category,
  label,
  value,
  nonInteraction = false,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}): void => {
  // Google Analytics 4 Event
  if (window.gtag) {
    const eventParams: Record<string, unknown> = {
      event_category: category,
      non_interaction: nonInteraction,
    };

    if (label) eventParams.event_label = label;
    if (value !== undefined) eventParams.value = value;

    window.gtag('event', action, eventParams);
  }

  // Matomo Event
  if (window._paq) {
    window._paq.push(['trackEvent', category, action, label, value]);
  }

  console.log('Event tracked', { action, category, label, value, nonInteraction });
};

/**
 * Trackt einen Conversion
 */
export const trackConversion = (action: string, value?: number, currency: string = 'EUR'): void => {
  // Google Analytics 4 Conversion
  if (window.gtag) {
    const conversionParams: Record<string, unknown> = {
      send_to: GA_TRACKING_ID,
    };

    if (value !== undefined) {
      conversionParams.value = value;
      conversionParams.currency = currency;
    }

    window.gtag('event', action, conversionParams);
  }

  // Facebook Pixel Conversion
  if (window.fbq) {
    const fbParams: Record<string, unknown> = {};

    if (value !== undefined) {
      fbParams.value = value;
      fbParams.currency = currency;
    }

    window.fbq('track', action, fbParams);
  }

  console.log('Conversion tracked', { action, value, currency });
};

/**
 * Vordefinierte Ereignistypen für konsistentes Tracking
 */
export const eventTypes = {
  CONTACT_FORM_SUBMISSION: {
    action: 'submit_form',
    category: 'contact',
  },
  NEWSLETTER_SUBSCRIPTION: {
    action: 'subscribe',
    category: 'newsletter',
  },
  DOWNLOAD: {
    action: 'download',
    category: 'engagement',
  },
  EXTERNAL_LINK_CLICK: {
    action: 'click',
    category: 'outbound',
  },
  SERVICE_VIEW: {
    action: 'view_item',
    category: 'service',
  },
  // Spezifische E-Commerce-Events
  VIEW_ITEM: 'view_item',
  ADD_TO_CART: 'add_to_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  // Spezifische Lead-Events
  GENERATE_LEAD: 'generate_lead',
  COMPLETE_REGISTRATION: 'complete_registration',
  SCHEDULE_APPOINTMENT: 'schedule',
};

/**
 * Erweitertes Tracking für Nutzerverhalten
 */
export const trackUserBehavior = (): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  // Prüfe Consent
  if (!hasConsent('analytics')) return () => {};

  try {
    // Scroll-Tiefe tracken
    let maxScrollPercentage = 0;

    const trackScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);

      // Nur tracken wenn neue maximale Scroll-Tiefe erreicht wurde (25%, 50%, 75%, 90%)
      const thresholds = [25, 50, 75, 90];

      for (const threshold of thresholds) {
        if (scrollPercentage >= threshold && maxScrollPercentage < threshold) {
          trackEvent({
            action: 'scroll',
            category: 'user_engagement',
            label: `scroll_depth_${threshold}`,
            nonInteraction: true,
          });
          maxScrollPercentage = threshold;
        }
      }
    };

    window.addEventListener('scroll', debounce(trackScroll, 500));

    // Aufenthaltsdauer tracken (alle 30 Sekunden)
    const timeSpentIntervals = [30, 60, 120, 180, 300];
    let lastTrackedInterval = 0;

    const trackTimeSpent = () => {
      const timeSpent = Math.floor((Date.now() - window.performance.timing.navigationStart) / 1000);

      for (const interval of timeSpentIntervals) {
        if (timeSpent >= interval && lastTrackedInterval < interval) {
          trackEvent({
            action: 'time_spent',
            category: 'user_engagement',
            label: `time_spent_${interval}s`,
            nonInteraction: true,
          });
          lastTrackedInterval = interval;
        }
      }
    };

    const timeSpentTracker = setInterval(trackTimeSpent, 30000);

    // Externe Links tracken
    document.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.hostname !== window.location.hostname) {
        trackEvent({
          action: 'click',
          category: 'outbound',
          label: anchor.href,
        });
      }
    });

    // Datei-Downloads tracken
    document.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href) {
        const fileExtensions = [
          '.pdf',
          '.zip',
          '.doc',
          '.docx',
          '.xls',
          '.xlsx',
          '.csv',
          '.ppt',
          '.pptx',
        ];
        const isDownload = fileExtensions.some(ext => anchor.href.toLowerCase().endsWith(ext));

        if (isDownload) {
          trackEvent({
            action: 'download',
            category: 'file_download',
            label: anchor.href.split('/').pop() || anchor.href,
          });
        }
      }
    });

    // Cleanup
    return () => {
      clearInterval(timeSpentTracker);
    };
  } catch (error) {
    console.error('Error in user behavior tracking:', error);
    return () => {};
  }
};

/**
 * E-Commerce Tracking für einen Kauf
 */
export const trackPurchase = (
  transaction_id: string,
  value: number,
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>,
  currency: string = 'EUR'
): void => {
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id,
      value,
      currency,
      items,
    });
  }

  if (window.fbq) {
    window.fbq('track', 'Purchase', {
      value,
      currency,
      content_ids: items.map(item => item.item_id),
      content_name: items.map(item => item.item_name).join(', '),
      contents: items,
      num_items: items.reduce((sum, item) => sum + item.quantity, 0),
    });
  }

  console.log('Purchase tracked', { transaction_id, value, items, currency });
};

// Hilfsfunktion: Debounce
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Exportiere alle Analytics-Funktionen
export const analytics = {
  initGA,
  initLeadInfo,
  initMicrosoftClarity,
  initFacebookPixel,
  initMatomo,
  initAllAnalytics,
  updateConsentStatus,
  trackPageView,
  trackEvent,
  trackConversion,
  trackUserBehavior,
  trackPurchase,
  eventTypes,
};

export default analytics;
