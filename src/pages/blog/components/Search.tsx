// src/pages/blog/components/Search.tsx
import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { debounce } from '@/lib/utils';

interface SearchProps {
    onSearch: (query: string) => void;
    initialQuery?: string;
    placeholder?: string;
    className?: string;
}

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
        const searchQuery = router.query.search as string || '';
        if (searchQuery !== query) {
            setQuery(searchQuery);
        }
    }, [router.query.search]);

    // Debounced Suchfunktion
    const debouncedSearch = React.useCallback(
        debounce((value: string) => {
            onSearch(value);
        }, 300),
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
        <div
            className={cn(
                "relative max-w-xl mx-auto",
                className
            )}
        >
            <div
                className={cn(
                    "relative rounded-full overflow-hidden transition-all duration-200",
                    isFocused ? "shadow-md" : "shadow-sm"
                )}
            >
                <Input
                    type="search"
                    value={query}
                    onChange={handleSearchChange}
                    placeholder={placeholder}
                    className={cn(
                        "py-6 pl-12 pr-12 rounded-full border-none",
                        "focus:ring-2 focus:ring-accent/40"
                    )}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-tertiary">
                    <SearchIcon className="h-5 w-5" />
                </div>
                {query && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-tertiary hover:text-primary"
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