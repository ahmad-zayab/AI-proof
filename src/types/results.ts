import { CategoryId, UserProfile } from './quiz';

export type ScoreBreakdown = Record<CategoryId, number>;

export interface QuizResult {
  overallScore: number;
  breakdown: ScoreBreakdown;
  level: "Highly AI-Proof" | "Moderately Safe" | "At Risk" | "Critical Alert";
  profile: UserProfile | null;
}
