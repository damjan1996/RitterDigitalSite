// src/pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { HomePage } from '@/pages/home';

const Home: NextPage = () => {
    return (
        <>
            <NextSeo
                title="Ritter Digital GmbH | Experten für digitale Prozesse"
                description="Ritter Digital GmbH ist Ihr Partner für digitale Optimierung von Prozessen und maßgeschneiderte Softwarelösungen. Spezialisiert auf Business Intelligence, Data Warehouse, Softwareentwicklung und künstliche Intelligenz."
                canonical="https://ritterdigital.de/"
                openGraph={{
                    url: 'https://ritterdigital.de/',
                    title: 'Ritter Digital GmbH | Experten für digitale Prozesse',
                    description: 'Ritter Digital GmbH ist Ihr Partner für digitale Optimierung von Prozessen und maßgeschneiderte Softwarelösungen.',
                    images: [
                        {
                            url: 'https://ritterdigital.de/images/og-image.jpg',
                            width: 1200,
                            height: 630,
                            alt: 'Ritter Digital GmbH',
                        }
                    ],
                    site_name: 'Ritter Digital GmbH',
                }}
                twitter={{
                    handle: '@ritterdigital',
                    site: '@ritterdigital',
                    cardType: 'summary_large_image',
                }}
            />

            <HomePage />
        </>
    );
};

export default Home;