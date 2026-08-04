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

// Runtime validation: filter out any malformed questions
function validateQuestions(questions: Question[]): Question[] {
  return questions.filter(q => {
    if (!q.id || !q.question || !Array.isArray(q.options)) return false;
    if (q.options.length < 2) return false;
    return q.options.every(opt => 
      typeof opt.text === 'string' && 
      typeof opt.ai_proof_weight === 'number' && 
      !isNaN(opt.ai_proof_weight)
    );
  });
}

export function generateQuiz(profile: UserProfile): Question[] {
  const TARGET_TOTAL = 7;
  const TARGET_UNIVERSAL = 3;
  const TARGET_TASK = 4;

  // 1. Get universal questions
  const allUniversal = validateQuestions((questionBank.universal_core as unknown) as Question[]);
  const shuffledUniversal = shuffleArray(allUniversal);
  const universalQuestions = shuffledUniversal.slice(0, TARGET_UNIVERSAL);

  // 2. Get task-specific questions
  const allTaskSpecific = (questionBank.task_specific as unknown) as Record<string, Question[]>;
  
  // Validate all task-specific questions
  const sanitizedTaskSpecific: Record<string, Question[]> = {};
  Object.entries(allTaskSpecific).forEach(([key, questions]) => {
    sanitizedTaskSpecific[key] = validateQuestions(questions);
  });

  let availableTaskQuestions: Question[] = [];

  // Use the user's selected primary tasks if available
  if (profile.primaryTasks && profile.primaryTasks.length > 0) {
    profile.primaryTasks.forEach(taskCategory => {
      if (sanitizedTaskSpecific[taskCategory]) {
        availableTaskQuestions = [...availableTaskQuestions, ...sanitizedTaskSpecific[taskCategory]];
      }
    });
  }

  // Fallback: If not enough task questions, pool ALL task questions
  if (availableTaskQuestions.length < TARGET_TASK) {
    Object.values(sanitizedTaskSpecific).forEach(categoryQuestions => {
      availableTaskQuestions = [...availableTaskQuestions, ...categoryQuestions];
    });
    // Remove duplicates
    availableTaskQuestions = Array.from(new Set(availableTaskQuestions));
  }

  const taskQuestions = shuffleArray(availableTaskQuestions).slice(0, TARGET_TASK);

  // 3. Combine
  let combined = [...universalQuestions, ...taskQuestions];

  // 4. If we STILL don't have enough (edge case), pad with extra universal questions
  if (combined.length < TARGET_TOTAL) {
    const usedIds = new Set(combined.map(q => q.id));
    const extraUniversal = shuffledUniversal.filter(q => !usedIds.has(q.id));
    const needed = TARGET_TOTAL - combined.length;
    combined = [...combined, ...extraUniversal.slice(0, needed)];
  }

  // 5. Shuffle so universal ones aren't always first
  return shuffleArray(combined);
}
