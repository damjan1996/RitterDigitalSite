// src/pages/kontakt/components/ContactForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';

// Definieren des Zod-Schemas für die Formularvalidierung
const contactFormSchema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Ihre Nachricht sollte mindestens 10 Zeichen enthalten'),
  privacy: z.boolean().refine(val => val === true, {
    message: 'Bitte akzeptieren Sie die Datenschutzbestimmungen',
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      privacy: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // API-Anfrage an den Brevo-Endpunkt
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          'Es ist ein Fehler beim Versenden aufgetreten. Bitte versuchen Sie es später erneut.'
        );
      }

      setSubmitSuccess(true);
      reset();
      // Nach 5 Sekunden die Erfolgsmeldung zurücksetzen
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Fehler beim Senden des Formulars:', error);
      setSubmitError(
        error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold text-primary">Kontaktformular</h2>

      {submitSuccess && (
        <div className="mb-6 rounded-md bg-green-50 p-4 text-green-700">
          Vielen Dank für Ihre Nachricht! Wir werden uns zeitnah bei Ihnen melden.
        </div>
      )}

      {submitError && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-red-700">{submitError}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            E-Mail *
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
            Telefon
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label htmlFor="company" className="mb-1 block text-sm font-medium text-gray-700">
            Unternehmen
          </label>
          <input
            id="company"
            type="text"
            {...register('company')}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
            Nachricht *
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
        </div>

        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="privacy"
              type="checkbox"
              {...register('privacy')}
              className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="privacy"
              className={`font-medium ${errors.privacy ? 'text-red-500' : 'text-gray-700'}`}
            >
              Ich habe die{' '}
              <Link href="/datenschutz" className="text-accent hover:underline">
                Datenschutzerklärung
              </Link>{' '}
              gelesen und stimme der Verarbeitung meiner Daten zu. *
            </label>
            {errors.privacy && (
              <p className="mt-1 text-sm text-red-600">{errors.privacy.message}</p>
            )}
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="default"
            className="w-full bg-accent text-white hover:bg-accent/90 sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
