// src/pages/blog/components/BlogList.tsx
import React from 'react';

import { LoadingSpinner } from '@/components/common/loading-spinner';

import { Pagination } from './Pagination';
import { PostCard } from './PostCard';
import type { PostCardProps } from './PostCard';

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
  posts = [], // Default-Wert hinzugefügt
  isLoading = false,
  error = null,
  pagination,
  emptyMessage = 'Keine Blog-Beiträge gefunden.',
}) => {
  // Lade-Status
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Blog-Beiträge werden geladen..." />
      </div>
    );
  }

  // Fehler-Status
  if (error) {
    return (
      <div className="my-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <p className="font-medium">Fehler beim Laden der Blog-Beiträge:</p>
        <p>{error}</p>
      </div>
    );
  }

  // Keine Ergebnisse
  if (!posts || posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-secondary">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Blog-Grid mit erstem hervorgehobenen Beitrag */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
