import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  variant?: 'glass' | 'solid' | 'outline';
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  hoverable = false,
  padding = 'md',
  children,
  className = '',
}) => {
  const classNames = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    hoverable ? styles.hoverable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
};
