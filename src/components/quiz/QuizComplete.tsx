'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './QuizComplete.module.css';

export const QuizComplete: React.FC = () => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.glowOrb}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.content}
      >
        <h2 className={styles.title}>Calculating your results</h2>
        <p className={styles.subtitle}>
          This will only take a moment.
        </p>
      </motion.div>
    </div>
  );
};
