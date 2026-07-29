import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest insights on AI and software engineering.',
};

export default function BlogPage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}>
      <h1>Blog</h1>
    </div>
  );
}
