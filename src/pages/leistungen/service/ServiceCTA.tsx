// src/pages/leistungen/service/ServiceCTA.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ServiceCTAProps {
    text: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
}

export const ServiceCTA: React.FC<ServiceCTAProps> = ({
                                                          text,
                                                          description,
                                                          buttonText = "Jetzt Kontakt aufnehmen",
                                                          buttonLink = "/kontakt"
                                                      }) => {
    return (
        <section className="py-20 bg-primary text-white">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        {text}
                    </h2>
                    <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                        {description}
                    </p>
                    <Link href={buttonLink}>
                        <Button variant="accent" size="lg" className="px-8 py-6 text-lg">
                            {buttonText}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};