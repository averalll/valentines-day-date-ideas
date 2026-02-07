# Valentine's Day Quiz

A playful, question-based quiz that generates a personalized love letter with a perfect date plan.

## Features

- 5 emotional, reflective questions
- Step-by-step quiz flow (one question per screen)
- Progress indicator
- Mobile-first, tap-friendly design
- Generates one of three date vibes:
  - Low-key & relaxing
  - Activity-driven
  - Big / movie-style gesture
- Beautiful love letter result (digital postcard style)
- Copy/share functionality
- Start over option

## Tech Stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS**
- No backend, no auth, no AI
- Local state only (React useState + sessionStorage)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── quiz/page.tsx      # Quiz flow
│   └── result/page.tsx    # Result/letter display
├── components/
│   ├── shared/            # Reusable components
│   ├── quiz/              # Quiz-specific components
│   └── result/            # Result-specific components
└── lib/
    ├── quiz/              # Quiz logic, questions, scoring
    └── results/           # Letter templates, generation
```

## How It Works

1. **Landing Page** - Welcome screen with "Start Quiz" button
2. **Quiz Flow** - 5 questions, one at a time, with progress indicator
3. **Scoring** - Answers are weighted and mapped to one of three date vibes
4. **Result** - Generated love letter with date plan and non-negotiables
5. **Sharing** - Copy to clipboard or use Web Share API

## Customization

### Questions
Edit `lib/quiz/questions.ts` to modify questions or options.

### Letter Templates
Edit `lib/results/templates.ts` to customize letter content.

### Styling
Edit `app/globals.css` and `tailwind.config.ts` for theme customization.

## Documentation

- `ARCHITECTURE.md` - System architecture and design decisions
- `QUESTIONS.md` - Question design and rationale
- `LETTER_TEMPLATES.md` - Letter template content and tone
- `COMPONENT_STRUCTURE.md` - Component hierarchy and state flow

## License

MIT
