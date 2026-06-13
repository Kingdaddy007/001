# Handoff Report: Layout & Rhythm Audit

**Date:** 2026-06-13  
**Author:** explorer_layout_audit  
**Status:** Task Complete (Hard Handoff)  

---

## 1. Observation

I conducted a thorough, read-only analysis of the layout, spacing, hierarchy, and rhythm properties of the project's source code. Below are the direct observations from the audited files:

### A. Spacing System and Scales
In `src/style.css`, there are no defined semantic spacing variables (like `--space-xs`, `--space-sm`, etc.) in the `:root` block (lines 2–22). Instead, spacing properties use hardcoded, scattered values:
* Viewport header padding: `padding: 2.5rem 6vw;` (`src/style.css` line 131)
* Viewport footer offset and padding: `bottom: 2.5rem; padding: 0 6vw;` (`src/style.css` line 166)
* Sibling element margin: `margin-bottom: 2rem;` on `.atelier-title` (`src/style.css` line 360) and `margin-bottom: 1.5rem;` on `.atelier-body p` (`src/style.css` line 372)
* Section label and bridge spacing: `margin-bottom: 1.5rem;` on `.bridge-number, .section-label` (`src/style.css` line 401) and `.bridge-headline` (`src/style.css` line 411)
* Outro margin: `margin-top: 4rem;` and `padding-top: 2.5rem;` on `.outro-footer-metadata` (`src/style.css` lines 786–788)
* No spacing properties utilize the `clamp()` function.

### B. Mobile Responsiveness Failures
In `src/style.css`, there is only a single media query:
```css
814: @media (max-width: 768px) {
815:   .quiet-nav { flex-direction: column; align-items: center; gap: 1rem; bottom: 2rem; padding: 0 1.5rem; }
816:   .punchline-container { width: 80%; right: 10%; }
817: }
```
As a result:
* **Atelier Panel:** `.atelier-panel` retains `width: 45vw` and `padding: 0 6vw` (line 327) on mobile, rendering the layout columns extremely narrow.
* **Editorial Columns:** `.editorial-container` retains `display: grid; grid-template-columns: 1fr 1fr;` (lines 555–561), meaning columns do not collapse vertically on mobile screens.
* **Outro Metadata:** `.outro-footer-metadata` retains `display: flex; justify-content: center; gap: 4rem;` (line 782) without wrapping, leading to horizontal scrolling on viewports under 400px.

### C. Touch Target Violations
In `index.html`:
* Nav links (lines 46–50) are unpadded inline-blocks with small text:
  ```html
  <nav class="nav-links">
    <a href="#">STUDIO</a>
    <a href="#">PORTFOLIO</a>
    <a href="#">JOURNAL</a>
  </nav>
  ```
* Consultation CTA (lines 55–57):
  ```html
  <div class="concierge-inquiry-capsule" tabindex="0">
    <span>Request a consultation</span>
  </div>
  ```
  The CSS padding is `0.8rem 2.2rem;` (`src/style.css` line 239) and font-size is `0.7rem`, yielding a vertical height of ~40px.

### D. Underlay Video Swapping and Parallax Discrepancy
* **Implementer Claim:** `worker_underlay_storytelling/handoff.md` (lines 14–18) claimed: "Removed redundant `<video>` tags in Hero Act I... Act II Room sections (Rooms 1 to 5)... Implemented the `transitionToVideo` underlay cross-fader helper."
* **Code Reality:** In `index.html` (lines 138–195), rooms 1 through 5 still contain raw, autoplaying video tags:
  ```html
  <div class="room-video-container">
    <video autoplay muted loop playsinline src="/videos/Tracking_push_through_portico_202606112043.mp4"></video>
  </div>
  ```
  The underlay video tags in `index.html` (lines 19–22) have no `src` attributes.
  In `src/main.ts`, the function `transitionToVideo` is entirely absent, and JS still queries the room videos for vertical parallax:
  ```typescript
  const roomVideo = (room as HTMLElement).querySelector('.room-video-container video');
  ```

### E. Broken Horizontal Variant
In `horizontal.html`:
* The markup defines `.gallery-pin-wrapper`, `.gallery-container`, and `.gallery-item` (lines 54–86).
* A search for `gallery` in `src/style.css` returns 0 matches, indicating these classes have no styles defined in the stylesheet.
* The script `src/horizontal.ts` contains only:
  ```typescript
  console.log("Horizontal scroll script loaded");
  ```

---

## 2. Logic Chain

1. **Spacing Monotony:** Since there are no tokenized variables for padding, margin, or gaps, developers have declared arbitrary values. The absence of `clamp()` in spacing means these values do not scale down on mobile or up on large displays, leading to poor layout balance across viewports.
2. **Responsive Column Collapse:** Because `.editorial-container` lacks a media query to override `grid-template-columns: 1fr 1fr`, the columns will remain split side-by-side even on small viewports. This squeezes portrait pictures and copy text into 180px widths, causing layout degradation.
3. **Legibility & Vignette:** The removal of `.room-vignette` from `style.css` leaves room titles overlayed directly on video frames. Even with text-shadow, scenes with bright or overexposed video content (e.g., steam baths, sun glares) will cause text legibility failure.
4. **Cylinder Resize Vulnerability:** In `vertical.ts`, the radius of the 3D cylinder is computed once on script initialization. When a user resizes their browser or rotates their device, the layout does not adjust, causing the cylinder cards to distort or separate.
5. **Implementation Gap:** The discrepancy between the claims in `worker_underlay_storytelling/handoff.md` and the actual codebase indicates that the underlay cross-fader feature was never successfully integrated, leaving 7 active videos playing in the DOM (Act II and underlay container) and causing major performance degradation.

---

## 3. Caveats

* **Build Environment:** The layout audit was performed statically by analyzing the workspace source code. Runtime layout checks are based on standard browser layout behavior for the CSS rules present.
* **Horizontal Intent:** It is assumed that `horizontal.html` was intended to have its gallery scroll horizontally via GSAP and custom styles, but this was never implemented.

---

## 4. Conclusion

1. **Systemic Spacing Debt:** The spacing system is completely un-tokenized and static. Spacing values do not adapt fluidly due to a lack of `clamp()`.
2. **Critical Mobile Layout Breaks:** Mobile layouts for the Atelier panel, Editorial columns, and Outro metadata will break due to missing breakpoints and responsive styles.
3. **Legibility Risks:** Captions in Act II are prone to readability failures due to the missing vignette overlay.
4. **Cylinder Distortions:** The vertical cylinder carousel breaks upon viewport resize.
5. **Major Incomplete Task:** The video underlay optimization and horizontal variant styling are incomplete, contradicting the claims of the previous implementer.

---

## 5. Verification Method

To verify these layout issues and discrepancies:
1. **Search for Spacing Tokens:** Search `src/style.css` for `--space-` or `clamp(` inside margins/padding/gaps. It will yield zero matches.
2. **Verify Mobile Grid Behavior:** Inspect `.editorial-container` in `src/style.css` and verify that no media query targets columns for width collapse.
3. **Verify Redundant Videos:** Run `grep -n "<video" index.html` to confirm that 7 separate video tags remain in the body, confirming the DOM video count overhead.
4. **Recalculate Resize Listener:** Inspect `src/vertical.ts` to confirm there is no `resize` event listener updating the `radius` and `transformOrigin`.
