'use client';

import { motion } from 'framer-motion';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Briefcase,
  MapPin,
  Euro,
  CalendarDays,
  ArrowLeft,
  Send,
} from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { ApplicationForm } from './ApplicationForm';

// Refined color palette - consistent with other components
const colors = {
  primary: '#1A2027', // Darker primary for better contrast
  secondary: '#3D5A73', // Richer secondary color
  accent: '#FF7A35', // Warmer accent for better visibility
  background: '#F8F9FC', // Lighter background for better contrast
  secondaryAccent: '#2A3F56', // Deeper secondary accent
};

interface JobDetailProps {
  job?: {
    id: string;
    title: string;
    location: string;
    type: string; // full-time, part-time, etc.
    salary?: string;
    postedAt: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits?: string[];
  };
  className?: string;
  onBack?: () => void;
}

export const JobDetail: React.FC<JobDetailProps> = ({
  job,
  className,
  onBack,
}) => {
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

  // Prüfung, ob Job-Daten vorhanden sind
  if (!job) {
    return (
      <motion.div
        className='p-8 text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='mb-4 text-2xl font-bold text-[#1A2027]'>
          Keine Stelleninformationen verfügbar
          <span className='text-[#FF7A35]'>.</span>
        </h2>
        <p className='mb-6 text-[#3D5A73]'>
          Die angeforderte Stelle konnte nicht gefunden werden.
        </p>
        <Button
          variant='outline'
          onClick={onBack}
          className='border-[#3D5A73]/30 font-medium text-[#3D5A73] transition-all duration-300 hover:border-[#FF7A35] hover:text-[#1A2027]'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Zurück zur Übersicht
        </Button>
      </motion.div>
    );
  }

  // Scrolle zur Bewerbungsformular
  const scrollToApplicationForm = () => {
    const form = document.getElementById('application-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={cn(
        'relative grid grid-cols-1 gap-8 lg:grid-cols-3',
        className
      )}
    >
      {/* Background decorative elements */}
      <div className='absolute inset-0 h-full w-full'>
        <motion.div
          className='absolute left-0 top-0 h-full w-1/3'
          style={{
            clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)',
            backgroundColor: colors.background,
            opacity: 0.7,
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className='absolute right-0 top-0 h-full w-1/3'
          style={{
            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
            backgroundColor: colors.background,
            opacity: 0.5,
          }}
          initial={{ x: 100, opacity: 0 }}
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

      {/* Haupt-Inhalt */}
      <motion.div
        className='relative z-10 space-y-8 lg:col-span-2'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        {/* Zurück-Button */}
        <motion.div variants={itemVariants}>
          <Button
            variant='ghost'
            size='sm'
            onClick={onBack}
            className='group flex items-center gap-2 text-[#3D5A73] hover:text-[#1A2027]'
          >
            <motion.div className='transition-transform duration-300 group-hover:-translate-x-1'>
              <ArrowLeft className='h-4 w-4' />
            </motion.div>
            Zurück zur Übersicht
          </Button>
        </motion.div>

        {/* Job-Details */}
        <motion.div variants={itemVariants}>
          <Card className='relative overflow-hidden border-none shadow-md'>
            <CardHeader className='relative border-b border-[#E5E7EB] bg-white pb-6'>
              {/* Decorative accent line */}
              <motion.div
                className='absolute -left-3 top-1/2 h-12 w-1.5 -translate-y-1/2 bg-gradient-to-b from-[#FF7A35] to-[#FF7A35]/30'
                initial={{ height: 0 }}
                animate={{ height: '3rem' }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />

              <CardTitle className='text-2xl font-medium text-[#1A2027]'>
                {job.title}
                <span className='text-[#FF7A35]'>.</span>
              </CardTitle>
            </CardHeader>

            <CardContent className='p-6'>
              <div className='mb-8 grid grid-cols-2 gap-4 rounded-lg bg-[#F8F9FC] p-4 md:grid-cols-4'>
                <motion.div
                  className='flex items-center gap-2'
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7A35]/10 text-[#FF7A35]'>
                    <MapPin className='h-4 w-4' />
                  </div>
                  <span className='text-sm text-[#3D5A73]'>{job.location}</span>
                </motion.div>

                <motion.div
                  className='flex items-center gap-2'
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#3D5A73]/10 text-[#3D5A73]'>
                    <Briefcase className='h-4 w-4' />
                  </div>
                  <span className='text-sm text-[#3D5A73]'>{job.type}</span>
                </motion.div>

                {job.salary && (
                  <motion.div
                    className='flex items-center gap-2'
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7A35]/10 text-[#FF7A35]'>
                      <Euro className='h-4 w-4' />
                    </div>
                    <span className='text-sm text-[#3D5A73]'>{job.salary}</span>
                  </motion.div>
                )}

                <motion.div
                  className='flex items-center gap-2'
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#3D5A73]/10 text-[#3D5A73]'>
                    <CalendarDays className='h-4 w-4' />
                  </div>
                  <span className='text-sm text-[#3D5A73]'>
                    Veröffentlicht: {job.postedAt}
                  </span>
                </motion.div>
              </div>

              <div className='prose prose-lg max-w-none text-[#3D5A73]'>
                <div dangerouslySetInnerHTML={{ __html: job.description }} />

                <h3 className='text-xl font-medium text-[#1A2027]'>Aufgaben</h3>
                <ul className='space-y-2'>
                  {job.responsibilities &&
                    job.responsibilities.map((responsibility, index) => (
                      <motion.li
                        key={index}
                        className='flex items-start gap-3'
                        custom={index}
                        whileHover={{
                          x: 5,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <motion.div
                          className='mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF7A35]/10 text-[#FF7A35]'
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: 'rgba(255,122,53,0.2)',
                          }}
                        >
                          <span className='text-sm font-medium'>•</span>
                        </motion.div>
                        <span>{responsibility}</span>
                      </motion.li>
                    ))}
                </ul>

                <h3 className='text-xl font-medium text-[#1A2027]'>
                  Anforderungen
                </h3>
                <ul className='space-y-2'>
                  {job.requirements &&
                    job.requirements.map((requirement, index) => (
                      <motion.li
                        key={index}
                        className='flex items-start gap-3'
                        custom={index}
                        whileHover={{
                          x: 5,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <motion.div
                          className='mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#3D5A73]/10 text-[#3D5A73]'
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: 'rgba(61,90,115,0.2)',
                          }}
                        >
                          <span className='text-sm font-medium'>•</span>
                        </motion.div>
                        <span>{requirement}</span>
                      </motion.li>
                    ))}
                </ul>

                {job.benefits && job.benefits.length > 0 && (
                  <>
                    <h3 className='text-xl font-medium text-[#1A2027]'>
                      Was wir bieten
                    </h3>
                    <ul className='space-y-2'>
                      {job.benefits.map((benefit, index) => (
                        <motion.li
                          key={index}
                          className='flex items-start gap-3'
                          custom={index}
                          whileHover={{
                            x: 5,
                            transition: { duration: 0.2 },
                          }}
                        >
                          <motion.div
                            className='mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF7A35]/10 text-[#FF7A35]'
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: 'rgba(255,122,53,0.2)',
                            }}
                          >
                            <span className='text-sm font-medium'>•</span>
                          </motion.div>
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className='mt-8'>
                <Button
                  onClick={scrollToApplicationForm}
                  className='group relative overflow-hidden rounded-md bg-[#1A2027] px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-[#2A3F56]'
                  size='lg'
                >
                  <span className='relative z-10 flex items-center gap-2'>
                    Jetzt bewerben
                    <motion.div className='transition-transform duration-300 group-hover:translate-x-1'>
                      <Send className='h-4 w-4' />
                    </motion.div>
                  </span>
                  <motion.div
                    className='absolute bottom-0 left-0 h-1 w-full bg-[#FF7A35]'
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Bewerbungsformular */}
      <motion.div
        className='relative z-10 lg:col-span-1'
        id='application-form'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <ApplicationForm jobTitle={job.title} jobId={job.id} />
      </motion.div>
    </div>
  );
};

export default JobDetail;
