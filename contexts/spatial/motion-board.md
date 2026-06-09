# MOTION BOARD: THRESHOLD by Adebayo

This motion board maps all states and timings using the **Glacial** motion personality specs.

---

## 1. Arrival Track

* **Static Render:**
  * No entry slide or fade-in for the concrete structure. The concrete portal frame is already present on viewport mount to preserve material truth.
* **Text Engraving Fade:**
  * *Selector:* `.hero-title-container`
  * *Tween:* `from { opacity: 0 } to { opacity: 1 }`
  * *Easing:* `power2.out`
  * *Duration:* `1.5s`
  * *Delay:* `0.2s`

---

## 2. Scroll-Bound Track (Camera Push)

* **Z-Axis Zoom Trigger:**
  * *ScrollTrigger Config:* `trigger: ".hero-section"`, `start: "top top"`, `end: "bottom top"`, `pin: true`, `scrub: 1`.
  * *Choreographed Animations:*
    * **Foreground Portal:** `scale: 4`, `opacity: 0` (Wipes past camera borders, easing: `power2.in`).
    * **Background Room:** `scale: 1` from `0.85` start, `opacity: 1` from `0` start (Pushes into full focus).
    * **Sunlight Shadow Swing:** CSS variable `--shadowAngle` rotates from `45deg` to `90deg` linearly with scroll position.

---

## 3. Interactive Track (Pointer Tilt)

* **Shadow Tilt Effect:**
  * *Trigger:* Mouse move over window.
  * *Logic:* Capture cursor X coordinate and shift `--lightOffset` variable by `+/- 15px` to simulate the sunlight angle warping slightly as the visitor moves.
  * *Easing:* Tick-interpolated lag of `0.1` to maintain heavy, sluggish concrete shadows.
