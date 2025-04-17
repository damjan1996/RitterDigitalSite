// src/pages/ueber-uns/components/Values.tsx
import React from 'react';
import {
    LightbulbIcon,
    HandshakeIcon,
    ChartBar,
    ShieldCheck,
    ArrowPath,
    UserGroup
} from 'lucide-react';

// Unternehmenswerte
const values = [
    {
        icon: LightbulbIcon,
        title: 'Innovation',
        description: 'Wir streben danach, stets an der Spitze technologischer Entwicklungen zu stehen und diese für unsere Kunden nutzbar zu machen.'
    },
    {
        icon: HandshakeIcon,
        title: 'Partnerschaft',
        description: 'Wir sehen uns als langfristigen Partner unserer Kunden und arbeiten gemeinsam an ihrem nachhaltigen Erfolg.'
    },
    {
        icon: ChartBar,
        title: 'Exzellenz',
        description: 'Wir setzen höchste Qualitätsstandards in allen Bereichen unserer Arbeit und streben stets nach herausragenden Ergebnissen.'
    },
    {
        icon: ShieldCheck,
        title: 'Integrität',
        description: 'Wir handeln ehrlich, transparent und ethisch in allen geschäftlichen Beziehungen und Entscheidungen.'
    },
    {
        icon: ArrowPath,
        title: 'Agilität',
        description: 'Wir passen uns schnell an sich ändernde Marktbedingungen an und entwickeln flexible Lösungen für die Herausforderungen unserer Kunden.'
    },
    {
        icon: UserGroup,
        title: 'Kundenorientierung',
        description: 'Der Erfolg unserer Kunden steht im Mittelpunkt all unserer Aktivitäten. Ihre Zufriedenheit ist unser wichtigstes Ziel.'
    }
];

export const Values: React.FC = () => {
    return (
        <section className="py-16 bg-primary text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Unsere Werte
                </h2>
                <p className="text-lg opacity-90 mb-12 max-w-3xl mx-auto text-center">
                    Diese Grundprinzipien leiten unser tägliches Handeln und definieren die Art und Weise, wie wir mit unseren Kunden, Partnern und Mitarbeitern zusammenarbeiten.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <div className="bg-primary-dark bg-opacity-20 p-6 rounded-lg transition-all duration-300 hover:bg-opacity-30">
            <div className="inline-flex items-center justify-center p-3 bg-accent/20 rounded-full mb-4">
                <Icon className="h-6 w-6 text-accent" />
            </div>

            <h3 className="text-xl font-semibold mb-3">
                {value.title}
            </h3>

            <p className="opacity-80">
                {value.description}
            </p>
        </div>
    );
};