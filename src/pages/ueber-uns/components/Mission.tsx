// src/pages/ueber-uns/components/Mission.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

export const Mission: React.FC = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <div className="aspect-[4/3]">
                <Image
                  src="/images/about/mission.jpg"
                  alt="Unsere Mission"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Dekoratives Element */}
            <div className="absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-lg bg-accent/10"></div>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-bold text-primary">Unsere Mission</h2>

            <p className="mb-8 text-lg text-secondary">
              Bei Ritter Digital haben wir es uns zur Aufgabe gemacht, Unternehmen durch
              maßgeschneiderte digitale Lösungen zu stärken und ihnen zu nachhaltigem Wachstum zu
              verhelfen.
            </p>

            <div className="mb-10 space-y-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-primary">Wir glauben an:</h3>
                <ul className="space-y-3 text-secondary">
                  <li className="flex items-start">
                    <div className="mr-2 text-xl text-accent">•</div>
                    <span>
                      Die Kraft der Digitalisierung, um Unternehmen zu transformieren und zu
                      verbessern.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-xl text-accent">•</div>
                    <span>
                      Langfristige Partnerschaften, die auf Vertrauen und gegenseitigem Respekt
                      basieren.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-xl text-accent">•</div>
                    <span>
                      Die Kombination aus technologischer Innovation und tiefem Branchenverständnis.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 text-xl text-accent">•</div>
                    <span>
                      Lösungen, die nicht nur technisch exzellent, sondern auch wirtschaftlich
                      sinnvoll sind.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8 border-l-4 border-accent pl-4 text-lg italic text-secondary">
              &#34;Wir streben danach, der verlässlichste Partner für die digitale Transformation zu
              sein und unseren Kunden durch innovative Technologien einen echten Wettbewerbsvorteil
              zu verschaffen.&#34;
            </div>

            <Link href="/kontakt">
              <Button variant="default">Mit uns zusammenarbeiten</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
