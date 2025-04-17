// src/types/blog.ts
import type { User } from './common';

// Grundlegende Blogpost-Typen
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featured_image: string;
  author: User;
  category: BlogCategory;
  tags: BlogTag[];
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
  published_at: string | null;
  reading_time: number; // In Minuten
  is_featured: boolean;
  meta: BlogPostMeta;
}

// Vereinfachte BlogPost-Version für Listenansichten
export interface BlogPostPreview {
  id: string;
  title: string;
  slug: string;
  description: string;
  featured_image: string;
  author: Pick<User, 'id' | 'name' | 'avatar'>;
  category: BlogCategory;
  created_at: string;
  published_at: string | null;
  reading_time: number;
  is_featured: boolean;
}

// Blog-Kategorien
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  post_count?: number;
}

// Blog-Tags
export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  post_count?: number;
}

// Meta-Informationen für SEO
export interface BlogPostMeta {
  title?: string; // Überschreibt den Standard-Titel für SEO
  description?: string; // Überschreibt die Standard-Beschreibung für SEO
  canonical_url?: string;
  og_image?: string;
  twitter_image?: string;
  keywords?: string[];
  schema_markup?: Record<string, any>;
}

// Kommentar zu einem Blogpost
export interface BlogComment {
  id: string;
  post_id: string;
  parent_id: string | null; // Für verschachtelte Kommentare
  author_name: string;
  author_email: string;
  content: string;
  status: 'approved' | 'pending' | 'spam';
  created_at: string;
  updated_at: string;
  replies?: BlogComment[];
}

// Parameter zum Abrufen von Blogposts
export interface BlogPostsParams {
  page?: number;
  per_page?: number;
  category_slug?: string;
  tag_slug?: string;
  author_id?: string;
  search_query?: string;
  sort_by?: 'published_at' | 'title' | 'reading_time';
  sort_order?: 'asc' | 'desc';
  status?: 'published' | 'draft' | 'all';
  featured_only?: boolean;
}

// Paginierte Antwort bei Blogpost-Listen
export interface PaginatedBlogPosts {
  data: BlogPostPreview[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next_page: boolean;
    has_prev_page: boolean;
  };
}
