export type CategoryId = 
  | 'ambiguity' 
  | 'emotionalIntelligence' 
  | 'strategicJudgment' 
  | 'adaptability' 
  | 'contextualNuance' 
  | 'creativeSynthesis' 
  | 'domainExpertise';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  weight: number; // 0 to 1
}

export interface Answer {
  text: string;
  ai_proof_weight: number; // 0.0 to 1.0
}

export interface Question {
  id: string;
  question: string;
  options: Answer[];
}

export interface UserProfile {
  industry: string;
  primaryTasks: string[];
  decisionAutonomy: number;
  humanInteraction: number;
  aiUsage: number;
}

export interface QuizState {
  currentStep: 'intro' | 'question' | 'calculating';
  currentQuestionIndex: number;
  answers: Record<string, string>; // questionId -> answerId
  profile: UserProfile | null;
  questions: Question[];
}
