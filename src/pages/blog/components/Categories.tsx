// src/pages/blog/components/Categories.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface CategoriesProps {
    categories: Category[];
    selectedCategory: string | null;
    onCategoryChange: (category: string | null) => void;
    className?: string;
    variant?: 'pills' | 'buttons' | 'links';
}

export const Categories: React.FC<CategoriesProps> = ({
                                                          categories,
                                                          selectedCategory,
                                                          onCategoryChange,
                                                          className,
                                                          variant = 'pills',
                                                      }) => {
    const handleCategoryClick = (slug: string | null) => {
        onCategoryChange(slug);
    };

    if (categories.length === 0) {
        return null;
    }

    return (
        <div className={cn("flex flex-wrap gap-2 justify-center", className)}>
            {/* "Alle" Kategorie */}
            {variant === 'pills' && (
                <Button
                    variant={selectedCategory === null ? "accent" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryClick(null)}
                    className={cn(
                        "rounded-full",
                        selectedCategory === null
                            ? "bg-accent text-white hover:bg-accent/90"
                            : "bg-white/20 hover:bg-white/30 text-white border-white/40"
                    )}
                >
                    Alle
                </Button>
            )}

            {variant === 'buttons' && (
                <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleCategoryClick(null)}
                >
                    Alle
                </Button>
            )}

            {variant === 'links' && (
                <Link
                    href="/blog"
                    className={cn(
                        "px-3 py-1 text-sm",
                        selectedCategory === null
                            ? "text-accent font-medium"
                            : "text-primary hover:text-accent"
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(null);
                    }}
                >
                    Alle
                </Link>
            )}

            {/* Kategorie-Buttons */}
            {categories.map((category) => {
                const isActive = selectedCategory === category.slug;

                if (variant === 'pills') {
                    return (
                        <Button
                            key={category.id}
                            variant={isActive ? "accent" : "outline"}
                            size="sm"
                            onClick={() => handleCategoryClick(category.slug)}
                            className={cn(
                                "rounded-full",
                                isActive
                                    ? "bg-accent text-white hover:bg-accent/90"
                                    : "bg-white/20 hover:bg-white/30 text-white border-white/40"
                            )}
                        >
                            {category.name}
                        </Button>
                    );
                }

                if (variant === 'buttons') {
                    return (
                        <Button
                            key={category.id}
                            variant={isActive ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handleCategoryClick(category.slug)}
                        >
                            {category.name}
                        </Button>
                    );
                }

                if (variant === 'links') {
                    return (
                        <Link
                            key={category.id}
                            href={`/blog?category=${category.slug}`}
                            className={cn(
                                "px-3 py-1 text-sm",
                                isActive
                                    ? "text-accent font-medium"
                                    : "text-primary hover:text-accent"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick(category.slug);
                            }}
                        >
                            {category.name}
                        </Link>
                    );
                }

                return null;
            })}
        </div>
    );
};

export default Categories;