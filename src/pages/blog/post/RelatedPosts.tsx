'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

import { SectionTitle } from '@/components/common/section-title';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
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

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts, className }) => {
  // Wenn keine verwandten Beiträge vorhanden sind, nichts rendern
  if (!posts || posts.length === 0) {
    return null;
  }

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

  return (
    <section className={cn('relative overflow-hidden bg-[#F8F9FC] py-16 md:py-24', className)}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2"
          style={{
            clipPath: 'polygon(0 0, 90% 0, 70% 100%, 0 100%)',
            backgroundColor: 'white',
            opacity: 0.5,
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute left-[10%] top-[15%] h-24 w-24 rounded-full"
          style={{ backgroundColor: '#FF7A35/10' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[15%] right-[8%] h-32 w-32 rounded-full"
          style={{ backgroundColor: '#3D5A73/10' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <Container className="relative z-10">
        <SectionTitle
          title="Das könnte Sie auch interessieren"
          subtitle="Entdecken Sie weitere Artikel zu diesem Thema"
          align="center"
          className="mb-10"
          decorative={true}
        />

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {posts.map(post => (
            <motion.div key={post.id} variants={itemVariants}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <Card className="h-full overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-lg">
                  {/* Decorative elements */}
                  <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-bl from-[#F8F9FC] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 h-16 w-16 bg-gradient-to-tr from-[#F8F9FC] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {post.featured_image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.featured_image || '/placeholder.svg'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {post.category && (
                        <div className="absolute left-3 top-3 rounded bg-[#FF7A35] px-2 py-1 text-xs font-medium text-white shadow-md">
                          {post.category.name}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-medium text-[#1A2027] transition-colors duration-300 group-hover:text-[#FF7A35]">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="line-clamp-2 text-sm text-[#3D5A73]">{post.excerpt}</p>
                    )}

                    <div className="mt-3 flex items-center text-sm font-medium text-[#FF7A35] transition-colors group-hover:text-[#FF7A35]/70">
                      <span>Artikel lesen</span>
                      <motion.div
                        className="ml-1"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Animated background elements */}
      <motion.div
        className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-[#FF7A35]/5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className="absolute -top-20 right-20 h-40 w-40 rounded-full bg-[#3D5A73]/5"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
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

export default RelatedPosts;
