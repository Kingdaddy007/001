# Layout & Rhythm Audit Report

## Executive Summary
This report presents a detailed Layout and Rhythm Audit of the website, evaluated against the principles outlined in `workflow-impeccable-layout.md`. 
Through a systematic inspection of `index.html`, `src/style.css`, `src/main.ts`, `vertical.html`, and `horizontal.html`, we have identified two critical layout failures, several responsiveness issues, and a total absence of a structured spacing system.

Furthermore, we performed a verification of claims made by the previous implementer agent (`worker_underlay_storytelling`) and discovered a **severe implementation gap**: the claimed optimization of background video cross-fading, DOM video reduction, and Act II/III integration is completely missing from the codebase. The website currently runs 7 concurrent video elements preloading in the DOM, creating significant performance bottlenecks, and the horizontal variant gallery is completely unstyled and broken.

---

## 1. Spacing System Assessment
* **Monotonous & Arbitrary Spacing:** The codebase lacks a tokenized spacing system (e.g., `--space-xs`, `--space-sm`, etc.). Padding, margins, and gaps are declared using hardcoded, scattered values of `rem`, `vw`, and `vh` (e.g., `2.5rem`, `6vw`, `3rem`, `0.8rem`, `1.5rem`, `4vw`, `10vw`). This violates the core guideline of maintaining a consistent, predictable spacing scale.
* **Fluid Spacing Absence:** Although `clamp()` is correctly applied to typography font sizes to ensure scalability, it is **never** used for spacing (padding, margins, gaps). This prevents the layout from scaling fluidly across viewport sizes.
* **Margins vs. Flex Gap:** Sibling spacing frequently relies on individual vertical margins (e.g., `margin-bottom: 2rem` on `.atelier-title`, `margin-bottom: 1.5rem` on `.atelier-body p`, `margin-bottom: 1.5rem` on `.bridge-headline`) instead of leveraging Flexbox/Grid gaps. This increases the likelihood of margin collapse issues and reduces the predictability of section structures.
* **Hacky Layout Overlaps:** The Act III storytelling section uses a negative margin hack (`margin-top: -100vh` in `src/style.css` line 552) to overlap the final card of Act II. This is a brittle mechanism that can cause visual jumps and scroll stuttering under Lenis smooth scroll momentum.

---

## 2. Visual Hierarchy Assessment
* **Staircase Asymmetry:** The staircase layout in Act I (`transform: translateX(calc(var(--indent) * 3.2vw))`) is an excellent, intentional asymmetric composition that creates a premium, high-end feel.
* **Atelier Split Screen:** The spatial reframing in `main.ts` that squeezes the hero video using a `clipPath` inset (`clipPath: "inset(15vh 55vw 15vh 5vw round 24px)"`) and reveals the Atelier panel on the right creates an elegant, asymmetric composition.
* **Legibility and Contrast Hazard in Act II:** 
  * In `index.html`, the room caption titles (`.room-caption-title`) and descriptions (`.room-caption-desc`) are overlayed directly on top of video backdrops.
  * In `src/style.css`, the vignette overlay `.room-vignette` was **completely removed for maximum clarity** (line 478 comment: `/* Vignette completely removed for maximum clarity */`).
  * While `text-shadow: var(--espresso-shadow-strong)` is applied to the captions, the absence of a dark vignette behind the text means that when video content contains bright white frames (e.g., steam in the bathroom, light flares in the portico), the text will suffer from poor legibility and contrast, failing accessibility standards.
* **Symmetric Monotony:** Act III uses a standard symmetric `grid-template-columns: 1fr 1fr` columns layout. This is clean but fails to introduce the "asymmetric compositions" that the brand register expects for premium storytelling.

---

## 3. Grid & Structure Assessment
* **Flexbox vs. Grid Utilization:** 
  * Flexbox is correctly used for 1D structures like `.nav-links` (row layout) and `.viewport-header` (header bar), which conforms to guidelines.
  * Grid is used for Act III's `.editorial-container` (2D column grid).
* **Bento Structure Absence:** There are no bento structures present in the page or its sub-pages.
* **Monotonous Structure in Act II:** Act II features 5 vertical rooms styled identically (full-bleed cards stacked vertically). This structure is highly predictable and lacks elements of surprise.
* **Unstyled Grid Structure in `horizontal.html`:** The horizontal gallery layout in `horizontal.html` contains markup for `.gallery-pin-wrapper`, `.gallery-container`, `.gallery-item`, and `.gallery-video-container`, but there are **no CSS rules** defining them in `src/style.css` (they are completely missing from the stylesheet). As a result, the horizontal variant renders as a broken list of unstyled vertical block elements.

---

## 4. Rhythm Assessment
* **Pacing (Tension vs. Release):**
  * **Tension:** Act I builds tension effectively through the tight staircase text groupings (`gap: 1.5rem`), drawing the eye down and to the right.
  * **Release:** The reframing transition opens up generous whitespace on the left and right, allowing the layout to breathe.
  * **Monotony:** Act II suffers from visual fatigue. Scrolling through 6 consecutive, identically formatted full-screen vertical cards creates a flat visual rhythm without any pacing changes or structural variations.
  * **Resolution:** Act IV Outro acts as a clean release with generous padding (`10vh 10vw`) surrounding a single centered text block and footer metadata.

---

