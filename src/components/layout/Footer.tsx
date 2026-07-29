'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide on quiz pages
  if (pathname?.startsWith('/quiz')) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Column 1 */}
        <div className={styles.col}>
          <div className={styles.brand}>AI-Proof Engineer</div>
          <p className={styles.tagline}>Find out if your skills are AI-proof</p>
        </div>

        {/* Column 2 */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linkList} role="list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/quiz">Quiz</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Support This Project</h4>
          <ul className={styles.linkList} role="list">
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">Buy Me a Coffee</a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X</a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>© 2026 AI-Proof Engineer. Built with ☕ and curiosity.</p>
        </div>
      </div>
    </footer>
  );
};
