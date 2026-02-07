# Valentine's Day Quiz - Architecture & Design Proposal

## 1. Folder & Component Structure

```
app/
├── layout.tsx                 # Root layout (minimal, just metadata)
├── page.tsx                   # Landing/start page
├── quiz/
│   ├── page.tsx              # Quiz container (orchestrates flow)
│   └── [questionId]/
│       └── page.tsx          # Individual question page (optional - see decision below)
└── result/
    └── page.tsx              # Result/letter display page

components/
├── quiz/
│   ├── QuizContainer.tsx     # Manages quiz state & navigation
│   ├── QuestionCard.tsx      # Individual question UI
│   ├── OptionButton.tsx      # Answer option button
│   └── ProgressIndicator.tsx # Shows "Question 2 of 5"
├── result/
│   ├── LoveLetter.tsx        # Main letter component
│   ├── DatePlan.tsx          # Embedded date plan section
│   ├── NonNegotiables.tsx    # Non-negotiables section
│   └── ShareButton.tsx       # Copy/share functionality
└── shared/
    ├── Button.tsx            # Reusable button component
    └── Card.tsx              # Reusable card wrapper

lib/
├── quiz/
│   ├── questions.ts          # Question definitions & options
│   ├── scoring.ts            # Answer → vibe mapping logic
│   └── types.ts              # TypeScript types for quiz data
└── results/
    ├── templates.ts          # Letter templates for each vibe
    └── generator.ts          # Dynamic letter generation logic

types/
└── index.ts                  # Shared TypeScript types

styles/
└── globals.css               # Global styles + Tailwind imports
```

### Design Decisions:

**Single-page quiz vs. multi-page:**
- **Decision:** Single-page quiz with state management
- **Rationale:** Simpler state management, smoother UX (no page transitions), easier to persist answers in URL params or localStorage if needed later. The `/quiz` route can be a single page that conditionally renders questions.

**Component separation:**
- **QuizContainer** handles state; **QuestionCard** is presentational
- **Rationale:** Separation of concerns makes testing easier and allows reusing QuestionCard in different contexts

**Result page separation:**
- **Decision:** Separate `/result` route
- **Rationale:** Clean URL for sharing, can be bookmarked, allows "Start Over" without losing result

---

## 2. Quiz Data Model

### Type Definitions

```typescript
// lib/quiz/types.ts

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
```

### Question Structure

```typescript
// lib/quiz/questions.ts

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: "What's your ideal way to unwind together?",
    options: [
      {
        id: 'q1-a1',
        text: "Cozy night in with blankets and movies",
        vibeScores: { 'low-key': 3, 'activity-driven': 0, 'big-gesture': 0 }
      },
      {
        id: 'q1-a2',
        text: "Trying something new together",
        vibeScores: { 'low-key': 0, 'activity-driven': 3, 'big-gesture': 1 }
      },
      {
        id: 'q1-a3',
        text: "A surprise that makes them feel special",
        vibeScores: { 'low-key': 0, 'activity-driven': 1, 'big-gesture': 3 }
      }
    ]
  },
  {
    id: 'q2',
    text: "How do you prefer to show love?",
    options: [
      {
        id: 'q2-a1',
        text: "Through quiet moments and presence",
        vibeScores: { 'low-key': 3, 'activity-driven': 0, 'big-gesture': 0 }
      },
      {
        id: 'q2-a2',
        text: "By doing things together",
        vibeScores: { 'low-key': 0, 'activity-driven': 3, 'big-gesture': 0 }
      },
      {
        id: 'q2-a3',
        text: "With thoughtful gestures and surprises",
        vibeScores: { 'low-key': 0, 'activity-driven': 1, 'big-gesture': 3 }
      }
    ]
  },
  // ... 3 more questions following same pattern
];
```

### Design Decisions:

**Weighted scoring system:**
- **Decision:** Each option contributes points to all three vibes (not exclusive)
- **Rationale:** Allows nuanced matching. Someone might score high on both "low-key" and "big-gesture" if they want a quiet but special evening. The highest total wins.

**Question count:**
- **Decision:** 5 questions (not 4)
- **Rationale:** Odd number provides better tie-breaking, gives more data points for accurate vibe detection

**Question topics (emotional, not logistical):**
- Focus on feelings, preferences, love languages
- Avoid: budget, location, time constraints
- Examples: "What makes you feel most connected?", "How do you prefer to celebrate?", "What's your ideal energy level?"

---

## 3. Result Model

### Type Definitions

```typescript
// lib/results/types.ts (or extend lib/quiz/types.ts)

export interface DatePlan {
  vibe: DateVibe;
  title: string;              // e.g., "A Cozy Evening Together"
  activities: string[];       // Array of activity descriptions
  timing: string;             // e.g., "Evening, starting around 6pm"
  atmosphere: string;         // Description of the vibe
}

export interface NonNegotiables {
  items: string[];           // e.g., ["Fresh flowers", "Phones away", "No work talk"]
}

export interface LoveLetter {
  greeting: string;          // Personalized opening
  body: string;              // Main letter content (includes date plan naturally)
  closing: string;           // Romantic closing
  dateStamp: string;         // "02/14"
  nonNegotiables: NonNegotiables;
  datePlan: DatePlan;
}
```

