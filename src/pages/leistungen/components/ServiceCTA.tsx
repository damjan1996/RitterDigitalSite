// src/pages/leistungen/components/ServiceCTA.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ServiceCTAProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
}

export const ServiceCTA: React.FC<ServiceCTAProps> = ({
                                                          title = "Sprechen Sie mit unseren Experten",
                                                          description = "Unsere Spezialisten beraten Sie gerne zu Ihren individuellen Anforderungen und finden die passende Lösung für Ihr Unternehmen.",
                                                          buttonText = "Kontakt aufnehmen",
                                                          buttonLink = "/kontakt"
                                                      }) => {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm text-center max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                        {title}
                    </h2>
                    <p className="text-secondary mb-8 max-w-2xl mx-auto">
                        {description}
                    </p>
                    <Link href={buttonLink}>
                        <Button variant="accent" size="lg">
                            {buttonText}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};