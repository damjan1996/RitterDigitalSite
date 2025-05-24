'use client';

import { motion } from 'framer-motion';
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
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type React from 'react';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

// Refined color palette - consistent with other components
const colors = {
  primary: '#1A2027', // Darker primary for better contrast
  secondary: '#3D5A73', // Richer secondary color
  accent: '#FF7A35', // Warmer accent for better visibility
  background: '#F8F9FC', // Lighter background for better contrast
  secondaryAccent: '#2A3F56', // Deeper secondary accent
};

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
  subtitle?: string;
  features: Feature[];
  className?: string;
}

export const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({
  title = 'Funktionen & Möglichkeiten',
  subtitle = 'INNOVATIVE LÖSUNGEN FÜR IHRE ANFORDERUNGEN',
  features = [],
  className,
}) => {
  if (!features || features.length === 0) {
    return null; // Keine Darstellung, wenn keine Features vorhanden sind
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="features"
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{ backgroundColor: colors.background }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute left-0 top-0 h-full w-1/3"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)',
            backgroundColor: 'white',
            opacity: 0.7,
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute left-[10%] top-[15%] h-24 w-24 rounded-full"
          style={{ backgroundColor: `${colors.accent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[15%] right-[8%] h-32 w-32 rounded-full"
          style={{ backgroundColor: `${colors.secondaryAccent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <Container className="relative z-10 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#3D5A73]">
            {subtitle}
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-medium tracking-tight text-[#1A2027] md:text-4xl">
            {title}
            <span className="text-[#FF7A35]">.</span>
          </h2>

          {/* Decorative accent line */}
          <motion.div
            className="mx-auto mt-4 h-1 w-16 rounded-full"
            style={{ backgroundColor: colors.accent }}
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {features.map((feature, index) => {
            // Dynamisch das passende Icon auswählen, Fallback auf Activity wenn nicht gefunden
            const IconComponent = iconMap[feature.icon] || Activity;

            return (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:border-[#1A2027]/20 hover:shadow-lg"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  transition: { duration: 0.3 },
                }}
                style={{
                  backgroundImage: "url('/subtle-pattern.png')",
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="mb-6 flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: index % 2 === 0 ? '#FF7A35/10' : '#3D5A73/10' }}
                  >
                    <IconComponent
                      className="h-6 w-6"
                      style={{ color: index % 2 === 0 ? '#FF7A35' : '#3D5A73' }}
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-medium text-[#1A2027]">{feature.title}</h3>
                    <p className="text-base text-[#3D5A73]">{feature.description}</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-2 text-[#3D5A73] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-sm font-medium">Mehr erfahren</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>

      {/* Animated background elements */}
      <motion.div
        className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-[#FF7A35]/5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className="absolute -top-20 right-20 h-40 w-40 rounded-full bg-[#3D5A73]/5"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          delay: 1,
        }}
      />
    </section>
  );
};

export default ServiceFeatures;
