'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '@/hooks/useQuiz';
import { QuizIntro, QuestionCard, QuizProgress, QuizComplete } from '@/components/quiz';
import { QUESTIONS } from '@/lib/quiz-data';

export default function QuizPage() {
  const {
    state,
    currentQuestion,
    isLastQuestion,
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
  } = useQuiz();

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
      <AnimatePresence mode="wait">
        {state.currentStep === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <QuizIntro onStart={startQuiz} />
          </motion.div>
        )}

        {state.currentStep === 'question' && currentQuestion && (
          <motion.div
            key="question-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <QuizProgress 
              current={state.currentQuestionIndex + 1} 
              total={QUESTIONS.length} 
            />
            {/* The QuestionCard manages its own horizontal sliding AnimatePresence based on question.id */}
            <QuestionCard
              question={currentQuestion}
              selectedAnswerId={state.answers[currentQuestion.id]}
              onSelect={(answerId) => answerQuestion(currentQuestion.id, answerId)}
              onNext={nextQuestion}
              onPrevious={previousQuestion}
              canGoBack={true}
              isLastQuestion={isLastQuestion}
            />
          </motion.div>
        )}

        {state.currentStep === 'calculating' && (
          <motion.div
            key="calculating"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <QuizComplete />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
