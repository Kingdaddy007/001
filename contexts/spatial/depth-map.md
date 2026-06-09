# DEPTH MAP: THRESHOLD by Adebayo

This document defines the 3D layering, hover/pointer event behaviors, and text-overlapping rules.

---

## 1. Z-Index Stack & Layers

| Z-Index | Layer Name | Selector / DOM Target | Pointer-Events | Role / Content |
| --- | --- | --- | --- | --- |
| `z-index: 30` | Foreground Portal | `.hero-portal-frame` | `none` | Transparent WebP concrete portal frame. Scales up to pass the screen boundaries on scroll. |
| `z-index: 20` | Engraved Text | `.hero-title-container` | `none` | Statically positioned Cormorant Garamond display title and Montserrat subhead. |
| `z-index: 10` | Background Room | `.hero-background-room` | `none` | The destination brutalist room image (`living_monolith_room.webp`). |

---

## 2. Overlap & Interaction Rules

- **Engraved Illusion:** The text is styled with a subtle `text-shadow: 1px 1px 0px rgba(0,0,0,0.5), -1px -1px 0px rgba(255,255,255,0.1)` to simulate being physically carved into the concrete face of the portal frame.
- **Z-Axis Zoom Sync:** Both the `.hero-portal-frame` and `.hero-background-room` are animated using GSAP ScrollTrigger, locking their scale ratios to create a realistic perspective depth change (moving through the opening).
- **Light Angle Coordination:** Pointer movement over the window triggers a subtle tilt in the CSS shadow angle variables (`--shadowAngle`), shifting the raking shadows slightly to make the surface react to hover.

---

## 3. Mobile Simplification

- **Scale Disable:** On mobile viewports, complex Z-axis pushes are disabled. 
- **Simple Scroll:** The viewport is not pinned. The portal frame sits statically at the top, and scrolling down simply moves the viewport past it using standard browser mechanics, avoiding GPU layout overload.
