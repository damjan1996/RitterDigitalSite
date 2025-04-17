// src/pages/leistungen/service/ServiceHero.tsx
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ServiceHeroProps {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({
                                                            title,
                                                            subtitle,
                                                            description,
                                                            imageUrl
                                                        }) => {
    return (
        <section className={cn(
            "py-16 md:py-24 bg-white overflow-hidden"
        )}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="mb-2 inline-flex items-center rounded-full border border-accent px-3 py-1">
                            <span className="text-sm font-medium text-accent">Leistung</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                            {title}
                        </h1>
                        <p className="text-xl font-medium text-secondary mb-4">
                            {subtitle}
                        </p>
                        <p className="text-base text-secondary">
                            {description}
                        </p>
                    </div>

                    <div className="relative">
                        {/* Hintergrund-Dekor-Element für visuelles Interesse */}
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-accent opacity-10 rounded-full"></div>

                        <div className="relative overflow-hidden rounded-lg shadow-lg">
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src={imageUrl}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Weiteres Dekor-Element */}
                        <div className="absolute -left-6 -bottom-6 w-24 h-24 border-2 border-accent opacity-20 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};