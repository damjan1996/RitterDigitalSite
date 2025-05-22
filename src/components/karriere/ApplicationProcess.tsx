'use client';

import { motion } from 'framer-motion';
import { ClipboardCheck, Users, Phone, Briefcase, CheckCircle } from 'lucide-react';
import type React from 'react';

import { SectionTitle } from '@/components/common/section-title';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ApplicationProcessProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];
  className?: string;
}

export const ApplicationProcess: React.FC<ApplicationProcessProps> = ({
  title = 'Unser Bewerbungsprozess',
  subtitle = 'Transparent und effizient: So sieht der Weg zu Ihrem neuen Job bei uns aus',
  steps = [],
  className,
}) => {
  // Standard-Schritte, falls keine angegeben wurden
  const defaultSteps: Step[] = [
    {
      icon: <ClipboardCheck className="h-8 w-8 text-[#FF7A35]" />,
      title: 'Bewerbung einreichen',
      description:
        'Senden Sie uns Ihren Lebenslauf und ein kurzes Motivationsschreiben über unser Online-Formular.',
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-[#FF7A35]" />,
      title: 'Erste Prüfung',
      description:
        'Wir prüfen Ihre Unterlagen und melden uns innerhalb von 5 Werktagen bei Ihnen zurück.',
    },
    {
      icon: <Phone className="h-8 w-8 text-[#FF7A35]" />,
      title: 'Telefoninterview',
      description:
        'Bei passender Qualifikation führen wir ein kurzes Telefonat, um uns gegenseitig kennenzulernen.',
    },
    {
      icon: <Users className="h-8 w-8 text-[#FF7A35]" />,
      title: 'Persönliches Gespräch',
      description:
        'Im nächsten Schritt laden wir Sie zu einem persönlichen Gespräch in unsere Büroräume ein.',
    },
    {
      icon: <Briefcase className="h-8 w-8 text-[#FF7A35]" />,
      title: 'Entscheidung & Angebot',
      description:
        'Nach einem erfolgreichen Gespräch unterbreiten wir Ihnen ein attraktives Angebot.',
    },
  ];

  const processSteps = steps.length > 0 ? steps : defaultSteps;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <section className={cn('relative overflow-hidden bg-[#F8F9FC] py-16 md:py-24', className)}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2"
          style={{
            clipPath: 'polygon(0 0, 90% 0, 70% 100%, 0 100%)',
            backgroundColor: 'white',
            opacity: 0.5,
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute left-[10%] top-[15%] h-24 w-24 rounded-full"
          style={{ backgroundColor: '#FF7A35/10' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[15%] right-[8%] h-32 w-32 rounded-full"
          style={{ backgroundColor: '#3D5A73/10' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <Container className="relative z-10">
        <SectionTitle
          title={title}
          subtitle={subtitle}
          align="center"
          className="mb-16"
          decorative={true}
        />

        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Verbindungslinie */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 -translate-x-1/2 bg-gray-200 md:block" />

          <div className="space-y-12 md:space-y-0">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className={cn(
                  'relative items-center md:grid md:grid-cols-2 md:gap-8',
                  index % 2 === 0 ? 'md:text-right' : ''
                )}
                variants={itemVariants}
              >
                {/* Inhalt */}
                <div className={cn('mb-8 md:mb-0', index % 2 !== 0 ? 'md:col-start-2' : '')}>
                  <motion.div
                    className={cn(
                      'relative rounded-lg border border-gray-100 bg-white p-6 shadow-sm',
                      'transition-all duration-300 hover:shadow-md'
                    )}
                    whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                  >
                    {/* Decorative elements */}
                    <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-bl from-[#F8F9FC] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 h-16 w-16 bg-gradient-to-tr from-[#F8F9FC] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <h3 className="mb-3 flex items-center gap-3 text-xl font-semibold text-[#1A2027]">
                      <div className="inline-flex items-center justify-center rounded-full bg-[#1A2027]/5 p-2 md:hidden">
                        {step.icon}
                      </div>
                      <span>
                        {index + 1}. {step.title}
                      </span>
                    </h3>
                    <p className="text-[#3D5A73]">{step.description}</p>
                  </motion.div>
                </div>

                {/* Icon mit Nummer (vertausche für ungerade/gerade) */}
                <div
                  className={cn(
                    'hidden md:relative md:z-10 md:flex md:items-center md:justify-center',
                    index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'
                  )}
                >
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#FF7A35] bg-white shadow-sm"
                    whileHover={{ scale: 1.1, boxShadow: '0 10px 25px rgba(255,122,53,0.2)' }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
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

export default ApplicationProcess;
