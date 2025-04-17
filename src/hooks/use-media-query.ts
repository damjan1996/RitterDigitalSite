// src/hooks/use-media-query.ts
import { useState, useEffect } from 'react';

/**
 * Hook zur Erkennung von Media Queries
 * Ermöglicht responsive Anpassungen basierend auf der Bildschirmgröße
 *
 * @param query Die Media Query, die überwacht werden soll (z.B. '(min-width: 768px)')
 * @returns Boolean, der angibt, ob die Media Query übereinstimmt
 */
export const useMediaQuery = (query: string): boolean => {
    // SSR-Sicherheit: Fallback-Wert für Server-Rendering
    const getMatches = (query: string): boolean => {
        // Prüfen, ob im Browser ausgeführt
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState<boolean>(getMatches(query));

    useEffect(() => {
        // Initialer Wert bei Komponenten-Mount
        setMatches(getMatches(query));

        // Media Query-Listener erstellen
        const mediaQuery = window.matchMedia(query);

        // Handler für Änderungen definieren
        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Listener hinzufügen mit Browserkompatibilität
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            // Fallback für ältere Browser
            mediaQuery.addListener(handleChange);
        }

        // Cleanup-Funktion
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                // Fallback für ältere Browser
                mediaQuery.removeListener(handleChange);
            }
        };
    }, [query]);

    return matches;
};

// Vordefinierte Breakpoints basierend auf Tailwind CSS
export const useBreakpoint = () => {
    const isSm = useMediaQuery('(min-width: 640px)');
    const isMd = useMediaQuery('(min-width: 768px)');
    const isLg = useMediaQuery('(min-width: 1024px)');
    const isXl = useMediaQuery('(min-width: 1280px)');
    const is2xl = useMediaQuery('(min-width: 1536px)');

    const current =
        is2xl ? '2xl' :
            isXl ? 'xl' :
                isLg ? 'lg' :
                    isMd ? 'md' :
                        isSm ? 'sm' :
                            'xs';

    return {
        isMobile: !isMd,     // xs, sm
        isTablet: isMd && !isLg, // md
        isDesktop: isLg,    // lg, xl, 2xl
        isSm,
        isMd,
        isLg,
        isXl,
        is2xl,
        current
    };
};

export default useMediaQuery;