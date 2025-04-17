// src/pages/blog/post/RelatedPosts.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { SectionTitle } from '@/components/common/section-title';
import { cn } from '@/lib/utils';

interface RelatedPost {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    featured_image?: string | null;
    category?: {
        name: string;
        slug: string;
    };
}

interface RelatedPostsProps {
    posts: RelatedPost[];
    className?: string;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({
                                                              posts,
                                                              className,
                                                          }) => {
    // Wenn keine verwandten Beiträge vorhanden sind, nichts rendern
    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <section className={cn("py-16 bg-gray-50", className)}>
            <Container>
                <SectionTitle
                    title="Das könnte Sie auch interessieren"
                    subtitle="Entdecken Sie weitere Artikel zu diesem Thema"
                    align="center"
                    className="mb-10"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group block h-full"
                        >
                            <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-md">
                                {post.featured_image && (
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <Image
                                            src={post.featured_image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {post.category && (
                                            <div className="absolute top-3 left-3 bg-accent text-white text-xs font-medium px-2 py-1 rounded">
                                                {post.category.name}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="p-5">
                                    <h3 className="font-semibold text-lg text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                                        {post.title}
                                    </h3>

                                    {post.excerpt && (
                                        <p className="text-sm text-secondary line-clamp-2">{post.excerpt}</p>
                                    )}

                                    <div className="mt-3 text-sm font-medium text-accent group-hover:text-accent/70 transition-colors inline-flex items-center">
                                        Artikel lesen
                                        <svg
                                            className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default RelatedPosts;