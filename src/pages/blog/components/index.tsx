// src/pages/blog/components/index.tsx
import React from 'react';

// Import components
import { BlogList } from './BlogList';
import { Hero } from './Hero';
import { PostCard } from './PostCard';
import Search from './Search';
import { Sidebar } from './Sidebar';

// Create a component that combines all of these
export const BlogComponents: React.FC = () => {
  return null; // This component is never directly rendered
};

// Export named components
export { Hero, BlogList, PostCard, Sidebar, Search };
// Re-export Pagination as a named export
export { default as Pagination } from './Pagination';
// Re-export Categories as a named export
export { default as Categories } from './Categories';

// Add default export
export default BlogComponents;
