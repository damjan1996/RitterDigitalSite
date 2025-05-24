// src/pages/leistungen/components/ServiceCTA.tsx
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

export interface ServiceCTAProps {
  text: string;
  buttonText: string;
  buttonLink: string;
}

export const ServiceCTA: React.FC<ServiceCTAProps> = ({ text, buttonText, buttonLink }) => {
  return (
    <section className="bg-primary-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-6 text-lg text-secondary">{text}</p>
        <Link href={buttonLink}>
          <Button variant="default" size="lg">
            {buttonText}
          </Button>
        </Link>
      </div>
    </section>
  );
};

// Default export für die Komponente
export default ServiceCTA;
