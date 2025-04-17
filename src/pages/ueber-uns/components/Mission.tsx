// src/pages/ueber-uns/components/Mission.tsx
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Mission: React.FC = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-lg shadow-md">
                            <div className="aspect-[4/3]">
                                <Image
                                    src="/images/about/mission.jpg"
                                    alt="Unsere Mission"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Dekoratives Element */}
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent/10 rounded-lg -z-10"></div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-6">
                            Unsere Mission
                        </h2>

                        <p className="text-lg text-secondary mb-8">
                            Bei Ritter Digital haben wir es uns zur Aufgabe gemacht, Unternehmen durch maßgeschneiderte digitale Lösungen zu stärken und ihnen zu nachhaltigem Wachstum zu verhelfen.
                        </p>

                        <div className="space-y-6 mb-10">
                            <div>
                                <h3 className="text-xl font-semibold text-primary mb-2">
                                    Wir glauben an:
                                </h3>
                                <ul className="space-y-3 text-secondary">
                                    <li className="flex items-start">
                                        <div className="mr-2 text-accent text-xl">•</div>
                                        <span>Die Kraft der Digitalisierung, um Unternehmen zu transformieren und zu verbessern.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="mr-2 text-accent text-xl">•</div>
                                        <span>Langfristige Partnerschaften, die auf Vertrauen und gegenseitigem Respekt basieren.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="mr-2 text-accent text-xl">•</div>
                                        <span>Die Kombination aus technologischer Innovation und tiefem Branchenverständnis.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="mr-2 text-accent text-xl">•</div>
                                        <span>Lösungen, die nicht nur technisch exzellent, sondern auch wirtschaftlich sinnvoll sind.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="text-lg text-secondary italic border-l-4 border-accent pl-4 mb-8">
                            "Wir streben danach, der verlässlichste Partner für die digitale Transformation zu sein und unseren Kunden durch innovative Technologien einen echten Wettbewerbsvorteil zu verschaffen."
                        </div>

                        <Link href="/kontakt">
                            <Button variant="accent">
                                Mit uns zusammenarbeiten
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};