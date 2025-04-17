// src/lib/api.ts
import type { ContactFormData } from '@/lib/brevo/types';

/**
 * Konfiguration für API-Anfragen
 */
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
};

/**
 * Standardisierte API-Antwort
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

/**
 * Führt eine API-Anfrage durch und verarbeitet das Ergebnis
 */
export async function fetchApi<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;

    const defaultOptions: RequestInit = {
      headers: API_CONFIG.defaultHeaders,
    };

    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...API_CONFIG.defaultHeaders,
        ...options.headers,
      },
    });

    // Parse JSON-Antwort
    let result: Record<string, unknown>;
    try {
      result = await response.json();
    } catch (e) {
      // Falls keine JSON-Antwort
      result = { success: response.ok };
    }

    // Fehlerbehandlung
    if (!response.ok) {
      const errorMessage = result?.error || response.statusText || 'Ein Fehler ist aufgetreten';
      return {
        success: false,
        error: String(errorMessage),
        status: response.status,
      };
    }

    // Erfolgreiche Antwort
    return {
      success: true,
      data: (result.data as T) || (result as T),
      status: response.status,
    };
  } catch (error) {
    console.error('API Fehler:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten',
    };
  }
}

/**
 * API-Endpunkte
 */
export const API_ENDPOINTS = {
  CONTACT: '/contact',
  NEWSLETTER: '/newsletter',
  BLOG: '/blog',
};

/**
 * Sendet ein Kontaktformular an die API
 */
export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  return fetchApi(API_ENDPOINTS.CONTACT, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Fügt einen Kontakt zum Newsletter hinzu
 */
export async function subscribeToNewsletter(email: string, consent: boolean): Promise<ApiResponse> {
  return fetchApi(API_ENDPOINTS.NEWSLETTER, {
    method: 'POST',
    body: JSON.stringify({ email, privacy: consent }),
  });
}

/**
 * Ruft Blog-Beiträge ab
 */
export async function getBlogPosts(
  page: number = 1,
  limit: number = 10,
  category?: string
): Promise<ApiResponse> {
  // Parameter an die URL anhängen
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  if (category) {
    params.append('category', category);
  }

  return fetchApi(`${API_ENDPOINTS.BLOG}?${params.toString()}`);
}

/**
 * Ruft einen einzelnen Blog-Beitrag anhand des Slugs ab
 */
export async function getBlogPostBySlug(slug: string): Promise<ApiResponse> {
  return fetchApi(`${API_ENDPOINTS.BLOG}/${slug}`);
}

// Exportiere die API-Funktionen als benanntes Objekt
export const api = {
  fetchApi,
  submitContactForm,
  subscribeToNewsletter,
  getBlogPosts,
  getBlogPostBySlug,
};

export default api;
