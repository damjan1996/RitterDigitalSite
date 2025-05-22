'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';
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

interface TeamMembersProps {
  className?: string;
}

export const TeamMembers: React.FC<TeamMembersProps> = ({ className }) => {
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
      id='team'
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{ backgroundColor: 'white' }}
    >
      {/* Background decorative elements */}
      <div className='absolute inset-0 h-full w-full'>
        <motion.div
          className='absolute left-0 top-0 h-full w-1/2'
          style={{
            clipPath: 'polygon(0 0, 90% 0, 70% 100%, 0 100%)',
            backgroundColor: colors.background,
            opacity: 0.5,
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className='absolute left-[10%] top-[15%] h-24 w-24 rounded-full'
          style={{ backgroundColor: `${colors.accent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className='absolute bottom-[15%] right-[8%] h-32 w-32 rounded-full'
          style={{ backgroundColor: `${colors.secondaryAccent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <Container className='relative z-10 max-w-6xl'>
        {/* Section header */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
          className='mb-16 text-center'
        >
          <h2 className='mx-auto max-w-3xl text-3xl font-medium tracking-tight text-[#1A2027] md:text-4xl'>
            Unser Team
            <span className='text-[#FF7A35]'>.</span>
          </h2>
          <p className='mx-auto mt-4 max-w-3xl text-lg text-[#3D5A73]'>
            Bei Ritter Digital sind unsere Mitarbeiter unser wertvollstes Gut.
            Lernen Sie die Köpfe hinter unseren innovativen Lösungen kennen.
          </p>

          {/* Decorative accent line */}
          <motion.div
            className='mx-auto mt-6 h-1 w-16 rounded-full'
            style={{ backgroundColor: colors.accent }}
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className='group'
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div className='overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 group-hover:shadow-xl'>
                <div className='relative h-80 overflow-hidden'>
                  <Image
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#1A2027]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>

                  <div className='absolute bottom-0 left-0 right-0 flex justify-end space-x-3 p-4 opacity-0 transition-all duration-300 group-hover:opacity-100'>
                    {member.linkedin && (
                      <motion.a
                        href={member.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1A2027] shadow-md transition-transform hover:scale-110 hover:bg-[#FF7A35] hover:text-white'
                        whileHover={{ y: -3 }}
                        aria-label={`LinkedIn von ${member.name}`}
                      >
                        <Linkedin className='h-4 w-4' />
                      </motion.a>
                    )}

                    {member.email && (
                      <motion.a
                        href={`mailto:${member.email}`}
                        className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1A2027] shadow-md transition-transform hover:scale-110 hover:bg-[#FF7A35] hover:text-white'
                        whileHover={{ y: -3 }}
                        aria-label={`E-Mail an ${member.name}`}
                      >
                        <Mail className='h-4 w-4' />
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className='p-6'>
                  <h3 className='mb-1 text-xl font-medium text-[#1A2027]'>
                    {member.name}
                  </h3>
                  <p className='mb-4 font-medium text-[#FF7A35]'>
                    {member.role}
                  </p>
                  <p className='text-[#3D5A73]'>{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className='mt-20 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className='mb-4 text-2xl font-medium text-[#1A2027]'>
            Werde Teil unseres Teams
            <span className='text-[#FF7A35]'>.</span>
          </h3>
          <p className='mx-auto mb-8 max-w-2xl text-lg text-[#3D5A73]'>
            Wir sind ständig auf der Suche nach talentierten Fachkräften, die
            unser Team verstärken möchten.
          </p>
          <Link href='/karriere' className='group'>
            <Button className='relative overflow-hidden rounded-md bg-[#1A2027] px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-[#2A3F56]'>
              <span className='relative z-10 flex items-center gap-2'>
                Karriere bei Ritter Digital
                <motion.div className='transition-transform duration-300 group-hover:translate-x-1'>
                  <ArrowRight className='h-4 w-4' />
                </motion.div>
              </span>
              <motion.div
                className='absolute bottom-0 left-0 h-1 w-full bg-[#FF7A35]'
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </Link>
        </motion.div>
      </Container>

      {/* Animated background elements */}
      <motion.div
        className='absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-[#FF7A35]/5'
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
        className='absolute -top-20 right-20 h-40 w-40 rounded-full bg-[#3D5A73]/5'
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

export default TeamMembers;
