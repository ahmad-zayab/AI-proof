'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '@/components/ui';
import { Question } from '@/types';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  question: Question;
  selectedAnswerId?: string;
  onSelect: (answerId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLastQuestion: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswerId,
  onSelect,
  onNext,
  onPrevious,
  canGoBack,
  isLastQuestion,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -40, opacity: 0 }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
        className={styles.container}
      >
        <div className={styles.questionWrapper}>
          <h2 className={styles.questionText}>{question.question}</h2>
        </div>

        <div className={styles.optionsGrid}>
          {question.options.map((answer: any, index: number) => (
            <div 
              key={index}
              onClick={() => onSelect(index.toString())}
              className={styles.optionWrapper}
            >
              <Card 
                variant="outline" 
                hoverable={true} 
                className={`${styles.optionCard} ${selectedAnswerId === index.toString() ? styles.selected : ''}`}
              >
                <div className={styles.optionContent}>
                  <div className={`${styles.radio} ${selectedAnswerId === index.toString() ? styles.radioSelected : ''}`} />
                  <span className={styles.answerText}>{answer.text}</span>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Button 
            variant="ghost" 
            onClick={onPrevious}
            disabled={!canGoBack}
            className={!canGoBack ? styles.hidden : ''}
          >
            Back
          </Button>
          
          <Button 
            variant="primary" 
            onClick={onNext}
            disabled={!selectedAnswerId}
          >
            {isLastQuestion ? 'Submit' : 'Next'}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
