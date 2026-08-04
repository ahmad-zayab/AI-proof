import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuizState, UserProfile } from '@/types';
import { generateQuiz } from '@/lib/quiz-data';
import { calculateScore, encodeResultsToUrl } from '@/lib/scoring';

const initialState: QuizState = {
  currentStep: 'intro',
  currentQuestionIndex: 0,
  answers: {},
  profile: null,
  questions: [],
};

export function useQuiz() {
  const [state, setState] = useState<QuizState>(initialState);
  const router = useRouter();

  // On mount, check if we have saved state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('quiz_state');
      if (saved) {
        try {
          setState(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse quiz_state', e);
        }
      }
    }
  }, []);

  // Helper to update state (sessionStorage sync handled by useEffect below)
  const setQuizState = (updater: React.SetStateAction<QuizState>) => {
    setState(updater);
  };

  // Sync state to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && state.currentStep !== 'intro') {
      sessionStorage.setItem('quiz_state', JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    if (state.currentStep === 'calculating') {
      const timer = setTimeout(() => {
        const result = calculateScore(
          state.answers,
          state.questions,
          state.profile
        );
        const encodedData = encodeResultsToUrl(result);
        
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('quiz_state');
        }
        
        router.push(`/results?data=${encodedData}`);
      }, 2000); // 2 second delay to simulate "AI processing"

      return () => clearTimeout(timer);
    }
  }, [state, router]);

  const startQuiz = (profile: UserProfile) => {
    const generatedQuestions = generateQuiz(profile);
    
    if (generatedQuestions.length === 0) {
      console.error('Quiz generation failed: no questions returned');
      // Stay on intro and don't transition to a broken state
      return;
    }
    
    setQuizState(prev => ({
      ...prev,
      profile,
      questions: generatedQuestions,
      currentStep: 'question',
      currentQuestionIndex: 0,
      answers: {},
    }));
  };

  const answerQuestion = (questionId: string, answerId: string) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answerId,
      },
    }));
  };

  const nextQuestion = () => {
    setQuizState(prev => {
      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1;
      return {
        ...prev,
        currentStep: isLastQuestion ? 'calculating' : 'question',
        currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
      };
    });
  };

  const previousQuestion = () => {
    setQuizState(prev => {
      if (prev.currentQuestionIndex > 0) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
        };
      }
      return {
        ...prev,
        currentStep: 'intro',
      };
    });
  };
  
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;

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
