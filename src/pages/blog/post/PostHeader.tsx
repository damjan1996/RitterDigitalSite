'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

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
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Wenn ein Bild vorhanden ist, zeige einen Header mit Bild-Hintergrund
  if (imageUrl) {
    return (
      <motion.div
        className={cn('relative h-[400px] w-full overflow-hidden lg:h-[500px]', className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          fill
          className="object-cover"
          priority
        />

        {/* Overlay für bessere Lesbarkeit des Textes */}
        {imageOverlay && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        )}

        {/* Decorative elements */}
        <motion.div
          className="absolute right-[10%] top-[15%] h-24 w-24 rounded-full bg-[#FF7A35]/10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[15%] left-[8%] h-32 w-32 rounded-full bg-[#3D5A73]/10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.2, delay: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8 lg:p-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {category && (
            <motion.div variants={itemVariants}>
              <Link
                href={`/blog?category=${category.slug}`}
                className="mb-4 inline-block rounded-md bg-[#FF7A35] px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-[#FF7A35]/90"
              >
                {category.name}
              </Link>
            </motion.div>
          )}

          <motion.h1
            className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            variants={itemVariants}
          >
            {title}
            <span className="text-[#FF7A35]">.</span>
          </motion.h1>

          <motion.div
            className="flex flex-wrap items-center gap-4 text-sm text-white/90"
            variants={itemVariants}
          >
            {author && (
              <div className="flex items-center">
                {author.profile_image ? (
                  <motion.div
                    className="relative mr-2 h-8 w-8 overflow-hidden rounded-full border-2 border-[#FF7A35]/30"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Image
                      src={author.profile_image || '/placeholder.svg'}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
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
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // Standard-Header ohne Bild
  return (
    <motion.div
      className={cn('py-8', className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {category && (
        <motion.div variants={itemVariants}>
          <Link
            href={`/blog?category=${category.slug}`}
            className="mb-4 inline-block rounded-md bg-[#FF7A35] px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-[#FF7A35]/90"
          >
            {category.name}
          </Link>
        </motion.div>
      )}

      <motion.h1
        className="mb-4 text-3xl font-bold text-[#1A2027] md:text-4xl lg:text-5xl"
        variants={itemVariants}
      >
        {title}
        <span className="text-[#FF7A35]">.</span>
      </motion.h1>

      <motion.div
        className="flex flex-wrap items-center gap-4 text-sm text-[#3D5A73]"
        variants={itemVariants}
      >
        {author && (
          <div className="flex items-center">
            {author.profile_image ? (
              <motion.div
                className="relative mr-2 h-8 w-8 overflow-hidden rounded-full border-2 border-[#FF7A35]/20"
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src={author.profile_image || '/placeholder.svg'}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ) : (
              <User className="mr-2 h-4 w-4" />
            )}
            <span className="text-[#3D5A73]">{author.name}</span>
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
      </motion.div>
    </motion.div>
  );
};

export default PostHeader;
