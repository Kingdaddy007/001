# HERO EVENT BLUEPRINT: THRESHOLD by Adebayo

## Composition Formula
* **Reference Model:** Cinematic Web Typography (Absolute black screen, massive centered serif typography acting as a physical barrier, hiding full-bleed video content).
* **Adaptation:** The screen is completely black. The headline copy sits dead center. It is the only element on the screen.

---

## States & Vectors

### 1. Start State
* **Viewport:** Pinned, scroll locked visually.
* **Background:** Absolute black (`#09090B`).
* **Foreground Typography:** Centered, massive ("THE NOISE STAYS OUTSIDE") (`scale: 1`, `z: 0`, `opacity: 1`).
* **Hidden Video Layer:** The Steadicam Sanctuary Video is positioned directly behind the text layer (`opacity: 0`, `scale: 1.1`).

### 2. The Physical Event (The Sanctuary Return)
* **Trigger:** Viewport Scroll via GSAP ScrollTrigger.
* **Vector 1 (Threshold Opens):** As the visitor scrolls, the typography scales massively on the Z-axis (towards the user, `scale: 10`) and fades to `opacity: 0`, giving the physical sensation of pushing through it.
* **Vector 2 (Sanctuary Reveal):** Simultaneously, the hidden video layer fades up to `opacity: 1` and scales down to `scale: 1`, creating an immersive parallax drop into the room. 
* **Vector 3 (Video Play):** Once the typography has cleared the screen, the Steadicam video plays, carrying the viewer forward into the room.

### 3. Final State
* **Viewport:** Scroll lock released, normal document flow resumes.
* **Typography:** Scaled out and hidden (`display: none` or `opacity: 0`).
* **Video Layer:** Full-bleed, playing normally (`scale: 1`, `opacity: 1`).
* **Secondary Elements:** The navigation and next section cues fade in.

---

## Assets Required
- `public/assets/sanctuary_return.mp4` (The Seedance Steadicam glide)
- `public/assets/sanctuary_after.webp` (Video fallback image)

---

## Reduced-Motion Alternative
For users with `prefers-reduced-motion` enabled:
- No Z-axis text push occurs.
- Scrolling down simply crossfades the black typography layer into the static sanctuary image over `500ms`.
