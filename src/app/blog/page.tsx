import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/mdx';
import { BlogList } from './BlogList';
import styles from './Blog.module.css';

export const metadata: Metadata = {
  title: 'Blog | AI Proof',
  description: 'Thoughts on AI, software architecture, and the future of coding.',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className={styles.container}>

      <BlogList posts={posts} />
    </div>
  );
}
