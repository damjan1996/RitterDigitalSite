// src/pages/karriere/components/index.tsx
import React from 'react';

// Import the components (these would be the actual components in your project)
import { ApplicationProcess } from './ApplicationProcess';
import { Benefits } from './Benefits';
import { Hero } from './Hero';
import { JobDetail } from './JobDetail';
import { JobListings } from './JobListings';

// Export a default component that combines these components
const KarriereComponents: React.FC = () => {
  return null; // This component is never rendered, just for export
};

// Export individual components
export { ApplicationProcess, Benefits, Hero, JobDetail, JobListings };

// Add default export
export default KarriereComponents;
