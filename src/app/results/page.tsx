import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Results',
  description: 'View your personalized AI-Proof Score and skills analysis.',
};

export default function ResultsPage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}>
      <h1>Results</h1>
    </div>
  );
}
