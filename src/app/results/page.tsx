'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import { decodeResultsFromUrl } from '@/lib/scoring';
import { QuizResult } from '@/types';

function ResultsContent() {
  const searchParams = useSearchParams();
  const dataStr = searchParams.get('data');
  
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    // Simulate a brief loading state for UX before decoding
    const timer = setTimeout(() => {
      if (dataStr) {
        setResult(decodeResultsFromUrl(dataStr));
      } else {
        setResult(null);
      }
      setIsLoading(false);
    }, 600); // 600ms loading simulation

    return () => clearTimeout(timer);
  }, [dataStr]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', animation: 'pulse 2s infinite' }}>
          Loading your personalized results...
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <Card variant="outline" style={{ borderColor: 'var(--color-danger)', maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: 'var(--space-3xl)' }}>
        <h1 style={{ color: 'var(--color-danger)', marginBottom: 'var(--space-md)' }}>Invalid Results</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2xl)' }}>
          This results link appears to be invalid or tampered with. Please retake the quiz for accurate results.
        </p>
        <Link href="/quiz" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <Button variant="primary">Retake the Quiz</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: 'var(--space-xl)' }}>Results Dashboard Placeholder</h1>
      <Card variant="glass">
        <pre style={{ 
          background: 'rgba(0,0,0,0.3)', 
          padding: 'var(--space-lg)', 
          borderRadius: 'var(--radius-md)', 
          overflowX: 'auto',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text)'
        }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </Card>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)', minHeight: 'calc(100vh - var(--navbar-height))' }}>
      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>Initializing...</p>
        </div>
      }>
        <ResultsContent />
      </Suspense>
    </div>
  );
}
