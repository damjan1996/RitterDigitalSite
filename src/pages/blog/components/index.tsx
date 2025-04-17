// src/pages/blog/components/index.tsx
import React from 'react';

// Import components
import { BlogList } from './BlogList';
import { Categories } from './Categories';
import { Hero } from './Hero';
import { Pagination } from './Pagination';
import { PostCard } from './PostCard';
import { Search } from './Search';
import { Sidebar } from './Sidebar';

// Create a component that combines all of these
export const BlogComponents: React.FC = () => {
  return null; // This component is never directly rendered
};

// Export named components
export { Hero, BlogList, Categories, Search, PostCard, Pagination, Sidebar };

// Add default export
export default BlogComponents;
