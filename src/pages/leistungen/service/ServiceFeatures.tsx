// src/pages/leistungen/service/ServiceFeatures.tsx
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
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import React from 'react';

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
  LayoutDashboard,
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
  title = 'Funktionen & Möglichkeiten',
  features = [], // Default-Wert hinzugefügt
}) => {
  if (!features || features.length === 0) {
    return null; // Keine Darstellung, wenn keine Features vorhanden sind
  }

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary">{title}</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            // Dynamisch das passende Icon auswählen, Fallback auf Activity wenn nicht gefunden
            const IconComponent = iconMap[feature.icon] || Activity;

            return (
              <div
                key={index}
                className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-primary">{feature.title}</h3>

                <p className="text-secondary">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
