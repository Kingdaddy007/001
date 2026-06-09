# MATERIAL SCRIPT: THRESHOLD by Adebayo

This script defines the physical surfaces, light reflection behaviors, and the material-derived color system.

---

## 1. Dominant Materials

- **Board-Formed Concrete:** Coarse, heavy structural concrete with visible wooden grain lines left from the casting molds. Formed of dark gray portland cement.
- **Honed Travertine:** A warm, cream/sand colored travertine stone used for the focal furniture piece in Scene 2. Features matte finishes and open, unfilled pits.
- **Obsidian/Basalt:** Matte black igneous rock surfaces that absorb light completely, used for background structures and shadow zones.

---

## 2. Light Behavior & Refraction

- **Brutalist Chiaroscuro:** Light does not scatter softly; it cuts. We use directional raking sunlight that strikes surfaces at sharp angles, casting long, sharp-edged shadows.
- **Matte Surface Absorption:** All materials have a non-reflective, matte finish. There are no specular highlights, chrome reflections, or glossy glares. Light is absorbed or cast off as diffuse texture highlights.
- **Amber Glow:** Natural sunlight is rendered in a warm amber hue (`#D97706` / HSL `35, 84%, 48%`), simulating late-afternoon sun rays filtering into a dark, cool space.

---

## 3. Core Color Palette (Derived from Materials)

We enforce a strict 70/20/10 rule derived directly from the physical materials:

* **70% Base: Obsidian Shadow**
  * *Color:* `#09090B` (HSL `240, 10%, 4.1%`)
  * *Source:* Volcanic basalt and dark concrete shadows. Used for backgrounds and negative space.
* **20% Support: Bone/Cement Gray**
  * *Color:* `#E4E4E7` (HSL `240, 5%, 90%`)
  * *Source:* Cured portland cement and honed limestone. Used for text and highlight boundaries.
* **10% Accent: Amber Sunlight**
  * *Color:* `#D97706` (HSL `35, 84%, 48%`)
  * *Source:* Volumetric sun rays cutting through a concrete opening. Used exclusively for active highlights and CTA outlines.
