// src/components/common/section-title.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    color?: 'primary' | 'secondary' | 'white';
    titleSize?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    subtitleClassName?: string;
    decorative?: boolean;
}

/**
 * Einheitliche Komponente für Abschnittstitel mit optionalem Untertitel
 * und verschiedenen Ausrichtungs- und Größenoptionen
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
                                                              title,
                                                              subtitle,
                                                              align = 'center',
                                                              color = 'primary',
                                                              titleSize = 'lg',
                                                              className,
                                                              subtitleClassName,
                                                              decorative = true,
                                                          }) => {
    // Ausrichtungs-Mapping
    const alignMap = {
        left: 'text-left',
        center: 'text-center mx-auto',
        right: 'text-right ml-auto',
    };

    // Farben-Mapping
    const colorMap = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        white: 'text-white',
    };

    // Größen-Mapping für den Titel
    const titleSizeMap = {
        sm: 'text-xl md:text-2xl',
        md: 'text-2xl md:text-3xl',
        lg: 'text-3xl md:text-4xl',
        xl: 'text-4xl md:text-5xl',
    };

    // Farben-Mapping für den Untertitel (etwas heller als der Haupttitel)
    const subtitleColorMap = {
        primary: 'text-secondary',
        secondary: 'text-tertiary',
        white: 'text-gray-200',
    };

    return (
        <div className={cn('mb-8 max-w-3xl', alignMap[align], className)}>
            <h2 className={cn('font-bold', titleSizeMap[titleSize], colorMap[color])}>
                {title}
            </h2>

            {decorative && (
                <div
                    className={cn(
                        'h-1 w-12 mt-3 mb-4 bg-accent',
                        align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
                    )}
                />
            )}

            {subtitle && (
                <p
                    className={cn(
                        'mt-3 text-lg',
                        subtitleColorMap[color],
                        subtitleClassName
                    )}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionTitle;