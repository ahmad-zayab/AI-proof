'use client';

import React, { useEffect, useState } from 'react';
import { AnimatedCounter, Badge } from '@/components/ui';
import styles from './ScoreGauge.module.css';

interface ScoreGaugeProps {
  score: number;
  level: "Highly AI-Proof" | "Moderately Safe" | "At Risk" | "Critical Alert" | string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, level }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth CSS transition on mount
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  let levelIcon = '';
  let subtext = '';
  let color = '';

  switch (level) {
    case 'Highly AI-Proof':
      levelIcon = '🛡️';
      subtext = 'AI is your co-pilot, not your replacement';
      color = 'var(--color-success)';
      break;
    case 'Moderately Safe':
      levelIcon = '📈';
      subtext = "You're adapting, but have gaps to fill";
      color = 'var(--color-primary)';
      break;
    case 'At Risk':
      levelIcon = '⚠️';
      subtext = 'Time to level up before AI catches up';
      color = 'var(--color-warning)';
      break;
    case 'Critical Alert':
    default:
      levelIcon = '🚨';
      subtext = 'Your current skillset is highly automatable';
      color = 'var(--color-danger)';
      break;
  }

  // SVG calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius; // 263.89
  const animatedScore = mounted ? score : 0;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className={styles.container}>
      <div className={styles.gaugeWrapper}>
        <svg viewBox="0 0 100 100" className={styles.svg}>
          {/* Background Ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="var(--color-surface-hover)"
            strokeWidth="10"
            fill="none"
          />
          {/* Foreground Animated Ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={styles.arc}
            transform="rotate(-90 50 50)"
          />
        </svg>

        <div className={styles.centerContent}>
          <div className={styles.scoreRow} style={{ color }}>
            <AnimatedCounter target={score} className={styles.scoreText} />
          </div>
          <div className={styles.maxScore}>/100</div>
        </div>
      </div>

      <div className={styles.levelContainer}>
        {/* We use a custom badge here to dynamically apply the exact color from our switch statement */}
        <div 
          className={styles.levelBadge}
          style={{ 
            backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
            color: color,
            border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`
          }}
        >
          {level} {levelIcon}
        </div>
        <p className={styles.subtext}>{subtext}</p>
      </div>
    </div>
  );
};
