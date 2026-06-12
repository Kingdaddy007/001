# Master Architecture Decisions

- **Aesthetic Core:** Tropical Modernism. "A sanctuary is not a sealed fortress. It is a sequence of breathable thresholds."
- **Typography:** Display fonts for titles, heavily tracked uppercase sans-serif for descriptions, formatted as tight, museum-style gallery labels in the bottom left to avoid obscuring immersive videos.
- **Act II Structure:** A 6-room sequence (Portico, Bath, Wardrobe, Transit, Salon, Reserve) using full-screen looping `video` elements with `object-fit: cover` mapped to GSAP ScrollTriggers.
- **Act III Structure:** Pinned Stop-Motion Material Index (6 swatches) replacing the horizontal fisheye slider. Swatch sizes are mapped to the native PNG aspect ratios to prevent clipping/stretching, and loading placeholders are handled dynamically in JS. Tag overlays are simplified into minimal museum captions.

### June 12, 2026: Finalized Act II Parallax
- **Decision**: The "Cylinder Parallax" with 3D tilt perspective is the official visual language for Act II, rather than a flat overlapping deck. The flat deck was preserved in cinematic-motion/reference/flat-overlapping-parallax-deck.md for future use, but the spatial presence of the curved cards is preferred here.
- **Styling**: inset: 1vh 1.5vw on the cards. This maximizes screen space for the video while preserving just enough edge to reveal the 40px rounded corners and a slice of the dark cinematic background beneath it.
- **Codebase Health**: Fallow audit confirmed 0 dead code/dependencies. However, main.ts is flagged as a high-complexity hotspot (CRAP 132.0). Refactoring the GSAP scripts into smaller module files should be prioritized before the next major feature.
