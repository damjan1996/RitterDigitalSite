'use client';

import { motion } from 'framer-motion';
import type React from 'react';

import { cn } from '@/lib/utils';

interface PostContentProps {
  content: string;
  className?: string;
}

export const PostContent: React.FC<PostContentProps> = ({ content = '', className }) => {
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
        '<img$1src="$2"$3 class="max-w-full h-auto rounded-lg my-6 shadow-md" loading="lazy">'
      );

      // Überschriften stylen
      formattedContent = formattedContent.replace(
        /<h2(.*?)>(.*?)<\/h2>/g,
        '<h2$1 class="text-2xl font-bold mt-10 mb-4 text-[#1A2027]">$2<span class="text-[#FF7A35]">.</span></h2>'
      );

      formattedContent = formattedContent.replace(
        /<h3(.*?)>(.*?)<\/h3>/g,
        '<h3$1 class="text-xl font-bold mt-8 mb-3 text-[#1A2027]">$2</h3>'
      );

      formattedContent = formattedContent.replace(
        /<h4(.*?)>(.*?)<\/h4>/g,
        '<h4$1 class="text-lg font-bold mt-6 mb-2 text-[#1A2027]">$2</h4>'
      );

      // Absätze stylen
      formattedContent = formattedContent.replace(
        /<p(.*?)>(.*?)<\/p>/g,
        '<p$1 class="mb-6 text-[#3D5A73] leading-relaxed">$2</p>'
      );

      // Listen stylen
      formattedContent = formattedContent.replace(
        /<ul(.*?)>/g,
        '<ul$1 class="list-disc pl-6 mb-6 text-[#3D5A73] space-y-2">'
      );

      formattedContent = formattedContent.replace(
        /<ol(.*?)>/g,
        '<ol$1 class="list-decimal pl-6 mb-6 text-[#3D5A73] space-y-2">'
      );

      formattedContent = formattedContent.replace(
        /<li(.*?)>(.*?)<\/li>/g,
        '<li$1 class="mb-2">$2</li>'
      );

      // Links stylen
      formattedContent = formattedContent.replace(
        /<a(.*?)href="(.*?)"(.*?)>(.*?)<\/a>/g,
        '<a$1href="$2"$3 class="text-[#FF7A35] hover:underline font-medium">$4</a>'
      );

      // Blockquotes stylen
      formattedContent = formattedContent.replace(
        /<blockquote(.*?)>(.*?)<\/blockquote>/g,
        '<blockquote$1 class="border-l-4 border-[#FF7A35] pl-6 py-2 my-8 text-[#3D5A73] italic bg-[#F8F9FC] rounded-r-md">$2</blockquote>'
      );

      // Code-Blöcke stylen
      formattedContent = formattedContent.replace(
        /<pre(.*?)>(.*?)<\/pre>/g,
        '<pre$1 class="bg-[#1A2027] text-white rounded-md p-6 overflow-x-auto my-8 text-sm shadow-md">$2</pre>'
      );

      formattedContent = formattedContent.replace(
        /<code(.*?)>(.*?)<\/code>/g,
        '<code$1 class="bg-[#F8F9FC] rounded px-1.5 py-0.5 text-sm font-mono text-[#1A2027]">$2</code>'
      );

      // Tabellen stylen
      formattedContent = formattedContent.replace(
        /<table(.*?)>/g,
        '<div class="overflow-x-auto my-8 rounded-md shadow-sm"><table$1 class="min-w-full divide-y divide-gray-200">'
      );

      formattedContent = formattedContent.replace(/<\/table>/g, '</table></div>');

      formattedContent = formattedContent.replace(
        /<thead(.*?)>/g,
        '<thead$1 class="bg-[#F8F9FC]">'
      );

      formattedContent = formattedContent.replace(
        /<th(.*?)>(.*?)<\/th>/g,
        '<th$1 class="px-6 py-3 text-left text-xs font-medium text-[#3D5A73] uppercase tracking-wider">$2</th>'
      );

      formattedContent = formattedContent.replace(
        /<td(.*?)>(.*?)<\/td>/g,
        '<td$1 class="px-6 py-4 whitespace-nowrap text-sm text-[#3D5A73] border-b border-gray-100">$2</td>'
      );
    } catch (error) {
      console.error('Error formatting content:', error);
      return htmlContent; // Originalen Inhalt zurückgeben, falls Fehler
    }

    return formattedContent;
  };

  return (
    <motion.div
      className={cn('prose prose-lg max-w-none', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div dangerouslySetInnerHTML={createMarkup()} className="blog-content" />

      <style>{`
        .blog-content img {
          border-radius: 0.5rem;
          margin: 2rem 0;
          transition: transform 0.3s ease;
        }
        
        .blog-content img:hover {
          transform: scale(1.01);
        }
        
        .blog-content a {
          color: #FF7A35;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        
        .blog-content a:hover {
          text-decoration: underline;
          color: #E56A25;
        }
        
        .blog-content h2 {
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 2rem;
          color: #1A2027;
          position: relative;
        }
        
        .blog-content h3 {
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
          font-size: 1.25rem;
          line-height: 1.75rem;
          color: #1A2027;
        }
        
        .blog-content ul, 
        .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        
        .blog-content ul {
          list-style-type: disc;
        }
        
        .blog-content ol {
          list-style-type: decimal;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #FF7A35;
          padding: 0.5rem 0 0.5rem 1.5rem;
          font-style: italic;
          margin: 2rem 0;
          background-color: #F8F9FC;
          border-radius: 0 0.375rem 0.375rem 0;
        }
        
        .blog-content pre {
          background-color: #1A2027;
          color: white;
          border-radius: 0.375rem;
          padding: 1.5rem;
          overflow-x: auto;
          margin: 2rem 0;
          font-size: 0.875rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .blog-content code {
          background-color: #F8F9FC;
          border-radius: 0.25rem;
          padding: 0.125rem 0.25rem;
          font-family: monospace;
          font-size: 0.875rem;
          color: #1A2027;
        }
        
        .blog-content :last-child {
          margin-bottom: 0;
        }
        
        .blog-content p {
          line-height: 1.8;
          margin-bottom: 1.5rem;
          color: #3D5A73;
        }
      `}</style>
    </motion.div>
  );
};

export default PostContent;
