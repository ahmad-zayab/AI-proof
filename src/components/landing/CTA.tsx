'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, Button } from '@/components/ui';
import styles from './CTA.module.css';

export const CTA: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <Card variant="glass" className={styles.card}>
            <h2 className={styles.heading}>Ready to future-proof your career?</h2>
            <p className={styles.subheading}>
              Stop worrying about AI taking your job and start adapting. It's free and takes less than 5 minutes.
            </p>
            <Link href="/quiz" className={styles.linkWrapper}>
              <Button variant="primary" size="lg" className={styles.button}>
                Start the Quiz Now 🚀
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
