# Color & Visual Theme Audit Report

**Date:** June 13, 2026  
**Auditor Archetype:** `explorer_color_audit` (teamwork_preview_explorer)  
**Target Files Reviewed:** `index.html`, `src/style.css`, `src/main.ts`, `vertical.html`, `horizontal.html`  
**Reference Specification:** `C:\Users\godsw\.gemini\config\skills\color-system\SKILL.md`  

---

## 1. Executive Summary

This audit evaluates the website's color system, palette harmony, functional roles, accessibility compliance, custom property architecture, and visual rhythm. 

### Core Findings
- **Consensus**: The primary color system successfully shifts the design from generic, sterile digital grays (`#09090B`) to an expensive, organic, tactile palette anchored by **Espresso (`#1C1916`)** and **Ivory (`#F7E8CF`)**. This perfectly aligns with the tropical modernism brand identity (teak wood, travertine, raw limestone).
- **Major Gap 1 (Critical Accessibility Failure)**: The hover states for navigation links, audio control labels, and primary CTA buttons, as well as the default state of the Outro CTA, use **Accent Primary (`#D97706`)** on **Ivory (`#F7E8CF`)**, which produces a contrast ratio of **2.66:1**. This violates WCAG AA standards (minimum 4.5:1 for normal text), rendering interactive states virtually unreadable for low-vision users or under bright screen conditions.
- **Major Gap 2 (Hardcoding in Animation)**: GSAP timelines in `src/main.ts` use hardcoded color values (`#F7E8CF`, `#1a1512`, `rgba(26,21,18,0.4)`) to animate header, brand, and CTA states during scroll transitions. This bypasses the CSS design system, making the site fragile and prone to color snaps or visual degradation if custom properties are updated in `style.css`.
- **Major Gap 3 (Page Drift)**: `vertical.html` and `horizontal.html` suffer from styling drift. `vertical.html` uses generic black (`#000`), white (`#F5F5F0`), and light grey (`#aaa`), completely abandoning the curated Espresso/Ivory luxury palette. `horizontal.html` contains unstyled CTAs (`.concierge-inquiry` vs `.concierge-inquiry-capsule`), breaking visual consistency.
- **Visual Rhythm**: The pacing of the main page is outstanding, creating an architectural sequence of **High Contrast Mask (Act I) → Cinematic Dark Video (Act I.5) → Reframed Light/Dark (Act I.8) → Pure Light Reset (Narrative Bridge) → Rhythmic Frame-in-Frame (Act II Descent) → Editorial Light (Act III/IV)**. It structurally mimics moving through shade and sunlight.

---

## 2. Palette Harmony & Emotional Alignment

The site is anchored by a warm, low-saturation, custom luxury palette. We evaluate it below against the color-system guidelines.

| Color Token | Hex Code | Decimal RGB | Emotional Rationale & Alignment | Compliance Status |
| :--- | :--- | :--- | :--- | :--- |
| `--bg-primary` | `#1C1916` | `28, 25, 22` | Deep Espresso. Warm, rich black/brown that replaces sterile charcoal. Evokes raw earth, volcanic stone, and dark shadows. | **Fully Aligned** |
| `--text-primary`| `#EAE6DF` | `234, 230, 223` | Warm Off-White. Soft linen hue that reduces eye strain and fits raw travertine textures. | **Fully Aligned** |
| `--text-secondary`| `#A8A096` | `168, 160, 150` | Muted Warm Grey. Used for secondary metadata and subheadings to guide flow. | **Fully Aligned** |
| `--accent-primary`| `#D97706` | `217, 119, 6` | Amber/Gold. Rich clay or teak wood tone. Active, energetic contrast. | **Aligned in hue; failed in contrast application** |
| `--ivory-main`  | `#F7E8CF` | `247, 232, 207` | Ivory Main. Raw travertine/limestone, representing tropical sunlight. | **Fully Aligned** |
| `--ivory-accent`| `#FFF2D8` | `255, 242, 216` | Light Ivory. Used for high-contrast highlights over dark sections. | **Fully Aligned** |
| `--espresso-secondary` | `#5A534C` | `90, 83, 76` | Muted Espresso. Grounding, supportive dark grey-brown. | **Fully Aligned** |

### Key Issues:
1. **Generic Gray Leftovers in `src/style.css`**:
   - Line 11: `--glass-bg: rgba(9, 9, 11, 0.5);` — uses the old Slate-950 color (`9, 9, 11`) instead of the warm Espresso base.
   - Line 12: `--glass-border: rgba(228, 228, 231, 0.1);` — uses Slate/Zinc-200, which has cool/sterile undertones.
   - Line 89-94: The gradient overlay on the hero container (`.hero-container::after`) uses `rgba(9, 9, 11, ...)` instead of `rgba(28, 25, 22, ...)`.
