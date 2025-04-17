// src/pages/kontakt/components/index.tsx
import React from 'react';
import { Hero } from './Hero';
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';
import { Map } from './Map';

export const KontaktPage: React.FC = () => {
    return (
        <>
            <Hero />
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <ContactForm />
                        <div>
                            <ContactInfo />
                            <div className="mt-8">
                                <Map />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export { Hero, ContactForm, ContactInfo, Map };