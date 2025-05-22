// src/hooks/use-form.ts
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useCallback } from 'react';
import {
  useForm as useReactHookForm,
  type UseFormProps,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import { ZodSchema, z } from 'zod';

import { useAnalytics } from './use-analytics';

interface UseFormConfig<T extends FieldValues> extends UseFormProps<T> {
  schema: ZodSchema;
  analyticsCategory?: string;
  onSuccess?: (data: T) => void | Promise<void>;
  onError?: (error: never) => void | Promise<void>;
}

interface UseFormReturn2<T extends FieldValues> extends UseFormReturn<T> {
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
  error: string | null;
  handleSubmit: (
    onValid: SubmitHandler<T>,
    onInvalid?: SubmitErrorHandler<T>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

/**
 * Erweiterter Hook für Formularverarbeitung
 * Kombiniert React Hook Form mit Zod-Validierung und Analytics-Tracking
 */
export const useForm = <T extends FieldValues>({
  schema,
  analyticsCategory,
  onSuccess,
  onError,
  ...formConfig
}: UseFormConfig<T>): UseFormReturn2<T> => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackEvent } = useAnalytics();

  const form = useReactHookForm<T>({
    ...formConfig,
    resolver: zodResolver(schema),
  });

  const handleSubmit: UseFormReturn2<T>['handleSubmit'] = useCallback(
    (_onValid, onInvalid) => {
      return async e => {
        setError(null);
        setIsSubmitting(true);
        setIsSubmitSuccessful(false);

        try {
          // Original handleSubmit aufrufen
          await form.handleSubmit(
            async data => {
              try {
                // Analytics-Event tracken, wenn eine Kategorie angegeben ist
                if (analyticsCategory) {
                  trackEvent({
                    action: 'submit',
                    category: analyticsCategory,
                    label: 'success',
                  });
                }

                // Success-Handler aufrufen
                if (onSuccess) {
                  await onSuccess(data);
                }

                setIsSubmitSuccessful(true);
              } catch (error) {
                if (error instanceof Error) {
                  setError(error.message);
                } else {
                  setError('Ein unerwarteter Fehler ist aufgetreten.');
                }

                // Analytics-Event für Fehler
                if (analyticsCategory) {
                  trackEvent({
                    action: 'submit_error',
                    category: analyticsCategory,
                    label:
                      error instanceof Error ? error.message : 'unknown_error',
                  });
                }

                // Error-Handler aufrufen
                if (onError) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  await onError(error);
                }
              }
            },
            // Validierungsfehler behandeln
            async errors => {
              if (analyticsCategory) {
                trackEvent({
                  action: 'validation_error',
                  category: analyticsCategory,
                  label: Object.keys(errors).join(','),
                });
              }

              if (onInvalid) {
                await onInvalid(errors);
              }
            }
          )(e);
        } catch (error) {
          console.error('Form submission error:', error);
          setError('Ein Fehler ist beim Absenden des Formulars aufgetreten.');

          if (onError) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            await onError(error);
          }
        } finally {
          setIsSubmitting(false);
        }
      };
    },
    [form, analyticsCategory, trackEvent, onSuccess, onError]
  );

  return {
    ...form,
    isSubmitting,
    isSubmitSuccessful,
    error,
    handleSubmit,
  };
};

// Vordefinierte Validierungsschemata
z.object({
  firstName: z.string().min(2, 'Bitte geben Sie Ihren Vornamen ein.'),
  lastName: z.string().min(2, 'Bitte geben Sie Ihren Nachnamen ein.'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z
    .string()
    .min(10, 'Bitte geben Sie eine Nachricht mit mindestens 10 Zeichen ein.'),
  privacy: z.literal(true, {
    errorMap: () => ({
      message: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
    }),
  }),
});
z.object({
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  privacy: z.literal(true, {
    errorMap: () => ({
      message: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
    }),
  }),
});

export default useForm;
