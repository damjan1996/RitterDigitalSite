// src/pages/karriere/components/Hero.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

interface HeroProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  className?: string;
  scrollToJobs?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'Karriere bei Ritter Digital',
  subtitle = 'Werden Sie Teil unseres Teams und gestalten Sie die digitale Transformation mit uns',
  imageUrl = '/images/hero/career-hero.jpg',
  className,
  scrollToJobs,
}) => {
  return (
    <section
      className={cn('relative overflow-hidden bg-primary py-20 text-white md:py-32', className)}
    >
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
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{title}</h1>

          <p className="mb-8 text-xl text-white/90 md:text-2xl">{subtitle}</p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="default"
              size="lg"
              onClick={scrollToJobs}
              className="bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent/90"
            >
              Offene Stellen ansehen
            </Button>

            <Link href="/kontakt">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Initiativbewerbung
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
