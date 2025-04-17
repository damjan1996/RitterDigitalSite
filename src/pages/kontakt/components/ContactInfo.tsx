// src/pages/kontakt/components/ContactInfo.tsx
import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactInfo: React.FC = () => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-primary mb-6">Kontaktdaten</h2>

            <div className="space-y-6">
                <div className="flex items-start">
                    <Phone className="text-accent w-5 h-5 mt-1 mr-4 flex-shrink-0" />
                    <div>
                        <h3 className="font-medium text-primary">Telefon</h3>
                        <a
                            href="tel:+49123456789"
                            className="text-secondary hover:text-accent transition-colors"
                        >
                            +49 (0) 123 456 789
                        </a>
                    </div>
                </div>

                <div className="flex items-start">
                    <Mail className="text-accent w-5 h-5 mt-1 mr-4 flex-shrink-0" />
                    <div>
                        <h3 className="font-medium text-primary">E-Mail</h3>
                        <a
                            href="mailto:info@ritterdigital.de"
                            className="text-secondary hover:text-accent transition-colors"
                        >
                            info@ritterdigital.de
                        </a>
                    </div>
                </div>

                <div className="flex items-start">
                    <MapPin className="text-accent w-5 h-5 mt-1 mr-4 flex-shrink-0" />
                    <div>
                        <h3 className="font-medium text-primary">Adresse</h3>
                        <address className="not-italic text-secondary">
                            Ritter Digital GmbH<br />
                            Musterstraße 123<br />
                            12345 Musterstadt<br />
                            Deutschland
                        </address>
                    </div>
                </div>

                <div className="flex items-start">
                    <Clock className="text-accent w-5 h-5 mt-1 mr-4 flex-shrink-0" />
                    <div>
                        <h3 className="font-medium text-primary">Geschäftszeiten</h3>
                        <p className="text-secondary">
                            Montag - Freitag: 09:00 - 17:00 Uhr<br />
                            Samstag &amp; Sonntag: Geschlossen
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};