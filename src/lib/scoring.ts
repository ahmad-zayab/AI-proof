import { AssessmentQuestion, CandidateResponse, AssessmentResult, Category } from '../types/assessment';

export function calculateAssessmentResult(
  questions: AssessmentQuestion[],
  responses: CandidateResponse[],
  passingThreshold = 70
): AssessmentResult {
  const categoryMap: Record<Category, { correct: number; total: number }> = {
    REACT: { correct: 0, total: 0 },
    NODE: { correct: 0, total: 0 },
    SYSTEM_DESIGN: { correct: 0, total: 0 },
    JAVASCRIPT: { correct: 0, total: 0 },
    TYPESCRIPT: { correct: 0, total: 0 },
  };

  let correctCount = 0;

  for (const q of questions) {
    if (categoryMap[q.category]) {
      categoryMap[q.category].total += 1;
    }

    const response = responses.find((r) => r.questionId === q.id);
    if (response && response.selectedIndex === q.correctIndex) {
      correctCount += 1;
      if (categoryMap[q.category]) {
        categoryMap[q.category].correct += 1;
      }
    }
  }

  const accuracy = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;

  return {
    score: correctCount,
    totalQuestions: questions.length,
    accuracyPercentage: Math.round(accuracy * 10) / 10,
    categoryBreakdown: categoryMap,
    passed: accuracy >= passingThreshold,
  };
}
