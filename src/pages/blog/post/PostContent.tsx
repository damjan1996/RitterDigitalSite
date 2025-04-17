// src/pages/blog/post/PostContent.tsx
import React from 'react';

import { cn } from '@/lib/utils';

interface PostContentProps {
  content: string;
  className?: string;
}

export const PostContent: React.FC<PostContentProps> = ({
  content = '', // Default-Wert hinzugefügt
  className,
}) => {
  // Hilfsfunktion zum Erstellen von HTML mit korrekter Formatierung
  const createMarkup = () => {
    return { __html: formatContent(content) };
  };

  // Formatiert den Inhalt für bessere Anzeige
  const formatContent = (htmlContent: string): string => {
    if (!htmlContent) return ''; // Prüfen auf null/undefined

    let formattedContent = htmlContent;

    try {
      // Bilder responsiv machen
      formattedContent = formattedContent.replace(
        /<img(.*?)src="(.*?)"(.*?)>/g,
        '<img$1src="$2"$3 class="max-w-full h-auto rounded-lg my-4" loading="lazy">'
      );

      // Überschriften stylen
      formattedContent = formattedContent.replace(
        /<h2(.*?)>(.*?)<\/h2>/g,
        '<h2$1 class="text-2xl font-bold mt-8 mb-4">$2</h2>'
      );

      formattedContent = formattedContent.replace(
        /<h3(.*?)>(.*?)<\/h3>/g,
        '<h3$1 class="text-xl font-bold mt-6 mb-3">$2</h3>'
      );

      formattedContent = formattedContent.replace(
        /<h4(.*?)>(.*?)<\/h4>/g,
        '<h4$1 class="text-lg font-bold mt-4 mb-2">$2</h4>'
      );

      // Absätze stylen
      formattedContent = formattedContent.replace(
        /<p(.*?)>(.*?)<\/p>/g,
        '<p$1 class="mb-4 text-secondary">$2</p>'
      );

      // Listen stylen
      formattedContent = formattedContent.replace(
        /<ul(.*?)>/g,
        '<ul$1 class="list-disc pl-6 mb-4 text-secondary">'
      );

      formattedContent = formattedContent.replace(
        /<ol(.*?)>/g,
        '<ol$1 class="list-decimal pl-6 mb-4 text-secondary">'
      );

      formattedContent = formattedContent.replace(
        /<li(.*?)>(.*?)<\/li>/g,
        '<li$1 class="mb-2">$2</li>'
      );

      // Links stylen
      formattedContent = formattedContent.replace(
        /<a(.*?)href="(.*?)"(.*?)>(.*?)<\/a>/g,
        '<a$1href="$2"$3 class="text-accent hover:underline">$4</a>'
      );

      // Blockquotes stylen
      formattedContent = formattedContent.replace(
        /<blockquote(.*?)>(.*?)<\/blockquote>/g,
        '<blockquote$1 class="border-l-4 border-accent pl-4 italic my-6 text-secondary">$2</blockquote>'
      );

      // Code-Blöcke stylen
      formattedContent = formattedContent.replace(
        /<pre(.*?)>(.*?)<\/pre>/g,
        '<pre$1 class="bg-gray-50 rounded-md p-4 overflow-x-auto my-6 text-sm">$2</pre>'
      );

      formattedContent = formattedContent.replace(
        /<code(.*?)>(.*?)<\/code>/g,
        '<code$1 class="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono">$2</code>'
      );

      // Tabellen stylen
      formattedContent = formattedContent.replace(
        /<table(.*?)>/g,
        '<div class="overflow-x-auto my-6"><table$1 class="min-w-full divide-y divide-gray-200">'
      );

      formattedContent = formattedContent.replace(/<\/table>/g, '</table></div>');

      formattedContent = formattedContent.replace(/<thead(.*?)>/g, '<thead$1 class="bg-gray-50">');

      formattedContent = formattedContent.replace(
        /<th(.*?)>(.*?)<\/th>/g,
        '<th$1 class="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">$2</th>'
      );

      formattedContent = formattedContent.replace(
        /<td(.*?)>(.*?)<\/td>/g,
        '<td$1 class="px-6 py-4 whitespace-nowrap text-sm text-secondary">$2</td>'
      );
    } catch (error) {
      console.error('Error formatting content:', error);
      return htmlContent; // Originalen Inhalt zurückgeben, falls Fehler
    }

    return formattedContent;
  };

  return (
    <div className={cn('prose prose-lg max-w-none', className)}>
      <div dangerouslySetInnerHTML={createMarkup()} className="blog-content" />

      <style>{`
        .blog-content img {
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
        
        .blog-content a {
          color: rgb(255, 138, 76);
          text-decoration: none;
        }
        
        .blog-content a:hover {
          text-decoration: underline;
        }
        
        .blog-content h2 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 2rem;
        }
        
        .blog-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
          font-size: 1.25rem;
          line-height: 1.75rem;
        }
        
        .blog-content ul, 
        .blog-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .blog-content ul {
          list-style-type: disc;
        }
        
        .blog-content ol {
          list-style-type: decimal;
        }
        
        .blog-content blockquote {
          border-left: 4px solid rgb(255, 138, 76);
          padding-left: 1rem;
          font-style: italic;
          margin: 1.5rem 0;
        }
        
        .blog-content pre {
          background-color: rgb(249, 250, 251);
          border-radius: 0.375rem;
          padding: 1rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          font-size: 0.875rem;
        }
        
        .blog-content code {
          background-color: rgb(243, 244, 246);
          border-radius: 0.25rem;
          padding: 0.125rem 0.25rem;
          font-family: monospace;
          font-size: 0.875rem;
        }
        
        .blog-content :last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default PostContent;
