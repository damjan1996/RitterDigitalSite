'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

// Define colors locally to avoid import issues
const colors = {
  primary: '#F8F9FC', // Light primary background
  secondary: '#3D5A73', // Richer secondary color
  accent: '#FF7A35', // Warmer accent for better visibility
  background: '#FFFFFF', // Pure white background for better contrast
  secondaryAccent: '#EBF0F5', // Light secondary accent
  text: '#1A2027', // Dark text color for better readability
};

interface Client {
  name: string;
  logo: string;
  href?: string; // URL to the client's website
}

interface ClientsProps {
  title?: string;
  subtitle?: string;
  clients?: Client[];
  className?: string;
}

export const Clients: React.FC<ClientsProps> = ({
  title = 'Trusted by Clients',
  subtitle = '',
  clients = [],
  className,
}) => {
  // Use the provided clients or the default list
  const displayClients =
    clients.length > 0
      ? clients
      : [
          {
            name: 'Ritter Technologie',
            logo: '/abstract-tech-logo.png',
            href: 'https://www.rittec.de/',
          },
          {
            name: 'GIS',
            logo: '/placeholder.svg?key=avvpn',
            href: 'http://gis-net.de/',
          },
          {
            name: 'LINQ IT',
            logo: '/abstract-tech-logo.png',
            href: 'https://www.linq-it.de/',
          },
          {
            name: 'HOMA',
            logo: '/placeholder.svg?key=vaz8r',
            href: 'https://www.homa-ob.de/',
          },
          {
            name: 'Rudolf Flume',
            logo: '/placeholder.svg?key=cjdb7',
            href: 'https://www.flume.de/',
          },
        ];

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
            opacity: 0.7,
          }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
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
            {subtitle && (
              <p
                className="mb-2 text-sm font-medium uppercase tracking-wider"
                style={{ color: colors.secondary }}
              >
                {subtitle}
              </p>
            )}
            <h2 className="mb-4 text-4xl font-medium tracking-tight" style={{ color: colors.text }}>
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
          className="grid grid-cols-2 items-center gap-6 md:grid-cols-3 lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {displayClients.map((client, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative flex items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:bg-gray-50"
              whileHover={{
                y: -5,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: { duration: 0.3 },
              }}
            >
              {client.href ? (
                <Link
                  href={client.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex h-20 w-full items-center justify-center"
                  aria-label={`Besuchen Sie die Website von ${client.name}`}
                >
                  {/* Logo with fallback to company name */}
                  <div className="relative h-full w-full">
                    <Image
                      src={client.logo || '/placeholder.svg'}
                      alt={`${client.name} Logo`}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="transition-all duration-300 group-hover:brightness-110"
                      onError={e => {
                        // Fallback to name if image can't be loaded
                        const target = e.target as HTMLImageElement;

                        // Ensure target exists
                        if (!target) return;

                        // Hide the image
                        target.style.display = 'none';

                        // Ensure parentElement exists
                        const parent = target.parentElement;
                        if (!parent) return;

                        // Remove the old image and replace with text
                        const nameSpan = document.createElement('span');
                        nameSpan.className =
                          'text-sm font-medium text-gray-700 transition-all duration-300 group-hover:text-gray-900';
                        nameSpan.textContent = client.name;

                        // Add the span element to the parent
                        parent.appendChild(nameSpan);
                      }}
                    />
                  </div>
                </Link>
              ) : (
                <div className="relative flex h-20 w-full items-center justify-center">
                  <div className="relative h-full w-full">
                    <Image
                      src={client.logo || '/placeholder.svg'}
                      alt={`${client.name} Logo`}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="transition-all duration-300 group-hover:brightness-110"
                      onError={e => {
                        // If the image can't be loaded, show the name
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<span class="text-sm font-medium text-white/70 transition-all duration-300 group-hover:text-white">${client.name}</span>`;
                      }}
                    />
                  </div>
                </div>
              )}

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
                <div className="relative">
                  <div className="mb-2 text-4xl font-bold" style={{ color: colors.text }}>
                    {stat.value}
                    <span style={{ color: colors.accent }}>{stat.suffix}</span>
                  </div>
                  <div className="text-sm" style={{ color: colors.secondary }}>
                    {stat.label}
                  </div>
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