2. **Theme Abandonment in `vertical.html`**:
   - Lines 10, 47, 55, 62: `background: #000;`, `color: white;`, and `rgba(0, 0, 0, 0.8)` are hardcoded, stripping away the luxury Espresso/Ivory harmony.
3. **Mismatched tokens in `DESIGN.json`**:
   - The design system JSON still defines the old values (`"bg.primary": "#09090B"`, `"text.primary": "#E4E4E7"`, etc.), creating config drift between design documentation and source implementation.

---

## 3. Functional Color Mapping

The functional mapping assigns specific jobs to the palette tokens:

- **Action (CTA, hovers, links)**: Mapped to `--accent-primary` (`#D97706`).
- **Communicator (Headlines, body copy)**:
  - Dark mode: `--text-primary` (`#EAE6DF`) for body; `--ivory-main` (`#F7E8CF`) for display titles.
  - Light mode: Hardcoded `#1a1512` (should be mapped to `var(--espresso-main)`) and `var(--espresso-secondary)`.
- **Support (Transitions, metadata, subtitles)**: Mapped to `--text-secondary` (`#A8A096`) and `--espresso-secondary` (`#5A534C`).
- **Neutral (Canvas, backgrounds)**: Mapped to `--bg-primary` (`#1C1916`) for dark pages; `--ivory-main` (`#F7E8CF`) for light panels.
- **Anchor (Borders, subtle grids)**: Mapped to `rgba(28, 25, 22, 0.15)` and `--glass-border` (Zinc-200).

### Inconsistencies:
- **Lack of Semantic Abstraction**: Custom properties in `src/style.css` name the *colors* (`--espresso-main`) rather than their *functional roles* (e.g. `--color-text-communicator-light`). This makes the codebase rigid.
- **Hover/Default Contradictions**: The `.concierge-inquiry-capsule` hover state transitions the text color to `--ivory-main` over an `--accent-primary` background. This means the action color becomes a solid background, rather than a highlight, reversing the visual hierarchy of the button.

---

## 4. Accessibility & Contrast Compliance

We calculated the relative luminance ($L$) and contrast ratios for key pairings using the WCAG formula: $(L_1 + 0.05) / (L_2 + 0.05)$.

### Contrast Matrix & WCAG 2.1 Compliance

| Foreground Color | Background Color | Contrast Ratio | WCAG AA Status | WCAG AAA Status | Assessment & Context |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Ivory (`#F7E8CF`)** | **Espresso (`#1C1916`)** | **14.5:1** | **PASS** | **PASS** | Excellent readability. Used for titles and core text in dark modes. |
| **Warm Off-White (`#EAE6DF`)** | **Espresso (`#1C1916`)** | **14.1:1** | **PASS** | **PASS** | Highly accessible. Standard body copy over dark background. |
| **Warm Grey (`#A8A096`)** | **Espresso (`#1C1916`)** | **6.75:1** | **PASS** | **PASS (Large)** | Passes easily for secondary elements. |
| **Muted Espresso (`#5A534C`)** | **Ivory (`#F7E8CF`)** | **6.31:1** | **PASS** | **PASS (Large)** | Used for body copy in light mode (e.g., Narrative Bridge). Readable. |
| **Amber Accent (`#D97706`)** | **Espresso (`#1C1916`)** | **5.47:1** | **PASS** | **PASS (Large)** | Good readability for interactive elements on dark backgrounds. |
| **Amber Accent (`#D97706`)** | **Ivory (`#F7E8CF`)** | **2.66:1** | ❌ **FAIL** | ❌ **FAIL** | **Critical accessibility block.** Text hover states, CTA hover text, and Outro CTA default state are unreadable. |

### Visual Obstacles & Mitigation Audits:

#### A. Text Over Video Backgrounds (Act I & Act II)
- **Act I Hero Staircase Text**: Uses `.staircase-line { color: var(--ivory-main); text-shadow: 0 4px 30px rgba(0, 0, 0, 0.6), ... }`.
  - *Audit*: The double-drop shadow uses high opacity (`0.6`) and wide blur radius (`30px`), which acts as an organic dark plate, isolating the Ivory text from high-frequency sunlight movements in the background video. This successfully preserves legibility.
