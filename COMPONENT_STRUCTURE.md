# Component Structure & State Flow

## Overview

The Valentine's Day quiz is built with Next.js App Router, React, TypeScript, and Tailwind CSS. The app follows a simple, linear flow: Landing → Quiz → Result.

---

## Component Hierarchy

```
app/
├── layout.tsx              # Root layout (metadata only)
├── page.tsx                # Landing page
├── quiz/
│   └── page.tsx           # Quiz route wrapper
└── result/
    └── page.tsx           # Result route wrapper

components/
├── shared/
│   ├── Button.tsx         # Reusable button component
│   └── Card.tsx           # Reusable card wrapper
├── quiz/
│   ├── QuizContainer.tsx  # Main quiz state manager
│   ├── QuestionCard.tsx   # Question display component
│   ├── OptionButton.tsx   # Individual answer option
│   └── ProgressIndicator.tsx  # Progress bar
└── result/
    ├── LoveLetter.tsx     # Letter display component
    └── ShareButton.tsx    # Copy/share functionality
```

---

## State Flow

### 1. Landing Page (`app/page.tsx`)

**State:** None (static)

**Flow:**
- User sees welcome message
- Clicks "Start the Quiz" button
- Navigates to `/quiz`

**Component:**
- Uses `useRouter` from Next.js for navigation
- Simple Card + Button layout

---

### 2. Quiz Flow (`app/quiz/page.tsx` → `QuizContainer.tsx`)

**State Management:**
- **Local React state** in `QuizContainer`:
  - `currentQuestionIndex` (number) - Tracks which question is displayed
  - `answers` (QuizAnswers object) - Stores selected option IDs by question ID

**State Flow:**
```
Initial: currentQuestionIndex = 0, answers = {}

User selects option:
  → handleOptionSelect(optionId)
  → Updates answers: { [questionId]: optionId }
  → Re-renders with selected state

User clicks "Next":
  → handleNext()
  → If not last question: currentQuestionIndex++
  → If last question: Calculate vibe → Store in sessionStorage → Navigate to /result
```

**Key Components:**

**QuizContainer.tsx** (State Manager)
- Manages quiz state (`currentQuestionIndex`, `answers`)
- Handles option selection
- Calculates final vibe using `determineVibe()` from scoring logic
- Stores result in `sessionStorage` before navigation
- Renders `ProgressIndicator` and `QuestionCard`

**QuestionCard.tsx** (Presentational)
- Receives `question` prop
- Receives `selectedOptionId` and `onOptionSelect` callback
- Maps over question options, renders `OptionButton` for each

**OptionButton.tsx** (Interactive)
- Large, tap-friendly button (min-height: 80px mobile, 100px desktop)
- Visual feedback: border color changes on selection
- Active state: slight scale-down on tap

**ProgressIndicator.tsx** (Visual Feedback)
- Shows "Question X of 5"
- Animated progress bar (0-100%)
- Uses gradient for visual appeal

**Data Flow:**
```
QUESTIONS (lib/quiz/questions.ts)
  ↓ (imported)
QuizContainer
  ↓ (passes current question)
QuestionCard
  ↓ (passes options)
OptionButton (x4)
  ↓ (user selects)
QuizContainer (updates answers state)
  ↓ (user clicks Next)
QuizContainer (calculates vibe, stores, navigates)
```

---

### 3. Result Page (`app/result/page.tsx`)

**State Management:**
- **Local React state:**
  - `letter` (LoveLetter | null) - The generated letter
  - `loading` (boolean) - Loading state while retrieving from sessionStorage

**State Flow:**
```
Page loads:
  → useEffect runs
  → Reads 'dateVibe' from sessionStorage
  → Calls generateLoveLetter(vibe)
  → Sets letter state
  → Sets loading = false

If no sessionStorage data:
  → Redirects to home page
```

**Key Components:**

**LoveLetter.tsx** (Display)
- Receives `letter` prop (LoveLetter type)
- Formats body text (splits paragraphs)
- Renders: date stamp, opening, body, closing, non-negotiables
- Uses serif font for romantic feel
- Styled as a digital postcard

**ShareButton.tsx** (Interaction)
- Formats letter as plain text
- "Send this to them 💌" - Copies to clipboard
- "Share as a letter" - Uses Web Share API (falls back to copy)
- Shows "Copied! ✓" feedback

**Result Page** (Orchestrator)
- Retrieves vibe from sessionStorage
- Generates letter using `generateLoveLetter()`
- Handles "Start Over" - clears sessionStorage, redirects to home

**Data Flow:**
```
sessionStorage.getItem('dateVibe')
  ↓
generateLoveLetter(vibe) (lib/results/templates.ts)
  ↓
LoveLetter object
  ↓ (passed as prop)
LoveLetterComponent (renders)
ShareButton (formats for sharing)
```

---

## State Persistence

### sessionStorage Usage

**Why sessionStorage?**
- Persists across page refreshes
- Cleared when browser tab closes
- No backend needed
- Allows "Start Over" without losing result immediately

**Stored Data:**
```typescript
sessionStorage.setItem('quizAnswers', JSON.stringify(finalAnswers));
sessionStorage.setItem('dateVibe', vibe); // 'low-key' | 'activity-driven' | 'big-gesture'
```

