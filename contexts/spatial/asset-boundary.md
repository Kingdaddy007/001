# ASSET BOUNDARY: THRESHOLD by Adebayo

This document classifies all visual and interactive elements into their respective technical rendering layers.

---

## 1. Element Classifications

| Element / Layer | Selector / Selector Group | Tech Classification | Rationale & Responsibility |
| --- | --- | --- | --- |
| **Foreground Monolith** | `.hero-monolith-pillar` | **Image-native** | Requires high-fidelity, photorealistic texture of board-formed concrete. Cannot be simulated with pure CSS. |
| **Spotlight Mask** | `.cursor-spotlight-mask` | **SVG-native / CSS-mask** | Radial CSS gradient mask applied to the monolith container. Driven by pointermove coordinates. |
| **Headline Typography** | `.hero-title-container h1` | **CSS-native** | Standard DOM text styled with Google Fonts (`Cormorant Garamond`). Allows accessibility, SEO indexability, and character splitting. |
| **Subhead & Watermark** | `.hero-subhead`, `.watermark` | **CSS-native** | standard DOM text styled with Google Fonts (`Montserrat`). |
| **Background Shadow** | `.hero-background-panel` | **CSS-native** | Flat obsidian black background fill (`#09090B`). |
| **Living Room Scene** | `.hero-background-video` | **Video-native** | Compressed MP4 loop showing sunlight shifting over the brutalist interior space. |
| **Scroll Indicator** | `.scroll-indicator` | **SVG-native** | A thin, clean vertical line revealing scroll progression. |

---

## 2. Technical Dependencies & Libraries

- **GSAP (GreenSock Animation Platform):** Core animation engine for arrival, scroll triggers, and mouse spotlight lag.
- **GSAP ScrollTrigger:** Binds screen wipe (curtain veil) to vertical scroll progress.
- **Lenis:** Handles smooth-scrolling physics (heavy friction setup).
- **Google Fonts CDN:** Delivers `Cormorant Garamond` and `Montserrat` typographies.
