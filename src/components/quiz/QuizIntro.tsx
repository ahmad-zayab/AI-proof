'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '@/components/ui';
import { EXPERIENCE_LEVELS, PRIMARY_ROLES } from '@/lib/quiz-data';
import styles from './QuizIntro.module.css';

interface QuizIntroProps {
  onStart: (experience: string, role: string) => void;
}

export const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  const [experience, setExperience] = useState(EXPERIENCE_LEVELS[0]);
  const [role, setRole] = useState(PRIMARY_ROLES[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={styles.container}
    >
      <Card variant="glass" className={styles.card}>
        <h1 className={styles.title}>Before you start</h1>
        <p className={styles.subtitle}>
          We tailor the score analysis based on your current experience and primary role.
        </p>

        <div className={styles.formGroup}>
          <label className={styles.label}>Experience Level</label>
          <select 
            value={experience} 
            onChange={(e) => setExperience(e.target.value)}
            className={styles.select}
          >
            {EXPERIENCE_LEVELS.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Primary Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className={styles.select}
          >
            {PRIMARY_ROLES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <Button 
          variant="primary" 
          size="lg" 
          fullWidth 
          onClick={() => onStart(experience, role)}
          className={styles.button}
        >
          Start
        </Button>
      </Card>
    </motion.div>
  );
};