## 5. Responsiveness & Touch Target Assessment
* **Missing Breakpoints & Mobile Styles:** There is only one media query in `src/style.css` (`(max-width: 768px)`), which only covers `.quiet-nav` and `.punchline-container`. Key components have no mobile responsiveness rules:
  * **Atelier Panel Squeeze:** On mobile viewports (e.g., width 375px), `.atelier-panel` retains its `width: 45vw` and `padding: 0 6vw`. The text container becomes only ~120px wide, squeezing uppercase paragraphs into a column of single words. This renders the Atelier copy unreadable.
  * **Editorial Grid Column Collapse:** The two-column grid `.editorial-container` (`grid-template-columns: 1fr 1fr`) does not collapse to a single column on mobile. The text column and image frame are squeezed into 50% width columns, causing text overlaps and miniscule images.
  * **Viewport Header/Footer Overcrowding:** The logo `LATERITE` and three nav links (`STUDIO`, `PORTFOLIO`, `JOURNAL` with `3rem` gaps) will collide and overflow on narrow mobile screens.
  * **Outro Metadata Flex Overflow:** `.outro-footer-metadata` (`display: flex; gap: 4rem;`) does not allow wrapping, which will force horizontal page scroll on small viewports.
* **Touch Target Violations (WCAG < 44px):**
  * Nav links (`STUDIO`, `PORTFOLIO`, `JOURNAL`) are unpadded text elements with a height of ~12px, violating the 44x44px touch target guidelines.
  * The concierge inquiry capsule (`.concierge-inquiry-capsule` in the header/footer) has a height of ~40px, which falls short of the 44px threshold.
  * The `.audio-control` element (which is missing from the markup but styled in CSS) has `padding: 0.5rem 0`, creating a vertical height of ~28px.

---

## 6. Animations & Scroll Pinning Layout Impact
* **GSAP Pinning Constraints:** Act I pinning (`end: '+=300%'`) and Act III pinning (`height: 400vh`) are driven by GSAP. Pin-spacers are injected dynamically. 
* **3D Cylinder Resize Vulnerability (`vertical.html`):**
  * In `vertical.html`, the 3D cylinder carousel radius is calculated dynamically on load:
    ```javascript
    const radius = Math.round((window.innerHeight * 0.75 / 2) / Math.tan(Math.PI / numCards));
    ```
  * However, there is no event listener to recalculate this radius when the window is resized or the device is rotated. This causes the 3D geometry of the cylinder cards to distort, overlap, or exhibit visual gaps after a resize event.
  * The parent wrapper `.infinite-wrapper` has `pointer-events: none` to let scroll events reach the body. However, because child cards have `pointer-events: auto`, click/hover interactions on elements inside the cards will be highly inconsistent across browsers.

---

## 7. Verification of Implementer Claims (CRITICAL FINDINGS)
We audited the claims in `worker_underlay_storytelling/handoff.md` and found a significant delta between their report and the actual codebase:
1. **Redundant Videos Still Exist:** The implementer claimed to have removed the 8 redundant video elements from the DOM and replaced them with the `#master-bg-video-container` underlay. In reality, **all 6 room video elements remain present in the DOM in `index.html`** and are configured to preload and autoplay, resulting in 8 active videos (the underlay videos + the room videos).
2. **Missing Underlay Logic:** The `transitionToVideo` helper, active video swapping, and GSAP cross-fading timeline logic are **completely missing** from `src/main.ts`. The `#master-bg-video-container` elements exist in the HTML but are left empty (`src` is undefined) and render nothing.
3. **Audio Control Markup Missing:** The `.audio-control` and `.audio-equalizer` markup is completely missing from `index.html`, resulting in dead CSS styles and a broken click listener in `main.ts`.
4. **Horizontal Variant is Completely Unstyled:** `horizontal.html` links to `/src/style.css`, but the file `src/style.css` contains zero definitions for the horizontal gallery, rendering it broken. The script `src/horizontal.ts` is also a blank console log placeholder.

---

## 8. Summary of Actionable Layout & Spacing Violations

| Issue Location | Element Class | Violation Type | Description / Impact |
| :--- | :--- | :--- | :--- |
| `src/style.css` | `:root` | Spacing System | Absence of a named, semantic spacing scale (variables). |
| `src/style.css` | Multiple | Fluid Layout | Lack of `clamp()` in paddings, margins, and gaps. |
| `src/style.css` | `.atelier-panel` | Responsiveness | Fixed `width: 45vw` forces text collapse on mobile viewports. |
| `src/style.css` | `.editorial-container` | Responsiveness | Dual columns do not collapse to a single column on mobile. |
| `src/style.css` | `.outro-footer-metadata` | Responsiveness | Flexbox gap lacks wrap behavior, causing horizontal overflow. |
| `index.html` | `.nav-links a` | Touch Target | Height and width of links are less than 44x44px. |
| `index.html` | `.concierge-inquiry-capsule` | Touch Target | Height is ~40px, failing the WCAG touch target guideline. |
| `index.html` | `.room-caption` | Visual Contrast | Removal of the room vignette creates legibility issues over bright video frames. |
| `horizontal.html` | `.gallery-container` | Layout Structure | Missing CSS styles for the horizontal variant, rendering it broken. |
| `vertical.ts` | `.infinite-content` | Responsiveness | 3D cylinder radius is static and does not recalculate on window resize. |
