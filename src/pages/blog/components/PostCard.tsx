// src/pages/blog/components/PostCard.tsx
import { Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { formatDate, truncateText } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Author {
  name: string;
  profile_image?: string | null;
}

export interface PostCardProps {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  featured_image?: string | null;
  published_at: string;
  author?: Author | null;
  category?: {
    name: string;
    slug: string;
  } | null;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export const PostCard: React.FC<PostCardProps> = ({
  title,
  slug,
  excerpt,
  featured_image,
  published_at,
  author,
  category,
  className,
  variant = 'default',
}) => {
  // Angepasste Konfiguration basierend auf der Variante
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  // Maximale Länge des Auszugs basierend auf der Variante
  const excerptMaxLength = isFeatured ? 160 : isCompact ? 80 : 120;

  return (
    <Link href={`/blog/${slug}`} className={cn('group block', className)}>
      <article
        className={cn(
          'h-full overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300',
          'hover:shadow-md'
        )}
      >
        {/* Bild */}
        {featured_image && (
          <div
            className={cn(
              'relative overflow-hidden',
              isFeatured ? 'h-64' : isCompact ? 'h-40' : 'h-48'
            )}
          >
            <Image
              src={featured_image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {category && (
              <div className="absolute left-4 top-4 rounded bg-accent px-2 py-1 text-xs font-medium text-white">
                {category.name}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <h3
            className={cn(
              'font-bold text-primary transition-colors duration-300 group-hover:text-accent',
              isFeatured ? 'mb-3 text-2xl' : isCompact ? 'mb-2 text-lg' : 'mb-2 text-xl'
            )}
          >
            {title}
          </h3>

          {/* Excerpt - nur zeigen, wenn vorhanden und nicht kompakte Variante */}
          {excerpt && !isCompact && (
            <div
              className="mb-4 line-clamp-3 text-sm text-secondary"
              dangerouslySetInnerHTML={{
                __html: truncateText(excerpt, excerptMaxLength),
              }}
            />
          )}

          {/* Meta-Informationen */}
          <div className="mt-auto flex items-center text-xs text-tertiary">
            <div className="mr-4 flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              <span>{formatDate(published_at)}</span>
            </div>

            {author && (
              <div className="flex items-center">
                <User className="mr-1 h-3 w-3" />
                <span>{author.name}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
