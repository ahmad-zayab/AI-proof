import { Category, Question, UserProfile } from '@/types';
import questionBank from './question-bank.json';

export const CATEGORIES: Category[] = [
  { id: 'ambiguity', name: 'Handling the Unknown', description: 'Dealing with confusing situations', weight: 0.15 },
  { id: 'emotionalIntelligence', name: 'People Skills', description: 'Understanding and working with people', weight: 0.15 },
  { id: 'strategicJudgment', name: 'Tough Choices', description: 'Making smart decisions under pressure', weight: 0.15 },
  { id: 'adaptability', name: 'Adaptability', description: 'Learning new things quickly', weight: 0.15 },
  { id: 'contextualNuance', name: 'Reading the Room', description: 'Understanding what is really going on', weight: 0.15 },
  { id: 'creativeSynthesis', name: 'Creative Thinking', description: 'Coming up with new ideas', weight: 0.15 },
  { id: 'domainExpertise', name: 'Expert Knowledge', description: 'Knowing your field inside and out', weight: 0.10 },
];

export const QUESTIONS: Question[] = []; // Deprecated, used for old statically imported components

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateQuiz(profile: UserProfile): Question[] {
  // 1. Get 3 random universal questions
  const allUniversal = (questionBank.universal_core as unknown) as Question[];
  const universalQuestions = shuffleArray(allUniversal).slice(0, 3);

  // 2. Get 4 random task-specific questions
  const allTaskSpecific = (questionBank.task_specific as unknown) as Record<string, Question[]>;
  let availableTaskQuestions: Question[] = [];

  // Use the user's selected primary tasks if available
  if (profile.primaryTasks && profile.primaryTasks.length > 0) {
    profile.primaryTasks.forEach(taskCategory => {
      if (allTaskSpecific[taskCategory]) {
        availableTaskQuestions = [...availableTaskQuestions, ...allTaskSpecific[taskCategory]];
      }
    });
  }

  // Fallback: If no valid tasks selected, or not enough questions, mix all of them
  if (availableTaskQuestions.length < 4) {
    Object.values(allTaskSpecific).forEach(categoryQuestions => {
      availableTaskQuestions = [...availableTaskQuestions, ...categoryQuestions];
    });
    // Remove duplicates
    availableTaskQuestions = Array.from(new Set(availableTaskQuestions));
  }

  const taskQuestions = shuffleArray(availableTaskQuestions).slice(0, 4);

  // 3. Combine and shuffle so the universal ones aren't always first
  return shuffleArray([...universalQuestions, ...taskQuestions]);
}
