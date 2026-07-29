'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { BlogPost } from '@/lib/mdx';
import styles from './Blog.module.css';

interface BlogListProps {
  posts: BlogPost[];
}

export const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No blog posts published yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
            <Card variant="glass" hoverable className={styles.card}>
              <div className={styles.cardMeta}>
                <span className={styles.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className={styles.readTime}>
                  {Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min read
                </span>
              </div>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
