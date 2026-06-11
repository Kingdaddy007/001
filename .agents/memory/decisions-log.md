# Master Architecture Decisions

- **Aesthetic Core:** Tropical Modernism. "A sanctuary is not a sealed fortress. It is a sequence of breathable thresholds."
- **Typography:** Display fonts for titles, heavily tracked uppercase sans-serif for descriptions, formatted as tight, museum-style gallery labels in the bottom left to avoid obscuring immersive videos.
- **Act II Structure:** A 6-room sequence (Portico, Bath, Wardrobe, Transit, Salon, Reserve) using full-screen looping `video` elements with `object-fit: cover` mapped to GSAP ScrollTriggers.
- **Act III Structure:** Pinned Stop-Motion Material Index (6 swatches) replacing the horizontal fisheye slider. Swatch sizes are mapped to the native PNG aspect ratios to prevent clipping/stretching, and loading placeholders are handled dynamically in JS. Tag overlays are simplified into minimal museum captions.
