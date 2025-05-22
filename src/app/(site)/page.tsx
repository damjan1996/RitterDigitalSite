// src/pages/home/index.tsx
import type { NextPage } from 'next';
import React from 'react';

import { SEO } from '@/components/common/seo';
import { HomePage } from '@/components/home';

const Home: NextPage = () => {
  return (
    <>
      <SEO
        title="Ritter Digital GmbH | Ihr Partner für Digitalisierung"
        description="Ritter Digital ist Ihr Experte für Business Intelligence, Data Warehouse, Softwareentwicklung und KI-Lösungen. Wir unterstützen Unternehmen dabei, die Potenziale der Digitalisierung zu erschließen."
        pageType="home"
      />
      <HomePage />
    </>
  );
};

export default Home;
