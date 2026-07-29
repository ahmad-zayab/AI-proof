'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, AnimatedCounter } from '@/components/ui';
import styles from './SocialProof.module.css';

const testimonials = [
  {
    quote: "This quiz opened my eyes to where I need to upskill. The roadmap is gold.",
    author: "Senior Frontend Dev",
  },
  {
    quote: "Finally, a tool that cuts through the AI hype and tells you exactly what to focus on.",
    author: "Backend Engineer",
  },
  {
    quote: "I scored a 65. Time to brush up on my system design skills!",
    author: "Full Stack Developer",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

export const SocialProof: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Join{' '}
            <AnimatedCounter 
              target={12847} 
              suffix=" engineers" 
              className={`gradient-text ${styles.counter}`} 
            />
            <br />
            who have already checked their AI-Proof Score.
          </h2>
        </div>

        <motion.div 
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {testimonials.map((t, index) => (
            <motion.div key={index} variants={itemVariants} className={styles.motionCardWrapper}>
              <Card variant="outline" className={styles.card}>
                <p className={styles.quote}>"{t.quote}"</p>
                <p className={styles.author}>— {t.author}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
