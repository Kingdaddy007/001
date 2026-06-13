# UX Critique & Technical Performance Audit Report

*Date: 2026-06-13*  
*Auditor: explorer_ux_tech_audit (teamwork_preview_explorer)*

---

## 1. Executive Summary

- **Audit Health Score**: **8/20 (Poor)** — Significant technical overhaul is required to make the project performant, accessible, and responsive.
- **Design Health Score**: **22/40 (Acceptable)** — The aesthetic concept is strong and matches a premium architectural brand, but the user experience is severely degraded by navigation lockouts, missing styles, and rigid controls.
- **Total Issues Found**: **11**
  - **P0 (Blocking)**: 4
  - **P1 (Major)**: 3
  - **P2 (Minor)**: 3
  - **P3 (Polish)**: 1

### Top 3 Critical Issues
1. **Broken Horizontal Path (`horizontal.html`)**: The page lacks a linked stylesheet and has no horizontal scrolling logic implemented, rendering it a broken, unstyled vertical stack of duplicate videos.
2. **Video Over-preloading & Bandwidth Exhaustion**: Eight videos are preloaded and played simultaneously on page load, including six videos that are completely below the fold.
3. **Hidden Navigation Lockout**: The viewport navigation header and footer fade out permanently after scrolling past Act I, trapping users with no way to navigate elsewhere or escape the page.

---

## 2. Audit & Design Health Scores

### Technical Audit Health Score (WCAG & Performance)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility (A11y) | 1/4 | Contrast failures (2.85:1) on amber text; ghost tab targets on hidden header. |
| 2 | Performance | 1/4 | 8 videos preloaded/played concurrently; double-loaded Act I video; unused background loops. |
| 3 | Theming | 2/4 | `DESIGN.json` (dark gray) mismatches `style.css` (warm ivory); hardcoded colors in multiple files. |
| 4 | Responsive Design | 2/4 | `horizontal.html` unstyled; layout text overlaps and narrow columns on mobile viewports. |
| 5 | Anti-Patterns | 2/4 | Duplicate video filters; missing Google Fonts imports; Helvetica Neue styling in vertical loop. |
| **Total** | | **8/20** | **Poor (Major overhaul needed)** |

### Nielsen's 10 UX Heuristics Scoring

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | No scroll progress indicators or active room indicators in the vertical/descent flow. |
| 2 | Match System / Real World | 4/4 | Terminology ("threshold", "laterite") aligns perfectly with the premium architecture brand. |
| 3 | User Control and Freedom | 1/4 | Menu header is hidden during scroll, locking users out of navigational choices. |
| 4 | Consistency and Standards | 2/4 | Helvetica Neue overrides the typography system in `vertical.html`; brand name is inconsistent. |
| 5 | Error Prevention | 2/4 | CTAs are dead elements with no event listeners or feedback. |
| 6 | Recognition Rather Than Recall | 2/4 | Hidden headers force users to scroll back to the top to see links. |
| 7 | Flexibility and Efficiency | 1/4 | Snapping is rigid and slow with no keyboard skip options or quick shortcuts. |
| 8 | Aesthetic and Minimalist Design | 3/4 | The ivory and warm dark theme is gorgeous but broken layouts degrade the score. |
| 9 | Error Recovery | 3/4 | N/A (no forms), but no fallback pages are defined. |
| 10 | Help and Documentation | 2/4 | No spatial explanation or contact flow beyond a non-functional CTA button. |
| **Total** | | **22/40** | **Acceptable (Significant UX work needed)** |

---

## 3. Anti-Patterns Verdict & "AI Slop" Tells

### Does this look AI-generated? **Pass with Caveats**
- **LLM Assessment**: The visual concept avoids typical SaaS AI tells. The warm earth tones, raw materials text, and film-grain overlay give it an authentic, editorial, high-end look that matches the "LATERITE" tropical modernist architectural brand.
- **Tells Identified**:
  - **Repetitive Video Filters**: `horizontal.html` uses the exact same video (`Camera_push_into_room_202606091451.mp4`) four times in a row, using CSS filters (`grayscale`, `sepia`, `invert`) to simulate different materials. This looks highly generic and artificial.
  - **Typography Mismatch**: `vertical.html` falls back to Helvetica Neue, which clashes with the premium typography system.
  - **Missing Imports**: The brand font `Playfair Display` is referenced in the SVG text mask of `index.html` but is never imported, causing a generic font fallback on load.
  - **Placeholder Code**: `src/horizontal.ts` is a console log placeholder, showing incomplete features common in rushed AI code.

