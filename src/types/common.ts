// src/types/common.ts

// Allgemeine Nutzer-Schnittstelle
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'author' | 'editor' | 'user';
    avatar?: string;
    bio?: string;
    position?: string;
    social_links?: SocialLinks;
    created_at: string;
    updated_at: string;
}

// Soziale Medien Links
export interface SocialLinks {
    linkedin?: string;
    xing?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    website?: string;
}

// Meta-Informationen für SEO
export interface SEOMetadata {
    title: string;
    description: string;
    canonical_url?: string;
    og_image?: string;
    twitter_image?: string;
    keywords?: string[];
    schema_markup?: Record<string, any>;
}

// Allgemeiner Media-Typ für Bilder, Videos, etc.
export interface Media {
    id: string;
    url: string;
    type: 'image' | 'video' | 'document' | 'audio';
    mime_type: string;
    title?: string;
    alt_text?: string;
    description?: string;
    width?: number;
    height?: number;
    file_size?: number; // in Bytes
    created_at: string;
    updated_at: string;
}

// Grundlegende Pagination für Listen
export interface Pagination {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
}

// API-Antwort für paginierte Daten
export interface PaginatedResponse<T> {
    data: T[];
    meta: Pagination;
}

// API-Antwort für einzelnes Element
export interface SingleResponse<T> {
    data: T;
}

// API-Fehler
export interface APIError {
    statusCode: number;
    message: string;
    error?: string;
    details?: Record<string, string[]>;
}

// Allgemeine Adressinformationen
export interface Address {
    street: string;
    house_number: string;
    postal_code: string;
    city: string;
    state?: string;
    country: string;
    is_primary?: boolean;
}

// Kontaktinformationen
export interface ContactInfo {
    phone?: string;
    mobile?: string;
    email: string;
    fax?: string;
    website?: string;
}

// Zeitraum für Events, Projekte, etc.
export interface DateRange {
    start_date: string; // ISO 8601 Format
    end_date?: string; // ISO 8601 Format
    is_all_day?: boolean;
}

// Koordinaten für Karten
export interface GeoCoordinates {
    latitude: number;
    longitude: number;
}

// Standort
export interface Location {
    name: string;
    address: Address;
    coordinates?: GeoCoordinates;
}

// Lokalisierte Inhalte
export interface LocalizedContent<T> {
    de: T;
    en?: T;
    // weitere Sprachen nach Bedarf
}

// Verbindung zu externer Quelle
export interface ExternalReference {
    type: string;
    id: string;
    url?: string;
    source: string;
    metadata?: Record<string, any>;
}

// Status für verschiedene Entitäten
export type Status = 'active' | 'inactive' | 'pending' | 'archived' | 'draft' | 'published';