# Scroll Storyboard Contract
## THRESHOLD by Adebayo — Homepage

**Generated:** 2026-06-10
**Source documents:** `contexts/story.md`, `BEVAMPED_Brand_Rebirth_Doctrine.md`, `DESIGN.md`
**Skill:** `scroll-storyboard`
**Status:** Draft — awaiting approval before implementation

---

## Controlling Argument

> **"True architecture is not the addition of ornament, but the curation of silence. This site proves it by making you experience it."**

Every beat on this page is a new form of proof of that sentence — not a new topic.

---

## Register Map

The site operates in two registers:

| Register | Visual Language | Emotional Tone |
|---------|----------------|----------------|
| **DARK** | Obsidian black `#09090B`, massive display type, no imagery | Awe, weight, authority, silence |
| **LIGHT** | Full-bleed interior media, golden hour warmth, bone gray | Serenity, warmth, relief, trust |

**Total register changes: 2**
1. DARK → LIGHT: The Crossing (Beat 1.5) — motivated by the brand's claim that it engineers sanctuaries. The crossing IS the brand thesis made physical.
2. LIGHT → DARK: The Descent (Beat 3) — motivated by the need to show proof across multiple rooms without breaking the atmosphere. Dark register deepens focus.

---

## Anchor Objects

| Anchor Object | Role | Beats Active |
|---------------|------|-------------|
| **The Threshold Text** ("THE NOISE STAYS OUTSIDE.") | Opens the world, then explodes away to reveal it | Beats 1 → 1.5 |
| **The Staircase Typography** (We do not decorate / We sculpt volume and light / Making every room a threshold) | Teaches the brand philosophy as a physical structure; proves restraint through form | Beats 1.2 → 1.5 |
| **The Interior Film** (full-bleed steadicam video) | The proof-of-world. The sanctuary that was always behind the noise. | Beats 1.5 → 2 |
| **The Room Title Typography** (MONTSERRAT ALL-CAPS) | Orients the user in the dark gallery. Appears, breathes, fades. | Beats 3.1 → 3.N |
| **The Amber Light Line** | The thread of warmth that connects dark acts. Appears as guide-line detail in Act I, ambient accent in Act III. | Beats 1.2, 3.1, 4 |

---

## Beat Table

| Beat # | Label | Scroll Depth | Controlling Idea | What the User Sees | What the User Feels | Register | Anchor Object | Copy Mode | Transition Out |
|--------|-------|-------------|-----------------|-------------------|--------------------|---------|--------------------|-----------|---------------|
| **1.0** | **The Dark Portal** | 0vh – 0vh (immediate load) | *"This site is not like other sites. Brace."* | Pure Obsidian Black. Silence. One massive centered phrase — "THE NOISE STAYS OUTSIDE." — in Cormorant Garamond Bold at ~14vw. Nothing else. No nav. No hint. | Weight. Pause. Curiosity. | DARK | The Threshold Text | DECLARATIVE | — |
| **1.2** | **The Doctrine Revealed** | 0vh – 100vh (pinned, scrolls through) | *"We have a philosophy. It is structural, not decorative. The form proves it."* | As scroll begins: threshold text stays. The staircase lines appear sequentially from top-left, cascading with guide-lines that draw themselves. "We do not decorate / We sculpt volume and light / Making every room a threshold." | Intrigue. Reverence. The weight of a controlled idea. | DARK | The Staircase Typography | ATMOSPHERIC | PORTAL — threshold text scales to 25x, engulfs the screen, fades to white |
| **1.5** | **The Crossing** | ~100vh (end of pin) | *"The sanctuary you were promised is real. You have now entered it."* | The dark screen explodes open as the threshold text scales to maximum and disappears. The interior film appears — full-bleed. Steadicam holds. Sunlight on stone. | Relief. Warmth. Arrival. The gasp. | TRANSITION → LIGHT | The Interior Film | SILENT | DRIFT — viewport header and footer emerge as UI stabilizes |
| **2.0** | **Inside the Sanctuary** | 100vh – 200vh | *"Adebayo engineers the quality of light. This is what that means."* | Full-bleed interior video, scrubbing with scroll. The viewport header (THRESHOLD logotype left, navigation right) is now visible. Footer (audio control, inquiry capsule) anchors bottom. The headline — "THE CURATION OF SILENCE." — rests in the bottom-left third in quiet Cormorant. | Serenity. Possession. The feeling of belonging in an expensive room. | LIGHT | The Interior Film | ATMOSPHERIC | HARD CUT — film ends, darkness takes over, entering the gallery |
| **2.5** | **The Threshold Statement** | ~180vh – 200vh (within Act I pin tail) | *"We do not dress walls. We sculpt space."* | The staircase caption copy fades in below the film: "We do not dress walls. We sculpt space. Every line is a threshold." Set in Montserrat light, 0.9rem, wide tracked. | Quiet confirmation. Intellectual satisfaction. | LIGHT | The Staircase Typography (echoed) | EDITORIAL | ANCHOR HOLD → dissolve to DARK |
| **3.0** | **The Descent Begins** | 200vh onward (Act II opens) | *"Now you see the work itself. Room by room. Each one a different proof."* | The screen transitions to dark. A full-screen room video appears — room #1. The room title ("VOLUME") drops from silence. Snap-scroll governs pacing. | Focus. Gravity. The feeling of being inside a gallery at night. | DARK | The Room Title Typography | DECLARATIVE | ANCHOR HOLD — title fades, new room enters |
| **3.N** | **The Gallery Rooms** | 200vh – [N × 100vh] (one per room) | *"Every room is a different argument for the same point: silence is a design decision."* | Sequential full-screen rooms, each with its own title. Parallax scroll on the video (video moves slower than the user) creates depth within each frame. | Accumulation. Trust building. The rhythm of quality. | DARK | The Room Title Typography | DECLARATIVE (per room) | ANCHOR HOLD → next room |
| **4.0** | **The Proof of Transformation** | After gallery | *"You do not have to imagine the transformation. You will see it happen."* | Before/after wipe section. Raw concrete site on left. The finished golden room on right. GSAP scroll-wiper reveals the After as the user scrolls. Caption: "FROM CHAOS TO CLARITY." | Trust. Proof. Respect. The moment of seeing. | DARK (with amber wipe edge) | The Amber Light Line (as the wipe edge itself) | DECLARATIVE | DRIFT — wipe completes, before-image disappears, after-image expands |
| **4.5** | **The Horizontal Vault** | After transformation (Act III) | *"Each project is a room in our portfolio. You walk through them, not scroll past them."* | Gallery pin activates. Horizontal scroll. Cards/images arranged in a fisheye cylinder. 3D rotationY distortion on edge panels — items bend as they enter and exit the center. | Ownership. Pleasure. The feeling of physically browsing a private archive. | DARK | The Fisheye Gallery (the 3D form itself) | EDITORIAL (quiet captions per card) | ANCHOR HOLD → releases to INVITATION |
| **5.0** | **The Silent Gate** | Final section | *"We are selective. If this is for you, you already know."* | Sparse. Black. One line in Cormorant — "BEGIN WITH A DIAGNOSTIC." — and below it, in Montserrat wide-tracked caps: "REQUEST A DIAGNOSTIC AUDIT →". No social proof noise. No testimonial grid. | Confidence. The feeling of being trusted to self-qualify. | DARK | None (intentional — the silence IS the anchor) | INVITATION | — (final state) |

