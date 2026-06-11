# Implementation Plan - Direct Scroll Transition & Premium Kinetic Text Animations

This plan details the changes to refine the scroll transition from the squeezed hero video to the narrative bridge, avoiding the zoom-back effect, and introducing premium kinetic character/word-based reveals.

## User Review Required

> [!IMPORTANT]
> - **Direct Transition State:** Instead of expanding the video back to full-screen before transitioning, the squeezed video will be wiped away directly in its left-aligned frame using the horizontal blinds mask, while the `.atelier-panel` text on the right simultaneously fades out. This reveals the Centered Narrative Bridge underneath.
> - **Kinetic Character Reveal for "THE ATELIER OF SILENCE.":** Text is split character-by-character on page load. A custom GSAP keyframe sequence is introduced for each character. Rather than a sweep fade, each character slides up, slightly overshoots its vertical target, wobbles (shakes) left and right, and settles.
> - **Premium Word Stagger:** The description copy in the Atelier panel and the Narrative Bridge headline/body will use a staggered word-by-word reveal (`y: 20 -> 0`, fade-in, and blur-out filter transitions) rather than a block sweep.

## Proposed Changes

### 1. Motion & Mechanics

#### [MODIFY] [main.ts](file:///c:/Users/godsw/ANTIGRAVITY%20%20WORKSPACE/001/src/main.ts)
- **Text Splitting Utility:** Implement a robust DOM text-splitter `splitTextIntoSpans(element, type)` that preserves inline tags (like `<br>`) and structures words/characters into animatable spans with proper accessibility headers (`aria-label`, `aria-hidden`).
- **Timeline Re-Choreography:**
  - Remove the `.hero-container` clipPath reset to full screen (`inset(0)`).
  - Move the curtain reveal blinds mask animation to trigger directly from the squeezed state (starting at `8.4` instead of `8.0`).
  - Animate `.atelier-panel` and fixed navigation framing out concurrently during the blinds wipe (from `8.4` to `9.4`).
  - Introduce character-by-character keyframed kinetic jiggle on `.atelier-title .split-char` at `5.2`.
  - Introduce word-by-word stagger on `.atelier-body .split-word` at `5.8`.
  - Introduce staggered reveals on Narrative Bridge children (`.bridge-number`, `.bridge-headline .split-word`, `.bridge-body .split-word`, and `.bridge-scroll-indicator`) starting at `8.8` to synchronize with the blinds wipe.

#### [MODIFY] [style.css](file:///c:/Users/godsw/ANTIGRAVITY%20%20WORKSPACE/001/src/style.css)
- Add CSS rules for `.split-word` and `.split-char` (`display: inline-block`, `white-space: nowrap` for words to prevent wrapping bugs, and `will-change: transform, opacity, filter`).
- Ensure the underlay background and bridge text layouts remain perfectly aligned.

---

## Verification Plan

### Automated Tests
- Run `npm run build` to verify compiling is error-free.

### Manual Verification
- Scroll down past the staircase layout.
- Verify the video squeezes smoothly to the left, and `.atelier-panel` slides in.
- Verify the title letters "THE ATELIER OF SILENCE" animate with a kinetic shake/jiggle as they settle, and the paragraphs reveal word-by-word.
- Continue scrolling down. Verify that the video *does not* zoom back out to full screen.
- Verify that the squeezed video blinds-wipes away while the atelier text fades out, cleanly transitioning to reveal the centered "A sanctuary is not a single room" text on the warm umber background.
- Verify that scrolling back up reverses all elements smoothly without layout shifts or flashes of unstyled content.
