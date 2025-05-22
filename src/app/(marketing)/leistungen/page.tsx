// src/pages/leistungen/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import { LeistungenPage } from '@/pages/leistungen/components';

const Leistungen: NextPage = () => {
  return (
    <>
      <Head>
        <title>Unsere Leistungen | Ritter Digital GmbH</title>
        <meta
          name="description"
          content="Entdecken Sie unsere Leistungen in den Bereichen Business Intelligence, Data Warehouse, Softwareentwicklung und künstliche Intelligenz. Ritter Digital GmbH ist Ihr Partner für digitale Transformation."
        />
      </Head>
      <LeistungenPage />
    </>
  );
};

export default Leistungen;
