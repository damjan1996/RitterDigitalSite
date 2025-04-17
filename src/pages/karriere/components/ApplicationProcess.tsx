// src/pages/karriere/components/ApplicationProcess.tsx
import React from 'react';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/common/section-title';
import { ClipboardCheck, Users, Phone, Briefcase, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface ApplicationProcessProps {
    title?: string;
    subtitle?: string;
    steps?: Step[];
    className?: string;
}

export const ApplicationProcess: React.FC<ApplicationProcessProps> = ({
                                                                          title = "Unser Bewerbungsprozess",
                                                                          subtitle = "Transparent und effizient: So sieht der Weg zu Ihrem neuen Job bei uns aus",
                                                                          steps = [],
                                                                          className,
                                                                      }) => {
    // Standard-Schritte, falls keine angegeben wurden
    const defaultSteps: Step[] = [
        {
            icon: <ClipboardCheck className="h-8 w-8 text-accent" />,
            title: "Bewerbung einreichen",
            description: "Senden Sie uns Ihren Lebenslauf und ein kurzes Motivationsschreiben über unser Online-Formular."
        },
        {
            icon: <CheckCircle className="h-8 w-8 text-accent" />,
            title: "Erste Prüfung",
            description: "Wir prüfen Ihre Unterlagen und melden uns innerhalb von 5 Werktagen bei Ihnen zurück."
        },
        {
            icon: <Phone className="h-8 w-8 text-accent" />,
            title: "Telefoninterview",
            description: "Bei passender Qualifikation führen wir ein kurzes Telefonat, um uns gegenseitig kennenzulernen."
        },
        {
            icon: <Users className="h-8 w-8 text-accent" />,
            title: "Persönliches Gespräch",
            description: "Im nächsten Schritt laden wir Sie zu einem persönlichen Gespräch in unsere Büroräume ein."
        },
        {
            icon: <Briefcase className="h-8 w-8 text-accent" />,
            title: "Entscheidung & Angebot",
            description: "Nach einem erfolgreichen Gespräch unterbreiten wir Ihnen ein attraktives Angebot."
        },
    ];

    const processSteps = steps.length > 0 ? steps : defaultSteps;

    return (
        <section className={cn("py-16 md:py-24 bg-background", className)}>
            <Container>
                <SectionTitle
                    title={title}
                    subtitle={subtitle}
                    align="center"
                    className="mb-16"
                />

                <div className="relative">
                    {/* Verbindungslinie */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />

                    <div className="space-y-12 md:space-y-0">
                        {processSteps.map((step, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "relative md:grid md:grid-cols-2 md:gap-8 items-center",
                                    index % 2 === 0 ? "md:text-right" : ""
                                )}
                            >
                                {/* Inhalt */}
                                <div className={cn(
                                    "mb-8 md:mb-0",
                                    index % 2 !== 0 ? "md:col-start-2" : ""
                                )}>
                                    <div className={cn(
                                        "bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative",
                                        "hover:shadow-md transition-shadow duration-300"
                                    )}>
                                        <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-3">
                                            <div className="inline-flex items-center justify-center bg-primary/5 rounded-full p-2 md:hidden">
                                                {step.icon}
                                            </div>
                                            <span>
                        {index + 1}. {step.title}
                      </span>
                                        </h3>
                                        <p className="text-secondary">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Icon mit Nummer (vertausche für ungerade/gerade) */}
                                <div className={cn(
                                    "hidden md:flex md:items-center md:justify-center md:relative md:z-10",
                                    index % 2 === 0 ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
                                )}>
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-accent shadow-sm">
                                        {step.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ApplicationProcess;