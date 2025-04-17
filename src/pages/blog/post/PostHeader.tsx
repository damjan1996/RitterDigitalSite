// src/pages/blog/post/PostHeader.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';
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
            <div
                className={cn(
                    "relative w-full h-[400px] lg:h-[500px]",
                    className
                )}
            >
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Overlay für bessere Lesbarkeit des Textes */}
                {imageOverlay && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12 text-white">
                    {category && (
                        <Link
                            href={`/blog?category=${category.slug}`}
                            className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-md mb-4 hover:bg-accent/90 transition-colors"
                        >
                            {category.name}
                        </Link>
                    )}

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        {title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                        {author && (
                            <div className="flex items-center">
                                {author.profile_image ? (
                                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 relative">
                                        <Image
                                            src={author.profile_image}
                                            alt={author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <User className="h-4 w-4 mr-2" />
                                )}
                                <span>{author.name}</span>
                            </div>
                        )}

                        <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{formatDate(publishedAt)}</span>
                        </div>

                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{readingTime} Lesezeit</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Standard-Header ohne Bild
    return (
        <div className={cn("py-8", className)}>
            {category && (
                <Link
                    href={`/blog?category=${category.slug}`}
                    className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-md mb-4 hover:bg-accent/90 transition-colors"
                >
                    {category.name}
                </Link>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-tertiary text-sm">
                {author && (
                    <div className="flex items-center">
                        {author.profile_image ? (
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 relative">
                                <Image
                                    src={author.profile_image}
                                    alt={author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <User className="h-4 w-4 mr-2" />
                        )}
                        <span className="text-secondary">{author.name}</span>
                    </div>
                )}

                <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(publishedAt)}</span>
                </div>

                <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{readingTime} Lesezeit</span>
                </div>
            </div>
        </div>
    );
};

export default PostHeader;