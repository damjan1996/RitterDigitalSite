// src/pages/karriere/components/Benefits.tsx
import React from 'react';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/common/section-title';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Coffee, Heart, Home, LaptopMac, GraduationCap, CalendarDays, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Benefit {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface BenefitsProps {
    title?: string;
    subtitle?: string;
    benefits?: Benefit[];
    className?: string;
}

export const Benefits: React.FC<BenefitsProps> = ({
                                                      title = "Vorteile bei Ritter Digital",
                                                      subtitle = "Neben spannenden Projekten und einem dynamischen Arbeitsumfeld bieten wir Ihnen zahlreiche weitere Benefits",
                                                      benefits = [],
                                                      className,
                                                  }) => {
    // Standard-Vorteile, falls keine angegeben wurden
    const defaultBenefits: Benefit[] = [
        {
            icon: <Clock className="h-8 w-8 text-accent" />,
            title: "Flexible Arbeitszeiten",
            description: "Gestalten Sie Ihre Arbeitszeit flexibel und vereinbaren Sie berufliche und private Verpflichtungen optimal."
        },
        {
            icon: <Home className="h-8 w-8 text-accent" />,
            title: "Remote-Arbeit",
            description: "Arbeiten Sie teilweise oder vollständig von zu Hause aus - wir fördern ortsunabhängiges Arbeiten."
        },
        {
            icon: <LaptopMac className="h-8 w-8 text-accent" />,
            title: "Moderne Ausstattung",
            description: "Wir stellen Ihnen hochwertige Hardware und Software zur Verfügung, damit Sie optimal arbeiten können."
        },
        {
            icon: <GraduationCap className="h-8 w-8 text-accent" />,
            title: "Weiterbildung",
            description: "Regelmäßige interne und externe Schulungen und ein großzügiges Budget für Ihre persönliche Weiterentwicklung."
        },
        {
            icon: <Coffee className="h-8 w-8 text-accent" />,
            title: "Kostenlose Getränke",
            description: "Genießen Sie kostenlose Getränke wie Kaffee, Tee und Wasser in unserem Büro."
        },
        {
            icon: <Heart className="h-8 w-8 text-accent" />,
            title: "Gesundheitsangebote",
            description: "Wir bieten Zuschüsse zum Fitnessstudio und regelmäßige Gesundheitsaktionen an."
        },
        {
            icon: <CalendarDays className="h-8 w-8 text-accent" />,
            title: "30 Tage Urlaub",
            description: "Genießen Sie 30 Tage Urlaub pro Jahr, um Ihre Batterien wieder aufzuladen."
        },
        {
            icon: <Users className="h-8 w-8 text-accent" />,
            title: "Team-Events",
            description: "Regelmäßige Team-Events und Feiern stärken den Zusammenhalt und sorgen für Spaß neben der Arbeit."
        },
    ];

    const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits;

    return (
        <section className={cn("py-16 md:py-24", className)}>
            <Container>
                <SectionTitle
                    title={title}
                    subtitle={subtitle}
                    align="center"
                    className="mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayBenefits.map((benefit, index) => (
                        <Card
                            key={index}
                            className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
                        >
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="rounded-full bg-accent/10 p-4 mb-4">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-primary mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-secondary text-sm">
                                        {benefit.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Benefits;