---

## Risk Zones

| Beat | Risk | Mitigation |
|------|------|-----------|
| Beat 1.5 (The Crossing) | This is the most important moment in the site. If the transition is slow, glitchy, or abrupt, the entire argument collapses. | The threshold text scale animation must be frame-perfect. Consider a white flash frame as a blink between registers — like a real camera shutter. |
| Beat 2.0 (Inside the Sanctuary) | The video must be strong enough to justify the darkness. A weak video breaks the promise of the threshold. | The interior film is the single highest-stakes asset on the site. It is not decorative. It is the argument. Treat it as such when selecting or generating it. |
| Beat 3.0 → 3.N (No anchor object for the gallery itself) | The anchor object "The Room Title Typography" is a content type, not a persistent visual object. If the titles are styled inconsistently or feel disconnected, the gallery feels like slides. | Define a rigid title system: always MONTSERRAT, always all-caps, always bottom-left, always same weight and tracking. The consistency IS the anchor. |
| Beat 5.0 (No anchor object — intentional silence) | Silence is a design choice that requires confidence. If the final section feels empty rather than restrained, the brand authority collapses at the last moment. | Ensure spacing is generous and deliberate. The absence of decoration must feel curated, not incomplete. One micro-detail (a thin amber line? the THRESHOLD logotype at minimum opacity?) can hold the register. |

---

## Integration Notes

| File | What Changes Based on This Storyboard |
|------|--------------------------------------|
| `index.html` | Section order matches: Beat 1 (hero-container) → Beat 1.2 (staircase-layout) → Beat 1.5/2.0 (video container inside hero pin) → Beat 2.5 (threshold statement) → Beat 3 (act-ii-wrapper + room-sections) → Beat 4 (transformation section — needs building) → Beat 4.5 (gallery-pin-wrapper) → Beat 5 (inquiry section — needs building) |
| `main.ts` | Pin duration for Act I should cover Beats 1.0–2.5. Register switch at Beat 1.5 can be supported by a class toggle on `body` (`.register-light`) tied to ScrollTrigger. Beat 4 transformation wiper needs a new scroll-trigger. |
| `style.css` | Register-scoped tokens: dark-register sections inherit from `--color-obsidian`, light-register sections inherit from a new `--color-sanctuary-bg` (warm bone). Typography stays consistent but copy mode determines scale and weight. |
| `story.md` | This storyboard is consistent with `story.md`. No contradictions found. Beat 2.5 ("The Threshold Statement") is an addition not in `story.md` — it earns its place as a bridge that closes Act I before the gallery begins. |

---

## What Does Not Exist Yet

These beats are defined but not yet built:

| Beat | Status | Priority |
|------|--------|---------|
| Beat 4.0 — Transformation Wiper | Not built | High |
| Beat 5.0 — The Silent Gate (Inquiry Section) | Not built | High |
| Beat 1.5 — The register-light class toggle on body | Not wired | Medium |
| Beat 2.5 — The Threshold Statement copy | Not in current HTML | Medium |

The current implementation covers Beats 1.0 → 3.N and 4.5. Beats 4.0 and 5.0 are the critical missing sections.
