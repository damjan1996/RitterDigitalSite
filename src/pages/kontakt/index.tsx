// src/pages/kontakt/index.tsx
import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { KontaktPage } from './components';

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