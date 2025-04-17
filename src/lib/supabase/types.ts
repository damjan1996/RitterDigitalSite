// src/lib/supabase/types.ts

/**
 * Typdefinitionen für Supabase-Datenbank
 * Automatisch generiert mit Supabase CLI:
 * npx supabase gen types typescript --project-id <project-id> --schema public > lib/supabase/types.ts
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string;
          category_id: number;
          content: string;
          created_at: string;
          excerpt: string | null;
          featured_image: string | null;
          id: number;
          is_featured: boolean;
          meta_description: string | null;
          meta_title: string | null;
          published: boolean;
          published_at: string | null;
          slug: string;
          tags: string[] | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          author_id: string;
          category_id: number;
          content: string;
          created_at?: string;
          excerpt?: string | null;
          featured_image?: string | null;
          id?: number;
          is_featured?: boolean;
          meta_description?: string | null;
          meta_title?: string | null;
          published?: boolean;
          published_at?: string | null;
          slug: string;
          tags?: string[] | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          author_id?: string;
          category_id?: number;
          content?: string;
          created_at?: string;
          excerpt?: string | null;
          featured_image?: string | null;
          id?: number;
          is_featured?: boolean;
          meta_description?: string | null;
          meta_title?: string | null;
          published?: boolean;
          published_at?: string | null;
          slug?: string;
          tags?: string[] | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'blog_posts_author_id_fkey';
            columns: ['author_id'];
            referencedRelation: 'authors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'blog_posts_category_id_fkey';
            columns: ['category_id'];
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      categories: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      contact_requests: {
        Row: {
          company: string | null;
          created_at: string;
          email: string;
          first_name: string;
          id: number;
          last_name: string;
          message: string;
          phone: string | null;
          status: Database['public']['Enums']['contact_status'];
        };
        Insert: {
          company?: string | null;
          created_at?: string;
          email: string;
          first_name: string;
          id?: number;
          last_name: string;
          message: string;
          phone?: string | null;
          status?: Database['public']['Enums']['contact_status'];
        };
        Update: {
          company?: string | null;
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: number;
          last_name?: string;
          message?: string;
          phone?: string | null;
          status?: Database['public']['Enums']['contact_status'];
        };
        Relationships: [];
      };
      authors: {
        Row: {
          bio: string | null;
          created_at: string;
          email: string;
          id: string;
          name: string;
          position: string | null;
          profile_image: string | null;
        };
        Insert: {
          bio?: string | null;
          created_at?: string;
          email: string;
          id: string;
          name: string;
          position?: string | null;
          profile_image?: string | null;
        };
        Update: {
          bio?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          name?: string;
          position?: string | null;
          profile_image?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'authors_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          name: string | null;
          phone: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          name?: string | null;
          phone?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          name?: string | null;
          phone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      contact_status: 'new' | 'in_progress' | 'completed' | 'spam';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
