// src/pages/leistungen/service/ServiceFeatures.tsx
import React from 'react';
import {
    Activity,
    BarChart,
    Database,
    Link,
    Sparkles,
    ArrowRightLeft,
    BarChart4,
    Brain,
    MessageSquare,
    TrendingUp,
    Camera,
    LayoutDashboard,
    LucideIcon
} from 'lucide-react';

// Mapping von Icon-Namen zu Icon-Komponenten
const iconMap: Record<string, LucideIcon> = {
    Activity,
    BarChart,
    Database,
    Link,
    Sparkles,
    ArrowRightLeft,
    BarChart4,
    Brain,
    MessageSquare,
    TrendingUp,
    Camera,
    LayoutDashboard
};

interface Feature {
    title: string;
    description: string;
    icon: string;
}

interface ServiceFeaturesProps {
    title?: string;
    features: Feature[];
}

export const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({
                                                                    title = "Funktionen & Möglichkeiten",
                                                                    features
                                                                }) => {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-12 text-center">
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        // Dynamisch das passende Icon auswählen, Fallback auf Activity wenn nicht gefunden
                        const IconComponent = iconMap[feature.icon] || Activity;

                        return (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                                <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-4">
                                    <IconComponent className="h-6 w-6 text-accent" />
                                </div>

                                <h3 className="text-xl font-semibold text-primary mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-secondary">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};