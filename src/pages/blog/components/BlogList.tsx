// src/pages/blog/components/BlogList.tsx
import React from 'react';
import { PostCard, PostCardProps } from './PostCard';
import { Pagination } from './Pagination';
import { LoadingSpinner } from '@/components/common/loading-spinner';

interface BlogListProps {
    posts: PostCardProps[];
    isLoading?: boolean;
    error?: string | null;
    pagination?: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
    };
    emptyMessage?: string;
}

export const BlogList: React.FC<BlogListProps> = ({
                                                      posts,
                                                      isLoading = false,
                                                      error = null,
                                                      pagination,
                                                      emptyMessage = "Keine Blog-Beiträge gefunden.",
                                                  }) => {
    // Lade-Status
    if (isLoading) {
        return (
            <div className="py-12 flex justify-center">
                <LoadingSpinner size="lg" text="Blog-Beiträge werden geladen..." />
            </div>
        );
    }

    // Fehler-Status
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg my-6">
                <p className="font-medium">Fehler beim Laden der Blog-Beiträge:</p>
                <p>{error}</p>
            </div>
        );
    }

    // Keine Ergebnisse
    if (posts.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-lg text-secondary">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div>
            {/* Blog-Grid mit erstem hervorgehobenen Beitrag */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <PostCard
                        key={post.id}
                        {...post}
                        variant={index === 0 && posts.length > 3 ? 'featured' : 'default'}
                        className={index === 0 && posts.length > 3 ? 'md:col-span-2' : ''}
                    />
                ))}
            </div>

            {/* Paginierung anzeigen, wenn vorhanden */}
            {pagination && pagination.totalPages > 1 && (
                <div className="mt-10">
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={pagination.onPageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default BlogList;