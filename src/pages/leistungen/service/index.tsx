// src/pages/leistungen/service/index.tsx
import React from 'react';

import { ServiceCTA } from '../../../components/leistungen/ServiceCTA';

import { ServiceBenefits } from './ServiceBenefits';
import { ServiceDetails } from './ServiceDetails';
import { ServiceFeatures } from './ServiceFeatures';
import { ServiceHero } from './ServiceHero';

// Definiere eine Komponente, die alle Service-Komponenten verwendet
const ServiceComponents: React.FC = () => {
  return null; // Diese Komponente wird nie gerendert, ist nur für den Export notwendig
};

// Exportiere alle Service-Komponenten, damit sie in den einzelnen Service-Pages verwendet werden können
export { ServiceHero, ServiceDetails, ServiceFeatures, ServiceBenefits, ServiceCTA };

// Default-Export hinzufügen
export default ServiceComponents;
