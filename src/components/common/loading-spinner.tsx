// src/components/common/loading-spinner.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'secondary' | 'accent' | 'white';
    className?: string;
    text?: string;
    fullScreen?: boolean;
}

/**
 * Ladeanimation für asynchrone Operationen
 * Kann entweder inline oder als Vollbild-Overlay verwendet werden
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                                  size = 'md',
                                                                  color = 'accent',
                                                                  className,
                                                                  text,
                                                                  fullScreen = false,
                                                              }) => {
    // Größen-Mapping
    const sizeMap = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    // Farben-Mapping
    const colorMap = {
        primary: 'border-primary',
        secondary: 'border-secondary',
        accent: 'border-accent',
        white: 'border-white',
    };

    const spinnerElement = (
        <div className="flex flex-col items-center justify-center">
            <div
                className={cn(
                    'animate-spin rounded-full border-2 border-t-transparent',
                    sizeMap[size],
                    colorMap[color],
                    className
                )}
            />
            {text && <p className="mt-2 text-sm text-secondary">{text}</p>}
        </div>
    );

    // Wenn Vollbild-Modus aktiviert ist, zeige Spinner im Zentrum des Bildschirms
    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm z-50">
                {spinnerElement}
            </div>
        );
    }

    // Sonst zeige Spinner inline
    return spinnerElement;
};

export default LoadingSpinner;