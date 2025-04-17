// src/pages/kontakt/components/ContactInfo.tsx
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import React from 'react';

export const ContactInfo: React.FC = () => {
  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold text-primary">Kontaktdaten</h2>

      <div className="space-y-6">
        <div className="flex items-start">
          <Phone className="mr-4 mt-1 h-5 w-5 flex-shrink-0 text-accent" />
          <div>
            <h3 className="font-medium text-primary">Telefon</h3>
            <a
              href="tel:+49123456789"
              className="text-secondary transition-colors hover:text-accent"
            >
              +49 (0) 123 456 789
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <Mail className="mr-4 mt-1 h-5 w-5 flex-shrink-0 text-accent" />
          <div>
            <h3 className="font-medium text-primary">E-Mail</h3>
            <a
              href="mailto:info@ritterdigital.de"
              className="text-secondary transition-colors hover:text-accent"
            >
              info@ritterdigital.de
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <MapPin className="mr-4 mt-1 h-5 w-5 flex-shrink-0 text-accent" />
          <div>
            <h3 className="font-medium text-primary">Adresse</h3>
            <address className="not-italic text-secondary">
              Ritter Digital GmbH
              <br />
              Musterstraße 123
              <br />
              12345 Musterstadt
              <br />
              Deutschland
            </address>
          </div>
        </div>

        <div className="flex items-start">
          <Clock className="mr-4 mt-1 h-5 w-5 flex-shrink-0 text-accent" />
          <div>
            <h3 className="font-medium text-primary">Geschäftszeiten</h3>
            <p className="text-secondary">
              Montag - Freitag: 09:00 - 17:00 Uhr
              <br />
              Samstag &amp; Sonntag: Geschlossen
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
