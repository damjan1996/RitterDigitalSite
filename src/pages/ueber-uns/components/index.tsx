// src/pages/ueber-uns/components/index.tsx
import React from 'react';
import { Hero } from './Hero';
import { CompanyHistory } from './CompanyHistory';
import { TeamMembers } from './TeamMembers';
import { Values } from './Values';
import { Mission } from './Mission';

export const UeberUnsPage: React.FC = () => {
    return (
        <>
            <Hero />
            <Mission />
            <Values />
            <CompanyHistory />
            <TeamMembers />
        </>
    );
};

export { Hero, CompanyHistory, TeamMembers, Values, Mission };