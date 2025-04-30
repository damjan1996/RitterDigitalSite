'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type React from 'react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { supabase } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { PostCard } from '@/pages/blog/components/PostCard';

// Define colors locally to avoid import issues
const colors = {
  primary: '#23282D',
  secondary: '#50697D',
  accent: '#FF7A35',
  background: '#FFFFFF',
  backgroundAlt: '#F8F9FC',
  muted: '#F8F9FC',
};

interface LatestBlogPostsProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const LatestBlogPosts: React.FC<LatestBlogPostsProps> = ({
  title = 'Aktuelle Blog-Beiträge',
  subtitle = 'Erfahren Sie mehr über die neuesten Entwicklungen und Erkenntnisse in der digitalen Welt',
  className,
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(
            `
              id,
              title,
              slug,
              excerpt,
              featured_image,
              published_at,
              author:authors(name, profile_image),
              categories(name, slug)
            `
          )
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) throw new Error(error.message);

        // Format data for the PostCard component
        const formattedPosts = data.map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          featured_image: post.featured_image,
          published_at: post.published_at,
          author: post.author,
          category: post.categories,
        }));

        setPosts(formattedPosts);
      } catch (err) {
        console.error('Fehler beim Laden der Blog-Beiträge:', err);
        setError('Fehler beim Laden der Blog-Beiträge');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.5 },
    },
  };

  // Loading component
  const LoadingComponent = () => (
    <motion.div
      className="flex justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#F8F9FC] border-t-[#FF7A35]"></div>
        <span style={{ color: colors.secondary }}>Blog-Beiträge werden geladen...</span>
      </div>
    </motion.div>
  );

  // Error component
  const ErrorComponent = ({ message }: { message: string }) => (
    <motion.div
      className="py-12 text-center"
      style={{ color: `${colors.accent}90` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="inline-block rounded-none border bg-[#FF7A35]/5 p-4"
        style={{ borderColor: `${colors.accent}20` }}
      >
        {message}
      </div>
    </motion.div>
  );

  // Empty component
  const EmptyComponent = () => (
    <motion.div
      className="py-12 text-center"
      style={{ color: colors.secondary }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Keine Blog-Beiträge gefunden.
    </motion.div>
  );

  return (
    <section className={cn('relative bg-white py-16 md:py-24', className)}>
      {/* Subtle background accents */}
      <div
        className="absolute right-0 top-0 h-1 w-full"
        style={{ backgroundColor: colors.backgroundAlt }}
      ></div>

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
        >
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-medium md:text-4xl" style={{ color: colors.primary }}>
              {title}
            </h2>
            <p
              className="mx-auto max-w-2xl text-base md:text-lg"
              style={{ color: colors.secondary }}
            >
              {subtitle}
            </p>
          </div>
        </motion.div>

        {isLoading ? (
          <LoadingComponent />
        ) : error ? (
          <ErrorComponent message={error} />
        ) : posts.length === 0 ? (
          <EmptyComponent />
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {posts.map((post, index) => (
              <motion.div key={post.id} variants={itemVariants}>
                <div className="relative">
                  {/* Subtle color accent at the top of each card */}
                  <div
                    className={`absolute left-0 top-0 h-1 w-12 ${index % 2 === 0 ? 'bg-[#FF7A35]' : 'bg-[#3A4F66]'}`}
                  ></div>

                  {/* PostCard with hover effects */}
                  <motion.div
                    whileHover={{
                      y: -5,
                      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                      transition: { duration: 0.3 },
                    }}
                  >
                    <PostCard {...post} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="mt-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={buttonVariants}
        >
          <Link href="/blog">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-[#23282D] text-[#23282D] transition-all duration-300 hover:bg-[#23282D] hover:text-white"
              >
                Alle Blog-Beiträge ansehen
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default LatestBlogPosts;
