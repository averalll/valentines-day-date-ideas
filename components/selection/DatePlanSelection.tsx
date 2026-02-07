'use client';

import React, { useState } from 'react';
import { DatePlan } from '@/lib/quiz/types';
import { beauRivage } from '@/lib/fonts';
import DatePlanCard from './DatePlanCard';

interface DatePlanSelectionProps {
  topPlans: DatePlan[];
}

/**
 * DatePlanSelection Component
 * 
 * Screen where user chooses from top 3 date plans.
 * 
 * Flow:
 * 1. Display all 3 plans as cards
 * 2. User selects one (visual feedback)
 * 3. "Continue" button appears
 * 4. Navigate to result page with selected vibe
 * 
 * Design decisions:
 * - Show all 3 plans (even if scores are close)
 * - Single selection (radio-style, not multi-select)
 * - Rank badges help user understand scoring
 * - Continue button only appears after selection
 * 
 * Tradeoffs:
 * - Always 3 vs. variable count: Simpler UI, consistent layout
 * - Rank badges: Helpful context but might create bias
 * - Required selection: Forces engagement, but adds friction
 */
export default function DatePlanSelection({ topPlans }: DatePlanSelectionProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const handleContinue = () => {
    if (!selectedPlanId) return;
    window.location.href = `/result?planId=${encodeURIComponent(selectedPlanId)}`;
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className={`text-4xl md:text-5xl ${beauRivage.className} text-valentine-cream mb-4`}>
            Choose Your Perfect Date
          </h1>
          <p className="text-lg md:text-xl text-valentine-cream">
            Based on your answers, here are date ideas that match your vibe. Pick the one that feels right for you.
          </p>
        </div>

        {/* Plan cards */}
        <div className="space-y-6 pb-24">
          {topPlans.map((plan, index) => (
            <DatePlanCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlanId === plan.id}
              onClick={() => handlePlanSelect(plan.id)}
              rank={index + 1}
            />
          ))}
        </div>
      </div>

      {/* Floating overlay CTA - fixed at bottom when option selected */}
      {selectedPlanId && (
        <div
          className="fixed bottom-0 left-0 right-0 pt-6 pb-8 px-4 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(103, 0, 1, 1) 0%, rgba(103, 0, 1, 0.3) 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto flex justify-center pointer-events-auto">
            <button
              onClick={handleContinue}
              className="px-8 py-6 rounded-full font-medium text-xl bg-[#FFCAC0] text-valentine-dark-red hover:opacity-90 active:scale-95 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            >
              Create your letter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
