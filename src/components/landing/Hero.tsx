'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Badge, Button } from '@/components/ui';
import styles from './Hero.module.css';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.content}>
          <motion.div variants={itemVariants} className={styles.badgeWrapper}>
            <Badge variant="neutral" size="md">
              🔥 Over 10,000 developers tested
            </Badge>
          </motion.div>

          <motion.h1 variants={itemVariants} className={styles.title}>
            Is <span className="gradient-text">AI</span> Coming For Your Job?
          </motion.h1>

          <motion.p variants={itemVariants} className={styles.subtitle}>
            Take the 5-minute quiz. Discover your personalized AI-Proof Score and learn which of your skills are safe from automation.
          </motion.p>

          <motion.div variants={itemVariants} className={styles.actions}>
            <Link href="/quiz" className={styles.linkWrapper}>
              <Button variant="primary" size="lg" className={styles.actionButton}>
                Find Out Now →
              </Button>
            </Link>
            <Link href="/blog" className={styles.linkWrapper}>
              <Button variant="ghost" size="lg" className={styles.actionButton}>
                Read the Research
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
