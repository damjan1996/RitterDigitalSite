// src/pages/leistungen/components/Hero.tsx
import React from 'react';

import { cn } from '@/lib/utils';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'Unsere Leistungen',
  subtitle = 'Oslobodite pun potencijal vaše digitalizacije',
  description = 'Wir kombinieren modernste Technologien mit tiefgreifendem Branchenwissen, um maßgeschneiderte Lösungen zu liefern, die Ihren spezifischen Anforderungen entsprechen und nachhaltiges Wachstum und verbesserte Wettbewerbsfähigkeit sicherstellen.',
}) => {
  return (
    <section className={cn('relative overflow-hidden bg-primary py-20 text-white')}>
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mb-4 text-xl font-medium opacity-90">{subtitle}</p>
          <p className="max-w-2xl text-lg opacity-80">{description}</p>
        </div>
      </div>

      {/* Dekorative geometrische Form im Hintergrund - im minimalistischen Design-Stil */}
      <div className="absolute bottom-0 right-0 h-2/3 w-1/2 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <path
            fill="white"
            d="M47.7,-61.1C62,-51.5,74.2,-36.5,79.4,-19.2C84.5,-1.9,82.5,17.6,73.6,32.5C64.8,47.4,49.1,57.7,32.4,66.2C15.7,74.8,-2,81.5,-19.1,78.9C-36.1,76.3,-52.5,64.3,-63.5,48.5C-74.5,32.8,-80,13.1,-78.2,-5.9C-76.4,-24.8,-67.2,-43,-53.3,-53C-39.3,-63,-19.7,-64.7,-0.9,-63.6C17.8,-62.4,33.5,-70.7,47.7,-61.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
