// src/pages/home/components/LatestBlogPosts.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { LoadingSpinner } from '@/components/common/loading-spinner';
import { SectionTitle } from '@/components/common/section-title';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { supabase } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { PostCard } from '@/pages/blog/components/PostCard';

// Farbdefinitionen aus dem Farbschema - konsistent mit anderen Komponenten
const colors = {
  primary: '#23282D', // Primarna boja za strukturiranje
  secondary: '#50697D', // Glavna boja za pozadinske
  accent: '#FF8A4C', // Akcentna boja za isticanje
  background: '#F4F5F8', // Osnovna boja za pozadinu
  secondaryAccent: '#3A4F66', // Sekundarna akcentna boja
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

        // Daten für die PostCard-Komponente formatieren
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

  // Animierte Ladekomponente
  const LoadingComponent = () => (
    <motion.div
      className="flex justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#F4F5F8] border-t-[#FF8A4C]"></div>
        <span className="text-[#50697D]">Blog-Beiträge werden geladen...</span>
      </div>
    </motion.div>
  );

  // Animierte Fehlerkomponente
  const ErrorComponent = ({ message }: { message: string }) => (
    <motion.div
      className="py-12 text-center text-[#FF8A4C]/90"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-block rounded-none border border-[#FF8A4C]/20 bg-[#FF8A4C]/5 p-4">
        {message}
      </div>
    </motion.div>
  );

  // Animierte "Keine Beiträge" Komponente
  const EmptyComponent = () => (
    <motion.div
      className="py-12 text-center text-[#50697D]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Keine Blog-Beiträge gefunden.
    </motion.div>
  );

  return (
    <section className={cn('relative bg-white py-16 md:py-24', className)}>
      {/* Subtile Hintergrundakzente */}
      <div className="absolute right-0 top-0 h-1 w-full bg-[#F4F5F8]"></div>
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-tr-full bg-[#FF8A4C]/5"></div>

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
        >
          <SectionTitle title={title} subtitle={subtitle} align="center" className="mb-12" />
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
                  {/* Subtiler Farbakzent an der Oberseite jeder Karte */}
                  <div
                    className={`absolute left-0 top-0 h-1 w-12 ${index % 2 === 0 ? 'bg-[#FF8A4C]' : 'bg-[#3A4F66]'}`}
                  ></div>

                  {/* Die ursprüngliche PostCard mit Hover-Effekten */}
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
