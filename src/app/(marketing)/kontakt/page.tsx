// src/pages/kontakt/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import { KontaktPage } from '@/pages/kontakt/components';

const Kontakt: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kontakt | Ritter Digital GmbH</title>
        <meta
          name="description"
          content="Nehmen Sie Kontakt zu uns auf. Wir beraten Sie gerne zu unseren Leistungen in den Bereichen Business Intelligence, Data Warehouse, Softwareentwicklung und künstliche Intelligenz."
        />
      </Head>
      <KontaktPage />
    </>
  );
};

export default Kontakt;
