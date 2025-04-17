// src/pages/karriere/components/JobDetail.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Clock, MapPin, Euro, CalendarDays, ArrowLeft } from 'lucide-react';
import { ApplicationForm } from './ApplicationForm';
import { cn } from '@/lib/utils';

interface JobDetailProps {
    job: {
        id: string;
        title: string;
        location: string;
        type: string; // full-time, part-time, etc.
        salary?: string;
        postedAt: string;
        description: string;
        responsibilities: string[];
        requirements: string[];
        benefits?: string[];
    };
    className?: string;
    onBack?: () => void;
}

export const JobDetail: React.FC<JobDetailProps> = ({
                                                        job,
                                                        className,
                                                        onBack,
                                                    }) => {
    // Scrolle zur Bewerbungsformular
    const scrollToApplicationForm = () => {
        const form = document.getElementById('application-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-8", className)}>
            {/* Haupt-Inhalt */}
            <div className="lg:col-span-2 space-y-8">
                {/* Zurück-Button */}
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="flex items-center gap-2 text-tertiary hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Zurück zur Übersicht
                    </Button>
                </div>

                {/* Job-Details */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">{job.title}</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-accent" />
                                <span className="text-sm text-secondary">{job.location}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-accent" />
                                <span className="text-sm text-secondary">{job.type}</span>
                            </div>

                            {job.salary && (
                                <div className="flex items-center gap-2">
                                    <Euro className="h-4 w-4 text-accent" />
                                    <span className="text-sm text-secondary">{job.salary}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-accent" />
                                <span className="text-sm text-secondary">Veröffentlicht: {job.postedAt}</span>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: job.description }} />

                            <h3>Aufgaben</h3>
                            <ul>
                                {job.responsibilities.map((responsibility, index) => (
                                    <li key={index}>{responsibility}</li>
                                ))}
                            </ul>

                            <h3>Anforderungen</h3>
                            <ul>
                                {job.requirements.map((requirement, index) => (
                                    <li key={index}>{requirement}</li>
                                ))}
                            </ul>

                            {job.benefits && job.benefits.length > 0 && (
                                <>
                                    <h3>Was wir bieten</h3>
                                    <ul>
                                        {job.benefits.map((benefit, index) => (
                                            <li key={index}>{benefit}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>

                        <div className="mt-8">
                            <Button
                                variant="accent"
                                size="lg"
                                onClick={scrollToApplicationForm}
                                className="w-full sm:w-auto"
                            >
                                Jetzt bewerben
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bewerbungsformular */}
            <div className="lg:col-span-1" id="application-form">
                <ApplicationForm jobTitle={job.title} jobId={job.id} />
            </div>
        </div>
    );
};

export default JobDetail;