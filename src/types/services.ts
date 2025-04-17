// src/types/services.ts
import type { Media, User, SEOMetadata } from './common';

// Service-Kategorie
export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  featured_image?: Media;
  order?: number;
}

// Funktionsmerkmale eines Service
export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  order?: number;
}

// Nutzen/Vorteile eines Service
export interface ServiceBenefit {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order?: number;
}

// Anwendungsfall für einen Service
export interface ServiceUseCase {
  id: string;
  title: string;
  description: string;
  image?: Media;
  order?: number;
}

// FAQ zu einem Service
export interface ServiceFAQ {
  id: string;
  question: string;
  answer: string;
  order?: number;
}

// Testimonial/Kundenmeinung zu einem Service
export interface ServiceTestimonial {
  id: string;
  client_name: string;
  client_position?: string;
  client_company?: string;
  client_image?: Media;
  content: string;
  rating?: number; // 1-5
}

// Technologie, die für einen Service verwendet wird
export interface ServiceTechnology {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: Media;
  url?: string;
}

// Call-to-Action für einen Service
export interface ServiceCTA {
  id: string;
  title: string;
  description?: string;
  button_text: string;
  button_url: string;
  background_image?: Media;
}

// Preiskategorie für einen Service
export interface ServicePricing {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  period?: string; // z.B. "monatlich", "jährlich", "einmalig"
  featured?: boolean;
  features: string[]; // Liste von Features für dieses Preismodell
  button_text?: string;
  button_url?: string;
}

// Hauptstruktur für einen Service
export interface Service {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  content: string;
  featured_image: Media;
  gallery?: Media[];
  category: ServiceCategory;
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  use_cases?: ServiceUseCase[];
  faqs?: ServiceFAQ[];
  testimonials?: ServiceTestimonial[];
  technologies?: ServiceTechnology[];
  cta?: ServiceCTA;
  pricing?: ServicePricing[];
  related_services?: Partial<Service>[];
  video_url?: string;
  assigned_team?: Partial<User>[];
  published_at?: string;
  updated_at: string;
  created_at: string;
  meta: SEOMetadata;
  is_featured: boolean;
  stats?: ServiceStats[];
}

// Vereinfachte Service-Version für Listenansichten
export interface ServicePreview {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  featured_image: Media;
  category: ServiceCategory;
  is_featured: boolean;
}

// Statistiken zu einem Service
export interface ServiceStats {
  id: string;
  label: string;
  value: string | number;
  icon?: string;
  suffix?: string; // z.B. "%", "+", "€"
  order?: number;
}

// Service-Request-Formular
export interface ServiceRequestFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  serviceId: string;
  budget?: string;
  timeline?: string;
  requirements?: string;
  message?: string;
  dataProtection: boolean;
  newsletter?: boolean;
}

// Projektbeispiel für einen Service
export interface ServiceCaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  description: string;
  content: string;
  challenge: string;
  solution: string;
  results: string;
  featured_image: Media;
  gallery?: Media[];
  services: ServicePreview[];
  technologies?: ServiceTechnology[];
  testimonial?: ServiceTestimonial;
  created_at: string;
  updated_at: string;
  published_at?: string;
  meta: SEOMetadata;
}

// Parameter zum Abrufen von Services
export interface ServiceParams {
  page?: number;
  per_page?: number;
  category_slug?: string;
  search_query?: string;
  sort_by?: 'created_at' | 'title' | 'category';
  sort_order?: 'asc' | 'desc';
  featured_only?: boolean;
}
