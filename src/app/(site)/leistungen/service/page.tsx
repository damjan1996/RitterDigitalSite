// src/pages/leistungen/service/index.tsx
import React from 'react';

import { ServiceBenefits } from '@/components/leistungen/service/ServiceBenefits';
import { ServiceDetails } from '@/components/leistungen/service/ServiceDetails';
import { ServiceFeatures } from '@/components/leistungen/service/ServiceFeatures';
import { ServiceHero } from '@/components/leistungen/service/ServiceHero';
import { ServiceCTA } from '@/components/leistungen/ServiceCTA';

// Definiere eine Komponente, die alle Service-Komponenten verwendet
const ServiceComponents: React.FC = () => {
  return null; // Diese Komponente wird nie gerendert, ist nur für den Export notwendig
};

// Exportiere alle Service-Komponenten, damit sie in den einzelnen Service-Pages verwendet werden können
export { ServiceHero, ServiceDetails, ServiceFeatures, ServiceBenefits, ServiceCTA };

// Default-Export hinzufügen
export default ServiceComponents;