- **Act II Descent Captions**: Uses `.room-caption-title { text-shadow: var(--espresso-shadow-strong) }` where `--espresso-shadow-strong` is `0 3px 18px rgba(43, 26, 18, 0.60)`.
  - *Audit*: Leveraging a warm brown-tinted shadow instead of standard black is a brilliant details-first touch. However, because these captions sit directly over raw video without container backplates, in the event of high-brightness frames (e.g. sunlight glare on portico stone), readability will drop. 
  - *Recommendation*: Consider adding a very subtle gradient overlay inside the card containers, or a light backdrop blur (`backdrop-filter`) to stabilize the text area.

#### B. Color Blindness (Protanopia, Deuteranopia, Tritanopia)
- Because the structural layouts, grids, and typographical hierarchies are driven by strong lightness contrast (14.1:1 and 14.5:1), color-blind users can easily read the site's content and navigate the sections.
- **The Failure Point (Use of Color Alone)**:
  - In the header navigation (`.nav-links a`), the hover state changes color from dark brown to amber. Since there is no underline, weight shift, or layout change on hover, a protanope or deuteranope who struggles to distinguish the amber hue from the grey/brown base will receive **zero visual feedback** that a link is interactive.
  - *WCAG 2.1 violation (SC 1.4.1)*: Hover/active states must include a non-color indicator (such as a subtle underline transition or letter-spacing expansion).

---

## 5. Hardcoded Colors vs CSS Variables Code Audit

Below is a detailed inventory of where hardcoded colors violate the design token framework.

### File: `src/style.css`
- **Line 11**: `--glass-bg: rgba(9, 9, 11, 0.5);` — hardcoded slate-black.
- **Line 12**: `--glass-border: rgba(228, 228, 231, 0.1);` — hardcoded slate-zinc.
- **Line 89-94**:
  ```css
  background: linear-gradient(
    90deg,
    rgba(9, 9, 11, 0.0) 0%,
    rgba(9, 9, 11, 0.15) 50%,
    rgba(9, 9, 11, 0.35) 100%
  );
  ```
  Uses hardcoded old slate color. Should use `--bg-primary` in RGBA format.
- **Line 358**: `color: #1a1512;` (Atelier title text). Hardcoded dark brown. Should use `var(--espresso-main)`.
- **Line 369**: `color: #2b231d;` (Atelier body paragraphs). Hardcoded warm charcoal. Should use `var(--espresso-secondary)`.

### File: `src/main.ts`
- **Lines 233-240**:
  ```typescript
  masterTl.fromTo(['.brand', '.nav-links a', '.concierge-inquiry-capsule'], 
    { color: "#F7E8CF", textShadow: "0 2px 10px rgba(26,21,18,0.3)" },
    {
      color: "#1a1512",
      textShadow: "none",
      ease: "power3.inOut",
      duration: 1.8
    }, 4.6);
  ```
  - `#F7E8CF` is hardcoded. Should be `var(--ivory-main)`.
  - `rgba(26,21,18,0.3)` is hardcoded.
  - `#1a1512` is hardcoded. Should be `var(--espresso-main)`.
- **Lines 243-250**:
  ```typescript
  masterTl.fromTo('.concierge-inquiry-capsule', 
    { borderColor: "rgba(247, 232, 207, 0.4)", backgroundColor: "transparent" },
    {
      borderColor: "rgba(26, 21, 18, 0.4)",
      backgroundColor: "transparent",
      ease: "power3.inOut",
      duration: 1.8
    }, 4.6);
  ```
  - `rgba(247, 232, 207, 0.4)` is hardcoded. Should be `rgba(247, 232, 207, 0.4)`.
  - `rgba(26, 21, 18, 0.4)` is hardcoded. Should be `rgba(28, 25, 22, 0.4)` (Espresso RGB is `28, 25, 22`, while `26, 21, 18` is slightly different).

### File: `vertical.html`
- **Line 10**: `background: #000; color: white;` — hardcoded.
- **Line 47**: `background: #000;` — hardcoded.
- **Line 55**: `background: #000;` — hardcoded.
- **Line 62**: `background: radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 100%);` — hardcoded black vignette.
- **Line 69**: `color: #F5F5F0;` — hardcoded light gray.
- **Line 74**: `text-shadow: 0 4px 20px rgba(0,0,0,0.8);` — hardcoded.
- **Line 85**: `border: 1px dashed rgba(255, 255, 255, 0.4);` — hardcoded.
- **Line 94**: `color: rgba(255, 255, 255, 0.7);` — hardcoded.
- **Line 104**: `background: rgba(0,0,0,0.5);` — hardcoded.

---

## 6. Visual Rhythm & Contrast Pacing

The narrative layout coordinates contrast shifts across scroll depths to establish a cinematic pace.

