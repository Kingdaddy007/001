# DESIGN DOCUMENT: THRESHOLD by Adebayo

**Version:** Gold v1.0
**Type:** Visual identity source of truth
**Layer:** Visual system and tokens

---

## 1. Aesthetic Direction

This design behaves like a luxury editorial magazine and a physical museum. It is characterized by absolute dark obsidian canvases, massive vertical board-formed concrete slabs, raw material textures, and dramatic sunlight beams.

* **Aesthetic Descriptors:** Monolithic layout, chiaroscuro lighting, editorial serif titles, zero borders, generative light masking, heavy scroll friction.
* **Aesthetic Bans:** Flat gray backgrounds, centered card grids, floating navigation blurs, bouncy reveals, generic illustrations.

---

## 2. Design Tokens

### Color Tokens
We enforce the BEVAMPED 70/20/10 rule adapted for THRESHOLD:
* **70% Base (Obsidian Shadow):** `--bg-primary: #09090B;` (Base shadow canvas)
* **20% Support (Bone/Cement Gray):** `--text-primary: #E4E4E7;` (High-contrast typography)
* **10% Accent (Amber Sunlight):** `--accent-primary: #D97706;` (Sunlight reveals & CTAs)

```css
:root {
  --bg-primary: #09090B;
  --bg-surface: #18181B;
  
  --text-primary: #E4E4E7;
  --text-secondary: #A1A1AA;
  --text-muted: #52525B;
  --text-inverse: #09090B;

  --accent-primary: #D97706;
  --accent-hover: #F59E0B;
  
  --glass-bg: rgba(9, 9, 11, 0.5);
  --glass-border: rgba(228, 228, 231, 0.1);
  --glass-blur: 12px;
}
```

### Typography System
* **Display Font:** `Cormorant Garamond` (Elegant, bold, serif, high contrast. Used for display titles. Never italicized).
* **Body/UI Font:** `Montserrat` (Clean geometric sans-serif, wide-tracked. Used for body text, button labels, and metadata).

```css
:root {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Montserrat', Helvetica, sans-serif;
}
```

#### Type Scale
* `display-xl`: `5.5rem` / line-height: `1.0` / weight: `700` (Hero display title)
* `display-lg`: `3.5rem` / line-height: `1.1` / weight: `600` (Section headings)
* `body`: `1.0rem` / line-height: `1.6` / weight: `300` (Montserrat body text)
* `label`: `0.75rem` / line-height: `1.0` / weight: `400` / tracking: `0.35em` (Caps UI buttons, metadata)

#### Mobile Type Scale (Under 768px)
* `display-xl` → `2.75rem`
* `display-lg` → `2.0rem`

### Spacing & Grid System
* **Outer Margin Padding:** `10%` viewport margins (e.g., `10vw` padding on left and right).
* **Density Cap:** Maximum `30%` of viewport space can hold content. `70%` must breathe as empty shadow/space.
* **Body Copy Width:** Maximum `540px` wide.

---

## 3. Component CSS Baseline

### The Monolith Wrapper
```css
.hero-monolith-container {
  position: absolute;
  right: 10%;
  top: 0;
  width: 30vw;
  height: 100vh;
  z-index: 30;
  overflow: hidden;
}

.hero-monolith-pillar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  mask-image: radial-gradient(circle 120px at var(--mouseX, 50%) var(--mouseY, 50%), white 0%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle 120px at var(--mouseX, 50%) var(--mouseY, 50%), white 0%, transparent 100%);
}
```

### The Editorial Text Block
```css
.hero-title-container {
  position: absolute;
  left: 10%;
  top: 35vh;
  width: 55vw;
  z-index: 20;
  pointer-events: none;
}

.hero-title {
  font-family: var(--font-display);
  font-size: var(--display-xl);
  color: var(--text-primary);
  text-transform: uppercase;
  margin: 0 0 2rem 0;
}

.hero-subhead {
  font-family: var(--font-body);
  font-size: var(--body);
  font-weight: 300;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 450px;
}
```

---

## 4. Motion Duration & Easing Scale (Glacial Personality)

| Action | Duration | Easing | Role |
| --- | --- | --- | --- |
| **Pillar Entrance** | `2.5s` | `power3.out` | Monolith rise on page load |
| **Headline Stagger** | `1.2s` | `power4.out` | Staggered letters fade-and-slide |
| **Curtain Veil Wipe** | Scroll-bound | Linear (Scrub) | ScrollTrigger linked wipe reveal |
| **Interactive Spotlight** | Pointer-move | Linear with lag | Cursor spotlight mask movement |

---

## 5. Accessibility Non-Negotiables

- **Contrast Ratios:** Minimum 4.5:1 for body copy. High contrast bone-gray on obsidian black ensures > 10:1.
- **Prefers-Reduced-Motion:** Check media query `@media (prefers-reduced-motion: reduce)` to disable vertical sliding entry, scale wipe transitions, and cursor shadow masks.
- **Alt Text:** Every image layer must have descriptive, literal alternative text (e.g. `alt="A vertical board-formed concrete column with deep cracks, illuminated by side studio lighting"`).

---

## 6. The Spatial Narrative (3-Act Structure)

The structural architecture of the website is built sequentially to guide the user from philosophy to architecture, and finally to tactile materials.

* **Act I: The Threshold (Hero Event).** A pinned, immersive video background introducing the spatial philosophy. The scrolling reveals three punchline text blocks ("The noise stays outside" -> "We do not decorate" -> "Every room is a threshold").
* **Act II: The Descent (Vertical Rooms).** 6 vertically scrolling, massive architectural room videos. Each takes up 100svh. They are: 01 / THE MONOLITH, 02 / THE SANCTUARY, 03 / THE VAULT, 04 / THE CORRIDOR, 05 / THE STUDY, 06 / THE ARCHIVE.
* **Act III: The Vault (Horizontal Fisheye Gallery).** A horizontal scrolling 3D fisheye gallery displaying 6 macro closeups of raw luxury materials (Calacatta Viola, Smoked Oak, Brushed Brass, Travertine, Nero Marquina, Linen Textures).
