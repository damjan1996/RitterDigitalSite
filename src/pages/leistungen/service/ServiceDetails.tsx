// src/pages/leistungen/service/ServiceDetails.tsx
import React, { type ReactNode } from 'react';

export interface ServiceDetailsProps {
  title: string;
  description: string;
  items?: string[];
  videoSrc?: string;
  children?: ReactNode;
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  title,
  description,
  items,
  videoSrc,
  children,
}) => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-primary">{title}</h2>
            <p className="mb-6 text-lg text-secondary">{description}</p>

            {items && (
              <ul className="mb-6 list-inside list-disc">
                {items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {children}
          </div>

          <div className="rounded-lg bg-background p-4">
            {videoSrc ? (
              <div className="aspect-video overflow-hidden rounded-md">
                <iframe
                  src={videoSrc}
                  title="Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                ></iframe>
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-md bg-gray-200">
                <p className="text-secondary">Video nicht verfügbar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
