// src/pages/leistungen/service/ServiceDetails.tsx
import React, { ReactNode } from 'react';

interface ServiceDetailsProps {
    title: string;
    description: string;
    videoSrc?: string;
    children?: ReactNode;
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({
                                                                  title,
                                                                  description,
                                                                  videoSrc,
                                                                  children
                                                              }) => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-6">
                            {title}
                        </h2>
                        <p className="text-lg text-secondary mb-6">
                            {description}
                        </p>

                        {children}
                    </div>

                    <div className="bg-background p-4 rounded-lg">
                        {videoSrc ? (
                            <div className="aspect-video rounded-md overflow-hidden">
                                <iframe
                                    src={videoSrc}
                                    title="Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full border-0"
                                ></iframe>
                            </div>
                        ) : (
                            <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                                <p className="text-secondary">Video nicht verfügbar</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};