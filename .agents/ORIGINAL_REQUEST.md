# Original User Request

## Initial Request — 2026-06-11T23:06:14Z

Replace the Material Index (Act III) with a client-focused storytelling section. The website will be unified under a single **Master Cinematic Background Video underlay spanning the entire site** (from Hero Act I through Act IV Outro), cross-fading and scaling dynamically as the user scrolls. The code will use placeholder filenames (e.g., `lifestyle_1.mp4`, `lifestyle_2.mp4`) for the storytelling section, letting the user drop in final videos.

Working directory: c:/Users/godsw/ANTIGRAVITY  WORKSPACE/001
Integrity mode: benchmark

## Requirements

### R1. Master Background Video Underlay
Create a single, persistent, viewport-fixed background video element (`#master-bg-video` at `position: fixed; inset: 0; z-index: -1;`) behind the entire site. As the user scrolls through different sections (Act I Hero, Act II Rooms, Act III Storytelling, Act IV Outro), the underlay must cross-fade and scale smoothly using GSAP and ScrollTrigger, replacing individual section video players.

### R2. Client Hybrid Storytelling Section
Replace the Material Index (`#assemblage-section`) with a client-focused storytelling section (`#storytelling-section`). This section must feature a poetic, atmospheric introduction about living in a BEVAMPED home, followed by a vertical scrolling timeline of real client testimonials (quotes, names, project contexts) overlaid on top of the fixed background video. As each testimonial scrolls into focus, the background video must cross-fade to a corresponding lifestyle video placeholder (`lifestyle_1.mp4`, `lifestyle_2.mp4`).

### R3. Visual Continuity & Glacial Easing
All transitions, text fades, and video cross-dissolves must follow the "glacial easing doctrine" (no bouncy reveals, no sudden jump cuts, linear scroll-bound scrubs, or smooth GSAP transitions with durations of 1.2s to 2.5s).

## Acceptance Criteria

### Master Underlay Implementation
- [ ] A single fixed container `#master-bg-video` sits behind all text sections.
- [ ] Scrolling between major sections triggers GSAP to cross-fade between the active video files.

### Client Storytelling
- [ ] The Material Index (`#assemblage-section`) is replaced with the new `#storytelling-section`.
- [ ] The section contains an atmospheric intro and at least two distinct client quotes.
- [ ] The quotes scroll vertically over the fixed background video.

### Asset & Build Integrity
- [ ] The storytelling video sources point to `/videos/lifestyle_1.mp4` and `/videos/lifestyle_2.mp4`.
- [ ] Running `npm run build` compiles the project successfully with zero errors.
