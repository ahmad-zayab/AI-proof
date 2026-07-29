'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScoreBreakdown, Category, CategoryId } from '@/types';
import { Card, ProgressBar } from '@/components/ui';
import styles from './CategoryBreakdown.module.css';

interface CategoryBreakdownProps {
  breakdown: ScoreBreakdown;
  categories: Category[];
}

const RESOURCES: Record<CategoryId, string[]> = {
  systemDesign: ["Designing Data-Intensive Applications (book)", "System Design Primer (GitHub)", "ByteByteGo YouTube"],
  fundamentals: ["CS50 (Harvard, free)", "NeetCode.io", "Algorithms Specialization (Coursera)"],
  aiOrchestration: ["Prompt Engineering Guide (GitHub)", "LangChain docs", "Andrew Ng's AI courses"],
  debugging: ["Julia Evans' debugging zines", "Chrome DevTools docs", "Sentry blog"],
  architecture: ["Refactoring Guru", "Clean Architecture (book)", "Martin Fowler's blog"],
  communication: ["Staff Engineer (book)", "Technical Writing (Google course)", "Leading without Authority (book)"],
  domainExpertise: ["Domain-Driven Design (book)", "Industry conference talks", "Specialized newsletters"],
};

const EMOJIS: Record<CategoryId, string> = {
  systemDesign: '🏗️',
  fundamentals: '🧱',
  aiOrchestration: '🤖',
  debugging: '🐛',
  architecture: '📐',
  communication: '💬',
  domainExpertise: '🎯',
};

function getScoreColor(score: number): string {
  if (score >= 80) return 'var(--color-success)';
  if (score >= 60) return 'var(--color-primary-light)';
  if (score >= 40) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ breakdown, categories }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Skill Breakdown</h2>
      
      <div className={styles.cardsList}>
        {categories.map((cat, index) => {
          const score = breakdown[cat.id] || 0;
          const color = getScoreColor(score);
          
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant="glass" className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.info}>
                    <h3 className={styles.title}>
                      <span className={styles.emoji}>{EMOJIS[cat.id]}</span> 
                      {cat.name}
                    </h3>
                    <p className={styles.description}>{cat.description}</p>
                  </div>
                  <div className={styles.scoreSection}>
                    <div className={styles.scoreValue} style={{ color }}>{score}<span className={styles.maxScore}>/100</span></div>
                  </div>
                </div>
                
                <div className={styles.progressWrapper} style={{ '--gradient-primary': color } as React.CSSProperties}>
                  <ProgressBar value={score} height="md" ariaLabel={`${cat.name} score: ${score} out of 100`} />
                </div>
                
                <div className={styles.resourcesSection}>
                  <h4 className={styles.resourcesTitle}>Recommended Free Resources</h4>
                  <ul className={styles.resourcesList}>
                    {RESOURCES[cat.id].map(res => (
                      <li key={res}>{res}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
