'use client';

import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';
import type React from 'react';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

import Categories from './Categories';
import Search from './Search';

// Refined color palette - consistent with other components
const colors = {
  primary: '#1A2027', // Darker primary for better contrast
  secondary: '#3D5A73', // Richer secondary color
  accent: '#FF7A35', // Warmer accent for better visibility
  background: '#F8F9FC', // Lighter background for better contrast
  secondaryAccent: '#2A3F56', // Deeper secondary accent
};

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface HeroProps {
  title?: string;
  subtitle?: string;
  selectedCategory?: string | null;
  categories?: Category[];
  onSearch?: (query: string) => void;
  onCategoryChange?: (category: string | null) => void;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'Blog',
  subtitle = 'Neuigkeiten, Tipps und Einblicke aus der Welt der digitalen Geschäftsprozesse und Business Intelligence',
  selectedCategory = null,
  categories = [],
  onSearch,
  onCategoryChange,
  className,
}) => {
  // Ermittle, ob eine Kategorie ausgewählt ist und hole den Namen
  const selectedCategoryName =
    selectedCategory && categories && categories.length > 0
      ? categories.find(c => c.slug === selectedCategory)?.name || selectedCategory
      : null;

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

  return (
    <section
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      style={{ backgroundColor: colors.primary }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2"
          style={{
            clipPath: 'polygon(0 0, 90% 0, 70% 100%, 0 100%)',
            backgroundColor: 'rgba(255,255,255,0.03)',
            opacity: 0.5,
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute right-0 top-0 h-full w-1/2"
          style={{
            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 10% 100%)',
            backgroundColor: 'rgba(255,255,255,0.02)',
            opacity: 0.5,
          }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute left-[10%] top-[15%] h-24 w-24 rounded-full"
          style={{ backgroundColor: `${colors.accent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[15%] right-[8%] h-32 w-32 rounded-full"
          style={{ backgroundColor: `${colors.accent}10` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.div className="mb-2 inline-flex items-center rounded-full bg-[#FF7A35]/20 px-4 py-1.5">
              <SearchIcon className="mr-2 h-4 w-4 text-[#FF7A35]" />
              <span className="text-sm font-medium text-[#FF7A35]">Blog</span>
            </motion.div>

            <h1 className="mb-4 text-4xl font-medium text-white md:text-5xl">
              {selectedCategoryName ? `${title}: ${selectedCategoryName}` : title}
              <span className="text-[#FF7A35]">.</span>
            </h1>

            <motion.p className="mb-8 text-lg text-white/80" variants={itemVariants}>
              {subtitle}
            </motion.p>
          </motion.div>

          {/* Suchleiste */}
          {onSearch && (
            <motion.div className="mb-8" variants={itemVariants}>
              <Search onSearch={onSearch} />
            </motion.div>
          )}

          {/* Kategorien */}
          {categories && categories.length > 0 && onCategoryChange && (
            <motion.div className="mt-8" variants={itemVariants}>
              <Categories
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
              />
            </motion.div>
          )}
        </motion.div>
      </Container>

      {/* Animated background elements */}
      <motion.div
        className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-[#FF7A35]/5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className="absolute -top-20 right-20 h-40 w-40 rounded-full bg-[#FF7A35]/5"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          delay: 1,
        }}
      />
    </section>
  );
};

export default Hero;
