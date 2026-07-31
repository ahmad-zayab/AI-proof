import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import styles from './CTA.module.css';

export const CTA: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.line} />
          <p className={styles.text}>
            Free. 7 questions. No signup required.
          </p>
          <Link href="/quiz" className={styles.linkWrapper}>
            <Button variant="primary" size="lg">
              Take the assessment
            </Button>
          </Link>
          <div className={styles.line} />
        </div>
      </div>
    </section>
  );
};
