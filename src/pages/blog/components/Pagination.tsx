// src/pages/blog/components/Pagination.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
    className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          totalPages,
                                                          onPageChange,
                                                          maxVisiblePages = 5,
                                                          className,
                                                      }) => {
    // Kein Rendering, wenn nur eine Seite vorhanden ist
    if (totalPages <= 1) return null;

    // Bestimme, welche Seiten angezeigt werden sollen
    const getVisiblePageNumbers = () => {
        // Wenn weniger als maxVisiblePages, zeige alle
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Berechne die Anzahl der Seiten links und rechts der aktuellen Seite
        const sidePages = Math.floor((maxVisiblePages - 3) / 2);
        const leftSide = Math.max(2, currentPage - sidePages);
        const rightSide = Math.min(totalPages - 1, currentPage + sidePages);

        const visiblePages = [1];

        // Ellipsis links hinzufügen, wenn nötig
        if (leftSide > 2) {
            visiblePages.push(-1); // -1 als Marker für Ellipsis
        }

        // Mittlere Seiten hinzufügen
        for (let i = leftSide; i <= rightSide; i++) {
            visiblePages.push(i);
        }

        // Ellipsis rechts hinzufügen, wenn nötig
        if (rightSide < totalPages - 1) {
            visiblePages.push(-2); // -2 als Marker für Ellipsis (unterschiedlich von links)
        }

        // Letzte Seite hinzufügen
        visiblePages.push(totalPages);

        return visiblePages;
    };

    const visiblePageNumbers = getVisiblePageNumbers();

    return (
        <nav
            role="navigation"
            aria-label="Pagination Navigation"
            className={cn("flex justify-center items-center", className)}
        >
            {/* Zurück-Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Vorherige Seite"
                className="mr-1"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Seitenzahlen */}
            <div className="flex space-x-1">
                {visiblePageNumbers.map((pageNum, index) => {
                    // Render Ellipsis
                    if (pageNum < 0) {
                        return (
                            <div
                                key={`ellipsis-${pageNum}`}
                                className="flex items-center justify-center w-8 h-8"
                            >
                                <MoreHorizontal className="h-4 w-4 text-tertiary" />
                            </div>
                        );
                    }

                    // Render Seitenzahl
                    return (
                        <Button
                            key={`page-${pageNum}`}
                            variant={pageNum === currentPage ? "default" : "ghost"}
                            size="sm"
                            onClick={() => onPageChange(pageNum)}
                            aria-label={`Seite ${pageNum}`}
                            aria-current={pageNum === currentPage ? "page" : undefined}
                            className="w-8 h-8 p-0 text-sm"
                        >
                            {pageNum}
                        </Button>
                    );
                })}
            </div>

            {/* Weiter-Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Nächste Seite"
                className="ml-1"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </nav>
    );
};

export default Pagination;