'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange?: (category: string | null) => void;
  className?: string;
  variant?: 'pills' | 'buttons' | 'links';
}

const Categories = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
  className,
  variant = 'pills',
}: CategoriesProps) => {
  const handleCategoryClick = (slug: string | null) => {
    if (onCategoryChange) {
      onCategoryChange(slug);
    }
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className={cn('flex flex-wrap justify-center gap-2', className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* "Alle" Kategorie */}
      {variant === 'pills' && (
        <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryClick(null)}
            className={cn(
              'rounded-full',
              selectedCategory === null
                ? 'bg-white text-[#1A2027] hover:bg-white/90'
                : 'border-white/40 bg-white/20 text-white hover:bg-white/30'
            )}
          >
            Alle
          </Button>
        </motion.div>
      )}

      {variant === 'buttons' && (
        <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={selectedCategory === null ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleCategoryClick(null)}
            className={selectedCategory === null ? 'bg-[#FF7A35] hover:bg-[#FF7A35]/90' : ''}
          >
            Alle
          </Button>
        </motion.div>
      )}

      {variant === 'links' && (
        <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
          <Link
            href="/blog"
            className={cn(
              'px-3 py-1 text-sm',
              selectedCategory === null
                ? 'font-medium text-[#FF7A35]'
                : 'text-white hover:text-[#FF7A35]'
            )}
            onClick={e => {
              e.preventDefault();
              handleCategoryClick(null);
            }}
          >
            Alle
          </Link>
        </motion.div>
      )}

      {/* Kategorie-Buttons */}
      {categories.map(category => {
        const isActive = selectedCategory === category.slug;

        if (variant === 'pills') {
          return (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryClick(category.slug)}
                className={cn(
                  'rounded-full',
                  isActive
                    ? 'bg-white text-[#1A2027] hover:bg-white/90'
                    : 'border-white/40 bg-white/20 text-white hover:bg-white/30'
                )}
              >
                {category.name}
              </Button>
            </motion.div>
          );
        }

        if (variant === 'buttons') {
          return (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleCategoryClick(category.slug)}
                className={isActive ? 'bg-[#FF7A35] hover:bg-[#FF7A35]/90' : ''}
              >
                {category.name}
              </Button>
            </motion.div>
          );
        }

        if (variant === 'links') {
          return (
            <motion.div key={category.id} variants={itemVariants} whileHover={{ y: -2 }}>
              <Link
                href={`/blog?category=${category.slug}`}
                className={cn(
                  'px-3 py-1 text-sm',
                  isActive ? 'font-medium text-[#FF7A35]' : 'text-white hover:text-[#FF7A35]'
                )}
                onClick={e => {
                  e.preventDefault();
                  handleCategoryClick(category.slug);
                }}
              >
                {category.name}
              </Link>
            </motion.div>
          );
        }

        return null;
      })}
    </motion.div>
  );
};

export default Categories;
