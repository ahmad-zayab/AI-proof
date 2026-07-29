'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Card } from '@/components/ui';
import styles from './HowItWorks.module.css';

const steps = [
  {
    number: '1',
    title: 'Take the Quiz',
    description: 'Answer 10 scenario-based questions covering architecture, debugging, and system design.',
  },
  {
    number: '2',
    title: 'Get Your Score',
    description: 'Instantly receive a personalized breakdown of your AI-vulnerable and AI-proof skills.',
  },
  {
    number: '3',
    title: 'Level Up',
    description: 'Get a custom learning roadmap with free resources to future-proof your career.',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

export const HowItWorks: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className={styles.title}>
            How It Works
          </motion.h2>

          <div className={styles.grid}>
            {steps.map((step) => (
              <motion.div key={step.number} variants={itemVariants}>
                <Card variant="glass" hoverable={true} className={styles.card}>
                  <div className={`${styles.number} gradient-text`}>{step.number}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
