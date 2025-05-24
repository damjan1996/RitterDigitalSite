// src/pages/home/components/index.tsx
import React from 'react';

// Import the components
import { Benefits } from './Benefits';
import { Clients } from './Clients';
import { CTAForm } from './CTAForm';
import { Hero } from './Hero';
import { ServiceTeaser } from './ServiceTeaser';

// Create a component that combines all of these
export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ServiceTeaser />
      <Benefits />
      <Clients />
      <CTAForm />
    </>
  );
};

// Export named components
export { Hero, ServiceTeaser, Benefits, Clients };

// Add default export
export default HomePage;
