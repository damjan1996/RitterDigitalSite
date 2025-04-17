// src/pages/karriere/components/ApplicationForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, PaperclipIcon, AlertCircle } from 'lucide-react';
import Link from 'next/link'; // Added Link import
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// Validierungsschema für das Bewerbungsformular
const applicationSchema = z.object({
  firstName: z.string().min(2, 'Bitte geben Sie Ihren Vornamen ein.'),
  lastName: z.string().min(2, 'Bitte geben Sie Ihren Nachnamen ein.'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  phone: z.string().optional(),
  position: z.string().min(2, 'Bitte geben Sie die gewünschte Position ein.'),
  message: z.string().min(10, 'Bitte beschreiben Sie kurz Ihre Motivation.'),
  resume: z
    .any()
    .refine(file => file?.[0]?.size <= 5000000, 'Die Datei darf maximal 5MB groß sein.')
    .refine(
      file =>
        !file?.[0] ||
        [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(file?.[0]?.type),
      'Bitte laden Sie ein PDF oder Word-Dokument hoch.'
    ),
  privacy: z.boolean().refine(val => val === true, {
    message: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
  }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  jobTitle?: string;
  jobId?: string;
  className?: string;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  jobTitle = 'Offene Stelle',
  jobId,
  className,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: jobTitle || '',
      message: '',
      resume: undefined,
      privacy: false,
    },
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Hier würde normalerweise die API-Anfrage erfolgen
      // Beispiel: FormData erstellen und senden
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone || '');
      formData.append('position', data.position);
      formData.append('message', data.message);
      if (data.resume?.[0]) {
        formData.append('resume', data.resume[0]);
      }
      formData.append('jobId', jobId || '');

      // Simuliere API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Wenn erfolgreich, setze Erfolgsstatus
      setIsSuccess(true);
      form.reset();
      setSelectedFileName(null);

      // Scrolle zum Anfang des Formulars
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Fehler bei der Bewerbung:', err);
      setError('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      form.setValue('resume', e.target.files, { shouldValidate: true });
    } else {
      setSelectedFileName(null);
    }
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {isSuccess ? 'Bewerbung gesendet!' : `Bewerbung für: ${jobTitle}`}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Vielen Dank für Ihre Bewerbung!</h3>
            <p className="mb-6 text-secondary">
              Wir haben Ihre Bewerbung erhalten und werden uns in Kürze bei Ihnen melden.
            </p>
            <Button variant="outline" onClick={() => setIsSuccess(false)}>
              Neue Bewerbung
            </Button>
          </div>
        ) : (
          <Form {...form}>
            {error && (
              <Alert variant="error" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Fehler</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vorname *</FormLabel>
                      <FormControl>
                        <Input placeholder="Max" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nachname *</FormLabel>
                      <FormControl>
                        <Input placeholder="Mustermann" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="max.mustermann@beispiel.de" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input placeholder="+49 123 456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position *</FormLabel>
                    <FormControl>
                      <Input placeholder="Auf welche Stelle bewerben Sie sich?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ihre Motivation *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Beschreiben Sie kurz, warum Sie sich für diese Position interessieren"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resume"
                render={() => (
                  <FormItem>
                    <FormLabel>Lebenslauf / CV</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <label
                          htmlFor="resume-upload"
                          className="flex cursor-pointer items-center gap-2 rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
                        >
                          <PaperclipIcon className="h-4 w-4" />
                          <span>Datei auswählen</span>
                        </label>

                        <input
                          id="resume-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />

                        {selectedFileName && (
                          <span className="max-w-xs truncate text-sm text-secondary">
                            {selectedFileName}
                          </span>
                        )}
                      </div>
                    </FormControl>
                    <p className="mt-1 text-xs text-tertiary">
                      Akzeptierte Formate: PDF, DOC, DOCX (max. 5MB)
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="privacy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                        <Link href="/datenschutz" className="text-accent hover:underline">
                          Datenschutzerklärung
                        </Link>{' '}
                        zu. *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="default"
                disabled={isSubmitting}
                className="w-full bg-accent text-white hover:bg-accent/90"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Bewerbung absenden'}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationForm;
