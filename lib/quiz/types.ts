export type Tier = "LOW_KEY" | "ACTIVITY" | "BIG";

export type QuizAnswer = {
  questionId: string;
  optionId: string;
  tier: Tier;
  points: number;
};

export type TierScores = Record<Tier, number>;

/** Letter content owned by each plan. 1 plan = 1 letter. */
export type PlanLetter = {
  opening: string;
  body: string;
  closing: string;
};

export type DatePlan = {
  id: string;
  tier: Tier;
  title: string;
  steps: string[];
  letter: PlanLetter;
};

// Legacy types for backward compatibility during migration
export type DateVibe = 'low-key' | 'activity-driven' | 'big-gesture';

export type QuestionId = 'q1' | 'q2' | 'q3' | 'q4' | 'q5';

export interface QuestionOption {
  id: string;
  text: string;
  vibeScores: {
    'low-key': number;
    'activity-driven': number;
    'big-gesture': number;
  };
}

export interface Question {
  id: QuestionId;
  text: string;
  options: QuestionOption[];
}

export interface QuizAnswers {
  [questionId: string]: string; // Maps questionId → optionId
}

export interface VibeScore {
  vibe: DateVibe;
  total: number;
}
