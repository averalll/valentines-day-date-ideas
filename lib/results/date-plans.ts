import { Tier } from '../quiz/types';
import { DATE_PLANS } from './plans';
import type { DatePlan } from '../quiz/types';

export { DATE_PLANS } from './plans';

/**
 * Get up to 3 plans for a given tier
 */
export function getPlansForTier(tier: Tier): DatePlan[] {
  return DATE_PLANS.filter((plan) => plan.tier === tier).slice(0, 3);
}

/**
 * Get a plan by id
 */
export function getPlanById(id: string): DatePlan | undefined {
  return DATE_PLANS.find((p) => p.id === id);
}

/**
 * Get all plans for a given tier
 */
export function getPlansByTier(tier: Tier): DatePlan[] {
  return DATE_PLANS.filter((p) => p.tier === tier);
}

/**
 * Get all plans whose tier is in the top tiers (for selection screen)
 * Shows all plan options for the user's top-scoring tiers
 */
export function getPlansForTopTiers(tiers: Tier[]): DatePlan[] {
  const tierSet = new Set(tiers);
  return DATE_PLANS.filter((p) => tierSet.has(p.tier));
}

/**
 * Get up to 3 plans per top tier (uses getPlansForTier for each)
 * Use when you want max 3 plans per tier = max 9 cards
 */
export function getPlansForTopTiersLimited(tiers: Tier[]): DatePlan[] {
  return tiers.flatMap((tier) => getPlansForTier(tier));
}
