// src/pages/home/components/index.tsx
import React from 'react';

// Import the components
import { Benefits } from './Benefits';
import { Clients } from './Clients';
import { Hero } from './Hero';
import { LatestBlogPosts } from './LatestBlogPosts';
import { ServiceTeaser } from './ServiceTeaser';

// Create a component that combines all of these
export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ServiceTeaser />
      <Benefits />
      <Clients />
      <LatestBlogPosts />
    </>
  );
};

// Export named components
export { Hero, ServiceTeaser, Benefits, Clients, LatestBlogPosts };

// Add default export
export default HomePage;
