// src/pages/leistungen/components/index.tsx
import React from 'react';

import { ServiceCTA } from '../../../components/leistungen/ServiceCTA';

import { Hero } from './Hero';
import { ServiceOverview } from './ServiceOverview';

export const LeistungenPage: React.FC = () => {
  return (
    <>
      <Hero />
      <ServiceOverview />
      <ServiceCTA
        text="Bereit, Ihr Digitalprojekt zu starten? Wir beraten Sie gerne unverbindlich zu Ihren Möglichkeiten."
        buttonText="Jetzt Kontakt aufnehmen"
        buttonLink="/kontakt"
      />
    </>
  );
};

export { Hero, ServiceOverview, ServiceCTA };

export default LeistungenPage;
