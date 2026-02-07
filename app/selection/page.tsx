'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateTierScores, getWinningTier, convertAnswersToQuizAnswers } from '@/lib/quiz/scoring';
import { QuizAnswers } from '@/lib/quiz/types';
import { getPlansForTier } from '@/lib/results/date-plans';
import DatePlanSelection from '@/components/selection/DatePlanSelection';

/**
 * Selection Page
 * 
 * Flow: answers → scores → winning tier → options (max 3 plans)
 * User picks one plan → generate letter.
 * 
 * Data flow:
 * 1. Read quiz answers from sessionStorage
 * 2. Calculate tier scores
 * 3. Get winning tier (highest score)
 * 4. Get up to 3 plans for that tier
 * 5. Render options → user picks one → result page generates letter
 */
export default function SelectionPage() {
  const router = useRouter();
  const [topPlans, setTopPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get quiz answers from sessionStorage
    const storedAnswers = sessionStorage.getItem('quizAnswers');
    
    if (!storedAnswers) {
      // No answers found, redirect to quiz
      router.push('/quiz');
      return;
    }

    try {
      const answers: QuizAnswers = JSON.parse(storedAnswers);
      
      // Convert to QuizAnswer format
      const quizAnswers = convertAnswersToQuizAnswers(answers);
      
      // scores → winning tier → options (max 3 plans)
      const scores = calculateTierScores(quizAnswers);
      const tier = getWinningTier(scores);
      const options = getPlansForTier(tier);
      
      setTopPlans(options);
    } catch (error) {
      console.error('Error calculating top plans:', error);
      // Redirect to quiz on error
      router.push('/quiz');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-valentine-card-pink text-xl">Finding your perfect dates...</div>
      </div>
    );
  }

  if (topPlans.length === 0) {
    return null; // Will redirect
  }

  return <DatePlanSelection topPlans={topPlans} />;
}
