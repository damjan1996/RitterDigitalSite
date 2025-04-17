// src/pages/leistungen/service/ServiceCTA.tsx
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

interface ServiceCTAProps {
  text?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const ServiceCTA: React.FC<ServiceCTAProps> = ({
  text = 'Sprechen Sie mit unseren Experten',
  description = 'Unsere Spezialisten beraten Sie gerne zu Ihren individuellen Anforderungen und finden die passende Lösung für Ihr Unternehmen.',
  buttonText = 'Jetzt Kontakt aufnehmen',
  buttonLink = '/kontakt',
}) => {
  return (
    <section className="bg-primary py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">{text}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">{description}</p>
          <Link href={buttonLink}>
            <Button
              variant="default"
              size="lg"
              className="bg-white px-8 py-6 text-lg text-primary hover:bg-white/90"
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;
