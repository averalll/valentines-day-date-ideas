import { Tier } from './types';

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    label: string;
    tier: Tier;
    points: number;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "vibe",
    question: "How do you want Valentine's Day to feel?",
    options: [
      { id: "calm", label: "Easy-going, calm, and comfortable", tier: "LOW_KEY", points: 3 },
      { id: "fun", label: "Fun, playful, doing something together", tier: "ACTIVITY", points: 3 },
      { id: "special", label: "Special, a little extra, movie-scene energy", tier: "BIG", points: 3 },
    ],
  },
  {
    id: "effort",
    question: "How much time do you have to plan this? (based on your schedule)",
    options: [
      { id: "easy", label: "Short notice, keep it simple", tier: "LOW_KEY", points: 2 },
      { id: "together", label: "Some time to plan, nothing rushed", tier: "ACTIVITY", points: 2 },
      { id: "memorable", label: "Plenty of time, let's go all out", tier: "BIG", points: 2 },
    ],
  },
  {
    id: "place",
    question: "Where do you imagine spending most of the time?",
    options: [
      { id: "home", label: "At home", tier: "LOW_KEY", points: 2 },
      { id: "out", label: "Stepping out for a bit", tier: "ACTIVITY", points: 1 },
      { id: "away", label: "Somewhere else entirely", tier: "BIG", points: 2 },
    ],
  },
  {
    id: "connection",
    question: "What sounds more like you both? (connection style)",
    options: [
      { id: "relax", label: "Talking, chilling, just being together", tier: "LOW_KEY", points: 2 },
      { id: "build", label: "Doing something with your hands (cook, games, build)", tier: "ACTIVITY", points: 2 },
      { id: "dress", label: "Dressing up, making it feel like an occasion", tier: "BIG", points: 2 },
    ],
  },
];
