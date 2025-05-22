// src/pages/leistungen/components/index.tsx
import React from 'react';

import { ServiceCTA } from '@/components/leistungen/ServiceCTA';

import { Hero } from './Hero';
import { ServiceList } from './ServiceList';

export const LeistungenPage: React.FC = () => {
  return (
    <>
      <Hero />
      <ServiceList />
      <ServiceCTA
        text="Bereit, Ihr Digitalprojekt zu starten? Wir beraten Sie gerne unverbindlich zu Ihren Möglichkeiten."
        buttonText="Jetzt Kontakt aufnehmen"
        buttonLink="/kontakt"
      />
    </>
  );
};

// Export die Komponenten für Verwendung in anderen Dateien
export { Hero };
export { ServiceCTA };

export default LeistungenPage;
