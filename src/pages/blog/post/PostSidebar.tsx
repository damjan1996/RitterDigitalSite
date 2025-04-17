// src/pages/blog/post/PostSidebar.tsx
import { Share2, Linkedin, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
  // Funktion zum Kopieren der URL in die Zwischenablage
  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert('Link in die Zwischenablage kopiert!');
        })
        .catch(error => {
          console.error('Fehler beim Kopieren:', error);
        });
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Autor */}
      {author && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Über den Autor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center">
              {author.profile_image && (
                <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={author.profile_image}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <h3 className="font-semibold text-primary">{author.name}</h3>

              {author.position && <p className="mt-1 text-sm text-tertiary">{author.position}</p>}

              {author.bio && <p className="mt-3 text-sm text-secondary">{author.bio}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Teilen */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Share2 className="h-4 w-4" />
            <span>Artikel teilen</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex flex-1 items-center justify-center gap-2"
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

            <Button
              variant="outline"
              size="sm"
              className="flex flex-1 items-center justify-center gap-2"
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

            <Button
              variant="outline"
              size="sm"
              className="flex flex-1 items-center justify-center gap-2"
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

            <Button
              variant="outline"
              size="sm"
              className="flex flex-1 items-center justify-center gap-2"
              onClick={copyToClipboard}
            >
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:inline">Kopieren</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kategorien */}
      {categories.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Kategorien</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Link key={category.id} href={`/blog?category=${category.slug}`}>
                  <Button variant="outline" size="sm">
                    {category.name}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Link key={tag} href={`/blog?tag=${tag}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-gray-100 text-secondary hover:bg-gray-200"
                  >
                    {tag}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verwandte Artikel */}
      {relatedPosts.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Das könnte Sie auch interessieren</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relatedPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <div className="flex items-start gap-3">
                    {post.featured_image && (
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                        <Image
                          src={post.featured_image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )}

                    <h4 className="text-sm font-medium text-primary transition-colors group-hover:text-accent">
                      {post.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t border-gray-100 pt-3 text-center">
              <Link href="/blog">
                <Button variant="ghost" size="sm">
                  Alle Artikel anzeigen
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      <Card className="bg-accent text-white">
        <CardContent className="pt-6">
          <h3 className="mb-2 text-lg font-semibold">Benötigen Sie Unterstützung?</h3>
          <p className="mb-4 text-sm text-white/90">
            Unsere Experten helfen Ihnen bei der digitalen Transformation Ihrer Geschäftsprozesse.
          </p>
          <Link href="/kontakt">
            <Button
              variant="outline"
              className="w-full border-white text-white hover:bg-white hover:text-accent"
            >
              Kontakt aufnehmen
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostSidebar;
