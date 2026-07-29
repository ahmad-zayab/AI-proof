export type CategoryId = 
  | 'systemDesign' 
  | 'fundamentals' 
  | 'aiOrchestration' 
  | 'debugging' 
  | 'architecture' 
  | 'communication' 
  | 'domainExpertise';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  weight: number; // 0 to 1
}

export interface Answer {
  id: string;
  text: string;
  scoreMap: Record<CategoryId, number>;
}

export interface Question {
  id: string;
  categoryId: CategoryId;
  text: string;
  answers: Answer[];
}

export interface QuizState {
  currentStep: 'intro' | 'question' | 'calculating';
  currentQuestionIndex: number;
  answers: Record<string, string>; // questionId -> answerId
  experienceLevel: string | null;
  primaryRole: string | null;
}
