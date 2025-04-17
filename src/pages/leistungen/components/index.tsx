// src/pages/leistungen/components/index.tsx
import React from 'react';
import { Hero } from './Hero';
import { ServiceOverview } from './ServiceOverview';
import { ServiceCTA } from './ServiceCTA';

export const LeistungenPage: React.FC = () => {
    return (
        <>
            <Hero />
            <ServiceOverview />
            <ServiceCTA />
        </>
    );
};

export { Hero, ServiceOverview, ServiceCTA };