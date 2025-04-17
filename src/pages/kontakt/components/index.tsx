// src/pages/kontakt/components/index.tsx
import React from 'react';

import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';
import { Hero } from './Hero';
import { Map } from './Map';

export const KontaktPage: React.FC = () => {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ContactForm />
          <div className="flex flex-col gap-8">
            <ContactInfo />
            <Map />
          </div>
        </div>
      </div>
    </>
  );
};

export { ContactForm, ContactInfo, Hero, Map };

export default KontaktPage;
