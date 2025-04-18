'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// Refined color palette - consistent with Hero component
const colors = {
  primary: '#1A2027', // Darker primary for better contrast
  secondary: '#3D5A73', // Richer secondary color
  accent: '#FF7A35', // Warmer accent for better visibility
  background: '#FFFFFF', // White background
  secondaryAccent: '#2A3F56', // Deeper secondary accent
};

interface CTAFormProps {
  title?: string;
  subtitle?: string;
  features?: string[];
  referenceText?: string;
  projectsText?: string;
  className?: string;
}

export const CTAForm: React.FC<CTAFormProps> = ({
  title = 'Wir sind bereit für Ihren nächsten Schritt',
  subtitle = 'Beginnen Sie noch heute mit der Transformation Ihres Unternehmens',
  features = [
    'Unverbindlich & kostenlos',
    'Kostenloses Erstgespräch',
    'Bedarfsanalyse statt Verkaufsgespräch',
  ],
  referenceText = 'Vertrauen durch Referenz',
  projectsText = 'Wir präsentieren Ihnen gerne unsere neuesten Projekte, damit Sie ein besseres Verständnis für unsere Leistung entwickeln.',
  className,
}) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real application, you would send the form data to your backend here
    console.log('Form submitted:', formState);

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  // Animation variants - matching Hero component style
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

  const featureVariants = {
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
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{ backgroundColor: colors.background }}
    >
      {/* Background elements similar to Hero */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white to-[#F8F9FC]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.div
          className="absolute right-0 top-0 h-full w-1/2 bg-[#F8F9FC]"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 10% 100%)' }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        {/* Decorative elements */}
        <motion.div
          className="absolute right-[5%] top-[15%] h-24 w-24 rounded-full bg-[#FF7A35]/5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[10%] left-[5%] h-20 w-20 rounded-full bg-[#3D5A73]/5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <Container className="relative z-10 max-w-6xl">
        <motion.div
          className="flex flex-col gap-12 lg:flex-row lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Left side: Content */}
          <motion.div className="w-full lg:w-1/2" variants={containerVariants}>
            {/* Top divider with animation */}
            <motion.div
              className="mb-8 h-px w-0 bg-gradient-to-r from-[#FF7A35] to-gray-200"
              variants={itemVariants}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            {/* Title with accent element */}
            <motion.div className="relative mb-4" variants={itemVariants}>
              <motion.div
                className="absolute -left-3 top-1/2 h-12 w-1.5 -translate-y-1/2 bg-gradient-to-b from-[#FF7A35] to-[#FF7A35]/30"
                initial={{ height: 0 }}
                animate={{ height: '3rem' }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <h2 className="text-3xl font-medium text-[#1A2027] md:text-4xl">
                {title}
                <span className="text-[#FF7A35]">.</span>
              </h2>
            </motion.div>

            <motion.p className="mb-8 text-base text-[#3D5A73]" variants={itemVariants}>
              {subtitle}
            </motion.p>

            <motion.h3 className="mb-4 text-lg font-medium text-[#1A2027]" variants={itemVariants}>
              Ihr individuelles Angebot
            </motion.h3>

            <motion.ul className="mb-8 space-y-3" variants={containerVariants}>
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  custom={index}
                  variants={featureVariants}
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
                    <span className="text-sm">•</span>
                  </motion.div>
                  <span className="text-[#3D5A73]">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.h3 className="mb-4 text-lg font-medium text-[#1A2027]" variants={itemVariants}>
              {referenceText}
            </motion.h3>

            <motion.p className="mb-8 text-base text-[#3D5A73]" variants={itemVariants}>
              {projectsText}
            </motion.p>

            {/* Bottom divider with animation */}
            <motion.div
              className="mt-8 h-px w-0 bg-gradient-to-r from-gray-200 to-[#FF7A35]"
              variants={itemVariants}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </motion.div>

          {/* Right side: Form */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="relative overflow-hidden rounded-lg bg-white p-8 shadow-lg"
              whileHover={{
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              {/* Decorative elements */}
              <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-bl from-[#FF7A35]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 h-16 w-16 bg-gradient-to-tr from-[#3D5A73]/10 to-transparent" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="name" className="mb-2 block text-[#3D5A73]">
                    Vor - und Nachname
                  </label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        'h-12 rounded-md border-gray-300 bg-white px-4 py-2 text-[#1A2027] transition-all duration-300',
                        focusedField === 'name'
                          ? 'border-[#FF7A35] ring-1 ring-[#FF7A35]/20'
                          : 'focus:border-[#3D5A73] focus:ring-[#3D5A73]'
                      )}
                      required
                    />
                    <AnimatePresence>
                      {focusedField === 'name' && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 w-full bg-[#FF7A35]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="email" className="mb-2 block text-[#3D5A73]">
                    E-Mail-Adresse
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        'h-12 rounded-md border-gray-300 bg-white px-4 py-2 text-[#1A2027] transition-all duration-300',
                        focusedField === 'email'
                          ? 'border-[#FF7A35] ring-1 ring-[#FF7A35]/20'
                          : 'focus:border-[#3D5A73] focus:ring-[#3D5A73]'
                      )}
                      required
                    />
                    <AnimatePresence>
                      {focusedField === 'email' && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 w-full bg-[#FF7A35]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="message" className="mb-2 block text-[#3D5A73]">
                    Ihre Nachricht
                  </label>
                  <div className="relative">
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        'min-h-[150px] rounded-md border-gray-300 bg-white px-4 py-2 text-[#1A2027] transition-all duration-300',
                        focusedField === 'message'
                          ? 'border-[#FF7A35] ring-1 ring-[#FF7A35]/20'
                          : 'focus:border-[#3D5A73] focus:ring-[#3D5A73]'
                      )}
                      required
                    />
                    <AnimatePresence>
                      {focusedField === 'message' && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 w-full bg-[#FF7A35]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative h-12 overflow-hidden rounded-md bg-[#1A2027] px-8 py-2 text-white transition-all duration-300 hover:bg-[#2A3F56]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? 'Senden...' : isSubmitted ? 'Gesendet' : 'Senden'}
                      {isSubmitted ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <motion.div
                          initial={{ x: -5, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      )}
                    </span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 w-full bg-[#FF7A35]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>

                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        className="mt-4 flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-600"
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="h-4 w-4" />
                        <p>
                          Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTAForm;
