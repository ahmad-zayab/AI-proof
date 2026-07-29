import { CategoryId } from './quiz';

export type ScoreBreakdown = Record<CategoryId, number>;

export interface QuizResult {
  overallScore: number;
  breakdown: ScoreBreakdown;
  level: "Highly AI-Proof" | "Moderately Safe" | "At Risk" | "Critical Alert";
  experienceLevel: string | null;
  primaryRole: string | null;
}
