'use client';

import { motion } from 'framer-motion';
import type React from 'react';

import { LoadingSpinner } from '@/components/common/loading-spinner';
import { cn } from '@/lib/utils';

import Pagination from './Pagination';
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
  className?: string;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts = [],
  isLoading = false,
  error = null,
  pagination,
  emptyMessage = 'Keine Blog-Beiträge gefunden.',
  className,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Lade-Status
  if (isLoading) {
    return (
      <motion.div
        className="flex justify-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingSpinner size="lg" text="Blog-Beiträge werden geladen..." />
      </motion.div>
    );
  }

  // Fehler-Status
  if (error) {
    return (
      <motion.div
        className="my-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-medium">Fehler beim Laden der Blog-Beiträge:</p>
        <p>{error}</p>
      </motion.div>
    );
  }

  // Keine Ergebnisse
  if (!posts || posts.length === 0) {
    return (
      <motion.div
        className="py-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg text-[#3D5A73]">{emptyMessage}</p>
      </motion.div>
    );
  }

  return (
    <div className={cn('', className)}>
      {/* Blog-Grid mit erstem hervorgehobenen Beitrag */}
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            className={index === 0 && posts.length > 3 ? 'md:col-span-2' : ''}
          >
            <PostCard
              {...post}
              variant={index === 0 && posts.length > 3 ? 'featured' : 'default'}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Paginierung anzeigen, wenn vorhanden */}
      {pagination && pagination.totalPages > 1 && (
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </motion.div>
      )}
    </div>
  );
};

export default BlogList;
