// src/pages/blog/components/Search.tsx
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { debounce } from '@/lib/utils';

interface SearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  placeholder?: string;
  className?: string;
}

/**
 * Typed debounce wrapper for string values
 */
const debouncedFunction = <T extends (value: string) => void>(
  fn: T,
  delay: number
): ((value: string) => void) => {
  // Korrektur: Den Debounce mit einer Funktion verwenden, die mit dem erwarteten Typ kompatibel ist
  return debounce((...args: unknown[]) => {
    const value = args[0] as string;
    fn(value);
  }, delay) as (value: string) => void;
};

export const Search: React.FC<SearchProps> = ({
  onSearch,
  initialQuery = '',
  placeholder = 'Blog durchsuchen...',
  className,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  // Initialisiere den Suchbegriff aus den URL-Parametern
  useEffect(() => {
    const searchQuery = (router.query.search as string) || '';
    if (searchQuery !== query) {
      setQuery(searchQuery);
    }
  }, [router.query.search, query]);

  // Debounced Suchfunktion
  const debouncedSearch = useCallback(
    (value: string) => {
      const debouncedFn = debouncedFunction(onSearch, 300);
      debouncedFn(value);
    },
    [onSearch]
  );

  // Aktualisiere die Suche bei Änderungen
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  // Zurücksetzen der Suche
  const handleClearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={cn('relative mx-auto max-w-xl', className)}>
      <div
        className={cn(
          'relative overflow-hidden rounded-full transition-all duration-200',
          isFocused ? 'shadow-md' : 'shadow-sm'
        )}
      >
        <Input
          type="search"
          value={query}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className={cn(
            'rounded-full border-none py-6 pl-12 pr-12',
            'focus:ring-2 focus:ring-accent/40'
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transform text-tertiary">
          <SearchIcon className="h-5 w-5" />
        </div>
        {query && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 transform text-tertiary hover:text-primary"
            aria-label="Suche zurücksetzen"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
