'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './AnimatedCounter.module.css';

export interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

// Easing function for smooth count up
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTime: number | null = null;
          
          const animate = (currentTime: number) => {
            if (startTime === null) {
              startTime = currentTime;
            }
            
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = easeOutExpo(progress);
            
            setCount(Math.floor(easedProgress * target));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  // Format with commas
  const formattedCount = new Intl.NumberFormat('en-US').format(count);

  return (
    <span ref={elementRef} className={`${styles.counter} ${className}`}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};
