'use client';

import React from 'react';
import { motion, useScroll } from 'framer-motion';
import styles from './BlogPost.module.css';

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={styles.progressBar}
      style={{ scaleX: scrollYProgress }}
    />
  );
}
