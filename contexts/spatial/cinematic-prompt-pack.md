# CINEMATIC PROMPT PACK: THRESHOLD by Adebayo

This prompt pack contains generative asset configurations derived from the "Sanctuary Return" spatial story. It includes all required Image and Video prompts.

---

## The Media Strategy

We are using **"The Sanctuary Return"** concept. 
To build this, you must generate three assets in total:
1. **The "After" Sanctuary Image** (The beautiful finished living room - already generated).
2. **The Sanctuary Return Video** (Generated directly from the "After" image to mimic walking into the room).
3. **The "Before" Construction Image** (To power the GSAP Transformation slider).

---

## 1. The "After" Sanctuary (IMAGE)

### Strategic Source
- **Role:** The destination. The absolute proof of Adebayo's mastery of light and material. 
- **Status:** Already generated (The Golden Hour Living Room).

---

## 2. The Sanctuary Return (VIDEO)

### Strategic Source
- **Role:** The hero experience. This video proves that Adebayo understands the *feeling* of coming home to a quiet sanctuary.
- **Workflow:** Use the **"After" Sanctuary Image** as your input image for the video generator (Seedance/Veo/Gen-3).

### Generative Configuration (Seedance / Luma / Runway Gen-3)

> `[Input Image: The Golden Hour Living Room Image]. Cinematic architectural film. A very slow, incredibly smooth, continuous forward camera push (dolly in) moving straight ahead into the room. The camera remains perfectly level at human eye-height. As the camera glides slowly forward, the warm golden-hour sunlight very subtly shifts across the textured stone wall on the right. Dust particles float gently in the light shafts. No jerky movements, no panning, no drone flying, no camera bending. Absolute serenity, museum-quality pacing, photorealistic lighting, 4k resolution.`

---

## 3. The "Before" Construction Site (IMAGE)

### Strategic Source
- **Role:** The contrast. This is used in the GSAP slider to show the chaotic, ugly state of the room *before* Adebayo designed it. It proves the value of the transformation.
- **Workflow:** You can use your "After" image as a style reference (`--sref`) or image prompt in Midjourney to get the same basic room shape, but turn it into a construction site.

### Generative Configuration (Midjourney v6.0)

> `/imagine prompt: A raw, messy, unfinished interior construction site of a modern living room. Exposed concrete walls, metal scaffolding, dust in the air, exposed wires hanging from the ceiling, bare concrete floor covered in debris. The same massive window exists on the left, but without glass, looking out at dirt. Harsh, flat construction lighting. Photorealistic, architectural documentary style, 8k resolution --ar 16:9 --v 6.0`
