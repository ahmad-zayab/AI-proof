'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './BuyMeCoffeeWidget.module.css';

export interface BuyMeCoffeeWidgetProps {
  href?: string;
}

export const BuyMeCoffeeWidget: React.FC<BuyMeCoffeeWidgetProps> = ({
  href = '#',
}) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 2s delay for subtle entrance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Hide on quiz pages
  if (pathname?.startsWith('/quiz')) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.widget} ${isVisible ? styles.visible : ''}`}
      aria-label="Buy me a coffee"
    >
      <span className={styles.text}>Support this project</span>
    </a>
  );
};
