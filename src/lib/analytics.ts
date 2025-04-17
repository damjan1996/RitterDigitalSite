// src/lib/analytics.ts

// Typdeklaration für Google Analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    Leadinfo?: {
      trackPage: (id: string) => void;
    };
  }
}

// Google Analytics Tracking ID aus den Umgebungsvariablen
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// LeadInfo Tracking ID aus den Umgebungsvariablen
export const LEADINFO_ID = process.env.NEXT_PUBLIC_LEADINFO_ID;

/**
 * Initialisiert Google Analytics
 */
export const initGA = (): void => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || window.gtag) return;

  // Fügt das Google Analytics Script dynamisch ein
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialisiert das gtag-Objekt
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    anonymize_ip: true, // DSGVO-konform
    cookie_flags: 'SameSite=None;Secure',
    send_page_view: false, // Verhindert doppelte Pageviews
  });

  // LeadInfo initialisieren, wenn konfiguriert
  if (LEADINFO_ID) {
    initLeadInfo();
  }
};

/**
 * Initialisiert LeadInfo für B2B-Lead-Tracking
 */
const initLeadInfo = (): void => {
  if (!LEADINFO_ID || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn.leadinfo.net/ping.js';
  script.onload = () => {
    window.Leadinfo?.trackPage(LEADINFO_ID);
  };
  document.head.appendChild(script);
};

/**
 * Trackt einen Seitenaufruf in Google Analytics
 */
export const pageview = (url: string): void => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || !window.gtag) return;

  // Consent-Check
  const consentGiven = localStorage.getItem('cookie-consent') === 'all';
  if (!consentGiven) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

/**
 * Trackt ein Ereignis in Google Analytics
 */
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
}): void => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || !window.gtag) return;

  // Consent-Check
  const consentGiven = localStorage.getItem('cookie-consent') === 'all';
  if (!consentGiven) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

/**
 * Vordefinierte Ereignistypen für konsistentes Tracking
 */
export const eventTypes = {
  CONTACT_FORM_SUBMISSION: {
    action: 'submit',
    category: 'contact_form',
  },
  NEWSLETTER_SUBSCRIPTION: {
    action: 'subscribe',
    category: 'newsletter',
  },
  DOWNLOAD: {
    action: 'download',
    category: 'content',
  },
  EXTERNAL_LINK_CLICK: {
    action: 'click',
    category: 'external_link',
  },
  SERVICE_VIEW: {
    action: 'view',
    category: 'service',
  },
};

// Exportiere die gesamte Analytics-Funktionalität als benanntes Objekt
export const analytics = {
  initGA,
  pageview,
  event,
  eventTypes,
};

export default analytics;
