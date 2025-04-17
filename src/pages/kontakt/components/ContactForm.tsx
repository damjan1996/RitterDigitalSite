// src/pages/kontakt/components/ContactForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

// Definieren des Zod-Schemas für die Formularvalidierung
const contactFormSchema = z.object({
    name: z.string().min(2, "Bitte geben Sie Ihren Namen ein"),
    email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
    phone: z.string().optional(),
    company: z.string().optional(),
    message: z.string().min(10, "Ihre Nachricht sollte mindestens 10 Zeichen enthalten"),
    privacy: z.boolean().refine(val => val === true, {
        message: "Bitte akzeptieren Sie die Datenschutzbestimmungen",
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
        formState: { errors }
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            company: '',
            message: '',
            privacy: false,
        }
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
                throw new Error('Es ist ein Fehler beim Versenden aufgetreten. Bitte versuchen Sie es später erneut.');
            }

            setSubmitSuccess(true);
            reset();
            // Nach 5 Sekunden die Erfolgsmeldung zurücksetzen
            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (error) {
            console.error('Fehler beim Senden des Formulars:', error);
            setSubmitError(error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-primary mb-6">Kontaktformular</h2>

            {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                    Vielen Dank für Ihre Nachricht! Wir werden uns zeitnah bei Ihnen melden.
                </div>
            )}

            {submitError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                    {submitError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-Mail *
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Unternehmen
                    </label>
                    <input
                        id="company"
                        type="text"
                        {...register('company')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Nachricht *
                    </label>
                    <textarea
                        id="message"
                        rows={5}
                        {...register('message')}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:outline-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="privacy"
                            type="checkbox"
                            {...register('privacy')}
                            className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="privacy" className={`font-medium ${errors.privacy ? 'text-red-500' : 'text-gray-700'}`}>
                            Ich habe die <a href="/datenschutz" className="text-accent hover:underline">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu. *
                        </label>
                        {errors.privacy && <p className="mt-1 text-sm text-red-600">{errors.privacy.message}</p>}
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        variant="accent"
                        className="w-full sm:w-auto"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                    </Button>
                </div>
            </form>
        </div>
    );
};