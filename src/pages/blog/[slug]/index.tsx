// src/pages/blog/[slug]/index.tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PostContent } from '../post';
import { Sidebar } from '../components';
import { Container } from '@/components/ui/container';
import { supabase } from '@/lib/supabase/client';
import { formatDate, stripHtml } from '@/lib/utils';
import { SEO } from '@/components/common/seo';
import { LoadingSpinner } from '@/components/common/loading-spinner';

interface Author {
    id: string;
    name: string;
    position: string | null;
    profile_image: string | null;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    featured_image: string | null;
    published_at: string;
    author: Author;
    categories: Category;
    tags: string[] | null;
    meta_title: string | null;
    meta_description: string | null;
}

interface BlogPostProps {
    post: BlogPost | null;
    relatedPosts: BlogPost[] | null;
}

export default function BlogPostPage({ post, relatedPosts }: BlogPostProps) {
    const router = useRouter();

    // Fallback für statische Generierung
    if (router.isFallback) {
        return (
            <div className="flex items-center justify-center py-32">
                <LoadingSpinner size="lg" text="Artikel wird geladen..." />
            </div>
        );
    }

    // Handle 404 Fall
    if (!post) {
        return (
            <>
                <SEO
                    title="Artikel nicht gefunden"
                    description="Der gesuchte Artikel konnte nicht gefunden werden."
                    noindex={true}
                />
                <Container>
                    <div className="py-16 text-center">
                        <h1 className="text-3xl font-bold mb-4">Artikel nicht gefunden</h1>
                        <p className="text-secondary mb-8">
                            Der gesuchte Artikel konnte leider nicht gefunden werden oder wurde möglicherweise entfernt.
                        </p>
                        <button
                            onClick={() => router.push('/blog')}
                            className="inline-flex items-center justify-center rounded-md bg-accent text-white px-6 py-2"
                        >
                            Zurück zur Blog-Übersicht
                        </button>
                    </div>
                </Container>
            </>
        );
    }

    // Meta description vorbereiten
    const metaDescription = post.meta_description ||
        (post.excerpt ? stripHtml(post.excerpt) : `Lesen Sie den Artikel "${post.title}" im Blog der Ritter Digital GmbH`);

    return (
        <>
            <SEO
                title={post.meta_title || post.title}
                description={metaDescription}
                pageType="blog"
            />

            <div className="bg-background pb-16">
                {/* Hero-Bereich */}
                {post.featured_image && (
                    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] relative mb-8">
                        <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                            <Container className="h-full flex flex-col justify-end pb-8">
                                <div className="max-w-3xl">
                                    <div className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-md mb-4">
                                        {post.categories.name}
                                    </div>
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                        {post.title}
                                    </h1>
                                    <div className="flex items-center text-white/90 text-sm">
                                        {post.author?.profile_image && (
                                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 relative">
                                                <Image
                                                    src={post.author.profile_image}
                                                    alt={post.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-medium">{post.author?.name}</div>
                                            <div className="text-white/70">{formatDate(post.published_at)}</div>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                )}

                {/* Wenn kein Featured Image vorhanden ist */}
                {!post.featured_image && (
                    <Container className="pt-8 pb-6">
                        <div className="max-w-3xl">
                            <div className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-md mb-4">
                                {post.categories.name}
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                                {post.title}
                            </h1>
                            <div className="flex items-center text-secondary text-sm">
                                {post.author?.profile_image && (
                                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 relative">
                                        <Image
                                            src={post.author.profile_image}
                                            alt={post.author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <div className="font-medium">{post.author?.name}</div>
                                    <div className="text-tertiary">{formatDate(post.published_at)}</div>
                                </div>
                            </div>
                        </div>
                    </Container>
                )}

                {/* Artikel-Inhalt mit Sidebar */}
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Hauptinhalt */}
                        <div className="lg:col-span-8">
                            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                                {post.excerpt && (
                                    <div
                                        className="text-lg text-secondary mb-6 italic"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                    />
                                )}
                                <PostContent content={post.content} />

                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <div className="text-sm font-medium text-tertiary mb-2">Tags:</div>
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <div
                                                    key={tag}
                                                    className="px-3 py-1 bg-gray-100 text-secondary text-sm rounded-full"
                                                >
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <Sidebar
                                categories={[post.categories]}
                                relatedPosts={relatedPosts || []}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Veröffentlichte Blog-Einträge abrufen
    const { data: posts } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('published', true)
        .limit(20); // Begrenzen auf die neuesten 20 für schnelleres Build

    const paths = posts?.map((post) => ({
        params: { slug: post.slug },
    })) || [];

    return {
        paths,
        fallback: true, // Erlaube On-Demand-Generierung für nicht-inkludierte Pfade
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;

    // Blog-Beitrag mit Autor und Kategorie abrufen
    const { data: post } = await supabase
        .from('blog_posts')
        .select(`
      *,
      author:authors(*),
      categories(*)
    `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

    // Wenn kein Beitrag gefunden wurde
    if (!post) {
        return {
            notFound: true,
        };
    }

    // Ähnliche Beiträge in derselben Kategorie abrufen
    const { data: relatedPosts } = await supabase
        .from('blog_posts')
        .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image,
      published_at,
      author:authors(name, profile_image)
    `)
        .eq('category_id', post.category_id)
        .eq('published', true)
        .neq('id', post.id)
        .order('published_at', { ascending: false })
        .limit(3);

    return {
        props: {
            post,
            relatedPosts,
        },
        revalidate: 3600, // Jede Stunde neu generieren
    };
};