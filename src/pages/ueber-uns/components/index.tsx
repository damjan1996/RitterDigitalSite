// src/pages/ueber-uns/components/index.tsx
import React from 'react';

import { CompanyHistory } from './CompanyHistory';
import { Hero } from './Hero';
import { Mission } from './Mission';
import { TeamMembers } from './TeamMembers';
import { Values } from './Values';

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

export default UeberUnsPage;
