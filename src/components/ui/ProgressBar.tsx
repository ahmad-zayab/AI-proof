import React from 'react';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  value: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  animated?: boolean;
  height?: 'sm' | 'md';
  ariaLabel: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = 'primary',
  showLabel = false,
  animated = true,
  height = 'sm',
  ariaLabel,
  className = '',
}) => {
  // Ensure value is strictly between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`${styles.container} ${className}`}>
      <div 
        className={`${styles.track} ${styles[`height-${height}`]}`}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`
            ${styles.fill} 
            ${styles[variant]} 
            ${animated ? styles.animated : ''}
          `}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>{Math.round(clampedValue)}%</span>
      )}
    </div>
  );
};
