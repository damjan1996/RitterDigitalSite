// src/pages/leistungen/service/ServiceBenefits.tsx
import { CheckCircle } from 'lucide-react';
import React from 'react';

interface Benefit {
  title: string;
  description: string;
}

interface ServiceBenefitsProps {
  title?: string;
  benefits: Benefit[];
}

export const ServiceBenefits: React.FC<ServiceBenefitsProps> = ({
  title = 'Vorteile unserer Lösung',
  benefits = [], // Default-Wert hinzugefügt
}) => {
  if (!benefits || benefits.length === 0) {
    return null; // Keine Darstellung, wenn keine Benefits vorhanden sind
  }

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary">{title}</h2>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex">
              <CheckCircle className="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="mb-2 text-xl font-semibold text-primary">{benefit.title}</h3>
                <p className="text-secondary">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Default Export hinzufügen
export default ServiceBenefits;
