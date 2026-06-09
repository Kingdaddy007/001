# AUDIT ADAPTATION MAP: THRESHOLD by Adebayo

We adapt three key mechanics from the premium design audit reference library to structure the hero section of THRESHOLD.

---

## 1. Depth Sandwich & Curtain Veil (Adapted from Site 28: CALMM)

* **Adaptation:** The hero screen is constructed as a physical sandwich of three distinct depth layers:
  * *Background Layer:* Deep obsidian canvas (`#09090B`).
  * *Midground Layer:* The primary headline `FOR THOSE WHO SEEK SHELTER, NOT DECORATION` (Cormorant Garamond, massive scale).
  * *Foreground Layer:* Transparent, board-formed concrete monolith column layer.
* **The Curtain Veil:** As the user scrolls, this foreground concrete column scales up and wipes horizontally across the screen, acting as a portal mask that sweeps away the dark facade to reveal the bright, light-filled living room in the next section.
* **Assets Needed:** High-resolution transparent WebP concrete column file, absolute black CSS canvas, high-definition room transition video.
* **Motion Role:** Arrival (monolith rise) + Scroll-bound curtain veil wipe.
* **Why It Avoids Tidescape:** Rejects flat, single-layer templates where text simply floats on top of a static stock photo. It creates immediate three-dimensional architectural depth.

---

## 2. Governing Physics Sentence & Split Motion (Adapted from Site 23: Hool)

* **Adaptation:** The experience obeys a singular world law: "Mass blocks our view, and light reveals the way." Motion is strictly segmented into four roles:
  * *Arrival:* Monolith rises from the bottom (`y: 100%` to `0%`, 2.5s duration) with heavy vertical weight.
  * *Ambient:* Shifting natural sunlight loop inside the transition video.
  * *Interactive:* Custom pointer-move canvas mask. The cursor acts as a spotlight, casting a beam of sunlight that reveals the concrete's grain under the mouse, leaving the rest of the monolith in deep shadow.
  * *Scroll-bound:* Linear scrub of the curtain veil wipe.
* **Assets Needed:** Custom SVG/CSS clipping path mask tied to mouse coordinates, GSAP mouse-move event listener.
* **Motion Role:* Ambient, Arrival, Scroll-bound, and Interactive split.
* **Why It Avoids Tidescape:** Rejects generic, weightless CSS fade-in animations that look cheap and lack physical presence.

---

## 3. Stacked Full-Bleed Panels & Invisible UI (Adapted from Site 18: Estates)

* **Adaptation:** Once the curtain veil wipe is complete, the user enters a full-bleed spatial scene with zero visible UI borders, lines, or menus. The focus is entirely on the atmospheric video of concrete and sunlight. 
  * *Friction:* Lenis is configured with heavy initial resistance (1.5s duration, `power4.out` easing equivalent) so scrolling feels slow, deliberate, and expensive—forcing the user to linger on the details.
* **Assets Needed:** Lenis integration, bottom-right 24px watermark, minimal typography layout.
* **Motion Role:* Scroll-bound friction.
* **Why It Avoids Tidescape:** Rejects busy floating menus, social media widgets, and popups that break the sense of spatial serenity.
