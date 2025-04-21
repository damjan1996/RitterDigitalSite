'use client';

import { motion } from 'framer-motion';
import { SearchIcon, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { Input } from '@/components/ui/input';
import { cn, debounce } from '@/lib/utils';

interface SearchProps {
  onSearch?: (query: string) => void;
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

const Search = ({
  onSearch,
  initialQuery = '',
  placeholder = 'Blog durchsuchen...',
  className,
}: SearchProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Initialisiere den Suchbegriff aus den URL-Parametern
  useEffect(() => {
    const searchQuery = searchParams?.get('search') || '';
    if (searchQuery !== query) {
      setQuery(searchQuery);
    }
  }, [searchParams, query]);

  // Debounced Suchfunktion
  const debouncedSearch = useCallback(
    (value: string) => {
      if (onSearch) {
        const debouncedFn = debouncedFunction(onSearch, 300);
        debouncedFn(value);
      } else {
        // Standardverhalten: Aktualisiere die URL, wenn keine onSearch-Funktion bereitgestellt wurde
        const params = new URLSearchParams(searchParams?.toString());
        if (value) {
          params.set('search', value);
        } else {
          params.delete('search');
        }
        router.push(`${pathname}?${params.toString()}`);
      }
    },
    [onSearch, pathname, router, searchParams]
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
    if (onSearch) {
      onSearch('');
    } else {
      const params = new URLSearchParams(searchParams?.toString());
      params.delete('search');
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <motion.div
      className={cn('relative mx-auto max-w-xl', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={cn(
          'relative overflow-hidden rounded-full transition-all duration-200',
          isFocused ? 'shadow-lg' : 'shadow-md'
        )}
        whileHover={{ y: -2, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      >
        <Input
          type="search"
          value={query}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className={cn(
            'rounded-full border-none py-6 pl-12 pr-12 text-[#1A2027]',
            'bg-white focus:ring-2 focus:ring-[#FF7A35]/40'
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transform text-[#3D5A73]">
          <SearchIcon className="h-5 w-5" />
        </div>
        {query && (
          <motion.button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 transform text-[#3D5A73] hover:text-[#1A2027]"
            aria-label="Suche zurücksetzen"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="h-5 w-5" />
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Search;
