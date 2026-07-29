'use client';

import React from 'react';
import { ProgressBar } from '@/components/ui';
import styles from './QuizProgress.module.css';

interface QuizProgressProps {
  current: number;
  total: number;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({ current, total }) => {
  const percentage = Math.round(((current) / total) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.text}>Question {current} of {total}</span>
        <span className={styles.percentage}>{percentage}%</span>
      </div>
      <ProgressBar value={percentage} height="md" ariaLabel={`Quiz progress: ${percentage}%`} />
    </div>
  );
};
