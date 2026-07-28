export type Difficulty = 'JUNIOR' | 'MID' | 'SENIOR' | 'STAFF';

export type Category = 'REACT' | 'NODE' | 'SYSTEM_DESIGN' | 'JAVASCRIPT' | 'TYPESCRIPT';

export interface AssessmentQuestion {
  id: string;
  category: Category;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  timeLimitSeconds: number;
}

export interface CandidateResponse {
  questionId: string;
  selectedIndex: number;
  timeSpentSeconds: number;
}

export interface AssessmentResult {
  score: number;
  totalQuestions: number;
  accuracyPercentage: number;
  categoryBreakdown: Record<Category, { correct: number; total: number }>;
  passed: boolean;
}
