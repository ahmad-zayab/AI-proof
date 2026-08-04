'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { UserProfile } from '@/types';
import styles from './QuizIntro.module.css';

interface QuizIntroProps {
  onStart: (profile: UserProfile) => void;
}

const TASK_OPTIONS = [
  { id: 'text_generation', label: 'Writing' },
  { id: 'data_analysis', label: 'Working with Numbers' },
  { id: 'visual_creation', label: 'Design & Visuals' },
  { id: 'people_management', label: 'Managing People' },
  { id: 'customer_interaction', label: 'Dealing with Customers' },
  { id: 'physical_labor', label: 'Hands-on Work' },
  { id: 'strategic_research', label: 'Research & Planning' }
];

const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Creative & Media',
  'Education',
  'Retail & E-commerce',
  'Manufacturing',
  'Professional Services',
  'Other'
];

export const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  const [profile, setProfile] = useState<UserProfile>({
    industry: 'Technology',
    primaryTasks: [],
    decisionAutonomy: 3,
    humanInteraction: 3,
    aiUsage: 3,
  });
  
  const [error, setError] = useState('');

  const handleTaskToggle = (taskId: string) => {
    setError('');
    setProfile(prev => {
      const isSelected = prev.primaryTasks.includes(taskId);
      if (isSelected) {
        return { ...prev, primaryTasks: prev.primaryTasks.filter(t => t !== taskId) };
      }
      if (prev.primaryTasks.length >= 3) {
        return prev;
      }
      return { ...prev, primaryTasks: [...prev.primaryTasks, taskId] };
    });
  };

  const handleStart = () => {
    if (profile.primaryTasks.length === 0) {
      setError('Please pick at least one thing you do at work.');
      return;
    }
    onStart(profile);
  };

  const isMaxTasksReached = profile.primaryTasks.length >= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={styles.container}
    >
      {/* Zone 1: Header — Title left, Industry dropdown right */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Tell Us About Your Work</h1>
          <p className={styles.subtitle}>
            Answer a few quick questions so we can pick the right quiz for you.
          </p>
        </div>
        <div className={styles.industrySelect}>
          <label className={styles.industryLabel}>Industry</label>
          <select
            value={profile.industry}
            onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
            className={styles.select}
          >
            {INDUSTRIES.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Zone 2: Task Pills — full width panel */}
      <div className={styles.tasksSection}>
        <div className={styles.panel}>
          <span className={styles.panelLabel}>What do you mostly do at work? (Pick up to 3)</span>
          <div className={styles.pillsContainer}>
            {TASK_OPTIONS.map(opt => {
              const isSelected = profile.primaryTasks.includes(opt.id);
              const isDisabled = !isSelected && isMaxTasksReached;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleTaskToggle(opt.id)}
                  className={`${styles.pill} ${isSelected ? styles.pillSelected : ''} ${isDisabled ? styles.pillDisabled : ''}`}
                  disabled={isDisabled}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Zone 3: Three sliders — each in its own panel */}
      <div className={styles.slidersRow}>
        <div className={styles.panel}>
          <span className={styles.panelLabel}>How much freedom do you have?</span>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="1" max="5" step="1"
              value={profile.decisionAutonomy}
              onChange={(e) => setProfile({ ...profile, decisionAutonomy: parseInt(e.target.value) })}
              className={styles.slider}
            />
            <div className={styles.sliderLabels}>
              <span>I follow rules</span>
              <span>I decide myself</span>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <span className={styles.panelLabel}>How much do you work with people?</span>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="1" max="5" step="1"
              value={profile.humanInteraction}
              onChange={(e) => setProfile({ ...profile, humanInteraction: parseInt(e.target.value) })}
              className={styles.slider}
            />
            <div className={styles.sliderLabels}>
              <span>Mostly alone</span>
              <span>Face-to-face all day</span>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <span className={styles.panelLabel}>Do you use AI tools at work?</span>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="1" max="5" step="1"
              value={profile.aiUsage}
              onChange={(e) => setProfile({ ...profile, aiUsage: parseInt(e.target.value) })}
              className={styles.slider}
            />
            <div className={styles.sliderLabels}>
              <span>Never</span>
              <span>All the time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Zone 4: Error + Start */}
      {error && <div className={styles.errorText}>{error}</div>}

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleStart}
        className={styles.button}
      >
        Start
      </Button>
    </motion.div>
  );
};
