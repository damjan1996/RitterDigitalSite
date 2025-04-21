'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { PostCard, type PostCardProps } from './PostCard';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface SidebarProps {
  categories?: Category[];
  relatedPosts?: PostCardProps[];
  popularTags?: { name: string; count: number }[];
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories = [],
  relatedPosts = [],
  popularTags = [],
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className={cn('space-y-6', className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Kategorien */}
      {categories.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="border-b border-gray-100 bg-[#F8F9FC] pb-3">
              <CardTitle className="text-lg font-medium text-[#1A2027]">
                Kategorien
                <span className="text-[#FF7A35]">.</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul>
                {categories.map(category => (
                  <motion.li key={category.id} whileHover={{ x: 3 }}>
                    <Link
                      href={`/blog?category=${category.slug}`}
                      className="block border-b border-gray-100 px-6 py-3 text-[#3D5A73] transition-colors hover:bg-[#F8F9FC] hover:text-[#FF7A35]"
                    >
                      {category.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Verwandte Artikel */}
      {relatedPosts.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="border-b border-gray-100 bg-[#F8F9FC] pb-3">
              <CardTitle className="text-lg font-medium text-[#1A2027]">
                Verwandte Artikel
                <span className="text-[#FF7A35]">.</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {relatedPosts.map(post => (
                  <PostCard key={post.id} {...post} variant="compact" />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Beliebte Tags */}
      {popularTags.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="border-b border-gray-100 bg-[#F8F9FC] pb-3">
              <CardTitle className="text-lg font-medium text-[#1A2027]">
                Beliebte Tags
                <span className="text-[#FF7A35]">.</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <Link key={tag.name} href={`/blog?tag=${tag.name}`}>
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full bg-[#F8F9FC] text-[#3D5A73] hover:bg-[#FF7A35]/10 hover:text-[#FF7A35]"
                      >
                        {tag.name}
                        <span className="ml-1 text-xs text-[#3D5A73]/70">({tag.count})</span>
                      </Button>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* CTA */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-none bg-[#1A2027] text-white shadow-md">
          <CardContent className="p-6">
            <h3 className="mb-2 text-lg font-medium">Benötigen Sie Unterstützung?</h3>
            <p className="mb-4 text-sm text-white/80">
              Unsere Experten helfen Ihnen bei der digitalen Transformation Ihrer Geschäftsprozesse.
            </p>
            <Link href="/kontakt" className="group">
              <Button className="relative w-full overflow-hidden rounded-md bg-white px-6 py-2 font-medium text-[#1A2027] transition-all duration-300 hover:bg-white/90">
                <span className="relative z-10 flex items-center gap-2">
                  Kontakt aufnehmen
                  <motion.div className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 w-full bg-[#FF7A35]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
