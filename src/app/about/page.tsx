import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about AI-Proof Engineer and how we analyze developer skills.',
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}>
      <h1>About</h1>
    </div>
  );
}
