'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

import { Button } from '@/components/ui/button';
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

interface MissionProps {
  className?: string;
}

export const Mission: React.FC<MissionProps> = ({ className }) => {
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

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.1,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section
      id="mission"
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{ backgroundColor: colors.background }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute right-0 top-0 h-full w-1/2"
          style={{
            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 10% 100%)',
            backgroundColor: 'white',
            opacity: 0.7,
          }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute right-[10%] top-[15%] h-24 w-24 rounded-full"
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

      <Container className="relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side: Media */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="relative overflow-hidden rounded-lg bg-white p-4 shadow-lg"
              whileHover={{
                y: -5,
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                transition: { duration: 0.3 },
              }}
            >
              {/* Decorative elements */}
              <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-bl from-[#FF7A35]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 h-16 w-16 bg-gradient-to-tr from-[#3D5A73]/10 to-transparent" />

              <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                <Image
                  src="/images/artificialintelligence.jpg"
                  alt="Unsere Mission"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              className="absolute -left-4 -top-4 rounded-xl bg-white p-3 shadow-lg"
              whileHover={{
                y: -5,
                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                transition: { duration: 0.3 },
              }}
            >
              <div className="h-6 w-6 rounded-full bg-[#FF7A35]"></div>
            </motion.div>
          </motion.div>

          {/* Right side: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {/* Title with accent element */}
            <motion.div className="relative mb-6" variants={itemVariants}>
              <motion.div
                className="absolute -left-3 top-1/2 h-12 w-1.5 -translate-y-1/2 bg-gradient-to-b from-[#FF7A35] to-[#FF7A35]/30"
                initial={{ height: 0 }}
                animate={{ height: '3rem' }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <h2 className="text-3xl font-medium text-[#1A2027] md:text-4xl">
                Unsere Mission
                <span className="text-[#FF7A35]">.</span>
              </h2>
            </motion.div>

            <motion.p className="mb-6 text-lg text-[#3D5A73]" variants={itemVariants}>
              Bei Ritter Digital haben wir es uns zur Aufgabe gemacht, Unternehmen durch
              maßgeschneiderte digitale Lösungen zu stärken und ihnen zu nachhaltigem Wachstum zu
              verhelfen.
            </motion.p>

            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="mb-4 text-xl font-medium text-[#1A2027]">Wir glauben an:</h3>
              <motion.ul className="space-y-3" variants={containerVariants}>
                {[
                  'Die Kraft der Digitalisierung, um Unternehmen zu transformieren und zu verbessern.',
                  'Langfristige Partnerschaften, die auf Vertrauen und gegenseitigem Respekt basieren.',
                  'Die Kombination aus technologischer Innovation und tiefem Branchenverständnis.',
                  'Lösungen, die nicht nur technisch exzellent, sondern auch wirtschaftlich sinnvoll sind.',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    custom={index}
                    variants={listItemVariants}
                    whileHover={{
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.div
                      className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF7A35]/10 text-[#FF7A35]"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: 'rgba(255,122,53,0.2)',
                      }}
                    >
                      <span className="text-sm font-medium">•</span>
                    </motion.div>
                    <span className="text-[#3D5A73]">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mb-8 border-l-4 border-[#FF7A35] bg-white p-4 shadow-sm"
            >
              <p className="text-lg italic text-[#3D5A73]">
                &#34;Wir streben danach, der verlässlichste Partner für die digitale Transformation
                zu sein und unseren Kunden durch innovative Technologien einen echten
                Wettbewerbsvorteil zu verschaffen.&#34;
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <Link href="/kontakt" className="group">
                <Button className="relative overflow-hidden rounded-md bg-[#1A2027] px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-[#2A3F56]">
                  <span className="relative z-10 flex items-center gap-2">
                    Mit uns zusammenarbeiten
                    <motion.div className="transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 w-full bg-[#FF7A35]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
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

export default Mission;