### Template Structure

```typescript
// lib/results/templates.ts

export const DATE_PLANS: Record<DateVibe, DatePlan> = {
  'low-key': {
    vibe: 'low-key',
    title: 'A Cozy Evening Together',
    activities: [
      'Home-cooked dinner (or favorite takeout)',
      'Curling up with blankets and a movie',
      'Sharing stories and quiet conversation'
    ],
    timing: 'Evening, starting around 6pm',
    atmosphere: 'Warm, intimate, and completely present with each other'
  },
  'activity-driven': {
    vibe: 'activity-driven',
    title: 'An Adventure Together',
    activities: [
      'Cooking class or trying a new recipe together',
      'Outdoor activity (hike, bike ride, or walk)',
      'Ending with a favorite restaurant or home-cooked meal'
    ],
    timing: 'Afternoon into evening',
    atmosphere: 'Energetic, collaborative, and full of shared experiences'
  },
  'big-gesture': {
    vibe: 'big-gesture',
    title: 'A Special Celebration',
    activities: [
      'Surprise reservation at a special restaurant',
      'Thoughtful gifts and handwritten notes',
      'Ending with a romantic activity (stargazing, rooftop, etc.)'
    ],
    timing: 'Evening, with surprises throughout',
    atmosphere: 'Romantic, memorable, and designed to make you feel cherished'
  }
};

export const NON_NEGOTIABLES: NonNegotiables = {
  items: [
    'Fresh flowers',
    'Phones away (except for photos)',
    'No work talk',
    'Dress up a little (even if staying in)',
    'Be fully present'
  ]
};
```

### Design Decisions:

**Fixed non-negotiables:**
- **Decision:** Same non-negotiables for all vibes
- **Rationale:** These are universal romantic principles, not vibe-specific. Keeps it simple and ensures core romantic elements are always included.

**Activity arrays:**
- **Decision:** 3 activities per plan
- **Rationale:** Enough to feel substantial, not overwhelming. Can be woven into narrative naturally.

**Template-based approach:**
- **Decision:** Pre-written templates, not AI-generated
- **Rationale:** User explicitly said "no AI", and templates ensure consistent quality and tone

---

## 4. Answer → Vibe Mapping Logic

### Scoring Algorithm

```typescript
// lib/quiz/scoring.ts

export function calculateVibeScores(
  answers: QuizAnswers,
  questions: Question[]
): VibeScore[] {
  const scores: Record<DateVibe, number> = {
    'low-key': 0,
    'activity-driven': 0,
    'big-gesture': 0
  };

  // Sum scores from each answered question
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const option = question.options.find(opt => opt.id === optionId);
    if (!option) return;

    // Add this option's scores to totals
    Object.entries(option.vibeScores).forEach(([vibe, score]) => {
      scores[vibe as DateVibe] += score;
    });
  });

  // Convert to array and sort by score (highest first)
  return Object.entries(scores)
    .map(([vibe, total]) => ({ vibe: vibe as DateVibe, total }))
    .sort((a, b) => b.total - a.total);
}

export function determineVibe(answers: QuizAnswers, questions: Question[]): DateVibe {
  const scores = calculateVibeScores(answers, questions);
  
  // Return the vibe with the highest score
  // If tied, prefer in order: low-key > activity-driven > big-gesture
  // (This is a design choice - you could also randomize or use first question as tiebreaker)
  
  const topScore = scores[0].total;
  const tiedVibes = scores.filter(s => s.total === topScore);
  
  if (tiedVibes.length === 1) {
    return tiedVibes[0].vibe;
  }
  
  // Tie-breaking logic
  const priorityOrder: DateVibe[] = ['low-key', 'activity-driven', 'big-gesture'];
  for (const vibe of priorityOrder) {
    if (tiedVibes.some(tv => tv.vibe === vibe)) {
      return vibe;
    }
  }
  
  return scores[0].vibe; // Fallback
}
```

### Design Decisions:

**Additive scoring:**
- **Decision:** Sum all option scores
- **Rationale:** Allows nuanced preferences. Multiple "low-key" answers accumulate, making the result more confident.

**Tie-breaking strategy:**
- **Decision:** Priority order (low-key → activity-driven → big-gesture)
- **Rationale:** Low-key is safest default (most universally comfortable). Could also use first question as tiebreaker (most important question).

**Score ranges:**
- **Decision:** 0-3 points per option per vibe
- **Rationale:** With 5 questions, max score is 15. Clear separation between vibes. Could adjust to 0-5 for more granularity if needed.

---

## 5. Dynamic Letter Generation

### Letter Template Structure

