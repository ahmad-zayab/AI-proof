import { QuizResult, ScoreBreakdown, Question } from '@/types';
import { CATEGORIES } from './quiz-data';

export function calculateScore(
  answers: Record<string, string>, 
  questions: Question[],
  experienceLevel: string | null = null,
  primaryRole: string | null = null
): QuizResult {
  const categoryScores: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};

  // Initialize
  CATEGORIES.forEach(c => {
    categoryScores[c.id] = 0;
    categoryCounts[c.id] = 0;
  });

  // Calculate scores per category based strictly on the question's category
  Object.entries(answers).forEach(([questionId, answerId]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const answer = question.answers.find(a => a.id === answerId);
    if (!answer) return;

    // We only use the score mapping for the specific category the question tests
    const score = answer.scoreMap[question.categoryId];
    if (score !== undefined) {
      categoryScores[question.categoryId] += score;
      categoryCounts[question.categoryId] += 1;
    }
  });

  // Calculate breakdown (averaging if there are multiple questions per category)
  const breakdown: Partial<ScoreBreakdown> = {};
  CATEGORIES.forEach(c => {
    if (categoryCounts[c.id] > 0) {
      breakdown[c.id] = categoryScores[c.id] / categoryCounts[c.id];
    } else {
      breakdown[c.id] = 0; // Default if skipped or missing
    }
  });

  // Calculate weighted overall score
  let overallScore = 0;
  CATEGORIES.forEach(c => {
    overallScore += (breakdown[c.id] || 0) * c.weight;
  });

  overallScore = Math.round(overallScore);

  // Determine the safety level
  let level: QuizResult['level'] = 'Critical Alert';
  if (overallScore >= 85) level = 'Highly AI-Proof';
  else if (overallScore >= 60) level = 'Moderately Safe';
  else if (overallScore >= 40) level = 'At Risk';

  return {
    overallScore,
    breakdown: breakdown as ScoreBreakdown,
    level,
    experienceLevel,
    primaryRole
  };
}

// Consistent ordering to ensure our serialized array is always reconstructed correctly
const CATEGORY_ORDER = CATEGORIES.map(c => c.id);

export function encodeResultsToUrl(result: QuizResult): string {
  const scoresStr = [
    Math.round(result.overallScore), 
    ...CATEGORY_ORDER.map(id => Math.round(result.breakdown[id] || 0))
  ].join(',');
  
  const params = new URLSearchParams();
  params.set('s', scoresStr);
  if (result.experienceLevel) params.set('l', result.experienceLevel);
  if (result.primaryRole) params.set('r', result.primaryRole);

  // Simple checksum: sum of all scores modulo 256
  const sum = scoresStr.split(',').reduce((acc, val) => acc + parseInt(val, 10), 0);
  const checksum = sum % 256;
  params.set('c', checksum.toString());

  // URLSearchParams automatically encodes Unicode into safe ASCII (% encoding)
  const finalString = params.toString();
  
  // Base64 encode and convert to URL-safe base64 string
  return btoa(finalString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function decodeResultsFromUrl(encodedStr: string): QuizResult | null {
  try {
    // Revert URL-safe replacements
    let base64 = encodedStr.replace(/-/g, '+').replace(/_/g, '/');
    // Pad base64 appropriately
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const finalString = atob(base64);
    const params = new URLSearchParams(finalString);
    
    const s = params.get('s');
    const l = params.get('l');
    const r = params.get('r');
    const c = params.get('c');

    if (!s || !c) return null;

    // Verify Checksum
    const sum = s.split(',').reduce((acc, val) => acc + parseInt(val, 10), 0);
    if (sum % 256 !== parseInt(c, 10)) return null;

    const scores = s.split(',').map(Number);
    const overallScore = scores[0];
    
    const breakdown: Partial<ScoreBreakdown> = {};
    CATEGORY_ORDER.forEach((id, index) => {
      breakdown[id] = scores[index + 1];
    });

    let level: QuizResult['level'] = 'Critical Alert';
    if (overallScore >= 85) level = 'Highly AI-Proof';
    else if (overallScore >= 60) level = 'Moderately Safe';
    else if (overallScore >= 40) level = 'At Risk';

    return {
      overallScore,
      breakdown: breakdown as ScoreBreakdown,
      level,
      experienceLevel: l || null,
      primaryRole: r || null
    };
  } catch (error) {
    // Failsafe for modified/invalid base64 payloads
    return null;
  }
}
