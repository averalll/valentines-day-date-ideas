import React from 'react';
import { DatePlan } from '@/lib/quiz/types';
import { beauRivage } from '@/lib/fonts';
import Card from '../shared/Card';

interface DatePlanCardProps {
  plan: DatePlan;
  isSelected: boolean;
  onClick: () => void;
  rank?: number; // 1, 2, or 3 for visual indicator
}

/**
 * DatePlanCard Component
 * 
 * Displays a single date plan option in the selection screen.
 * 
 * Design decisions:
 * - Large tap target (entire card is clickable)
 * - Visual selection state (border + background change)
 * - Rank indicator (subtle badge) shows which scored highest
 * - Activities shown as preview bullets (not full detail)
 * 
 * Tradeoffs:
 * - Full card click vs. separate button: Better mobile UX, simpler interaction
 * - Rank badge: Helps user understand scoring, but might bias selection
 */
export default function DatePlanCard({
  plan,
  isSelected,
  onClick,
  rank,
}: DatePlanCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer active:scale-[0.98] transition-transform duration-200"
    >
      <Card
        className={`
          transition-all duration-200
          ${isSelected 
            ? 'border border-[#FFCAC0] !bg-[#8C2739] shadow-md' 
            : 'border border-valentine-dark-red/50 hover:border-valentine-deep !bg-[#FFCAC0]'
          }
        `}
      >
      <div className="space-y-4">
        {/* Header with rank and title */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {rank === 1 && (
              <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-valentine-match-tag rounded-full mb-2 uppercase tracking-wide">
                #1 Match
              </span>
            )}
            <h3 className={`text-2xl md:text-3xl ${beauRivage.className} ${isSelected ? 'text-[#FFCAC0]' : 'text-valentine-dark-red'} mb-1`}>
              {plan.title}
            </h3>
          </div>
          {isSelected && (
            <div className="ml-4 flex-shrink-0 w-10 h-10 rounded-full bg-[#FFCAC0] border border-[#FFCAC0] flex items-center justify-center text-[#8C2739] text-lg">✓</div>
          )}
        </div>

        {/* Steps */}
        <div className={`pt-2 border-t ${isSelected ? 'border-[#FFCAC0]/40' : 'border-valentine-dark-red/30'}`}>
          <p className={`text-xs font-medium uppercase tracking-wide mb-2 ${isSelected ? 'text-[#FFCAC0]' : 'text-valentine-dark-red'}`}>
            Things you can do:
          </p>
          <ul className="space-y-2">
            {plan.steps.slice(0, 4).map((step, index) => (
              <li key={index} className={`text-sm flex items-start ${isSelected ? 'text-[#FFCAC0]' : 'text-valentine-dark-red'}`}>
                <span className={`mr-2 ${isSelected ? 'text-[#FFCAC0]/80' : 'text-valentine-deep'}`}>•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </Card>
    </div>
  );
}
