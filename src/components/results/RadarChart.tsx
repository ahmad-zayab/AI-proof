'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScoreBreakdown, CategoryId } from '@/types';
import styles from './RadarChart.module.css';

interface RadarChartProps {
  breakdown: ScoreBreakdown;
}

// Ensure strict typing matching the CategoryId
const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'systemDesign', label: 'System Design' },
  { id: 'fundamentals', label: 'Fundamentals' },
  { id: 'aiOrchestration', label: 'AI Skills' },
  { id: 'debugging', label: 'Debugging' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'communication', label: 'Communication' },
  { id: 'domainExpertise', label: 'Domain' },
];

const RADIUS = 130; // Fits well within a 400px viewBox with room for labels

function getPoint(index: number, total: number, distance: number, radius: number) {
  // Start at top (-PI/2) and rotate clockwise
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = radius * (distance / 100);
  const x = r * Math.cos(angle);
  const y = r * Math.sin(angle);
  return { x, y };
}

export const RadarChart: React.FC<RadarChartProps> = ({ breakdown }) => {
  const levels = [33.33, 66.66, 100];
  const total = CATEGORIES.length;

  const scorePoints = CATEGORIES.map((cat, i) => {
    const score = breakdown[cat.id] || 0;
    const pt = getPoint(i, total, score, RADIUS);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <div className={styles.container}>
      {/* We use overflow: visible on SVG so labels don't get clipped if they extend slightly past the edge */}
      <svg viewBox="-200 -180 400 360" className={styles.svg}>
        {/* Background Guide Rings */}
        {levels.map((level) => {
          const points = CATEGORIES.map((_, i) => {
            const pt = getPoint(i, total, level, RADIUS);
            return `${pt.x},${pt.y}`;
          }).join(' ');
          return (
            <polygon 
              key={`ring-${level}`}
              points={points}
              className={styles.guideRing}
            />
          );
        })}

        {/* Axis Lines */}
        {CATEGORIES.map((_, i) => {
          const pt = getPoint(i, total, 100, RADIUS);
          return (
            <line 
              key={`axis-${i}`}
              x1="0" y1="0" 
              x2={pt.x} y2={pt.y} 
              className={styles.guideAxis}
            />
          );
        })}

        {/* Category Labels */}
        {CATEGORIES.map((cat, i) => {
          // Push labels 25% further out than the max radius
          const pt = getPoint(i, total, 125, RADIUS); 
          let anchor: "start" | "middle" | "end" = 'middle';
          
          // Smart anchoring based on the horizontal position of the point
          if (pt.x > 20) anchor = 'start';
          else if (pt.x < -20) anchor = 'end';
          
          return (
            <text 
              key={`label-${i}`}
              x={pt.x} 
              y={pt.y} 
              textAnchor={anchor} 
              dominantBaseline="middle" 
              className={styles.label}
            >
              {cat.label}
            </text>
          );
        })}

        {/* User Score Polygon (Animated) */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.1 }}
        >
          <polygon 
            points={scorePoints}
            className={styles.scorePolygon}
          />
          
          {/* Dots on the vertices */}
          {CATEGORIES.map((cat, i) => {
            const score = breakdown[cat.id] || 0;
            const pt = getPoint(i, total, score, RADIUS);
            return (
              <circle 
                key={`dot-${i}`}
                cx={pt.x} 
                cy={pt.y} 
                r="4.5" 
                className={styles.scoreDot}
              />
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
};
