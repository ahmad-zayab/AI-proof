import React from 'react';
import { RadarChart } from '@/components/results/RadarChart';
import styles from './Evidence.module.css';

const sampleBreakdown = {
  ambiguity: 85,
  emotionalIntelligence: 60,
  strategicJudgment: 90,
  adaptability: 45,
  contextualNuance: 75,
  creativeSynthesis: 70,
  domainExpertise: 55,
};

export const Evidence: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.content}`}>
        <div className={styles.textColumn}>
          <div className={styles.block}>
            <span className={styles.label}>THE PROBLEM</span>
            <p className={styles.paragraph}>
              AI can now write functional code faster than most developers. But writing code was never the hard part of engineering. The question is: which of your skills actually matter?
            </p>
          </div>

          <div className={styles.block}>
            <span className={styles.label}>THE ASSESSMENT</span>
            <p className={styles.paragraph}>
              Seven scenario-based questions across system design, debugging, architecture, and cross-team communication. Each one tests judgment that AI consistently gets wrong.
            </p>
          </div>

          <div className={styles.block}>
            <span className={styles.label}>THE RESULT</span>
            <p className={styles.paragraph}>
              A detailed breakdown of where you stand, which skills to prioritize, and free resources to close the gaps.
            </p>
          </div>
        </div>

        <div className={styles.visualColumn}>
          <div className={styles.chartWrapper}>
            <RadarChart breakdown={sampleBreakdown} />
          </div>
        </div>
      </div>
    </section>
  );
};
