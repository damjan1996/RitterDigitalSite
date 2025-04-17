// src/pages/leistungen/service/ServiceHero.tsx
import Image from 'next/image';
import React from 'react';

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
  imageUrl,
}) => {
  return (
    <section className={cn('overflow-hidden bg-white py-16 md:py-24')}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-2 inline-flex items-center rounded-full border border-accent px-3 py-1">
              <span className="text-sm font-medium text-accent">Leistung</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">{title}</h1>
            <p className="mb-4 text-xl font-medium text-secondary">{subtitle}</p>
            <p className="text-base text-secondary">{description}</p>
          </div>

          <div className="relative">
            {/* Hintergrund-Dekor-Element für visuelles Interesse */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent opacity-10"></div>

            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <div className="relative aspect-[4/3]">
                <Image src={imageUrl} alt={title} fill className="object-cover" priority />
              </div>
            </div>

            {/* Weiteres Dekor-Element */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-lg border-2 border-accent opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
