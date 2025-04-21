'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className,
}: PaginationProps) => {
  // Kein Rendering, wenn nur eine Seite vorhanden ist
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

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
    <motion.nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={cn('flex items-center justify-center', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Zurück-Button */}
      <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Vorherige Seite"
          className="mr-1"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Seitenzahlen */}
      <div className="flex space-x-1">
        {visiblePageNumbers.map(pageNum => {
          // Render Ellipsis
          if (pageNum < 0) {
            return (
              <div key={`ellipsis-${pageNum}`} className="flex h-8 w-8 items-center justify-center">
                <MoreHorizontal className="h-4 w-4 text-[#3D5A73]" />
              </div>
            );
          }

          // Render Seitenzahl
          return (
            <motion.div key={`page-${pageNum}`} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={pageNum === currentPage ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handlePageChange(pageNum)}
                aria-label={`Seite ${pageNum}`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
                className={cn(
                  'h-8 w-8 p-0 text-sm',
                  pageNum === currentPage && 'bg-[#FF7A35] hover:bg-[#FF7A35]/90'
                )}
              >
                {pageNum}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Weiter-Button */}
      <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Nächste Seite"
          className="ml-1"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.nav>
  );
};

export default Pagination;
