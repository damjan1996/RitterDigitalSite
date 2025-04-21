'use client';

import { motion } from 'framer-motion';
import { Share2, Linkedin, Facebook, Twitter, LinkIcon, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Author {
  id: string;
  name: string;
  position?: string | null;
  profile_image?: string | null;
  bio?: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface RelatedPost {
  id: number;
  title: string;
  slug: string;
  featured_image?: string | null;
}

interface PostSidebarProps {
  author?: Author;
  categories?: Category[];
  tags?: string[];
  relatedPosts?: RelatedPost[];
  className?: string;
}

export const PostSidebar: React.FC<PostSidebarProps> = ({
  author,
  categories = [],
  tags = [],
  relatedPosts = [],
  className,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

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

  // Funktion zum Kopieren der URL in die Zwischenablage
  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 2000);
        })
        .catch(error => {
          console.error('Fehler beim Kopieren:', error);
        });
    }
  };

  return (
    <motion.div
      className={cn('space-y-6', className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Autor */}
      {author && (
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="border-b border-gray-100 bg-[#F8F9FC] pb-3">
              <CardTitle className="text-lg font-medium text-[#1A2027]">
                Über den Autor
                <span className="text-[#FF7A35]">.</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                {author.profile_image && (
                  <motion.div
                    className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-[#FF7A35]/10"
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  >
                    <Image
                      src={author.profile_image || '/placeholder.svg'}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )}

                <h3 className="font-semibold text-[#1A2027]">{author.name}</h3>

                {author.position && (
                  <p className="mt-1 text-sm text-[#3D5A73]">{author.position}</p>
                )}

                {author.bio && <p className="mt-3 text-sm text-[#3D5A73]">{author.bio}</p>}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Teilen */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-md">
          <CardHeader className="border-b border-gray-100 bg-[#F8F9FC] pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-medium text-[#1A2027]">
              <Share2 className="h-4 w-4" />
              <span>
                Artikel teilen
                <span className="text-[#FF7A35]">.</span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-1 items-center justify-center gap-2 border-gray-200 hover:border-[#FF7A35] hover:bg-[#FF7A35]/5 hover:text-[#FF7A35]"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                        '_blank'
                      );
                    }
                  }}
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:inline">LinkedIn</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-1 items-center justify-center gap-2 border-gray-200 hover:border-[#FF7A35] hover:bg-[#FF7A35]/5 hover:text-[#FF7A35]"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                        '_blank'
                      );
                    }
                  }}
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:inline">Facebook</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-1 items-center justify-center gap-2 border-gray-200 hover:border-[#FF7A35] hover:bg-[#FF7A35]/5 hover:text-[#FF7A35]"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
                        '_blank'
                      );
                    }
                  }}
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:inline">Twitter</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 border-gray-200',
                    copiedLink
                      ? 'border-green-500 bg-green-50 text-green-600'
                      : 'hover:border-[#FF7A35] hover:bg-[#FF7A35]/5 hover:text-[#FF7A35]'
                  )}
                  onClick={copyToClipboard}
                >
                  <LinkIcon className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:inline">
                    {copiedLink ? 'Kopiert!' : 'Kopieren'}
                  </span>
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

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
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Link key={category.id} href={`/blog?category=${category.slug}`}>
                    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-200 hover:border-[#FF7A35] hover:bg-[#FF7A35]/5 hover:text-[#FF7A35]"
                      >
                        {category.name}
                      </Button>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="border-b border-gray-100 bg-[#F8F9FC] pb-3">
              <CardTitle className="text-lg font-medium text-[#1A2027]">
                Tags
                <span className="text-[#FF7A35]">.</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Link key={tag} href={`/blog?tag=${tag}`}>
                    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full bg-[#F8F9FC] text-[#3D5A73] hover:bg-[#FF7A35]/10 hover:text-[#FF7A35]"
                      >
                        {tag}
                      </Button>
                    </motion.div>
                  </Link>
                ))}
              </div>
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
                Das könnte Sie auch interessieren
                <span className="text-[#FF7A35]">.</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {relatedPosts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <motion.div
                      className="flex items-start gap-3"
                      whileHover={{ x: 3, transition: { duration: 0.2 } }}
                    >
                      {post.featured_image && (
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                          <Image
                            src={post.featured_image || '/placeholder.svg'}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      )}

                      <h4 className="text-sm font-medium text-[#1A2027] transition-colors group-hover:text-[#FF7A35]">
                        {post.title}
                      </h4>
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 border-t border-gray-100 pt-3 text-center">
                <Link href="/blog">
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="sm" className="hover:text-[#FF7A35]">
                      Alle Artikel anzeigen
                    </Button>
                  </motion.div>
                </Link>
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

export default PostSidebar;
