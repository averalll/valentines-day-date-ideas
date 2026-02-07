# Data Models & Architecture

## Overview

The Valentine's Day quiz uses a scoring-based system that presents users with top 3 date plans, then generates a personalized love letter based on their selection.

---

## 1. Quiz Questions Data Model

### Structure
```typescript
interface Question {
  id: QuestionId;           // 'q1' | 'q2' | 'q3' | 'q4' | 'q5'
  text: string;             // Question text
  options: QuestionOption[]; // 3-4 answer options
}

interface QuestionOption {
  id: string;               // Unique option ID
  text: string;             // Option text
  vibeScores: {             // Points contributed to each vibe
    'low-key': number;      // 0-3 points
    'activity-driven': number;
    'big-gesture': number;
  };
}
```

### Design Decisions

**Weighted scoring per option:**
- Each option contributes 0-3 points to all three vibes
- Allows nuanced matching (e.g., "low-key but special" = high low-key + medium big-gesture)
- **Tradeoff:** More complex than exclusive mapping, but enables better personalization

**Score range (0-3):**
- With 5 questions, max score per vibe = 15
- Clear separation between vibes
- **Tradeoff:** Could use 0-5 for more granularity, but 0-3 is sufficient

---

## 2. Date Plans Data Model

### Structure
```typescript
interface DatePlan {
  vibe: DateVibe;           // 'low-key' | 'activity-driven' | 'big-gesture'
  title: string;            // "Cozy Evening In"
  tagline: string;          // "Comfort, presence, and just being together"
  description: string;       // 2-3 sentence summary
  activities: string[];      // 3-4 preview activities
}
```

### Design Decisions

**Separate from letter templates:**
- DatePlan = selection screen data (preview)
- LetterTemplate = result screen data (full letter)
- **Tradeoff:** Some duplication, but clearer separation of concerns

**Activities as preview:**
- Shows 3-4 key activities, not full itinerary
- Full details are in the letter template
- **Tradeoff:** Less detail upfront, but cleaner selection screen

**Tagline for quick scanning:**
- One-line emotional hook
- Helps users quickly understand the vibe
- **Tradeoff:** Extra field to maintain, but improves UX

---

## 3. Scoring Logic

### Algorithm

```typescript
function calculateVibeScores(answers, questions):
  1. Initialize scores: { low-key: 0, activity-driven: 0, big-gesture: 0 }
  2. For each answered question:
     - Find the selected option
     - Add option.vibeScores to totals
  3. Return sorted array (highest first)
```

### Top 3 Selection

```typescript
function getTopVibes(answers, count = 3):
  1. Calculate all vibe scores
  2. Sort by total (highest first)
  3. Return top N vibes
```

### Design Decisions

**Always return top 3:**
- No minimum score threshold
- Even if scores are tied or low, show all 3
- **Tradeoff:** User might see options they don't like, but gives them full choice

**No filtering:**
- Simpler logic than threshold-based filtering
- User choice is the final filter
- **Tradeoff:** Less "smart" but more transparent

**Maintain score order:**
- Rank badges (#1, #2, #3) show scoring
- Helps user understand why these were selected
- **Tradeoff:** Might bias selection, but provides helpful context

---

## 4. State Flow

### Quiz Flow
```
1. User answers questions
   → answers stored in React state
   
2. Last question answered
   → Store answers in sessionStorage
   → Navigate to /selection
   
3. Selection page loads
   → Read answers from sessionStorage
   → Calculate top 3 vibes
   → Convert to DatePlan objects
   → Display selection screen
   
4. User selects plan
   → Store selectedVibe in sessionStorage
   → Navigate to /result
   
5. Result page loads
   → Read selectedVibe from sessionStorage
   → Generate letter for that vibe
   → Display letter + non-negotiables
```

### SessionStorage Keys
- `quizAnswers`: JSON string of QuizAnswers object
- `selectedVibe`: DateVibe string ('low-key' | 'activity-driven' | 'big-gesture')

### Design Decisions

**SessionStorage vs. URL params:**
- SessionStorage: Cleaner URLs, simpler state management
- **Tradeoff:** Not shareable/bookmarkable, but simpler for this use case

**Separate selection step:**
- Adds user agency (they choose, not algorithm)
- **Tradeoff:** Extra step adds friction, but improves satisfaction

**Non-negotiables separate:**
- Not embedded in letter text
- Shown as separate card below letter
- **Tradeoff:** Less integrated, but clearer and easier to scan

---

## 5. Component Structure

### Selection Screen
```
DatePlanSelection (container)
  ├── Header (title + description)
  ├── DatePlanCard × 3 (one per plan)
  │   ├── Rank badge (#1, #2, #3)
  │   ├── Title + tagline
  │   ├── Description
  │   └── Activities preview
  └── Continue button (appears after selection)
```

### Result Screen
```
ResultPage (container)
  ├── LoveLetter (letter display)
  │   ├── Date stamp
  │   ├── Opening
  │   ├── Body (formatted paragraphs)
  │   └── Closing
  ├── NonNegotiables (separate card)
  └── Actions (share, start over)
```

---

## 6. Tradeoffs Summary

| Decision | Pros | Cons |
|----------|------|------|
| Top 3 always shown | Simple logic, full choice | Might show irrelevant options |
| Weighted scoring | Nuanced matching | More complex than exclusive |
| Separate selection step | User agency, satisfaction | Extra friction |
| SessionStorage | Simple, clean URLs | Not shareable |
| Non-negotiables separate | Clear, scannable | Less integrated |
| Rank badges | Helpful context | Might bias selection |

---

## 7. Future Enhancements

**Easy to add:**
- Score thresholds (only show if score > X)
- Variable count (show 2-4 based on score distribution)
- Plan comparison view (side-by-side)
- Save favorites (localStorage)

**Would require refactoring:**
- Backend storage (save selections)
- User accounts
- Multiple quiz types
- Dynamic plan generation
