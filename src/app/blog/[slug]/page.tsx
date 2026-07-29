import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/mdx';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Badge, Card, Button } from '@/components/ui';
import { ReadingProgress } from './ReadingProgress';
import styles from './BlogPost.module.css';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static parameters for all available posts at build time
export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | AI-Proof Engineer',
    };
  }

  return {
    title: `${post.title} | AI-Proof Engineer`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'AI-Proof Engineer'],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }



  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: [
      {
        '@type': 'Person',
        name: post.author,
      },
    ],
    datePublished: post.date,
  };

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      
      <article className={styles.container}>
        <header className={styles.header}>
          {post.tags && post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="info">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          <h1 className={styles.title}>{post.title}</h1>
          
          <div className={styles.meta}>
            <span className={styles.author}>{post.author}</span>
            <span className={styles.metaDivider}>•</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </header>

        <div className={styles.content}>
          <MDXRemote source={post.content} />
        </div>

        <aside className={styles.ctaContainer}>
          <Card variant="glass" className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>Are your skills AI-proof?</h3>
            <p>
              Take the free 5-minute assessment to discover where you stand and what skills you need to learn next.
            </p>
            <Link href="/quiz">
              <Button variant="primary">Take the Free Assessment</Button>
            </Link>
          </Card>
        </aside>
      </article>
    </>
  );
}
