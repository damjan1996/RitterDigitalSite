// src/pages/karriere/components/JobListings.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { SectionTitle } from '@/components/common/section-title';
import { Input } from '@/components/ui/input';
import { ArrowRight, Briefcase, MapPin, Filter, Search as SearchIcon } from 'lucide-react';
import { JobDetail } from './JobDetail';
import { cn } from '@/lib/utils';

interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    postedAt: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits?: string[];
}

interface JobListingsProps {
    title?: string;
    subtitle?: string;
    jobs?: Job[];
    className?: string;
}

export const JobListings: React.FC<JobListingsProps> = ({
                                                            title = "Aktuelle Stellenangebote",
                                                            subtitle = "Entdecken Sie Ihre Karrieremöglichkeiten bei Ritter Digital",
                                                            jobs = [],
                                                            className,
                                                        }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

    // Beispiel-Jobs, falls keine angegeben wurden
    const defaultJobs: Job[] = [
        {
            id: 'dev-001',
            title: 'Frontend-Entwickler (m/w/d)',
            department: 'Entwicklung',
            location: 'Musterstadt',
            type: 'Vollzeit',
            postedAt: '15.03.2023',
            description: '<p>Wir suchen einen erfahrenen Frontend-Entwickler, der unser Team verstärkt und an der Entwicklung moderner, benutzerfreundlicher Weboberflächen mitwirkt.</p>',
            responsibilities: [
                'Entwicklung von reaktionsschnellen und intuitiven Benutzeroberflächen mit React',
                'Zusammenarbeit mit UX/UI-Designern zur Umsetzung von Gestaltungskonzepten',
                'Integration von Frontend-Komponenten mit Backend-APIs',
                'Optimierung der Anwendungsleistung und Benutzerfreundlichkeit',
                'Code-Reviews und Qualitätssicherung'
            ],
            requirements: [
                'Mindestens 3 Jahre Erfahrung in der Frontend-Entwicklung',
                'Fundierte Kenntnisse in React, TypeScript und modernem JavaScript',
                'Erfahrung mit CSS-Präprozessoren und Styling-Bibliotheken (Tailwind CSS, SCSS)',
                'Verständnis für Benutzerfreundlichkeit und Responsive Design',
                'Teamfähigkeit und eigenverantwortliches Arbeiten'
            ],
            benefits: [
                'Flexible Arbeitszeiten und Home-Office-Möglichkeiten',
                'Regelmäßige Weiterbildungsmöglichkeiten',
                '30 Tage Urlaub',
                'Moderne Arbeitsausstattung',
                'Teamevents und gemeinsame Aktivitäten'
            ]
        },
        {
            id: 'dev-002',
            title: 'Backend-Entwickler (m/w/d)',
            department: 'Entwicklung',
            location: 'Remote',
            type: 'Vollzeit',
            postedAt: '10.03.2023',
            description: '<p>Zur Verstärkung unseres Entwicklerteams suchen wir einen erfahrenen Backend-Entwickler. In dieser Rolle sind Sie für die Entwicklung und Optimierung unserer Server-Anwendungen verantwortlich.</p>',
            responsibilities: [
                'Entwicklung und Wartung von serverseitigen Anwendungen',
                'Gestaltung und Implementierung von RESTful APIs',
                'Datenbank-Design und -Optimierung',
                'Implementierung von Sicherheitsmaßnahmen und Authentifizierungslösungen',
                'Zusammenarbeit mit Frontend-Entwicklern zur Integration von Client- und Server-Anwendungen'
            ],
            requirements: [
                'Mindestens 3 Jahre Erfahrung in der Backend-Entwicklung',
                'Fundierte Kenntnisse in Node.js, Express und TypeScript',
                'Erfahrung mit SQL- und NoSQL-Datenbanken',
                'Verständnis für Sicherheit und Authentifizierung',
                'Gute analytische Fähigkeiten und Problemlösungskompetenz'
            ]
        },
        {
            id: 'bi-001',
            title: 'Business Intelligence Analyst (m/w/d)',
            department: 'Business Intelligence',
            location: 'Musterstadt',
            type: 'Vollzeit',
            postedAt: '05.03.2023',
            description: '<p>Wir suchen einen Business Intelligence Analyst, der uns dabei hilft, Daten in wertvolle Geschäftseinblicke zu verwandeln. In dieser Rolle werden Sie eng mit verschiedenen Abteilungen zusammenarbeiten, um Datenanalysen durchzuführen und Entscheidungsprozesse zu unterstützen.</p>',
            responsibilities: [
                'Entwicklung und Wartung von Dashboards und Berichten',
                'Durchführung komplexer Datenanalysen zur Unterstützung von Geschäftsentscheidungen',
                'Identifizierung von Trends und Mustern in großen Datensätzen',
                'Zusammenarbeit mit Fachabteilungen zur Definition von KPIs',
                'Optimierung von Datenprozessen und -qualität'
            ],
            requirements: [
                'Abgeschlossenes Studium in Wirtschaftsinformatik, Statistik oder einem verwandten Bereich',
                'Mindestens 2 Jahre Erfahrung im Bereich Business Intelligence oder Datenanalyse',
                'Fundierte Kenntnisse in SQL und BI-Tools (z.B. Power BI, Tableau)',
                'Erfahrung in der Datenmodellierung und ETL-Prozessen',
                'Ausgeprägte analytische Fähigkeiten und Liebe zum Detail'
            ]
        },
        {
            id: 'pm-001',
            title: 'Projektmanager (m/w/d)',
            department: 'Projektmanagement',
            location: 'Musterstadt',
            type: 'Vollzeit',
            postedAt: '01.03.2023',
            description: '<p>Zur Verstärkung unseres Teams suchen wir einen erfahrenen Projektmanager. In dieser Rolle sind Sie verantwortlich für die erfolgreiche Planung, Durchführung und Kontrolle unserer Kundenprojekte im Bereich Digitalisierung.</p>',
            responsibilities: [
                'Planung, Steuerung und Überwachung von komplexen IT-Projekten',
                'Führung und Koordination des Projektteams',
                'Ressourcen- und Budget-Management',
                'Stakeholder-Management und Kundenkommunikation',
                'Risikomanagement und Qualitätssicherung'
            ],
            requirements: [
                'Mindestens 3 Jahre Erfahrung im IT-Projektmanagement',
                'Zertifizierung in Projektmanagement-Methoden (z.B. PRINCE2, PMP, Scrum)',
                'Erfahrung mit agilen und klassischen Projektmanagement-Methoden',
                'Ausgeprägte Kommunikations- und Führungsfähigkeiten',
                'Kundenorientierung und Lösungsorientierung'
            ]
        }
    ];

    const jobsToDisplay = jobs.length > 0 ? jobs : defaultJobs;

    // Extrahiere einzigartige Abteilungen und Standorte für Filter
    const departments = [...new Set(jobsToDisplay.map(job => job.department))];
    const locations = [...new Set(jobsToDisplay.map(job => job.location))];

    // Filtere Jobs basierend auf Suchbegriff und Filtern
    const filteredJobs = jobsToDisplay.filter(job => {
        const matchesSearch = searchTerm === '' ||
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment = selectedDepartment === null || job.department === selectedDepartment;
        const matchesLocation = selectedLocation === null || job.location === selectedLocation;

        return matchesSearch && matchesDepartment && matchesLocation;
    });

    // Wenn ein Job ausgewählt ist, zeige die Detailansicht
    if (selectedJob) {
        return (
            <section id="job-listings" className={cn("py-12", className)}>
                <Container>
                    <JobDetail
                        job={selectedJob}
                        onBack={() => setSelectedJob(null)}
                    />
                </Container>
            </section>
        );
    }

    return (
        <section id="job-listings" className={cn("py-16 md:py-24", className)}>
            <Container>
                <SectionTitle
                    title={title}
                    subtitle={subtitle}
                    align="center"
                    className="mb-12"
                />

                {/* Suchleiste und Filter */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative md:col-span-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Suche nach Stellenbezeichnung oder Schlüsselwörtern"
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            className="flex-1 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                            value={selectedDepartment || ''}
                            onChange={(e) => setSelectedDepartment(e.target.value || null)}
                        >
                            <option value="">Alle Abteilungen</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>

                        <select
                            className="flex-1 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                            value={selectedLocation || ''}
                            onChange={(e) => setSelectedLocation(e.target.value || null)}
                        >
                            <option value="">Alle Standorte</option>
                            {locations.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Stellenangebote */}
                {filteredJobs.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-semibold mb-2">Keine passenden Stellenangebote gefunden</h3>
                        <p className="text-secondary mb-6">
                            Versuchen Sie, andere Suchbegriffe zu verwenden oder die Filter anzupassen.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedDepartment(null);
                                setSelectedLocation(null);
                            }}
                        >
                            Filter zurücksetzen
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredJobs.map((job) => (
                            <Card
                                key={job.id}
                                className="hover:shadow-md transition-shadow duration-300 cursor-pointer"
                                onClick={() => setSelectedJob(job)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-primary mb-2">{job.title}</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-secondary">
                                                <div className="flex items-center gap-1">
                                                    <Briefcase className="h-4 w-4 text-accent" />
                                                    <span>{job.department}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4 text-accent" />
                                                    <span>{job.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Filter className="h-4 w-4 text-accent" />
                                                    <span>{job.type}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            className="group text-accent flex items-center gap-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedJob(job);
                                            }}
                                        >
                                            Details ansehen
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Weitere Informationen */}
                <div className="mt-12 bg-primary/5 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold text-primary mb-3">Keine passende Stelle gefunden?</h3>
                    <p className="text-secondary mb-6">
                        Wir freuen uns auch über Ihre Initiativbewerbung. Teilen Sie uns mit, welche Rolle Sie bei uns übernehmen möchten.
                    </p>
                    <Button variant="accent" href="/kontakt">
                        Initiativbewerbung senden
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default JobListings;