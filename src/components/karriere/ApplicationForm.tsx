'use client';

import { motion } from 'framer-motion';
import { Send, Upload, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ApplicationFormProps {
  jobTitle?: string;
  jobId?: string; // Hinzugefügte jobId Prop
  className?: string;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  jobTitle = 'Diese Stelle',
  jobId: _jobId,
  className,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuliere API-Aufruf
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <Card className={cn('overflow-hidden shadow-md', className)}>
      <CardHeader className='relative bg-[#1A2027] text-white'>
        {/* Decorative elements */}
        <motion.div
          className='absolute right-0 top-0 h-20 w-20'
          style={{
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
            backgroundColor: '#FF7A35',
            opacity: 0.2,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <CardTitle className='text-xl font-medium'>
          Bewerbung für {jobTitle}
          <span className='text-[#FF7A35]'>.</span>
        </CardTitle>
      </CardHeader>

      <CardContent className='p-6'>
        {isSubmitted ? (
          <motion.div
            className='flex flex-col items-center justify-center py-8 text-center'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle2 className='h-8 w-8 text-green-600' />
            </motion.div>
            <h3 className='mb-2 text-xl font-medium text-[#1A2027]'>
              Bewerbung gesendet!
            </h3>
            <p className='text-[#3D5A73]'>
              Vielen Dank für Ihre Bewerbung. Wir werden uns in Kürze bei Ihnen
              melden.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial='hidden'
            animate='visible'
            variants={containerVariants}
          >
            <motion.div className='mb-4' variants={itemVariants}>
              <Label htmlFor='name' className='mb-1 block text-[#1A2027]'>
                Name
              </Label>
              <Input
                id='name'
                placeholder='Ihr vollständiger Name'
                required
                className='border-[#E5E7EB] focus:border-[#FF7A35] focus:ring-[#FF7A35]/20'
              />
            </motion.div>

            <motion.div className='mb-4' variants={itemVariants}>
              <Label htmlFor='email' className='mb-1 block text-[#1A2027]'>
                E-Mail
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='ihre.email@beispiel.de'
                required
                className='border-[#E5E7EB] focus:border-[#FF7A35] focus:ring-[#FF7A35]/20'
              />
            </motion.div>

            <motion.div className='mb-4' variants={itemVariants}>
              <Label htmlFor='phone' className='mb-1 block text-[#1A2027]'>
                Telefon
              </Label>
              <Input
                id='phone'
                type='tel'
                placeholder='+49 123 4567890'
                className='border-[#E5E7EB] focus:border-[#FF7A35] focus:ring-[#FF7A35]/20'
              />
            </motion.div>

            <motion.div className='mb-6' variants={itemVariants}>
              <Label htmlFor='message' className='mb-1 block text-[#1A2027]'>
                Anschreiben
              </Label>
              <Textarea
                id='message'
                placeholder='Warum sind Sie an dieser Position interessiert?'
                rows={4}
                className='border-[#E5E7EB] focus:border-[#FF7A35] focus:ring-[#FF7A35]/20'
              />
            </motion.div>

            <motion.div className='mb-6' variants={itemVariants}>
              <Label htmlFor='resume' className='mb-1 block text-[#1A2027]'>
                Lebenslauf hochladen
              </Label>
              <div className='relative mt-1'>
                <input
                  type='file'
                  id='resume'
                  className='sr-only'
                  accept='.pdf,.doc,.docx'
                  onChange={handleFileChange}
                  required
                />
                <label
                  htmlFor='resume'
                  className='group flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-[#E5E7EB] bg-white p-4 text-[#3D5A73] transition-all hover:border-[#FF7A35] hover:bg-[#FF7A35]/5'
                >
                  <Upload className='h-5 w-5 transition-colors group-hover:text-[#FF7A35]' />
                  <span className='transition-colors group-hover:text-[#FF7A35]'>
                    {fileName || 'PDF oder Word-Dokument auswählen'}
                  </span>
                </label>
              </div>
              <p className='mt-1 text-xs text-[#3D5A73]'>
                Maximal 5MB. Unterstützte Formate: PDF, DOC, DOCX
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='relative w-full overflow-hidden rounded-md bg-[#1A2027] px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-[#2A3F56]'
              >
                <span className='relative z-10 flex items-center justify-center gap-2'>
                  {isSubmitting ? 'Wird gesendet...' : 'Bewerbung absenden'}
                  <Send className='h-4 w-4' />
                </span>
                <motion.div
                  className='absolute bottom-0 left-0 h-1 w-full bg-[#FF7A35]'
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.form>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationForm;