---

## 4. Detailed Findings by Severity

### P0 Blocking: Fix Immediately

#### 1. Unstyled and Non-functional Horizontal Path
- **Location**: `horizontal.html` (lines 1-92) & `src/horizontal.ts` (lines 1-3)
- **Category**: Responsive Design / Performance
- **Impact**: The page has no CSS stylesheet link, making it load completely unstyled. The horizontal scroll script is just a placeholder console log. The layout is broken, displaying as a vertical list of duplicate videos.
- **Recommendation**: Add `<link rel="stylesheet" href="/src/style.css">` to `horizontal.html`. Implement a horizontal scroll timeline using GSAP ScrollTrigger to translate the `.gallery-container` horizontally.

#### 2. Excessive Concurrent Video Playback
- **Location**: `index.html` (Act II vertical rooms, lines 137-196)
- **Category**: Performance
- **Impact**: 8 high-resolution videos (2 in Act I, 6 in Act II) are loaded and played simultaneously on page load. This causes massive CPU/GPU strain, battery drain, and network congestion.
- **Recommendation**: Remove the `autoplay` and `preload` attributes from below-fold video elements. Use `IntersectionObserver` or GSAP ScrollTrigger to set the `src` and call `.play()` only when a video enters the viewport, and `.pause()` when it exits.

#### 3. Ghost Keyboard Focus / Hidden Tab Traps
- **Location**: `index.html` (lines 44-58)
- **Category**: Accessibility (A11y)
- **Impact**: When the viewport header and footer fade out (`opacity: 0`), they are not removed from the tab order. Keyboard users will still tab into the invisible navigation links, causing a confusing "ghost focus" experience.
- **Recommendation**: Set `visibility: hidden` or `display: none` on `.viewport-header` and `.viewport-footer` when their opacity is 0 to remove them from the accessibility tree and keyboard tab flow.

#### 4. Redundant Video Loading & Playback
- **Location**: `index.html` (Act I, lines 78-79) & `#master-bg-video-next` (line 21)
- **Category**: Performance
- **Impact**: 
  - Act I loads the exact same video file (`/Sunlight_creeps_across_concrete.mp4`) twice concurrently (once for the foreground and once for the ambient blur).
  - `#master-bg-video-next` is preloaded and played continuously in the background but is never displayed because no script swaps its source or active class.
- **Recommendation**: Use a single video element for the Hero scene and apply the ambient blur via a CSS pseudo-element or a single blurred canvas. Remove the unused `#master-bg-video-next` element.

---

### P1 Major: Fix before Release

#### 5. Contrast Failures on Hover States
- **Location**: `src/style.css` (lines 253-259, 162)
- **Category**: Accessibility (A11y)
- **Impact**: When hovered, `.concierge-inquiry-capsule` has a background of `var(--accent-primary)` (`#D97706` amber) and text of `var(--ivory-main)` (`#F7E8CF`). The contrast ratio is only **2.85:1**, violating the WCAG AA minimum of 4.5:1, making the text unreadable.
- **Recommendation**: Change the hover text color to a dark color like `#1C1916` when the background is amber.

#### 6. Missing Primary Heading (`<h1>`)
- **Location**: `index.html` (lines 1-295)
- **Category**: Accessibility (A11y)
- **Impact**: There is no `<h1>` heading in `index.html`. The page starts with `<h2>` elements. This violates semantic hierarchy and hurts SEO and screen reader accessibility.
- **Recommendation**: Convert the brand title LATERITE or the main hero title to an `<h1>` element.

#### 7. Missing Font Import for Brand Text
- **Location**: `index.html` (line 9, 89)
- **Category**: Anti-Patterns
- **Impact**: The SVG text mask `arrival-brand` is styled with `font-family: 'Playfair Display'`, but this font is never imported. The browser falls back to a generic serif, destroying the brand's aesthetic.
- **Recommendation**: Import the `Playfair Display` font in the HTML `<head>` font link, or change the font family in the SVG mask to `var(--font-display)`.

