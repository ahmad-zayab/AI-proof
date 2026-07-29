import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-Proof Assessment',
  description: 'Take the 5-minute quiz to discover your personalized AI-Proof Score.',
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: 'var(--space-sm) var(--space-lg)' }}>
        <Link 
          href="/" 
          style={{ 
            color: 'var(--color-text-secondary)', 
            textDecoration: 'none', 
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'color 0.2s'
          }}
        >
          ← Back to Home
        </Link>
      </header>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-sm) var(--space-md)', maxWidth: '650px', margin: '0 auto', width: '100%' }}>
        {children}
      </main>
    </div>
  );
}
