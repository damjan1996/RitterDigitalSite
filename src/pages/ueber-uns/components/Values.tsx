// src/pages/ueber-uns/components/Values.tsx
import { Lightbulb, Handshake, BarChart, ShieldCheck, RefreshCw, Users } from 'lucide-react';
import React from 'react';

// Unternehmenswerte
const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Wir streben danach, stets an der Spitze technologischer Entwicklungen zu stehen und diese für unsere Kunden nutzbar zu machen.',
  },
  {
    icon: Handshake,
    title: 'Partnerschaft',
    description:
      'Wir sehen uns als langfristigen Partner unserer Kunden und arbeiten gemeinsam an ihrem nachhaltigen Erfolg.',
  },
  {
    icon: BarChart,
    title: 'Exzellenz',
    description:
      'Wir setzen höchste Qualitätsstandards in allen Bereichen unserer Arbeit und streben stets nach herausragenden Ergebnissen.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrität',
    description:
      'Wir handeln ehrlich, transparent und ethisch in allen geschäftlichen Beziehungen und Entscheidungen.',
  },
  {
    icon: RefreshCw,
    title: 'Agilität',
    description:
      'Wir passen uns schnell an sich ändernde Marktbedingungen an und entwickeln flexible Lösungen für die Herausforderungen unserer Kunden.',
  },
  {
    icon: Users,
    title: 'Kundenorientierung',
    description:
      'Der Erfolg unserer Kunden steht im Mittelpunkt all unserer Aktivitäten. Ihre Zufriedenheit ist unser wichtigstes Ziel.',
  },
];

export const Values: React.FC = () => {
  return (
    <section className="bg-primary py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-bold">Unsere Werte</h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg opacity-90">
          Diese Grundprinzipien leiten unser tägliches Handeln und definieren die Art und Weise, wie
          wir mit unseren Kunden, Partnern und Mitarbeitern zusammenarbeiten.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ValueCardProps {
  value: {
    icon: React.ElementType;
    title: string;
    description: string;
  };
}

const ValueCard: React.FC<ValueCardProps> = ({ value }) => {
  const Icon = value.icon;

  return (
    <div className="bg-primary-dark rounded-lg bg-opacity-20 p-6 transition-all duration-300 hover:bg-opacity-30">
      <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/20 p-3">
        <Icon className="h-6 w-6 text-accent" />
      </div>

      <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>

      <p className="opacity-80">{value.description}</p>
    </div>
  );
};

export default Values;
