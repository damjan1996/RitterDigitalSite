'use client';

import { motion } from 'framer-motion';
import type React from 'react';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

// Refined color palette - consistent with Hero.tsx and ServiceTeaser.tsx
const colors = {
  primary: '#1A2027', // Darker primary for better contrast
  secondary: '#3D5A73', // Richer secondary color
  accent: '#FF7A35', // Warmer accent for better visibility
  background: '#F8F9FC', // Lighter background for better contrast
  secondaryAccent: '#2A3F56', // Deeper secondary accent
};

interface Client {
  name: string;
  logo: string;
}

interface ClientsProps {
  title?: string;
  subtitle?: string;
  clients?: Client[];
  className?: string;
}

export const Clients: React.FC<ClientsProps> = ({
  title = 'Trusted by Clients',
  subtitle = 'Wir arbeiten mit führenden Unternehmen zusammen, um innovative digitale Lösungen zu schaffen',
  clients = [],
  className,
}) => {
  // Default-Clients verwenden, wenn keine angegeben wurden
  const displayClients =
    clients.length > 0
      ? clients
      : [
          { name: 'Client 1', logo: '/images/logos/client-placeholder-1.svg' },
          { name: 'Client 2', logo: '/images/logos/client-placeholder-2.svg' },
          { name: 'Client 3', logo: '/images/logos/client-placeholder-3.svg' },
          { name: 'Client 4', logo: '/images/logos/client-placeholder-4.svg' },
          { name: 'Client 5', logo: '/images/logos/client-placeholder-5.svg' },
          { name: 'Client 6', logo: '/images/logos/client-placeholder-6.svg' },
        ];

  // Wir verwenden direkt den Namen als stabile Darstellung anstatt zu versuchen, Bilder zu laden
  const clientsToDisplay = displayClients.map(client => ({
    ...client,
    name: client.name || `Client ${Math.random().toString(36).substring(2, 7)}`,
  }));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
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
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{ backgroundColor: colors.primary }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute right-0 top-0 h-full w-1/2"
          style={{
            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 10% 100%)',
            backgroundColor: `${colors.secondaryAccent}`,
            opacity: 0.05,
          }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.05 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute right-[5%] top-[10%] h-24 w-24 rounded-full"
          style={{ backgroundColor: `${colors.accent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[15%] left-[8%] h-32 w-32 rounded-full"
          style={{ backgroundColor: `${colors.secondaryAccent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      {/* Subtle accent line at the top */}
      <div
        className="absolute left-0 top-0 h-1 w-full"
        style={{ backgroundColor: colors.accent }}
      />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
          className="mb-16"
        >
          <div className="text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-white/70">
              {subtitle}
            </p>
            <h2 className="mb-4 text-4xl font-medium tracking-tight text-white">
              {title}
              <span style={{ color: colors.accent }}>.</span>
            </h2>
          </div>

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
          className="grid grid-cols-2 items-center gap-6 md:grid-cols-3 lg:grid-cols-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {clientsToDisplay.map((client, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative flex items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10"
              whileHover={{
                y: -5,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative flex h-12 w-full items-center justify-center">
                {/* Statt Bilder zu laden, verwenden wir direkt eine stabile Textdarstellung */}
                <span className="text-sm font-medium text-white/70 transition-all duration-300 group-hover:text-white">
                  {client.name}
                </span>
              </div>

              {/* Subtle accent line that appears on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 w-full"
                style={{ backgroundColor: colors.accent }}
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={statsVariants}
        >
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-24">
            {[
              { value: '20', suffix: '+', label: 'Jahre Erfahrung' },
              { value: '90', suffix: '+', label: 'Zufriedene Kunden' },
              { value: '250', suffix: '+', label: 'Erfolgreiche Projekte' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                variants={statItemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Decorative background element */}
                <div
                  className="absolute -left-3 -top-3 h-12 w-12 rounded-full opacity-10"
                  style={{
                    backgroundColor: index % 2 === 0 ? colors.accent : colors.secondaryAccent,
                  }}
                />

                <div className="relative">
                  <div className="mb-2 text-4xl font-bold text-white">
                    {stat.value}
                    <span style={{ color: colors.accent }}>{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Clients;
