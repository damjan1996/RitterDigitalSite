import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

interface ScrollDirection {
  vertical: 'up' | 'down' | null;
  horizontal: 'left' | 'right' | null;
}

interface ScrollInfo extends ScrollPosition {
  direction: ScrollDirection;
  isScrolling: boolean;
  isAtTop: boolean;
  isAtBottom: boolean;
  percentage: number;
}

interface UseScrollOptions {
  throttleMs?: number;
  offsetTop?: number;
  offsetBottom?: number;
}

/**
 * Hook zum Überwachen und Reagieren auf Scroll-Ereignisse
 * Liefert detaillierte Informationen zum aktuellen Scroll-Status
 *
 * @param options Konfigurationsoptionen für den Hook
 * @returns Scroll-Informationen und Hilfsfunktionen
 */
export const useScroll = (
  options: UseScrollOptions = {}
): ScrollInfo & {
  scrollTo: (
    target: ScrollPosition | HTMLElement | string,
    smooth?: boolean
  ) => void;
} => {
  const { throttleMs = 100, offsetTop = 50, offsetBottom = 50 } = options;

  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });
  const [direction, setDirection] = useState<ScrollDirection>({
    vertical: null,
    horizontal: null,
  });
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

  const prevPosition = useRef<ScrollPosition>({ x: 0, y: 0 });
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  // Scroll-Zustand aktualisieren
  const updateScrollInfo = useCallback(() => {
    if (typeof window === 'undefined') return;

    const currentPosition: ScrollPosition = {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop,
    };

    // Nur aktualisieren, wenn sich die Position geändert hat
    if (
      prevPosition.current.x !== currentPosition.x ||
      prevPosition.current.y !== currentPosition.y
    ) {
      // Berechnungen für die Scroll-Richtung
      const newDirection: ScrollDirection = {
        vertical:
          currentPosition.y > prevPosition.current.y
            ? 'down'
            : currentPosition.y < prevPosition.current.y
              ? 'up'
              : direction.vertical,
        horizontal:
          currentPosition.x > prevPosition.current.x
            ? 'right'
            : currentPosition.x < prevPosition.current.x
              ? 'left'
              : direction.horizontal,
      };

      // Prüfen, ob am Anfang oder Ende der Seite
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const windowHeight = window.innerHeight;

      const newIsAtTop = currentPosition.y <= offsetTop;
      const newIsAtBottom =
        currentPosition.y + windowHeight >= documentHeight - offsetBottom;

      // Prozentsatz des Scrolls berechnen
      const newPercentage = Math.min(
        100,
        Math.floor((currentPosition.y / (documentHeight - windowHeight)) * 100)
      );

      // Zustand aktualisieren
      setScrollPosition(currentPosition);
      setDirection(newDirection);
      setIsAtTop(newIsAtTop);
      setIsAtBottom(newIsAtBottom);
      setPercentage(newPercentage);
      setIsScrolling(true);

      // Timeout für isScrolling-Status
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // Aktuelle Position für den nächsten Vergleich speichern
      prevPosition.current = currentPosition;
    }
  }, [direction, offsetTop, offsetBottom]);

  // Scroll-Handler mit Throttling
  const handleScroll = useCallback(() => {
    if (throttleTimeout.current) return;

    throttleTimeout.current = setTimeout(() => {
      updateScrollInfo();
      throttleTimeout.current = null;
    }, throttleMs);
  }, [throttleMs, updateScrollInfo]);

  // Scroll-Hilfsfunktion
  const scrollTo = useCallback(
    (target: ScrollPosition | HTMLElement | string, smooth: boolean = true) => {
      if (typeof window === 'undefined') return;

      let scrollOptions: ScrollToOptions = {
        behavior: smooth ? 'smooth' : 'auto',
      };

      if (typeof target === 'string') {
        // Scroll zu einem Element per Selektor
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({
            behavior: smooth ? 'smooth' : 'auto',
            block: 'start',
          });
        }
      } else if (target instanceof HTMLElement) {
        // Scroll zu einem DOM-Element
        target.scrollIntoView({
          behavior: smooth ? 'smooth' : 'auto',
          block: 'start',
        });
      } else {
        // Scroll zu spezifischen Koordinaten
        scrollOptions = {
          ...scrollOptions,
          left: target.x,
          top: target.y,
        };
        window.scrollTo(scrollOptions);
      }
    },
    []
  );

  // Scroll-Listener einrichten
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialen Zustand abrufen
    updateScrollInfo();

    // Event-Listener hinzufügen
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Event-Listener entfernen
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [handleScroll, updateScrollInfo]);

  return {
    x: scrollPosition.x,
    y: scrollPosition.y,
    direction,
    isScrolling,
    isAtTop,
    isAtBottom,
    percentage,
    scrollTo,
  };
};

export default useScroll;
