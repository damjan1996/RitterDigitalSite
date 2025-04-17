// src/pages/blog/post/PostHeader.tsx
import { Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Author {
  id: string;
  name: string;
  position?: string | null;
  profile_image?: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface PostHeaderProps {
  title: string;
  category?: Category;
  author?: Author;
  publishedAt: string;
  readingTime?: string;
  className?: string;
  imageUrl?: string;
  imageOverlay?: boolean;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  category,
  author,
  publishedAt,
  readingTime = '5 min',
  className,
  imageUrl,
  imageOverlay = true,
}) => {
  // Wenn ein Bild vorhanden ist, zeige einen Header mit Bild-Hintergrund
  if (imageUrl) {
    return (
      <div className={cn('relative h-[400px] w-full lg:h-[500px]', className)}>
        <Image src={imageUrl} alt={title} fill className="object-cover" priority />

        {/* Overlay für bessere Lesbarkeit des Textes */}
        {imageOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8 lg:p-12">
          {category && (
            <Link
              href={`/blog?category=${category.slug}`}
              className="mb-4 inline-block rounded-md bg-accent px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              {category.name}
            </Link>
          )}

          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">{title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
            {author && (
              <div className="flex items-center">
                {author.profile_image ? (
                  <div className="relative mr-2 h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={author.profile_image}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <User className="mr-2 h-4 w-4" />
                )}
                <span>{author.name}</span>
              </div>
            )}

            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{formatDate(publishedAt)}</span>
            </div>

            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{readingTime} Lesezeit</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard-Header ohne Bild
  return (
    <div className={cn('py-8', className)}>
      {category && (
        <Link
          href={`/blog?category=${category.slug}`}
          className="mb-4 inline-block rounded-md bg-accent px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-accent/90"
        >
          {category.name}
        </Link>
      )}

      <h1 className="mb-4 text-3xl font-bold text-primary md:text-4xl lg:text-5xl">{title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-tertiary">
        {author && (
          <div className="flex items-center">
            {author.profile_image ? (
              <div className="relative mr-2 h-8 w-8 overflow-hidden rounded-full">
                <Image src={author.profile_image} alt={author.name} fill className="object-cover" />
              </div>
            ) : (
              <User className="mr-2 h-4 w-4" />
            )}
            <span className="text-secondary">{author.name}</span>
          </div>
        )}

        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{formatDate(publishedAt)}</span>
        </div>

        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          <span>{readingTime} Lesezeit</span>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
