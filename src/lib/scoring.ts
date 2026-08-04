import { QuizResult, ScoreBreakdown, Question, UserProfile } from '@/types';
import { CATEGORIES } from './quiz-data';

// Helper to clamp scores between 0 and 100
const clamp = (val: number) => Math.max(0, Math.min(100, Math.round(val)));

// Simple string hash for URL integrity (not cryptographic, but much harder to spoof than modulo)
function simpleHash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0xFFFFFFFF;
  }
  return Math.abs(hash) % 1000000; // 6-digit hash
}

export function calculateScore(
  answers: Record<string, string>, 
  questions: Question[],
  profile: UserProfile | null = null
): QuizResult {
  
  let totalWeight = 0;
  let answeredCount = 0;

  const axes = [
    'ambiguity',
    'emotionalIntelligence',
    'strategicJudgment',
    'adaptability',
    'contextualNuance',
    'creativeSynthesis',
    'domainExpertise'
  ] as const;

  const breakdown: Partial<ScoreBreakdown> = {};

  const aut = profile ? profile.decisionAutonomy - 3 : 0; // -2 to +2
  const hum = profile ? profile.humanInteraction - 3 : 0;
  const aiu = profile ? profile.aiUsage - 3 : 0;

  questions.forEach((question, index) => {
    const axis = axes[index % 7];
    const answerIndexStr = answers[question.id];
    let weight = 0;
    
    if (answerIndexStr !== undefined) {
      const idx = parseInt(answerIndexStr, 10);
      const option = question.options[idx];
      if (option) {
        weight = option.ai_proof_weight;
        totalWeight += weight;
        answeredCount++;
      }
    }
    
    let score = weight * 100;

    // Apply subtle modifiers based on profile
    if (axis === 'ambiguity' || axis === 'strategicJudgment' || axis === 'domainExpertise') {
      score += aut * 5;
    } else if (axis === 'emotionalIntelligence' || axis === 'contextualNuance') {
      score += hum * 5;
    } else if (axis === 'adaptability' || axis === 'creativeSynthesis') {
      score += aiu * 5;
    }

    breakdown[axis] = clamp(score);
  });

  const avgWeight = answeredCount > 0 ? totalWeight / answeredCount : 0;
  const overallScore = Math.round(avgWeight * 100);

  let level: QuizResult['level'] = 'Critical Alert';
  if (overallScore >= 85) level = 'Highly AI-Proof';
  else if (overallScore >= 60) level = 'Moderately Safe';
  else if (overallScore >= 40) level = 'At Risk';

  return {
    overallScore,
    breakdown: breakdown as ScoreBreakdown,
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

  const checksum = simpleHash(scoresStr);
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

    if (simpleHash(s) !== parseInt(c, 10)) return null;

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
