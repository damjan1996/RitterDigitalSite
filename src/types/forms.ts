// src/types/forms.ts

// Basis Interface für allgemeine Formularfelder
export interface FormField {
  id: string;
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'number'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'file'
    | 'hidden'
    | 'password'
    | 'url';
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  validation?: ValidationRules;
}

// Textfeld
export interface TextField extends FormField {
  type: 'text' | 'email' | 'tel' | 'password' | 'url';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

// Textarea für mehrzeiligen Text
export interface TextareaField extends FormField {
  type: 'textarea';
  minLength?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
}

// Zahlenfeld
export interface NumberField extends FormField {
  type: 'number';
  min?: number;
  max?: number;
  step?: number | 'any';
}

// Select-Feld (Dropdown)
export interface SelectField extends FormField {
  type: 'select';
  options: SelectOption[];
  multiple?: boolean;
  size?: number;
}

// Option für Select-Felder
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Checkbox-Feld
export interface CheckboxField extends FormField {
  type: 'checkbox';
  checked?: boolean;
}

// Radio-Button-Feld
export interface RadioField extends FormField {
  type: 'radio';
  options: RadioOption[];
}

// Option für Radio-Buttons
export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Datumsfeld
export interface DateField extends FormField {
  type: 'date';
  min?: string; // YYYY-MM-DD
  max?: string; // YYYY-MM-DD
}

// Datei-Upload-Feld
export interface FileField extends FormField {
  type: 'file';
  accept?: string; // z.B. '.pdf,.doc,.docx'
  multiple?: boolean;
  maxSize?: number; // in Bytes
}

// Hidden-Feld
export interface HiddenField extends FormField {
  type: 'hidden';
  value: string;
}

// Union-Typ für alle Feldtypen
export type FormFieldType =
  | TextField
  | TextareaField
  | NumberField
  | SelectField
  | CheckboxField
  | RadioField
  | DateField
  | FileField
  | HiddenField;

// Validierungsregeln
export interface ValidationRules {
  required?: boolean | string;
  min?: number | string;
  max?: number | string;
  minLength?: number | string;
  maxLength?: number | string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (value: any) => boolean | string | Promise<boolean | string>;
}

// Formular-Definition
export interface FormDefinition {
  id: string;
  title: string;
  description?: string;
  fields: FormFieldType[];
  submitLabel?: string;
  cancelLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  redirectUrl?: string;
}

// Kontaktformular-Daten
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  newsletter?: boolean;
  dataProtection: boolean;
}

// Bewerbungsformular-Daten
export interface JobApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  education?: string;
  experience?: string;
  motivation?: string;
  salaryExpectation?: number;
  earliestStartDate?: string;
  cv: File;
  coverLetter?: File;
  certificates?: File[];
  dataProtection: boolean;
}

// Newsletter-Anmeldedaten
export interface NewsletterSignupFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  interests?: string[];
  dataProtection: boolean;
}

// Kontaktformular-Antwort
export interface ContactFormResponse {
  success: boolean;
  message: string;
  data?: ContactFormData;
  errors?: Record<string, string>;
  referenceId?: string;
}
