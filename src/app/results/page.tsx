'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, Button } from '@/components/ui';
import { decodeResultsFromUrl } from '@/lib/scoring';
import { CATEGORIES } from '@/lib/quiz-data';
import { QuizResult } from '@/types';
import { ScoreGauge, RadarChart, ShareCard } from '@/components/results';
import styles from './page.module.css';

function ResultsContent() {
  const searchParams = useSearchParams();
  const dataStr = searchParams.get('data');
  
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    // Simulate a brief loading state for UX before decoding
    const timer = setTimeout(() => {
      if (dataStr) {
        const decoded = decodeResultsFromUrl(dataStr);
        setResult(decoded);
        if (decoded) {
          // Dynamic SEO Title Update
          document.title = `My AI-Proof Score: ${Math.round(decoded.overallScore)}/100 | AI-Proof Engineer`;
        }
      } else {
        setResult(null);
      }
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [dataStr]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>
          Loading your personalized results...
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={styles.errorContainer}>
        <Card variant="outline" className={styles.errorCard}>
          <h1 className={styles.errorTitle}>Invalid Results</h1>
          <p className={styles.errorDesc}>
            This results link appears to be invalid or tampered with. Please retake the quiz for accurate results.
          </p>
          <Link href="/quiz" className={styles.linkWrapper}>
            <Button variant="primary">Retake the Quiz</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      
      {/* 2-Column Grid for Score & Chart */}
      <div className={styles.topGrid}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ScoreGauge score={result.overallScore} level={result.level} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <RadarChart breakdown={result.breakdown} />
        </motion.div>
      </div>



      {/* Coffee CTA */}
      <motion.div 
        className={styles.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <Card variant="solid" className={styles.coffeeCard}>
          <p className={styles.coffeeText}>This tool is free forever. If it helped you, consider buying me a coffee.</p>
          <Link href="#" className={styles.linkWrapper}>
            <Button variant="secondary" className={styles.coffeeBtn}>
              Buy me a coffee
            </Button>
          </Link>
        </Card>
      </motion.div>

      <motion.div 
        className={styles.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <ShareCard score={result.overallScore} level={result.level} />
      </motion.div>

      {/* Final Actions */}
      <motion.div 
        className={styles.finalActions}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Link href="/quiz" className={styles.linkWrapper}>
          <Button variant="secondary">Retake the Quiz</Button>
        </Link>
        <Link href="/blog" className={styles.linkWrapper}>
          <Button variant="ghost">Read the Blog</Button>
        </Link>
      </motion.div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <div className={styles.pageWrapper}>
      <Suspense fallback={
        <div className={styles.loadingContainer}>
          <p className={styles.loadingText}>Initializing...</p>
        </div>
      }>
        <ResultsContent />
      </Suspense>
    </div>
  );
}
