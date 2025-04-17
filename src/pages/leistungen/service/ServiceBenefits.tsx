// src/pages/leistungen/service/ServiceBenefits.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Benefit {
    title: string;
    description: string;
}

interface ServiceBenefitsProps {
    title?: string;
    benefits: Benefit[];
}

export const ServiceBenefits: React.FC<ServiceBenefitsProps> = ({
                                                                    title = "Vorteile unserer Lösung",
                                                                    benefits
                                                                }) => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-12 text-center">
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex">
                            <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1 mr-4" />
                            <div>
                                <h3 className="text-xl font-semibold text-primary mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-secondary">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};