**Retrieved Data:**
```typescript
const storedVibe = sessionStorage.getItem('dateVibe') as DateVibe | null;
const storedAnswers = JSON.parse(sessionStorage.getItem('quizAnswers') || '{}');
```

---

## Scoring Logic Flow

**Location:** `lib/quiz/scoring.ts`

**Process:**
```
User completes quiz → answers object
  ↓
determineVibe(answers)
  ↓
calculateVibeScores(answers)
  ↓
For each answer:
  - Find question
  - Find selected option
  - Add option.vibeScores to totals
  ↓
Returns: [{ vibe: 'low-key', total: 12 }, { vibe: 'activity-driven', total: 8 }, ...]
  ↓
Sort by total (highest first)
  ↓
If tie: Use priority order (low-key > activity-driven > big-gesture)
  ↓
Return winning vibe
```

---

## Styling Approach

### Design System

**Colors:**
- Primary: Rose palette (rose-50 to rose-900)
- Background: Gradient (rose-50 → pink-50 → rose-100)
- Text: Gray-800 (body), Rose-700 (headings/accents)

**Typography:**
- Serif font (Georgia) for headings and letter content
- Sans-serif (system) for UI elements

**Spacing:**
- Mobile-first: 4px base unit
- Cards: p-6 mobile, p-8 desktop
- Buttons: py-4, px-6 (large tap targets)

**Effects:**
- Cards: `bg-white/80 backdrop-blur-sm` (glassmorphism)
- Shadows: `shadow-lg shadow-rose-100/50` (soft, romantic)
- Transitions: `transition-all duration-200`
- Active states: `active:scale-95` (tactile feedback)

**Responsive:**
- Mobile-first breakpoints (`md:` prefix)
- Text scales: `text-2xl md:text-3xl`
- Padding scales: `p-4 md:p-6`

---

## User Flow Diagram

```
┌─────────────┐
│ Landing     │
│ Page        │
└──────┬──────┘
       │ Click "Start Quiz"
       ↓
┌─────────────┐
│ Quiz Page   │
│ Q1          │ ──┐
└──────┬──────┘   │
       │ Select  │ │ Loop 5 times
       ↓          │ │
┌─────────────┐  │ │
│ Option      │  │ │
│ Selected    │  │ │
└──────┬──────┘  │ │
       │ Next    │ │
       ↓          │ │
┌─────────────┐  │ │
│ Quiz Page   │◀─┘ │
│ Q2-Q5       │    │
└──────┬──────┘    │
       │          │
       │ Last Q   │
       ↓          │
┌─────────────┐   │
│ Calculate   │   │
│ Vibe        │   │
└──────┬──────┘   │
       │ Store   │
       ↓          │
┌─────────────┐   │
│ Result Page │   │
│ Letter      │   │
└──────┬──────┘   │
       │          │
       │ Share/   │
       │ Copy     │
       ↓          │
┌─────────────┐   │
│ Start Over  │───┘
└─────────────┘
```

---

## Key Design Decisions

### 1. One Question Per Screen
- **Decision:** Show one question at a time
- **Rationale:** Reduces cognitive load, mobile-friendly, feels like a conversation

### 2. Local State Only
- **Decision:** React useState + sessionStorage
- **Rationale:** No backend needed, simple, fast, works offline

### 3. Large Tap Targets
- **Decision:** min-height: 80px (mobile), 100px (desktop)
- **Rationale:** Mobile-first, accessible, reduces mis-taps

### 4. Progress Indicator
- **Decision:** Visual progress bar + "Question X of 5"
- **Rationale:** Reduces anxiety, shows completion status

### 5. Immediate Option Selection
- **Decision:** Option highlights immediately, "Next" appears after selection
- **Rationale:** Clear feedback, prevents accidental skips

### 6. Digital Postcard Aesthetic
- **Decision:** Serif fonts, soft colors, card-based layout
- **Rationale:** Feels like a love letter, not a form

### 7. Share Functionality
- **Decision:** Copy to clipboard + Web Share API
- **Rationale:** Easy to send via WhatsApp/other apps, works everywhere

---

## Component Responsibilities

| Component | Responsibility | State | Props |
|-----------|---------------|-------|-------|
| `QuizContainer` | Quiz state management, navigation | `currentQuestionIndex`, `answers` | None |
| `QuestionCard` | Display question + options | None | `question`, `selectedOptionId`, `onOptionSelect` |
| `OptionButton` | Individual option UI | None | `text`, `onClick`, `isSelected` |
| `ProgressIndicator` | Visual progress | None | `current`, `total` |
| `LoveLetter` | Letter display | None | `letter` |
| `ShareButton` | Copy/share functionality | `copied` (local) | `letter` |
| `Button` | Reusable button | None | `children`, `onClick`, `variant`, etc. |
| `Card` | Reusable card wrapper | None | `children`, `className` |

---

## Future Enhancements

**Easy to Add:**
- Partner name input (personalize greeting)
- URL-based sharing (encode answers in URL params)
- Multiple closing options (randomize for variety)
- Animation transitions between questions
- Sound effects (optional, subtle)
- Print-friendly CSS for letter

**Would Require Refactoring:**
- Backend storage (save letters)
- User accounts
- Multiple quiz types
- AI-generated variations
