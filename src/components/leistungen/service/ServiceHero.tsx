'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  BarChart3,
  Database,
  BrainCircuit,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  features?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({
  title = 'Unsere Leistungen',
  subtitle = 'Maßgeschneiderte Lösungen für Ihre digitale Transformation',
  description = 'Wir bieten innovative Lösungen, die Ihr Unternehmen auf die nächste Stufe heben. Entdecken Sie unsere vielfältigen Leistungen und wie wir Ihnen helfen können, Ihre Geschäftsziele zu erreichen.',
  imageUrl = '/service-hero-image.jpg',
  features = [
    {
      icon: <Sparkles className='h-5 w-5' />,
      title: 'Innovative Lösungen',
      description: 'Maßgeschneiderte Entwicklung für Ihre Anforderungen',
    },
    {
      icon: <BarChart3 className='h-5 w-5' />,
      title: 'Datengestützte Entscheidungen',
      description: 'Business Intelligence für strategische Vorteile',
    },
    {
      icon: <Database className='h-5 w-5' />,
      title: 'Zentrale Datenverwaltung',
      description: 'Effiziente Analysen durch Data Warehouse',
    },
    {
      icon: <BrainCircuit className='h-5 w-5' />,
      title: 'KI-Integration',
      description: 'Intelligente Automatisierung und Optimierung',
    },
  ],
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Get header height for proper spacing
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Trigger entrance animations after component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Automatic feature rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

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
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section
      className='relative min-h-screen overflow-hidden bg-white'
      style={{ paddingTop: `${headerHeight}px` }}
    >
      {/* Enhanced background with layered elements for depth */}
      <div className='absolute inset-0 h-full w-full'>
        <motion.div
          className='absolute inset-0 bg-gradient-to-br from-white to-[#F8F9FC]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.div
          className='absolute right-0 top-0 h-full w-3/4 bg-[#F8F9FC]'
          style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        {/* Accent lines and decorative elements */}
        <motion.div
          className='absolute bottom-0 left-0 h-1 w-full'
          style={{
            background:
              'linear-gradient(90deg, transparent, #FF7A35, transparent)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />

        <motion.div
          className='absolute right-[10%] top-[15%] h-32 w-32 rounded-full bg-[#FF7A35]/5'
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className='absolute bottom-[20%] left-[5%] h-24 w-24 rounded-full bg-[#3D5A73]/5'
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <Container className='relative z-10 flex flex-1 flex-col justify-center px-4 py-16 md:py-24'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16'>
          {/* Left column - Text content */}
          <motion.div
            className='flex flex-col justify-center'
            initial='hidden'
            animate={isVisible ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            {/* Enhanced title with gradient accent */}
            <div className='relative mb-2'>
              <motion.div
                className='absolute -left-3 top-1/2 h-12 w-1.5 -translate-y-1/2 bg-gradient-to-b from-[#FF7A35] to-[#FF7A35]/30'
                initial={{ height: 0 }}
                animate={{ height: '3rem' }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <motion.div
                className='mb-2 inline-flex items-center rounded-full bg-[#FF7A35]/10 px-4 py-1.5'
                variants={itemVariants}
              >
                <Sparkles className='mr-2 h-4 w-4 text-[#FF7A35]' />
                <span className='text-sm font-medium text-[#FF7A35]'>
                  Leistungen
                </span>
              </motion.div>

              <motion.h1
                className='text-4xl font-medium leading-tight tracking-tight text-[#1A2027] md:text-5xl lg:text-6xl'
                variants={itemVariants}
              >
                {title}
                <span className='text-[#FF7A35]'>.</span>
              </motion.h1>
            </div>

            {/* Enhanced subtitle with better typography */}
            <motion.p
              variants={itemVariants}
              className='mb-4 text-xl font-medium text-[#3D5A73] md:text-2xl'
            >
              {subtitle}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className='mb-8 max-w-xl text-[#3D5A73]'
            >
              {description}
            </motion.p>

            {/* Enhanced CTA section with modern button designs */}
            <motion.div
              variants={itemVariants}
              className='mt-8 flex flex-wrap gap-4'
            >
              <Link href='/kontakt' className='group'>
                <Button
                  className='relative overflow-hidden rounded-md bg-[#1A2027] px-8 py-6 font-medium text-white transition-all duration-300 hover:bg-[#2A3F56]'
                  size='lg'
                >
                  <span className='relative z-10 flex items-center gap-2'>
                    Beratungsgespräch
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

              <Link href='#details' className='group'>
                <Button
                  variant='outline'
                  className='relative rounded-md border-[#3D5A73]/30 px-8 py-6 font-medium text-[#3D5A73] transition-all duration-300 hover:border-[#FF7A35] hover:text-[#1A2027]'
                  size='lg'
                >
                  <span className='relative z-10'>Mehr erfahren</span>
                  <motion.div
                    className='absolute bottom-0 left-0 h-0.5 w-full origin-left bg-[#FF7A35]'
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column - Image and features */}
          <motion.div
            className='hidden lg:block'
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className='relative'>
              {/* Main image with hover effect */}
              <motion.div
                className='relative overflow-hidden rounded-lg shadow-xl'
                whileHover={{
                  y: -5,
                  boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
                  transition: { duration: 0.3 },
                }}
              >
                <div className='relative aspect-[4/3] w-full'>
                  <Image
                    src={imageUrl || '/placeholder.svg'}
                    alt={title}
                    fill
                    className='object-cover transition-transform duration-700 hover:scale-105'
                    priority
                  />

                  {/* Overlay gradient */}
                  <div className='absolute inset-0 bg-gradient-to-tr from-[#1A2027]/30 to-transparent'></div>
                </div>

                {/* Floating badge */}
                <motion.div
                  className='absolute -right-4 -top-4 rounded-xl bg-white p-3 shadow-lg'
                  whileHover={{
                    y: -5,
                    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                    transition: { duration: 0.3 },
                  }}
                >
                  <Sparkles className='h-6 w-6 text-[#FF7A35]' />
                </motion.div>
              </motion.div>

              {/* Feature cards */}
              <motion.div
                className='absolute -bottom-16 -left-8 w-3/4 rounded-lg bg-white p-6 shadow-lg'
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  transition: { duration: 0.3 },
                }}
              >
                <div className='mb-4 flex gap-3'>
                  {features.map((_, index) => (
                    <motion.button
                      key={index}
                      className='group relative h-2 w-12 overflow-hidden rounded-full bg-[#F8F9FC]'
                      onClick={() => setActiveFeature(index)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className='absolute inset-0 rounded-full'
                        style={{
                          backgroundColor:
                            index === activeFeature ? '#FF7A35' : '#3D5A73',
                        }}
                        initial={{ scaleX: index === activeFeature ? 1 : 0 }}
                        animate={{ scaleX: index === activeFeature ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>
                  ))}
                </div>

                <div className='flex items-center gap-4'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF7A35]/10 text-[#FF7A35]'>
                    {features[activeFeature].icon}
                  </div>
                  <div>
                    <h3 className='text-lg font-medium text-[#1A2027]'>
                      {features[activeFeature].title}
                    </h3>
                    <p className='text-sm text-[#3D5A73]'>
                      {features[activeFeature].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile features showcase */}
          <motion.div
            className='mt-8 block lg:hidden'
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className='relative mb-8 overflow-hidden rounded-lg shadow-lg'>
              <Image
                src={imageUrl || '/placeholder.svg'}
                alt={title}
                width={600}
                height={450}
                className='h-full w-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-tr from-[#1A2027]/30 to-transparent'></div>
            </div>

            <div className='relative w-full overflow-hidden rounded-lg bg-white p-6 shadow-md'>
              <div className='flex items-center gap-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF7A35]/10 text-[#FF7A35]'>
                  {features[activeFeature].icon}
                </div>
                <div>
                  <h3 className='text-lg font-medium text-[#1A2027]'>
                    {features[activeFeature].title}
                  </h3>
                  <p className='text-sm text-[#3D5A73]'>
                    {features[activeFeature].description}
                  </p>
                </div>
              </div>

              <div className='mt-4 flex gap-3'>
                {features.map((_, index) => (
                  <button
                    key={index}
                    className='group relative h-2 flex-1 overflow-hidden rounded-full bg-[#F8F9FC]'
                    onClick={() => setActiveFeature(index)}
                  >
                    <motion.div
                      className='absolute inset-0 rounded-full'
                      style={{
                        backgroundColor:
                          index === activeFeature ? '#FF7A35' : '#3D5A73',
                      }}
                      initial={{ scaleX: index === activeFeature ? 1 : 0 }}
                      animate={{ scaleX: index === activeFeature ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className='absolute bottom-8 left-0 right-0 flex justify-center'
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <button
          className='group flex flex-col items-center opacity-70 transition-opacity duration-300 hover:opacity-100'
          onClick={() => {
            const nextSection = document.getElementById('details');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth',
              });
            }
          }}
        >
          <span className='mb-2 text-sm text-[#3D5A73]'>Mehr entdecken</span>
          <ChevronDown className='h-6 w-6 animate-bounce text-[#3D5A73]' />
        </button>
      </motion.div>
    </section>
  );
};

export default ServiceHero;
