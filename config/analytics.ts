// config/analytics.ts
// Google Analytics Konfiguration

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Initialisiert Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || (window as any).gtag) return;

  // Google Analytics Script dynamisch laden
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // gtag konfigurieren
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  };

  (window as any).gtag('js', new Date());
  (window as any).gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
  });
};

// Seitenaufrufe tracken
export const pageview = (url: string) => {
  if (typeof window === 'undefined' || !(window as any).gtag) return;
  (window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url,
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
  if (typeof window === 'undefined' || !(window as any).gtag) return;
  (window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
