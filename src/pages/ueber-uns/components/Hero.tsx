// src/pages/ueber-uns/components/Hero.tsx
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export const Hero: React.FC = () => {
    return (
        <section className={cn(
            "bg-primary text-white py-20 relative overflow-hidden"
        )}>
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Über Ritter Digital
                        </h1>
                        <p className="text-xl opacity-90 mb-6">
                            Ihr Partner für digitale Optimierung von Prozessen und maßgeschneiderte Softwarelösungen
                        </p>
                        <p className="text-lg opacity-80">
                            Seit über 20 Jahren unterstützen wir Unternehmen bei der Digitalisierung ihrer Geschäftsprozesse und entwickeln individuelle Lösungen, die echten Mehrwert schaffen. Mit über 90 zufriedenen Kunden und einem Team aus erfahrenen Experten setzen wir auf langfristige Partnerschaften und nachhaltige Erfolge.
                        </p>
                    </div>

                    <div className="relative lg:h-[500px] hidden lg:block">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/about/team-collage.jpg"
                                    alt="Das Team von Ritter Digital"
                                    fill
                                    className="object-cover rounded-lg shadow-lg"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dekorative geometrische Form im Hintergrund - im minimalistischen Design-Stil */}
            <div className="absolute right-0 bottom-0 w-1/2 h-2/3 opacity-10">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path fill="white" d="M47.7,-61.1C62,-51.5,74.2,-36.5,79.4,-19.2C84.5,-1.9,82.5,17.6,73.6,32.5C64.8,47.4,49.1,57.7,32.4,66.2C15.7,74.8,-2,81.5,-19.1,78.9C-36.1,76.3,-52.5,64.3,-63.5,48.5C-74.5,32.8,-80,13.1,-78.2,-5.9C-76.4,-24.8,-67.2,-43,-53.3,-53C-39.3,-63,-19.7,-64.7,-0.9,-63.6C17.8,-62.4,33.5,-70.7,47.7,-61.1Z" transform="translate(100 100)" />
                </svg>
            </div>

            {/* Statistiken-Banner unter dem Hero */}
            <div className="absolute bottom-0 left-0 right-0 bg-accent/20 py-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold">20+</div>
                            <div className="text-sm opacity-80">Jahre Erfahrung</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">90+</div>
                            <div className="text-sm opacity-80">Zufriedene Kunden</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">25+</div>
                            <div className="text-sm opacity-80">Experten im Team</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">150+</div>
                            <div className="text-sm opacity-80">Erfolgreiche Projekte</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};