```typescript
// lib/results/generator.ts

interface LetterTemplate {
  greeting: (partnerName?: string) => string;
  body: (datePlan: DatePlan) => string;
  closing: string;
}

const LETTER_TEMPLATES: Record<DateVibe, LetterTemplate> = {
  'low-key': {
    greeting: () => "My Love,",
    body: (plan) => `
      This Valentine's Day, I want nothing more than to be completely present with you.
      No grand plans, no rushing around—just us, wrapped in the comfort of our own space.
      
      I'm thinking we'll ${plan.activities[0].toLowerCase()}, then ${plan.activities[1].toLowerCase()}.
      We can ${plan.activities[2].toLowerCase()}—those quiet moments when we're just us,
      talking about everything and nothing at all.
      
      The whole evening will be ${plan.atmosphere}. Just you and me, ${plan.timing}.
    `,
    closing: "All my love, always."
  },
  'activity-driven': {
    greeting: () => "My Love,",
    body: (plan) => `
      This Valentine's Day, I want us to create memories together. Not just sit and watch,
      but do something that brings us closer through shared experience.
      
      I'm planning for us to ${plan.activities[0].toLowerCase()}, then ${plan.activities[1].toLowerCase()}.
      After that, we'll ${plan.activities[2].toLowerCase()}.
      
      The whole day will be ${plan.atmosphere}, ${plan.timing}. I can't wait to see
      your face light up as we try something new together.
    `,
    closing: "Looking forward to our adventure together."
  },
  'big-gesture': {
    greeting: () => "My Dearest,",
    body: (plan) => `
      This Valentine's Day, I want to make you feel as special as you make me feel every day.
      You deserve to be celebrated, and I've planned something I hope will do just that.
      
      We'll start with ${plan.activities[0].toLowerCase()}, followed by ${plan.activities[1].toLowerCase()}.
      And because you deserve the world, we'll end with ${plan.activities[2].toLowerCase()}.
      
      The evening will be ${plan.atmosphere}, ${plan.timing}. This is my way of showing you
      how much you mean to me—through thoughtful moments designed just for us.
    `,
    closing: "Forever yours."
  }
};

export function generateLoveLetter(
  vibe: DateVibe,
  datePlan: DatePlan,
  nonNegotiables: NonNegotiables
): LoveLetter {
  const template = LETTER_TEMPLATES[vibe];
  
  return {
    greeting: template.greeting(),
    body: template.body(datePlan),
    closing: template.closing(),
    dateStamp: '02/14',
    nonNegotiables,
    datePlan
  };
}
```

### Design Decisions:

**Template-based generation:**
- **Decision:** Pre-written templates with variable insertion
- **Rationale:** Ensures consistent romantic tone, no AI needed, predictable quality. Activities are woven into narrative sentences, not bullet points.

**Natural language integration:**
- **Decision:** Activities embedded in flowing prose
- **Rationale:** Feels like a real love letter, not an itinerary. Uses phrases like "I'm thinking we'll..." and "After that, we'll..." to make it conversational.

**Vibe-specific tone:**
- **Decision:** Different greeting/closing per vibe
- **Rationale:** "My Dearest" for big-gesture feels more formal/romantic. "My Love" for low-key feels warmer. Closing phrases match energy level.

**Activity string manipulation:**
- **Decision:** Lowercase activities when inserting into sentences
- **Rationale:** Ensures grammatical flow. "we'll home-cooked dinner" reads better than "we'll Home-Cooked Dinner"

**Optional personalization:**
- **Decision:** `greeting` function accepts optional `partnerName`
- **Rationale:** Could extend later to ask for partner's name on landing page, making it "My Love, [Name]," for extra personalization

---

## Additional Design Considerations

### State Management
- **Decision:** React `useState` in `QuizContainer`
- **Rationale:** Simple, no external libraries needed. State lives in component, passed down as props.

### URL State (Optional Enhancement)
- **Consideration:** Store answers in URL search params
- **Benefit:** Shareable quiz state, refresh-safe, can bookmark mid-quiz
- **Implementation:** `useSearchParams` from Next.js, encode answers as `?q1=a1&q2=a2...`

### Result Persistence
- **Decision:** Store result in `sessionStorage` or URL params
- **Rationale:** Allows "Start Over" while keeping result accessible. URL params enable sharing result link.

### Accessibility
- **Considerations:**
  - Semantic HTML (`<form>`, `<fieldset>`, `<legend>`)
  - ARIA labels for progress indicator
  - Keyboard navigation (Tab through options, Enter to submit)
  - Focus management between questions

### Performance
- **No concerns:** Static content, minimal state, no API calls
- **Optimization opportunities:** Preload result templates, lazy load result page if needed

---

## Next Steps

1. Implement type definitions
2. Create question data structure
3. Build scoring logic
4. Write letter templates
5. Build UI components (starting with quiz flow)
6. Wire up state management
7. Style with Tailwind (romantic, soft palette)
8. Add share/copy functionality
