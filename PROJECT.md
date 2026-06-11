# Project: THRESHOLD by Adebayo - Master Underlay & Storytelling Section

## Architecture

To unify the website under a single master cinematic experience, we will introduce a persistent, viewport-fixed background video underlay (`#master-bg-video` at `position: fixed; inset: 0; z-index: -1;`) behind the entire site. Individual inline video elements in Act I (Hero) and Act II (Rooms) will be refactored to use this single underlay, and the new Act III (Storytelling) and Act IV (Outro) will scroll on top of it.

### Video Mapping
- **Act I Hero / Narrative Bridge:** `/Camera_push_into_room_202606091451.mp4` (cross-fades and scales dynamically).
- **Act II Rooms:** Room-specific videos cross-faded in sequence as each room section scrolls into viewport:
  - Room 1 (THE PORTICO): `/videos/Tracking_push_through_portico_202606112043.mp4`
  - Room 2 (THE BATH): `/videos/Steam_rises_from_bathtub_202606091909.mp4`
  - Room 3 (THE WARDROBE): `/videos/Slow_push-in_toward_ottoman_202606091909.mp4`
  - Room 4 (THE TRANSIT): `/videos/Tracking_shot_down_hallway_202606091909.mp4`
  - Room 5 (THE SALON): `/videos/Slow_push_into_sunken_salon_202606112050.mp4`
- **Act III Client Hybrid Storytelling:** Placeholder videos cross-faded when quotes scroll into focus:
  - Intro / Testimonial 1: `/videos/lifestyle_1.mp4`
  - Testimonial 2: `/videos/lifestyle_2.mp4`
- **Act IV Outro / The Silent Gate:** Ambient/Ending loop:
  - Outro: `/videos/Static_camera_subtle_pan_left_202606091909.mp4` (or similar ambient loop).

### GSAP & ScrollTrigger State Machine
We will manage the active video source, opacity (cross-fade tweens), and scale factors by listening to ScrollTrigger events for each section. Since video loading can cause lag, we will keep multiple `<video>` elements inside `#master-bg-video` and cross-fade their opacities to ensure zero jump cuts or buffering delays, matching the "glacial easing doctrine" (1.2s to 2.5s duration).

---

## Code Layout
- `index.html` - Primary HTML template. Refactor `#assemblage-section` to `#storytelling-section`. Add `#master-bg-video` markup. Ensure Act IV Outro exists.
- `src/main.ts` - ScrollTrigger configurations, Lenis initialization, underlay cross-fades, text splits.
- `src/style.css` - Styles for the `#master-bg-video` (fixed, inset 0, z-index -1), `#storytelling-section` (vertical timeline layout, quotes text alignment), and Act IV Outro section styles.

---

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Exploration & Plan | codebase scan, asset verification, technical plan | none | PLANNED |
| 2 | M2: Master Underlay | implement `#master-bg-video` container and GSAP cross-fades for Acts I & II | M1 | PLANNED |
| 3 | M3: Storytelling Section | replace `#assemblage-section` with `#storytelling-section`, add client quotes timeline, wire lifestyle video cross-fades | M2 | PLANNED |
| 4 | M4: Outro Integration | implement/refine Act IV Outro, wire background video, complete scroll flow | M3 | PLANNED |
| 5 | M5: Verification & Audit | run build verification, run challenger stress tests, perform Forensic Audit | M4 | PLANNED |

---

## Interface Contracts

### HTML Structure
1. `#master-bg-video`:
   ```html
   <div id="master-bg-video">
     <!-- Persistent video elements with preloaded sources, controlled via JS opacities -->
   </div>
   ```
2. `#storytelling-section`:
   ```html
   <section id="storytelling-section" class="act-iii">
     <!-- Atmospheric Intro -->
     <!-- Testimonial Quote Blocks with timeline trigger markings -->
   </section>
   ```

### GSAP Controller API
- `underlayController.crossFade(toIndex: number, scale: number)` - Cross-fades to the target video index and applies scaling.
- Easing: Glacial, no bounce, linear scroll-bound scrubs or smooth GSAP transitions with durations of 1.2s to 2.5s.
