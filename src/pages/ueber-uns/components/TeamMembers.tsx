// src/pages/ueber-uns/components/TeamMembers.tsx
import { Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Team-Mitglieder Daten
const teamMembers = [
  {
    name: 'Hans Ritter',
    role: 'Gründer & Geschäftsführer',
    bio: 'Mit über 25 Jahren Erfahrung in der IT-Branche leitet Hans die strategische Ausrichtung von Ritter Digital und treibt die kontinuierliche Innovation des Unternehmens voran.',
    image: '/images/team/hans-ritter.jpg',
    linkedin: 'https://www.linkedin.com/in/hans-ritter',
    email: 'hans.ritter@ritterdigital.de',
  },
  {
    name: 'Julia Weber',
    role: 'CTO',
    bio: 'Julia verantwortet die technologische Vision und Strategie des Unternehmens. Mit ihrem fundierten Wissen in Softwarearchitektur und BI-Lösungen leitet sie unsere Entwicklungsteams.',
    image: '/images/team/julia-weber.jpg',
    linkedin: 'https://www.linkedin.com/in/julia-weber',
    email: 'julia.weber@ritterdigital.de',
  },
  {
    name: 'Markus Schmidt',
    role: 'Leiter Business Intelligence',
    bio: 'Als ausgewiesener Experte für Datenanalyse und BI-Lösungen sorgt Markus dafür, dass unsere Kunden stets fundierte, datenbasierte Entscheidungen treffen können.',
    image: '/images/team/markus-schmidt.jpg',
    linkedin: 'https://www.linkedin.com/in/markus-schmidt',
    email: 'markus.schmidt@ritterdigital.de',
  },
  {
    name: 'Sarah Müller',
    role: 'Leiterin Softwareentwicklung',
    bio: 'Sarah bringt umfassende Erfahrung in der Entwicklung maßgeschneiderter Softwarelösungen mit und leitet unser Team von talentierten Entwicklern.',
    image: '/images/team/sarah-mueller.jpg',
    linkedin: 'https://www.linkedin.com/in/sarah-mueller',
    email: 'sarah.mueller@ritterdigital.de',
  },
  {
    name: 'Thomas Becker',
    role: 'Leiter Künstliche Intelligenz',
    bio: 'Mit seinem Hintergrund in maschinellem Lernen und KI-Anwendungen treibt Thomas die Entwicklung innovativer, KI-gestützter Lösungen für unsere Kunden voran.',
    image: '/images/team/thomas-becker.jpg',
    linkedin: 'https://www.linkedin.com/in/thomas-becker',
    email: 'thomas.becker@ritterdigital.de',
  },
  {
    name: 'Lisa Hoffmann',
    role: 'Leiterin Customer Success',
    bio: 'Lisa sorgt dafür, dass unsere Kunden das Maximum aus unseren Lösungen herausholen. Sie ist die Schnittstelle zwischen den technischen Teams und den Kunden.',
    image: '/images/team/lisa-hoffmann.jpg',
    linkedin: 'https://www.linkedin.com/in/lisa-hoffmann',
    email: 'lisa.hoffmann@ritterdigital.de',
  },
];

export const TeamMembers: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-primary">Unser Team</h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-secondary">
          Bei Ritter Digital sind unsere Mitarbeiter unser wertvollstes Gut. Lernen Sie die Köpfe
          hinter unseren innovativen Lösungen kennen.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map(member => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="mb-4 text-2xl font-semibold text-primary">Werde Teil unseres Teams</h3>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-secondary">
            Wir sind ständig auf der Suche nach talentierten Fachkräften, die unser Team verstärken
            möchten.
          </p>
          <Link
            href="/karriere"
            className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent/90"
          >
            Karriere bei Ritter Digital
          </Link>
        </div>
      </div>
    </section>
  );
};

interface TeamMemberCardProps {
  member: {
    name: string;
    role: string;
    bio: string;
    image: string;
    linkedin?: string;
    email?: string;
  };
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-background shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="relative h-80">
        <Image src={member.image} alt={member.name} fill className="object-cover" />
      </div>

      <div className="p-6">
        <h3 className="mb-1 text-xl font-semibold text-primary">{member.name}</h3>
        <p className="mb-4 font-medium text-accent">{member.role}</p>
        <p className="mb-4 text-secondary">{member.bio}</p>

        <div className="flex space-x-4">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tertiary transition-colors hover:text-accent"
              aria-label={`LinkedIn von ${member.name}`}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}

          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-tertiary transition-colors hover:text-accent"
              aria-label={`E-Mail an ${member.name}`}
            >
              <Mail className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
