import React from 'react';
import { Metadata } from 'next';
import { Card, Button } from '@/components/ui';
import { Coffee } from 'lucide-react';
import styles from './About.module.css';

export const metadata: Metadata = {
  title: 'About | AI-Proof Engineer',
  description: 'Why I built AI-Proof Engineer: A response to the anxiety in the developer community.',
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Why I Built AI-Proof Engineer</h1>
      
      <div className={styles.content}>
        <p>
          If you've spent any time on programming forums or social media lately, you've seen it: 
          the pervasive, looming anxiety that our jobs are about to be automated away by the next iteration of an LLM.
        </p>
        <p>
          I felt it too. It’s hard not to when you see an AI generate a fully functional React application in seconds—something 
          that used to take a junior developer a week to build. The doomerism is loud, and the grifters selling 
          "Prompt Engineering" courses are even louder. 
        </p>
        <p>
          But after spending months deeply integrating these tools into my own engineering workflows, I realized something important: 
          <strong> AI isn't going to replace software engineers. It's going to replace <em>coders</em>.</strong>
        </p>
        <p>
          I built AI-Proof Engineer because I was tired of the paralyzing fear-mongering. I wanted a place that offered 
          actionable, realistic advice on how to adapt. Our industry is simply shifting its abstraction layer. We are moving from 
          typing syntax to orchestrating systems. 
        </p>
      </div>

      <Card variant="glass" hoverable className={styles.philosophyCard}>
        <h2 className={styles.philosophyTitle}>The Philosophy</h2>
        <ul className={styles.philosophyList}>
          <li>
            <strong>Code is cheap, architecture is expensive.</strong> Anyone can generate a function. Very few can design a distributed system that scales gracefully and fulfills the business context.
          </li>
          <li>
            <strong>Context is your moat.</strong> AI models don't know your business constraints, your runway, or your team's skill level. You do.
          </li>
          <li>
            <strong>Adaptation over memorization.</strong> Knowing every flag in a CLI tool is no longer impressive. Knowing how to quickly validate an AI's proposed architecture is.
          </li>
        </ul>
      </Card>

      <div className={styles.supportSection}>
        <h3>Find this valuable?</h3>
        <p>This project is completely free. If it helped you navigate your career or learn something new, consider buying me a coffee!</p>
        <a href="https://buymeacoffee.com/aiproofengineer" target="_blank" rel="noopener noreferrer">
          <Button variant="primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Coffee size={18} /> Buy Me a Coffee
          </Button>
        </a>
      </div>
    </div>
  );
}
