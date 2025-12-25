# Super Year Wrapped 2025

A Spotify Wrapped-style experience showcasing a user's year with Super — an AI-powered knowledge platform that connects to Slack, GitHub, Notion, Linear, and more.

## Live Demo

[View Demo](https://year-wrapped-ten.vercel.app/)

## Features

- **Interactive Radial Timeline** — Scroll-to-zoom circular visualization of monthly activity with smooth spring animations
- **Animated Landing Page** — WebGL shader effect on the play button using @paper-design/shaders-react
- **8 Data Slides** — Each slide tells a story about the user's Super usage:
  - Welcome intro with brand gradients
  - Monthly journey timeline
  - Search habits (flippable card with 3D tilt effect)
  - Impact metrics with staggered animations
  - Top Assistants bar chart
  - Source usage pixel chart (canvas-rendered)
  - Usage overview summary card
  - Share CTA with social buttons
- **Keyboard Navigation** — Arrow keys to navigate, ESC to exit timeline
- **Dark Theme** — Custom design system with Super brand colors

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS
- **Shaders:** @paper-design/shaders-react
- **Icons:** Lucide React
- **Language:** TypeScript

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Run linter
bun run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
├── app/
│   ├── globals.css      # Design system & CSS variables
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page with shader button
├── components/
│   ├── radial-timeline/ # Interactive circular timeline
│   └── wrapped/
│       ├── slides/      # 8 slide components
│       ├── grid-background.tsx
│       ├── progress-bar.tsx
│       └── wrapped-viewer.tsx
└── lib/
    └── data.ts          # User stats & slide configuration
```

## Design Decisions

### Why Next.js?
Static site generation (SSG) ensures instant load times. The wrapped experience is pre-rendered at build time — no server computation needed at runtime.

### Why Framer Motion?
Declarative animations that integrate seamlessly with React. Used for spring physics on the timeline, page transitions, and interactive hover effects.

### Why DOM over Canvas for Timeline?
The radial timeline uses 180 DOM elements with CSS transforms instead of Canvas. Benefits:
- Better accessibility (keyboard navigation, screen readers)
- GPU-accelerated transforms
- Easier click/hover handling
- Simpler debugging

### Why Static Data?
The prototype uses typed interfaces in `lib/data.ts`. This allows:
- Focus on UX without API complexity
- Type safety when real API is connected
- Single source of truth for all components

