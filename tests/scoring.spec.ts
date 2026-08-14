import { describe, it, expect } from 'vitest';
import { calculateAssessmentResult } from '../src/lib/scoring';
import { AssessmentQuestion, CandidateResponse } from '../src/types/assessment';

describe('Assessment Scoring Engine', () => {
  const mockQuestions: AssessmentQuestion[] = [
    {
      id: 'q1',
      category: 'REACT',
      difficulty: 'MID',
      question: 'What is the primary benefit of React Server Components?',
      options: ['Client-side only', 'Zero-bundle-size on client', 'Replaces Redux', 'CSS auto-prefixing'],
      correctIndex: 1,
      explanation: 'Server components execute exclusively on the server and send zero JS bundle.',
      timeLimitSeconds: 60,
    },
    {
      id: 'q2',
      category: 'TYPESCRIPT',
      difficulty: 'SENIOR',
      question: 'What does the unknown type represent in TypeScript?',
      options: ['Same as any', 'Type-safe counterpart of any', 'Never returns', 'Only primitive values'],
      correctIndex: 1,
      explanation: 'unknown requires type narrowing or casting before performing operations.',
      timeLimitSeconds: 45,
    },
  ];

  it('should score 100% when all answers match correct indexes', () => {
    const responses: CandidateResponse[] = [
      { questionId: 'q1', selectedIndex: 1, timeSpentSeconds: 15 },
      { questionId: 'q2', selectedIndex: 1, timeSpentSeconds: 20 },
    ];

    const result = calculateAssessmentResult(mockQuestions, responses);
    expect(result.score).toBe(2);
    expect(result.accuracyPercentage).toBe(100);
    expect(result.passed).toBe(true);
  });

  it('should evaluate failed status when accuracy drops below threshold', () => {
    const responses: CandidateResponse[] = [
      { questionId: 'q1', selectedIndex: 0, timeSpentSeconds: 10 },
      { questionId: 'q2', selectedIndex: 1, timeSpentSeconds: 20 },
    ];

    const result = calculateAssessmentResult(mockQuestions, responses, 75);
    expect(result.score).toBe(1);
    expect(result.accuracyPercentage).toBe(50);
    expect(result.passed).toBe(false);
  });
});
