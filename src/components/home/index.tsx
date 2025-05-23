// src/components/home/index.tsx
import React from 'react';

// Import all home components
import { Benefits } from './Benefits';
import { Clients } from './Clients';
import { CTAForm } from './CTAForm';
import { Hero } from './Hero';
import { References } from './References';
import { ServiceTeaser } from './ServiceTeaser';

// HomePage component that combines all sections
export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ServiceTeaser />
      <Benefits />
      <References />
      <Clients />
      <CTAForm />
    </>
  );
};

// Export all individual components for flexible usage
export {
  Hero,
  ServiceTeaser,
  Benefits,
  References,
  Clients,
  CTAForm
};

// Default export
export default HomePage;