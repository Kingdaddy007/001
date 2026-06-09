# SHOWROOM CHOREOGRAPHY: THRESHOLD by Adebayo

This document specifies the interactive media choreography for the showroom entrance (The Sanctuary Return).

---

## Section 1: The Dark Threshold (Hero Hook)

* **Journey Stage:** Atmosphere / Hook.
* **Belief/Proof Job:** Establish absolute silence, proving that Adebayo curates space by stripping away noise.
* **Primary Room/Object/Material:** Pure Typography on Obsidian Black.
* **Media Type:** CSS/DOM Native (No media).
* **Scroll Behavior:** Pinned viewport. As the user scrolls down, the massive hero typography ("THE NOISE STAYS OUTSIDE") scales up massively on the Z-axis and fades out, simulating walking through a heavy, dark door.
* **Text Zone:** Absolute center.
* **Reveal Rhythm:** Z-axis Zoom/Depth push on the text layer bound directly to scroll progress (linear scrub).
* **Motion Track:** Scroll-bound.
* **Fallback (Mobile):** Simple vertical scroll text fade.
* **Asset Prompt Required:** No.

---

## Section 2: The Sanctuary Return (Transition Video)

* **Journey Stage:** Taste / Atmosphere.
* **Belief/Proof Job:** Show the serene, warm sanctuary waiting inside the home.
* **Primary Room/Object/Material:** Steadicam video moving into the sunlit living room.
* **Media Type:** High-definition Seedance/Gen-3 video loop.
* **Scroll Behavior:** The video container is revealed immediately underneath the fading typography from Section 1. 
* **Text Zone:** Bottom-left quadrant ("THE CURATION OF SILENCE").
* **Reveal Rhythm:** Playhead-controlled.
* **Motion Track:** Ambient Video (playing) while the container parallax scrolls.
* **Fallback (Mobile):** Fallback to the static "After" image.
* **Asset Prompt Required:** Yes (Steadicam push Seedance video prompt).

---

## Section 3: The Transformation Proof (Before/After)

* **Journey Stage:** Authority / Proof.
* **Belief/Proof Job:** Prove spatial intelligence by showing the raw chaos before the design.
* **Primary Room/Object/Material:** A messy construction site vs. the final golden room.
* **Media Type:** CSS Mask / Image Slider using GSAP.
* **Scroll Behavior:** The images are stacked. As the user scrolls down, a GSAP `clipPath` mask physically wipes across the "Before" image to reveal the "After" image underneath it.
* **Text Zone:** Vertical right edge ("FROM CHAOS TO CLARITY").
* **Reveal Rhythm:** Scrub-bound to scroll progress.
* **Motion Track:** Scroll-bound interaction.
* **Fallback (Mobile):** Stacked images fading in.
* **Asset Prompt Required:** Yes (Before construction site image prompt).
