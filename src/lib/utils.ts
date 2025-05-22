// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Kombiniert Tailwind-CSS-Klassen mit clsx und twMerge
 * Hilft, Konflikte zwischen Tailwind-Klassen zu vermeiden
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formatiert ein Datum in deutsches Format
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Formatiert ein Datum mit Uhrzeit in deutsches Format
 */
export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Kürzt einen Text auf eine bestimmte Länge
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Erstellt einen URL-freundlichen Slug aus einem String
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Entfernt Sonderzeichen außer Leerzeichen und Bindestriche
    .replace(/\s+/g, '-') // Ersetzt Leerzeichen durch Bindestriche
    .replace(/-+/g, '-') // Vermeidet doppelte Bindestriche
    .trim();
}

/**
 * Generiert eine zufällige ID
 */
export function generateId(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Entfernt HTML-Tags aus einem String
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, '');
}

/**
 * Konvertiert einen String in Title Case
 * (erstes Zeichen jedes Wortes groß)
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Wandelt einen Camel Case String in einen mit Leerzeichen getrennten String um
 */
export function camelCaseToWords(text: string): string {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}

/**
 * Formatiert eine Telefonnummer für die Anzeige
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Entfernt alles außer Zahlen
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Deutsches Format: +49 (0) 123 456 789
  if (cleaned.startsWith('49')) {
    return `+49 (0) ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }

  // Internationales Format
  return phoneNumber;
}

/**
 * Konvertiert eine Dateigröße in ein lesbares Format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Debounce-Funktion für verzögerte Ausführung
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Sicheres JSON.parse mit Fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    return fallback;
  }
}

// Benanntes Objekt für den Export
export const utils = {
  cn,
  formatDate,
  formatDateTime,
  truncateText,
  slugify,
  generateId,
  stripHtml,
  toTitleCase,
  camelCaseToWords,
  formatPhoneNumber,
  formatFileSize,
  debounce,
  safeJsonParse,
};

export default utils;
