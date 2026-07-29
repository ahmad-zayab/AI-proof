import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiz',
  description: 'Take the free 5-minute quiz to discover your AI-Proof Score.',
};

export default function QuizPage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}>
      <h1>Quiz</h1>
    </div>
  );
}
