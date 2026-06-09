# STACK CONTEXT

**Version:** Gold v2.1
**Type:** Runtime context file
**Layer:** Ground truth
**Loaded When:** Code generation, debugging, architecture, dependency choices, deployment discussions

---

## RUNTIME SUMMARY

Use this file to tell Anti-Gravity what technologies are actually in play, what is still undecided, and which technical defaults should be respected.

---

## CURRENT STACK REALITY

### What This Stack Currently Is
A lightweight, fast, Vite-scaffolded native TypeScript application (Vanilla TS template). Styled with Vanilla CSS (utilizing CSS variables defined in DESIGN.md). Leverages GSAP and ScrollTrigger for complex scroll-linked timelines, and Lenis for smooth-scrolling physics.

### What This Stack Is Not Yet
- A React or Next.js framework project (we explicitly chose vanilla TS to maximize loading performance and logical transparency).
- A Tailwind-based project (we are using vanilla CSS variables for layout and spacing).

### Safe Assumptions
- Browser execution environment supporting modern ES modules, CSS custom properties, and canvas/WebP rendering.
- Heavy focus on desktop presentation, with performance degradation fallbacks for mobile viewports.

---

## STACK SUMMARY

### Primary Languages

| Language | Version | Usage | Notes |
| :--- | :--- | :--- | :--- |
| TypeScript | 5.0+ | All logical controls, GSAP initialization, event bindings | Native TS compile targets |
| CSS | Modern | All layout structure, color tokens, typography scales, spotlight mask gradients | Vanilla CSS, no preprocessors |

### Frontend
- **Framework:** Vanilla TypeScript
- **State management:** Custom session state (tracked in TS modules)
- **Styling:** Vanilla CSS variables (`style.css` + `DESIGN.md`)
- **Component library:** None (Custom semantic elements)
- **Build / package manager:** Vite / npm

### Backend
- None (pure client-side showroom)

### Data And Infrastructure
- **Hosting / deployment:** Vercel (recommended) / static deploy

---

## DEFAULTS AND CONSTRAINTS

### Architectural Defaults
- Keep TS code modular. Separate GSAP timelines, Lenis scroll setups, and cursor event bindings into dedicated files under `src/` (e.g. `src/motion.ts`, `src/scroll.ts`).
- Avoid adding third-party UI libraries or CSS frameworks.

### Critical Version Constraints

| Dependency | Current | Constraint | Reason |
| :--- | :--- | :--- | :--- |
| vite | ^5.0.0 | Latest | Build and dev compilation |
| gsap | ^3.12.5 | ^3.12.0 | Core animation timeline |
| lenis | ^1.1.0 | ^1.0.0 | Smooth scrolling wrapper |

### Known Stack Limitations
- Large, unoptimized transparent PNG/WebP files or heavy 4K videos can block initial Page speed. Assets must be compressed and lazily initialized.
