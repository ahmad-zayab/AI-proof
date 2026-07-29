import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuizState } from '@/types';
import { QUESTIONS } from '@/lib/quiz-data';
import { calculateScore, encodeResultsToUrl } from '@/lib/scoring';

const initialState: QuizState = {
  currentStep: 'intro',
  currentQuestionIndex: 0,
  answers: {},
  experienceLevel: null,
  primaryRole: null,
};

export function useQuiz() {
  const [state, setState] = useState<QuizState>(initialState);
  const router = useRouter();

  // Handle the 'calculating' phase with a simulated delay for better UX
  useEffect(() => {
    if (state.currentStep === 'calculating') {
      const timer = setTimeout(() => {
        const result = calculateScore(
          state.answers,
          QUESTIONS,
          state.experienceLevel,
          state.primaryRole
        );
        const encodedData = encodeResultsToUrl(result);
        router.push(`/results?data=${encodedData}`);
      }, 2000); // 2 second delay to simulate "AI processing"

      return () => clearTimeout(timer);
    }
  }, [state, router]);

  const startQuiz = (experience: string, role: string) => {
    setState(prev => ({
      ...prev,
      experienceLevel: experience,
      primaryRole: role,
      currentStep: 'question',
      currentQuestionIndex: 0,
    }));
  };

  const answerQuestion = (questionId: string, answerId: string) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answerId,
      },
    }));
  };

  const nextQuestion = () => {
    setState(prev => {
      const isLastQuestion = prev.currentQuestionIndex >= QUESTIONS.length - 1;
      return {
        ...prev,
        currentStep: isLastQuestion ? 'calculating' : 'question',
        currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
      };
    });
  };

  const previousQuestion = () => {
    setState(prev => {
      if (prev.currentQuestionIndex > 0) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
        };
      }
      // If going back on the first question, return to the intro screen
      return {
        ...prev,
        currentStep: 'intro',
      };
    });
  };
  
  const currentQuestion = QUESTIONS[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === QUESTIONS.length - 1;

  return {
    state,
    currentQuestion,
    isLastQuestion,
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
  };
}
