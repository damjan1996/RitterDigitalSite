'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  icon,
  title,
  content,
  link,
}) => {
  return (
    <motion.div
      className='flex items-start gap-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className='rounded-full bg-[#FF7A35]/10 p-3 text-[#FF7A35]'>
        {icon}
      </div>
      <div>
        <h3 className='mb-1 font-medium text-[#1A2027]'>{title}</h3>
        {link ? (
          <Link
            href={link}
            className='text-[#3D5A73] transition-colors hover:text-[#FF7A35]'
          >
            {content}
          </Link>
        ) : (
          <p className='text-[#3D5A73]'>{content}</p>
        )}
      </div>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      className={cn(
        'relative flex min-h-[80vh] items-center justify-center bg-white'
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background elements - Minimalist version */}
      <div className='absolute inset-0 z-0'>
        {/* Subtle gradient background */}
        <div className='absolute inset-0 bg-gradient-to-b from-white to-[#f8fafc] opacity-60' />

        {/* Accent line at bottom */}
        <motion.div
          className='absolute bottom-0 left-0 h-1 w-full'
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #FF7A35 50%, transparent 100%)',
            opacity,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
        />
      </div>

      {/* Content container */}
      <div className='container relative z-10 mx-auto px-6 py-16 md:px-8'>
        <div className='mx-auto max-w-6xl'>
          <div className='grid gap-12 md:grid-cols-2'>
            {/* Left column - Text content */}
            <motion.div
              className='flex flex-col justify-center'
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              style={{ y, opacity }}
            >
              {/* Title with animated accent */}
              <motion.div variants={itemVariants} className='relative mb-6'>
                <motion.div
                  className='absolute left-0 top-0 h-12 w-1 bg-gradient-to-b from-[#FF7A35] to-transparent'
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 48, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
                <h1 className='bg-gradient-to-r from-[#1A2027] to-[#3D5A73] bg-clip-text pl-4 text-4xl font-bold leading-tight tracking-tight text-transparent md:text-5xl lg:text-6xl'>
                  Sprechen Sie mit uns
                  <span className='text-[#FF7A35]'>.</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className='mb-10 max-w-xl text-lg text-[#3D5A73]/80 md:text-xl'
              >
                Wir freuen uns darauf, von Ihnen zu hören. Kontaktieren Sie uns
                für eine unverbindliche Beratung zu Ihrem
                Digitalisierungsprojekt.
              </motion.p>

              {/* Contact information */}
              <motion.div variants={itemVariants} className='space-y-6'>
                <ContactInfo
                  icon={<Phone className='h-5 w-5' />}
                  title='Telefon'
                  content='+49 123 456 789'
                  link='tel:+49123456789'
                />
                <ContactInfo
                  icon={<Mail className='h-5 w-5' />}
                  title='E-Mail'
                  content='info@ritter-digital.de'
                  link='mailto:info@ritter-digital.de'
                />
                <ContactInfo
                  icon={<MapPin className='h-5 w-5' />}
                  title='Adresse'
                  content='Musterstraße 123, 12345 Berlin'
                />
              </motion.div>
            </motion.div>

            {/* Right column - Contact form */}
            <motion.div
              className='relative rounded-2xl bg-white p-8 shadow-md'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className='absolute -left-2 top-0 h-full w-1 bg-gradient-to-b from-[#FF7A35] to-[#FF9A65]'
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              />
              <h2 className='mb-6 text-2xl font-semibold text-[#1A2027]'>
                Kontaktformular
              </h2>
              <p className='mb-6 text-[#3D5A73]'>
                Füllen Sie das Formular aus und wir melden uns innerhalb von 24
                Stunden bei Ihnen.
              </p>

              {/* Contact form with proper label associations */}
              <form className='space-y-4'>
                <div className='rounded-md border border-[#3D5A73]/20 p-3'>
                  <label
                    htmlFor='name'
                    className='mb-1 block text-sm text-[#3D5A73]'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    className='w-full rounded-md bg-[#3D5A73]/5 p-2 outline-none focus:ring-1 focus:ring-[#FF7A35]'
                  />
                </div>
                <div className='rounded-md border border-[#3D5A73]/20 p-3'>
                  <label
                    htmlFor='email'
                    className='mb-1 block text-sm text-[#3D5A73]'
                  >
                    E-Mail
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='w-full rounded-md bg-[#3D5A73]/5 p-2 outline-none focus:ring-1 focus:ring-[#FF7A35]'
                  />
                </div>
                <div className='rounded-md border border-[#3D5A73]/20 p-3'>
                  <label
                    htmlFor='message'
                    className='mb-1 block text-sm text-[#3D5A73]'
                  >
                    Nachricht
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    rows={4}
                    className='w-full rounded-md bg-[#3D5A73]/5 p-2 outline-none focus:ring-1 focus:ring-[#FF7A35]'
                  ></textarea>
                </div>
                <motion.button
                  type='submit'
                  className='group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#1A2027] to-[#2A3F56] px-8 py-3 text-center font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#FF7A35]/20'
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <span className='relative z-10'>Nachricht senden</span>
                  <motion.div
                    className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-r from-[#FF7A35] to-[#FF9A65] opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
