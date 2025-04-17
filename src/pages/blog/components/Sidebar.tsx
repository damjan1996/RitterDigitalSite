// src/pages/blog/components/Sidebar.tsx
import Link from 'next/link';
import React from 'react';

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
  return (
    <div className={cn('space-y-6', className)}>
      {/* Kategorien */}
      {categories.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Kategorien</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {categories.map(category => (
                <li key={category.id}>
                  <Link
                    href={`/blog?category=${category.slug}`}
                    className="block py-1.5 text-primary transition-colors hover:text-accent"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Verwandte Artikel */}
      {relatedPosts.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Verwandte Artikel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relatedPosts.map(post => (
                <PostCard key={post.id} {...post} variant="compact" />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Beliebte Tags */}
      {popularTags.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Beliebte Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(tag => (
                <Link key={tag.name} href={`/blog?tag=${tag.name}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full bg-gray-100 text-secondary hover:bg-gray-200"
                  >
                    {tag.name}
                    <span className="ml-1 text-xs text-tertiary">({tag.count})</span>
                  </Button>
                </Link>
              ))}
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

export default Sidebar;
