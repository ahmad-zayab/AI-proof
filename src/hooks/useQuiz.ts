import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuizState, UserProfile } from '@/types';
import { QUESTIONS, generateQuiz } from '@/lib/quiz-data';
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

  useEffect(() => {
    if (state.currentStep === 'calculating') {
      const timer = setTimeout(() => {
        const result = calculateScore(
          state.answers,
          state.questions,
          state.profile
        );
        const encodedData = encodeResultsToUrl(result);
        router.push(`/results?data=${encodedData}`);
      }, 2000); // 2 second delay to simulate "AI processing"

      return () => clearTimeout(timer);
    }
  }, [state, router]);

  const startQuiz = (profile: UserProfile) => {
    const generatedQuestions = generateQuiz(profile);
    setState(prev => ({
      ...prev,
      profile,
      questions: generatedQuestions,
      currentStep: 'question',
      currentQuestionIndex: 0,
      answers: {},
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
      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1;
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
