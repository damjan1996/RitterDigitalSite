// src/pages/ueber-uns/index.tsx
import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { UeberUnsPage } from './components';

const UeberUns: NextPage = () => {
    return (
        <>
            <Head>
                <title>Über uns | Ritter Digital GmbH</title>
                <meta
                    name="description"
                    content="Lernen Sie Ritter Digital GmbH kennen - seit über 20 Jahren Ihr verlässlicher Partner für digitale Transformation, Business Intelligence und maßgeschneiderte Softwarelösungen."
                />
            </Head>
            <UeberUnsPage />
        </>
    );
};

export default UeberUns;