```
SCROLL DEPTH
 |
 0%  [ Act I: Mask ] ---------> LIGHT (Ivory Background, Espresso Text)
 |                             *Tension: High contrast, flat graphic cover.
 20% [ Act I: Video ] --------> DARK (Video Background, Ivory Text Overlay)
 |                             *Release: Expands into volumetric space.
 40% [ Act I: Squeeze ] ------> DUAL SPLIT (Ivory Panel slides in / Video shrinks)
 |                             *Contrast: Dark & light exist side-by-side.
 60% [ Act I.5: Bridge ] -----> LIGHT (Solid Ivory Background, Muted Espresso Text)
 |                             *Visual Reset: Clean space, breathing room.
 80% [ Act II: Descent ] -----> RHYTHMIC FRAME-IN-FRAME (Dark Cards on Ivory Underlay)
 |                             *Pulse: Alternating borders guide scrolling focus.
100% [ Act III/IV: Outro ] ---> LIGHT EDITORIAL (Ivory Background, Espresso Text)
                               *Resolution: Soft watercolor brand mark, quiet luxury.
```

### Assessment:
- The pace is carefully balanced. It avoids "contrast fatigue" (constant dark mode or constant light mode) by transitioning the user through spaces of differing light volumes.
- The transition from the dense, card-heavy Act II stack to the open, minimalist editorial layout of Act III provides an excellent breathing space.
- The watermark in the outro (`mix-blend-mode: multiply` with `opacity: 0.15`) acts as a quiet anchor, grounding the massive scale.

---

## 7. Actionable Recommendations (Proposals for Implementer)

We recommend these changes to resolve the gaps while maintaining the read-only constraint of this audit.

### Recommendation 1: Fix the Accent-on-Ivory Contrast Failures
To preserve WCAG compliance, the amber accent color should not be used as text or as a background overlay on light Ivory screens.
- **Header hover link state**: Hovering over links on the Ivory panel should transition from dark brown (`#1C1916`) to a deep terracotta or brick red (e.g. `#A2470B`, contrast ratio **4.7:1** against Ivory), or should simply utilize a subtle underline transition (e.g., drawing a line using a `::after` element) while keeping the text dark.
- **CTA capsule hover state**: On hover, the text of `.concierge-inquiry-capsule` should turn to **Espresso (`#1C1916`)** rather than Ivory (`#F7E8CF`) when the background transitions to Amber (`#D97706`). The contrast of Espresso on Amber is **5.47:1** (PASS), whereas Ivory on Amber is 2.66:1 (FAIL).
- **Outro large CTA button**: The default state of the Outro CTA button (`.large-cta`) should have a solid **Espresso (`#1C1916`)** background with **Ivory (`#F7E8CF`)** text, rather than Amber background. This gives it a contrast of 14.5:1. On hover, it can animate to an Amber background with Espresso text. This aligns the button with the visual weight of the rest of the section and passes all readability checks.

### Recommendation 2: Decouple GSAP Animations from Hardcoded Hex Values
Replace the hardcoded values in `src/main.ts` with CSS variables. 

*Proposed refactoring pattern in `src/main.ts`:*
```typescript
// Before
masterTl.fromTo(['.brand', '.nav-links a', '.concierge-inquiry-capsule'], 
  { color: "#F7E8CF" },
  { color: "#1a1512" }
);

// After (GSAP reading custom properties)
masterTl.fromTo(['.brand', '.nav-links a', '.concierge-inquiry-capsule'], 
  { color: "var(--text-primary)" }, // Starts as dark-mode off-white over video
  { 
    color: "var(--espresso-main)", // Tweens to light-mode espresso over Ivory panel
    ease: "power3.inOut",
    duration: 1.8
  }
);
```

### Recommendation 3: Unify CSS Variables for Glassmorphism
Update `--glass-bg` and `--glass-border` to use the warm Espresso palette instead of the Slate-950/Zinc-200 colors.
```css
/* src/style.css */
:root {
  /* ... */
  --glass-bg: rgba(28, 25, 22, 0.5); /* Espresso with opacity */
  --glass-border: rgba(247, 232, 207, 0.15); /* Ivory with opacity */
}
```

### Recommendation 4: Rectify `vertical.html` and `horizontal.html` Palette Drift
- **`vertical.html`**: Replace the inline styles (`#000`, `white`) with the custom properties imported from `style.css`. Change the background to `var(--bg-primary)` (Espresso) and titles to `var(--ivory-main)`.
- **`horizontal.html`**: Change the class `.concierge-inquiry` to `.concierge-inquiry-capsule` so it picks up the global luxury styling from `style.css`.
