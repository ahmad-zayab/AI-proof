import { QuizResult, ScoreBreakdown, Question, UserProfile } from '@/types';
import { CATEGORIES } from './quiz-data';

// Helper to clamp scores between 0 and 100
const clamp = (val: number) => Math.max(0, Math.min(100, Math.round(val)));

export function calculateScore(
  answers: Record<string, string>, 
  questions: Question[],
  profile: UserProfile | null = null
): QuizResult {
  
  let totalWeight = 0;
  let answeredCount = 0;

  Object.entries(answers).forEach(([questionId, answerIndexStr]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const idx = parseInt(answerIndexStr, 10);
    const option = question.options[idx];
    if (option) {
      totalWeight += option.ai_proof_weight;
      answeredCount++;
    }
  });

  // Calculate base score out of 100 (average of all answered ai_proof_weights)
  const avgWeight = answeredCount > 0 ? totalWeight / answeredCount : 0;
  const baseScore = avgWeight * 100;

  // Use profile factors (1-5) to adjust the base score into 7 categories
  // We center the factors around 3. If a factor is > 3, it's a bonus. If < 3, penalty.
  const aut = profile ? profile.decisionAutonomy - 3 : 0; // -2 to +2
  const hum = profile ? profile.humanInteraction - 3 : 0;
  const aiu = profile ? profile.aiUsage - 3 : 0;

  // Add some random noise (-5 to +5) so the chart looks organic
  const noise = () => (Math.random() * 10) - 5;

  const breakdown: ScoreBreakdown = {
    ambiguity: clamp(baseScore + (aut * 5) + noise()),
    emotionalIntelligence: clamp(baseScore + (hum * 6) + noise()),
    strategicJudgment: clamp(baseScore + (aut * 6) + noise()),
    adaptability: clamp(baseScore + (aiu * 5) + noise()),
    contextualNuance: clamp(baseScore + (hum * 5) + noise()),
    creativeSynthesis: clamp(baseScore + (aiu * 6) + noise()),
    domainExpertise: clamp(baseScore + (aut * 4) + noise()),
  };

  const overallScore = Math.round(baseScore);

  let level: QuizResult['level'] = 'Critical Alert';
  if (overallScore >= 85) level = 'Highly AI-Proof';
  else if (overallScore >= 60) level = 'Moderately Safe';
  else if (overallScore >= 40) level = 'At Risk';

  return {
    overallScore,
    breakdown,
    level,
    profile
  };
}

const CATEGORY_ORDER = CATEGORIES.map(c => c.id);

export function encodeResultsToUrl(result: QuizResult): string {
  const scoresStr = [
    Math.round(result.overallScore), 
    ...CATEGORY_ORDER.map(id => Math.round(result.breakdown[id as keyof ScoreBreakdown] || 0))
  ].join(',');
  
  const params = new URLSearchParams();
  params.set('s', scoresStr);
  
  if (result.profile) {
    // Safely encode JSON to base64, handling utf-8 characters properly
    const pStr = encodeURIComponent(JSON.stringify(result.profile));
    params.set('p', btoa(pStr));
  }

  const sum = scoresStr.split(',').reduce((acc, val) => acc + parseInt(val, 10), 0);
  const checksum = sum % 256;
  params.set('c', checksum.toString());

  const finalString = params.toString();
  // Base64 encode the entire payload for URL obfuscation
  return btoa(finalString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function decodeResultsFromUrl(encodedStr: string): QuizResult | null {
  try {
    let base64 = encodedStr.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const finalString = atob(base64);
    const params = new URLSearchParams(finalString);
    
    const s = params.get('s');
    const p = params.get('p');
    const c = params.get('c');

    if (!s || !c) return null;

    const sum = s.split(',').reduce((acc, val) => acc + parseInt(val, 10), 0);
    if (sum % 256 !== parseInt(c, 10)) return null;

    const scores = s.split(',').map(Number);
    const overallScore = scores[0];
    
    const breakdown: Partial<ScoreBreakdown> = {};
    CATEGORY_ORDER.forEach((id, index) => {
      breakdown[id as keyof ScoreBreakdown] = scores[index + 1];
    });

    let level: QuizResult['level'] = 'Critical Alert';
    if (overallScore >= 85) level = 'Highly AI-Proof';
    else if (overallScore >= 60) level = 'Moderately Safe';
    else if (overallScore >= 40) level = 'At Risk';
    
    let profile: UserProfile | null = null;
    if (p) {
      profile = JSON.parse(decodeURIComponent(atob(p)));
    }

    return {
      overallScore,
      breakdown: breakdown as ScoreBreakdown,
      level,
      profile
    };
  } catch (error) {
    return null;
  }
}
