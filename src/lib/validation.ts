// src/lib/validation.ts
import { z } from 'zod';

// Konstanten für Fehlermeldungen
export const FORM_ERRORS = {
  MIN_LENGTH: (min: number) => `Mindestens ${min} Zeichen erforderlich`,
  MAX_LENGTH: (max: number) => `Maximal ${max} Zeichen erlaubt`,
  EMAIL: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
  PRIVACY: 'Sie müssen der Datenschutzerklärung zustimmen',
  REQUIRED: 'Dieses Feld ist erforderlich',
};

/**
 * Validierungsschema für Kontaktformular (erweitert)
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, FORM_ERRORS.MIN_LENGTH(2))
    .max(100, FORM_ERRORS.MAX_LENGTH(100)),
  email: z.string().email(FORM_ERRORS.EMAIL),
  subject: z
    .string()
    .min(1, FORM_ERRORS.REQUIRED)
    .max(200, FORM_ERRORS.MAX_LENGTH(200)),
  message: z
    .string()
    .min(10, FORM_ERRORS.MIN_LENGTH(10))
    .max(2000, FORM_ERRORS.MAX_LENGTH(2000)),
  privacy: z
    .boolean()
    .refine(val => val === true, {
      message: FORM_ERRORS.PRIVACY,
    })
    .optional(),
});

/**
 * Validierungsschema für detailliertes Kontaktformular
 */
export const detailedContactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, FORM_ERRORS.MIN_LENGTH(2))
    .max(50, FORM_ERRORS.MAX_LENGTH(50)),
  lastName: z
    .string()
    .min(2, FORM_ERRORS.MIN_LENGTH(2))
    .max(50, FORM_ERRORS.MAX_LENGTH(50)),
  email: z.string().email(FORM_ERRORS.EMAIL),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z
    .string()
    .min(1, FORM_ERRORS.REQUIRED)
    .max(200, FORM_ERRORS.MAX_LENGTH(200)),
  message: z
    .string()
    .min(10, FORM_ERRORS.MIN_LENGTH(10))
    .max(1000, FORM_ERRORS.MAX_LENGTH(1000)),
  privacy: z.boolean().refine(val => val === true, {
    message: FORM_ERRORS.PRIVACY,
  }),
});

/**
 * Validierungsschema für Newsletter-Anmeldung
 */
export const newsletterSchema = z.object({
  email: z.string().email(FORM_ERRORS.EMAIL),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, {
    message: FORM_ERRORS.PRIVACY,
  }),
});

/**
 * Validierungsschema für Blog-Kommentare
 */
export const commentSchema = z.object({
  name: z
    .string()
    .min(2, FORM_ERRORS.MIN_LENGTH(2))
    .max(50, FORM_ERRORS.MAX_LENGTH(50)),
  email: z.string().email(FORM_ERRORS.EMAIL),
  comment: z
    .string()
    .min(10, FORM_ERRORS.MIN_LENGTH(10))
    .max(500, FORM_ERRORS.MAX_LENGTH(500)),
  privacy: z.boolean().refine(val => val === true, {
    message: FORM_ERRORS.PRIVACY,
  }),
});

/**
 * Validierungsschema für Login
 */
export const loginSchema = z.object({
  email: z.string().email(FORM_ERRORS.EMAIL),
  password: z.string().min(8, FORM_ERRORS.MIN_LENGTH(8)),
});

/**
 * Validierungsschema für Passwort-Reset
 */
export const passwordResetSchema = z.object({
  email: z.string().email(FORM_ERRORS.EMAIL),
});

/**
 * Validierungsschema für neue Passwörter
 */
export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, FORM_ERRORS.MIN_LENGTH(8))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        'Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten'
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwörter stimmen nicht überein',
    path: ['confirmPassword'],
  });

/**
 * Validierung für E-Mail-Adressen
 */
export const isValidEmail = (email: string): boolean => {
  try {
    z.string().email().parse(email);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Validierung für Telefonnummern
 */
export const isValidPhone = (phone: string): boolean => {
  // Akzeptiert verschiedene Telefonnummerformate
  const regex = /^(\+|00)?[0-9\s\-()]{8,20}$/;
  return regex.test(phone);
};

// TypeScript-Typen für die Schemas exportieren
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type DetailedContactFormData = z.infer<typeof detailedContactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type CommentData = z.infer<typeof commentSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type PasswordResetData = z.infer<typeof passwordResetSchema>;
export type PasswordData = z.infer<typeof passwordSchema>;

// Benanntes Objekt für den Export
export const validation = {
  contactFormSchema,
  detailedContactFormSchema,
  newsletterSchema,
  commentSchema,
  loginSchema,
  passwordResetSchema,
  passwordSchema,
  isValidEmail,
  isValidPhone,
  FORM_ERRORS,
};

export default validation;
