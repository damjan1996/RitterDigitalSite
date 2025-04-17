// src/pages/blog/index.tsx
import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container } from '@/components/ui/container';
import { SEO } from '@/components/common/seo';
import { Hero, BlogList, Categories, Sidebar } from './components';
import { supabase } from '@/lib/supabase/client';
import { BLOG_CATEGORIES, PAGINATION } from '@/lib/constants';

interface Author {
    name: string;
    profile_image?: string | null;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Post {
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
}

interface BlogPageProps {
    initialPosts: Post[];
    categories: Category[];
    popularTags: { name: string; count: number }[];
    totalPages: number;
}

export default function BlogPage({
                                     initialPosts,
                                     categories,
                                     popularTags,
                                     totalPages: initialTotalPages,
                                 }: BlogPageProps) {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(initialTotalPages);

    // Aktuelle Filter aus URL-Parametern
    const currentPage = Number(router.query.page) || 1;
    const currentCategory = router.query.category as string | undefined;
    const currentTag = router.query.tag as string | undefined;
    const searchQuery = router.query.search as string | undefined;

    // Laden der Beiträge bei Änderung der Filter
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const limit = PAGINATION.DEFAULT_LIMIT;
                const offset = (currentPage - 1) * limit;

                // Erstelle die Basis-Query
                let query = supabase
                    .from('blog_posts')
                    .select(`
            *,
            author:authors(name, profile_image),
            categories(id, name, slug)
          `, { count: 'exact' })
                    .eq('published', true)
                    .order('published_at', { ascending: false })
                    .range(offset, offset + limit - 1);

                // Kategoriefilter hinzufügen
                if (currentCategory) {
                    query = query.eq('categories.slug', currentCategory);
                }

                // Tag-Filter hinzufügen
                if (currentTag) {
                    query = query.contains('tags', [currentTag]);
                }

                // Suchfilter hinzufügen
                if (searchQuery) {
                    query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
                }

                // Abfrage ausführen
                const { data, error, count } = await query;

                if (error) throw error;

                // Format posts for our component props
                const formattedPosts = data?.map(post => ({
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    featured_image: post.featured_image,
                    published_at: post.published_at,
                    author: post.author,
                    category: post.categories ? {
                        name: post.categories.name,
                        slug: post.categories.slug,
                    } : null,
                })) || [];

                setPosts(formattedPosts);
                setTotalPages(count ? Math.ceil(count / limit) : 0);
            } catch (err) {
                console.error('Error fetching blog posts:', err);
                setError('Beim Laden der Blog-Beiträge ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage, currentCategory, currentTag, searchQuery]);

    // Seitenänderung
    const handlePageChange = (page: number) => {
        const query = { ...router.query, page: page.toString() };
        router.push({
            pathname: router.pathname,
            query,
        }, undefined, { scroll: true });
    };

    // Kategoriefilter ändern
    const handleCategoryChange = (category: string | null) => {
        const query = { ...router.query };
        delete query.page; // Zurück zur ersten Seite

        if (category) {
            query.category = category;
        } else {
            delete query.category;
        }

        router.push({
            pathname: router.pathname,
            query,
        });
    };

    // Suche durchführen
    const handleSearch = (query: string) => {
        const newQuery = { ...router.query };
        delete newQuery.page; // Zurück zur ersten Seite

        if (query) {
            newQuery.search = query;
        } else {
            delete newQuery.search;
        }

        router.push({
            pathname: router.pathname,
            query: newQuery,
        });
    };

    // Titel und Beschreibung basierend auf Filtern
    let pageTitle = 'Blog';
    let pageDescription = 'Neuigkeiten, Tipps und Einblicke aus der Welt der digitalen Geschäftsprozesse und Business Intelligence';

    if (currentCategory) {
        const categoryName = categories.find(c => c.slug === currentCategory)?.name;
        if (categoryName) {
            pageTitle = `Blog: ${categoryName}`;
            pageDescription = `Artikel zum Thema ${categoryName}: ${pageDescription}`;
        }
    } else if (currentTag) {
        pageTitle = `Blog: ${currentTag}`;
        pageDescription = `Artikel mit dem Tag "${currentTag}": ${pageDescription}`;
    } else if (searchQuery) {
        pageTitle = `Suchergebnisse für "${searchQuery}"`;
        pageDescription = `Gefundene Artikel für die Suche "${searchQuery}"`;
    }

    return (
        <>
            <SEO
                title={pageTitle}
                description={pageDescription}
                pageType="blog"
            />

            {/* Hero-Bereich mit Suchfunktion und Kategorien */}
            <Hero
                title={pageTitle}
                subtitle={pageDescription}
                selectedCategory={currentCategory || null}
                categories={categories}
                onSearch={handleSearch}
                onCategoryChange={handleCategoryChange}
            />

            {/* Blog-Inhalt */}
            <section className="py-12 bg-background">
                <Container>
                    {searchQuery && (
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-semibold mb-2">Suchergebnisse für "{searchQuery}"</h2>
                            <button
                                onClick={() => handleSearch('')}
                                className="text-accent hover:underline"
                            >
                                Suche zurücksetzen
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Hauptinhalt */}
                        <div className="lg:col-span-8">
                            <BlogList
                                posts={posts}
                                isLoading={isLoading}
                                error={error}
                                pagination={{
                                    currentPage,
                                    totalPages,
                                    onPageChange: handlePageChange,
                                }}
                                emptyMessage={
                                    searchQuery
                                        ? `Keine Ergebnisse für "${searchQuery}" gefunden.`
                                        : currentCategory
                                            ? `Keine Artikel in der Kategorie "${currentCategory}" gefunden.`
                                            : currentTag
                                                ? `Keine Artikel mit dem Tag "${currentTag}" gefunden.`
                                                : 'Keine Blog-Beiträge gefunden.'
                                }
                            />
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <Sidebar
                                categories={categories}
                                popularTags={popularTags}
                            />
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        // Beiträge für erste Seite laden
        const limit = PAGINATION.DEFAULT_LIMIT;
        const { data: posts, error, count } = await supabase
            .from('blog_posts')
            .select(`
        *,
        author:authors(name, profile_image),
        categories(id, name, slug)
      `, { count: 'exact' })
            .eq('published', true)
            .order('published_at', { ascending: false })
            .range(0, limit - 1);

        if (error) throw error;

        // Kategorien laden (entweder aus Konstanten oder Datenbank)
        let categories = BLOG_CATEGORIES;
        if (!categories || categories.length === 0) {
            const { data: categoriesData } = await supabase
                .from('categories')
                .select('*')
                .order('name');

            categories = categoriesData || [];
        }

        // Populäre Tags ermitteln (vereinfachte Implementierung)
        const popularTags = [
            { name: 'Business Intelligence', count: 8 },
            { name: 'Data Warehouse', count: 6 },
            { name: 'Softwareentwicklung', count: 5 },
            { name: 'Digitalisierung', count: 4 },
            { name: 'KI', count: 3 },
        ];

        // Format posts for our component props
        const formattedPosts = posts?.map(post => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            featured_image: post.featured_image,
            published_at: post.published_at,
            author: post.author,
            category: post.categories ? {
                name: post.categories.name,
                slug: post.categories.slug,
            } : null,
        })) || [];

        return {
            props: {
                initialPosts: formattedPosts,
                categories,
                popularTags,
                totalPages: count ? Math.ceil(count / limit) : 0,
            },
            revalidate: 3600, // Alle Stunde neu generieren
        };
    } catch (error) {
        console.error('Error in getStaticProps for BlogPage:', error);

        return {
            props: {
                initialPosts: [],
                categories: BLOG_CATEGORIES,
                popularTags: [],
                totalPages: 0,
            },
            revalidate: 60, // Bei Fehler schneller neu versuchen
        };
    }
};