// src/pages/blog/components/Hero.tsx
import React from 'react';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/common/section-title';
import { Search } from './Search';
import { Categories } from './Categories';
import { cn } from '@/lib/utils';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface HeroProps {
    title?: string;
    subtitle?: string;
    selectedCategory?: string | null;
    categories?: Category[];
    onSearch?: (query: string) => void;
    onCategoryChange?: (category: string | null) => void;
    className?: string;
}

export const Hero: React.FC<HeroProps> = ({
                                              title = "Blog",
                                              subtitle = "Neuigkeiten, Tipps und Einblicke aus der Welt der digitalen Geschäftsprozesse und Business Intelligence",
                                              selectedCategory = null,
                                              categories = [],
                                              onSearch,
                                              onCategoryChange,
                                              className,
                                          }) => {
    // Ermittle, ob eine Kategorie ausgewählt ist und hole den Namen
    const selectedCategoryName = selectedCategory
        ? categories.find(c => c.slug === selectedCategory)?.name || selectedCategory
        : null;

    return (
        <div className={cn(
            "bg-primary text-white py-12 md:py-16 lg:py-20",
            className
        )}>
            <Container>
                <div className="max-w-4xl mx-auto text-center">
                    <SectionTitle
                        title={selectedCategoryName ? `Blog: ${selectedCategoryName}` : title}
                        subtitle={subtitle}
                        align="center"
                        color="white"
                        titleSize="xl"
                        decorative={false}
                        className="mb-8"
                    />

                    {/* Suchleiste */}
                    {onSearch && (
                        <div className="mb-8">
                            <Search onSearch={onSearch} />
                        </div>
                    )}

                    {/* Kategorien */}
                    {categories.length > 0 && onCategoryChange && (
                        <div className="mt-8">
                            <Categories
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onCategoryChange={onCategoryChange}
                            />
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Hero;