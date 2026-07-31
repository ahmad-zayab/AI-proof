'use client';

import React, { useState } from 'react';
import { Card, Button } from '@/components/ui';
import styles from './ShareCard.module.css';

interface ShareCardProps {
  score: number;
  level: string;
}

export const ShareCard: React.FC<ShareCardProps> = ({ score, level }) => {
  const [copied, setCopied] = useState(false);

  const handleTwitter = () => {
    const text = encodeURIComponent(`I scored ${score}/100 on the AI Proof quiz! My level: ${level}. Are you AI-proof?`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card variant="glass" className={styles.card}>
      <h3 className={styles.title}>Share your results</h3>
      <p className={styles.subtext}>See how your score compares with others.</p>
      
      <div className={styles.buttonGroup}>
        <Button variant="primary" className={styles.twitterBtn} onClick={handleTwitter}>
          <span className={styles.icon}>𝕏</span> Share on X
        </Button>
        <Button variant="primary" className={styles.linkedinBtn} onClick={handleLinkedIn}>
          <span className={styles.icon}>in</span> Share on LinkedIn
        </Button>
        <Button variant="secondary" onClick={handleCopy} className={styles.copyBtn}>
          {copied ? '✓ Copied!' : 'Copy Link'}
        </Button>
      </div>
      
      <p className={styles.footerText}>
        Each share generates a unique preview card with your score.
      </p>
    </Card>
  );
};
