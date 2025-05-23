// src/components/karriere/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Trophy, Coffee } from 'lucide-react';
import React from 'react';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const colors = {
  primary: '#1A2027',
  secondary: '#3D5A73',
  accent: '#FF7A35',
  background: '#FFFFFF',
  backgroundAlt: '#F8F9FC',
};

export const KarrierePageComponent: React.FC = () => {
  const benefits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Tolles Team',
      description: 'Arbeiten Sie mit erfahrenen Experten in einem kollegialen Umfeld'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Work-Life-Balance',
      description: 'Flexible Arbeitszeiten und Home-Office Möglichkeiten'
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: 'Weiterentwicklung',
      description: 'Kontinuierliche Fortbildungen und Karrieremöglichkeiten'
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: 'Moderne Ausstattung',
      description: 'Neueste Technologien und eine angenehme Arbeitsatmosphäre'
    }
  ];

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
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24" style={{ backgroundColor: colors.backgroundAlt }}>
        <Container>
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="relative mb-4" variants={itemVariants}>
              <motion.div
                className="absolute left-1/2 top-1/2 h-12 w-1.5 -translate-x-1/2 -translate-y-1/2"
                style={{
                  background: `linear-gradient(to bottom, ${colors.accent}, ${colors.accent}30)`,
                }}
                initial={{ height: 0 }}
                animate={{ height: '3rem' }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <h1 className="text-4xl font-medium md:text-5xl" style={{ color: colors.primary }}>
                Karriere bei Ritter Digital
                <span style={{ color: colors.accent }}>.</span>
              </h1>
            </motion.div>

            <motion.p
              className="mx-auto max-w-2xl text-lg"
              style={{ color: colors.secondary }}
              variants={itemVariants}
            >
              Werden Sie Teil unseres innovativen Teams und gestalten Sie die digitale Zukunft mit uns.
              Wir bieten spannende Herausforderungen in einem dynamischen Umfeld.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2
              className="mb-12 text-center text-3xl font-medium"
              style={{ color: colors.primary }}
              variants={itemVariants}
            >
              Was wir bieten
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
                  >
                    {benefit.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-medium" style={{ color: colors.primary }}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm" style={{ color: colors.secondary }}>
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: colors.backgroundAlt }}>
        <Container>
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2
              className="mb-4 text-3xl font-medium"
              style={{ color: colors.primary }}
              variants={itemVariants}
            >
              Interessiert?
            </motion.h2>

            <motion.p
              className="mb-8 text-lg"
              style={{ color: colors.secondary }}
              variants={itemVariants}
            >
              Senden Sie uns Ihre Bewerbung oder kontaktieren Sie uns für weitere Informationen.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button
                className="rounded-md px-8 py-3 font-medium text-white"
                style={{ backgroundColor: colors.accent }}
                onClick={() => window.location.href = '/kontakt'}
              >
                Jetzt bewerben
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default KarrierePageComponent;