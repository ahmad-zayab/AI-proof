'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <motion.div
        className={`container ${styles.content}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.leftColumn}>
          <h1 className={styles.title}>
            Measure your engineering skills against what AI can already do.
          </h1>

          <p className={styles.subtitle}>
            A 7-question assessment that scores your skills across architecture, debugging, and systems thinking. No signup. No email. Just your score.
          </p>

          <div className={styles.actions}>
            <Link href="/quiz" className={styles.linkWrapper}>
              <Button variant="primary" size="lg" className={styles.actionButton}>
                Take the assessment
              </Button>
            </Link>
          </div>
        </div>
        
        <div className={styles.rightColumn}>
          {/* Decorative visual (empty for minimalism as requested) */}
        </div>
      </motion.div>
    </section>
  );
};
