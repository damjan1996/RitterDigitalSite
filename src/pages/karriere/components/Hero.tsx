// src/pages/karriere/components/Hero.tsx
import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroProps {
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    className?: string;
    scrollToJobs?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
                                              title = "Karriere bei Ritter Digital",
                                              subtitle = "Werden Sie Teil unseres Teams und gestalten Sie die digitale Transformation mit uns",
                                              imageUrl = "/images/hero/career-hero.jpg",
                                              className,
                                              scrollToJobs,
                                          }) => {
    return (
        <section className={cn(
            "relative py-20 md:py-32 bg-primary text-white overflow-hidden",
            className
        )}>
            {/* Hintergrund-Bild mit Overlay */}
            {imageUrl && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={imageUrl}
                        alt="Karriere bei Ritter Digital"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
                </div>
            )}

            <Container className="relative z-10">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        {title}
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 mb-8">
                        {subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            variant="accent"
                            size="lg"
                            onClick={scrollToJobs}
                            className="shadow-lg shadow-accent/25"
                        >
                            Offene Stellen ansehen
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            href="/kontakt"
                            className="border-white text-white hover:bg-white hover:text-primary"
                        >
                            Initiativbewerbung
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Hero;