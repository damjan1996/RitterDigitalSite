// src/pages/kontakt/components/Map.tsx
import React from 'react';

export const Map: React.FC = () => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-primary mb-6">Standort</h2>

            <div className="aspect-video w-full h-[300px] bg-gray-100 rounded-md overflow-hidden">
                {/*
          Hier würde normalerweise die Integration einer Karte erfolgen,
          z.B. mit Google Maps, OpenStreetMap oder Mapbox.

          Beispiel für iframe-Einbindung von Google Maps:

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.530145355686!2d13.372469776926155!3d52.50793287200595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburger%20Tor!5e0!3m2!1sde!2sde!4v1650000000000!5m2!1sde!2sde"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Standort von Ritter Digital GmbH"
          />

          Alternativ: Statisches Bild als Platzhalter
        */}
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-center">
                        <svg
                            className="w-12 h-12 mx-auto text-tertiary opacity-50"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <p className="mt-2 text-tertiary">
                            Kartenansicht von Ritter Digital GmbH
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-sm text-secondary">
                <p>
                    Wenn Sie uns besuchen möchten, finden Sie uns in der Nähe des Stadtzentrums.
                    Parkplätze sind in unmittelbarer Nähe verfügbar.
                </p>
            </div>
        </div>
    );
};