import { Tier, TierScores, QuizAnswer } from './types';
import { QUIZ_QUESTIONS, QuizQuestion } from './questions';

/**
 * Calculate tier scores from quiz answers
 * 
 * Uses reduce to sum points for each tier
 */
export function calculateTierScores(answers: QuizAnswer[]): TierScores {
  return answers.reduce<TierScores>(
    (acc, ans) => {
      acc[ans.tier] += ans.points;
      return acc;
    },
    { LOW_KEY: 0, ACTIVITY: 0, BIG: 0 }
  );
}

/**
 * Get the winning tier (highest score)
 * 
 * @param scores TierScores object
 * @returns The tier with the highest score
 */
export function getWinningTier(scores: TierScores): Tier {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted[0][0] as Tier;
}

/**
 * Get top N tiers based on scores
 * 
 * @param answers Array of QuizAnswer objects
 * @param count Number of top tiers to return (default: 3)
 * @returns Array of Tier values, sorted by score (highest first)
 */
export function getTopTiers(
  answers: QuizAnswer[],
  count: number = 3
): Tier[] {
  const scores = calculateTierScores(answers);
  
  // Convert to array and sort by score (highest first)
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]);
  
  // Return top N tiers
  return sorted
    .slice(0, count)
    .map(([tier]) => tier as Tier);
}

/**
 * Convert quiz answers from new format to QuizAnswer array
 * 
 * @param answers Object mapping questionId to optionId
 * @param questions Array of QuizQuestion objects
 * @returns Array of QuizAnswer objects
 */
export function convertAnswersToQuizAnswers(
  answers: Record<string, string>,
  questions: QuizQuestion[] = QUIZ_QUESTIONS
): QuizAnswer[] {
  const quizAnswers: QuizAnswer[] = [];
  
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    const option = question.options.find(opt => opt.id === optionId);
    if (!option) return;
    
    quizAnswers.push({
      questionId,
      optionId,
      tier: option.tier,
      points: option.points
    });
  });
  
  return quizAnswers;
}
