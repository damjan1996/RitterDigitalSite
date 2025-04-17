// src/pages/blog/components/PostCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
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
        <Link
            href={`/blog/${slug}`}
            className={cn(
                "block group",
                className
            )}
        >
            <article
                className={cn(
                    "bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 h-full",
                    "hover:shadow-md"
                )}
            >
                {/* Bild */}
                {featured_image && (
                    <div
                        className={cn(
                            "relative overflow-hidden",
                            isFeatured ? "h-64" : isCompact ? "h-40" : "h-48"
                        )}
                    >
                        <Image
                            src={featured_image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {category && (
                            <div className="absolute top-4 left-4 bg-accent text-white text-xs font-medium px-2 py-1 rounded">
                                {category.name}
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-5">
                    <h3
                        className={cn(
                            "font-bold text-primary group-hover:text-accent transition-colors duration-300",
                            isFeatured ? "text-2xl mb-3" : isCompact ? "text-lg mb-2" : "text-xl mb-2"
                        )}
                    >
                        {title}
                    </h3>

                    {/* Excerpt - nur zeigen, wenn vorhanden und nicht kompakte Variante */}
                    {excerpt && !isCompact && (
                        <div
                            className="text-secondary text-sm mb-4 line-clamp-3"
                            dangerouslySetInnerHTML={{
                                __html: truncateText(excerpt, excerptMaxLength)
                            }}
                        />
                    )}

                    {/* Meta-Informationen */}
                    <div className="flex items-center text-xs text-tertiary mt-auto">
                        <div className="flex items-center mr-4">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{formatDate(published_at)}</span>
                        </div>

                        {author && (
                            <div className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
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