---

### P2 Minor: Fix in next Pass

#### 8. Permanent Navigation Lockout
- **Location**: `src/main.ts` (lines 313-318)
- **Category**: Accessibility / UX
- **Impact**: The navigation bar is hidden after Act I and never reappears. The user is trapped in a scroll-snapped loop with no way to navigate back to other pages or paths.
- **Recommendation**: Implement a trigger to show the menu header when scrolling up, or keep the header fixed with a subtle background.

#### 9. Theme Mismatch (Tokens vs. Hardcoded Colors)
- **Location**: `DESIGN.json` (lines 5-18) & `src/style.css` (lines 2-22)
- **Category**: Theming
- **Impact**: `DESIGN.json` specifies dark zinc grays (`#09090B`), while `style.css` uses a custom warm taupe/ivory scheme (`#1C1916`). Furthermore, several files have hardcoded color values (`#1a1512`, `#2b231d`) instead of CSS variables, making theme switching impossible.
- **Recommendation**: Update `DESIGN.json` to match the actual ivory/espresso design tokens. Replace all hardcoded colors in CSS with variables.

#### 10. Non-semantic and Non-functional CTAs
- **Location**: `index.html` (line 55, 265)
- **Category**: Accessibility (A11y)
- **Impact**: The CTAs are styled `<div>` elements with `tabindex="0"` but lack `role="button"`. They also do not have keypress listeners in JS, meaning keyboard users cannot activate them using Space or Enter.
- **Recommendation**: Convert them to semantic `<button>` elements, or add `role="button"` and attach event listeners to handle both `click` and `keydown` (Enter/Space) events.

---

### P3 Polish: Fix if Time Permits

#### 11. Dead CSS and JS Selectors
- **Location**: `src/style.css` (lines 183-232, 339-346) & `src/main.ts` (lines 605-612)
- **Category**: Performance
- **Impact**: CSS styles and event listeners are registered for `.audio-control`, `.audio-equalizer`, and `.spotlight-overlay`, but none of these elements exist in `index.html`. This adds useless weight to the bundle.
- **Recommendation**: Delete the dead CSS rules and JS listeners to clean up the codebase.

---

## 5. Performance Deep Dive

### Video Loading Concurrency
When a browser loads a webpage, it limits the number of concurrent HTTP connections (usually 6 per domain). Having **8 autoplaying videos** means the browser's connection limit is immediately saturated. This blocks the loading of other critical assets (stylesheets, scripts, images).

```
[HTML Load]
    ├── Sunlight_creeps_across_concrete.mp4 (x2)  <-- Playback begins
    ├── Tracking_push_through_portico...          <-- Below fold, begins loading
    ├── Steam_rises_from_bathtub...              <-- Below fold, begins loading
    └── [Connection Queue Saturated - Scripts/Fonts Delayed]
```

### CPU Paint and Composite Costs
1. **SVG Blur Filters**: The stdDeviation blur is animated dynamically on scroll. Blurring is a convolution filter that must run on the CPU. Animating standard deviation causes massive layout repaints.
2. **Fixed Film Grain Overlay**: The `film-grain` class applies a fixed background noise over the entire viewport. During scroll, the browser must composite this layer on top of all moving elements, forcing repaints on every frame.

---

## 6. Recommended Actions

To resolve these issues, we recommend executing the following impeccable commands in order:

1. **`/impeccable-polish`** — Clean up the dead CSS rules and JS selectors for audio/spotlight elements (resolves P3).
2. **`/impeccable-a11y`** — Fix contrast on hover states, add `role="button"` and keyboard listeners to CTAs, and set `visibility: hidden` on hidden navigation headers (resolves P0/P1).
3. **`/impeccable-optimize`** — Implement video lazy-loading, remove the duplicate video stream in Act I, and delete the unused `#master-bg-video-next` video tag (resolves P0).
4. **`/impeccable-responsive`** — Fix the missing stylesheet in `horizontal.html`, implement the horizontal scroll timeline in `src/horizontal.ts`, and adjust staircase indents on mobile (resolves P0/P2).
5. **`/impeccable-theme`** — Align `DESIGN.json` with the ivory/espresso colors and extract hardcoded colors to CSS variables (resolves P2).
