# A Professional Standard for Image and Video Generation Prompts

## Overview

This document defines a reusable, model-agnostic standard for writing **professional prompts for AI image and video generation**.
It synthesizes best practices from vendor docs (OpenAI, Microsoft, Runway), specialist blogs, and community frameworks for Stable Diffusion–style tools and modern video models.[^1][^2][^3][^4][^5][^6][^7][^8]
The goal is to give you a **single source of truth** and a **consistent template** that an AI agent (or human prompter) can follow to produce clear, controllable prompts for any visual task.[^2][^9]

This standard is intentionally:

- **Model-agnostic**: Works across DALL·E/GPT Image, Midjourney-like tools, Stable Diffusion UIs, Runway/Gen-4, Pika, Veo, Kling, and others.[^3][^4][^5][^8][^1]
- **Layered**: Core required fields plus optional advanced layers for cinematic control.
- **Composable**: Same mental model for images and videos, with video adding motion, camera, and timing.

***

## Global Principles for Visual Prompting

Regardless of model, professional visual prompting follows a few global principles.[^9][^6][^7][^2][^3]

1. **Outcome first**: Start from the final frame/shot you want, not from abstract ideas.
2. **Concrete over vague**: Prefer specific, visual language ("golden-hour light hitting wet cobblestones" over "cool city vibes").[^10][^6][^7]
3. **Physical, not conceptual**: Describe what the camera sees and how it moves, not just the concept (especially for video).[^4][^5][^8][^11]
4. **Simple core, then iterate**: Begin with a clean, focused prompt and add or adjust one layer at a time.[^5][^6][^8][^4]
5. **Positive phrasing**: Emphasize what you want rather than long lists of what to avoid, using negative prompts only where the model supports them.[^12][^4][^5]
6. **Consistent structure**: Use a stable field order so humans and agents can reason about changes.

***

## Universal Field Set (Both Image and Video)

At the highest level, **every professional visual prompt** in this standard is built from the same conceptual fields.[^6][^7][^8][^13][^5]

1. **Subject** – Who or what is in focus.
2. **Action / State** – What they are doing or what is happening.
3. **Environment / Setting** – Where it takes place and key environmental details.
4. **Style / Aesthetic** – Artistic style, medium, or cinematic look.
5. **Composition & Framing** – How elements are arranged in the frame.
6. **Lighting** – Type, direction, mood of light.
7. **Color & Mood** – Color palette and emotional tone.
8. **Technical Specs** – Aspect ratio, resolution hints, lens, camera type, etc.
9. **Quality Modifiers** – Fidelity and detail descriptors appropriate to the model.
10. **Constraints / Guardrails** – What to avoid (including ethical/safety constraints where the model supports them).

Images use all ten fields in a **single frame description**.
Videos use the same ten, but add **motion-specific fields**: subject motion, camera motion, scene evolution, duration, and pacing.[^8][^11][^4][^5]

***

## Canonical Image Prompt Template

### Structural Template

For images, the standard recommends a **five-part spine** (Subject → Style → Composition → Lighting → Modifiers), which is consistent with many pro guides.[^7][^13][^6]
A full prompt then expands each part using the universal fields.

**Canonical image prompt pattern (one line):**

> `Shot type and composition of [SUBJECT] [ACTION/STATE] in [ENVIRONMENT], [STYLE / MEDIUM], [LIGHTING], [COLOR & MOOD], [TECHNICAL SPECS], [QUALITY MODIFIERS][, NEGATIVE PROMPT / CONSTRAINTS]`

- The **order** should be stable but does not have to be identical across all tools; this pattern is chosen because many image models respond best when **subject and composition appear early**, followed by style and light.[^10][^12][^6][^7]
- **Technical specs** such as aspect ratio often need to be passed through UI controls or extra tokens; when supported in text, they should be placed near the end.

### Required vs Optional Fields

For robust, repeatable results, each image prompt **must** define at least these core fields:

- **Subject**
- **Action / State** (or static state if no action)
- **Environment / Setting**
- **Style / Medium**
- **Composition / Shot type**
- **Lighting**

The following fields are **recommended** where relevant:

- Color & mood
- Aspect ratio or orientation
- Quality modifiers ("highly detailed", "cinematic", etc.), used sparingly
- Constraints / negative prompt (for SD-like tools)

### Canonical Image Field Schema (for programmatic use)

For use in an AI skill or API, these can be represented as a schema (conceptual, not tied to a specific syntax):

```text
IMAGE_PROMPT = {
  subject: string,               # required
  action_or_state: string,       # required ("standing still" is acceptable)
  environment: string,           # required
  style: string,                 # required
  composition: string,           # required
  lighting: string,              # required
  color_mood: string,            # optional
  technical: {
    aspect_ratio: string,        # e.g. "16:9", "4:5", "1:1"
    lens_or_camera: string,      # optional; more relevant to photorealism
    resolution_hint: string      # optional; avoid impossible specs
  },
  quality_modifiers: string,     # optional; keep concise
  constraints: string            # optional; negative prompt / safety constraints
}
```

An agent generating prompts should **fill all required fields** explicitly and then serialize them into the canonical natural-language pattern.

### Example: Professional Image Prompt

**Use case:** Hero image for a landing page of an AI healthcare startup.

**Structured fields:**

- Subject: "young female doctor wearing a lab coat, standing confidently"
- Action / State: "looking at a transparent holographic medical interface"
- Environment: "modern hospital corridor with soft out-of-focus background"
- Style: "photorealistic, high-end commercial photography"
- Composition: "medium shot from waist up, centered subject, slight depth of field"
- Lighting: "soft daylight from large windows on the left, subtle rim light on hair"
- Color & mood: "cool blues and whites with a subtle teal accent, optimistic and clean"
- Technical specs: "16:9 aspect ratio"
- Quality modifiers: "sharp focus, high detail, cinematic"
- Constraints: "no text, no watermarks"

**Serialized canonical prompt:**

> `Medium shot from waist up of a young female doctor in a lab coat, standing confidently and looking at a transparent holographic medical interface in a modern hospital corridor with a softly blurred background, photorealistic high-end commercial photography, soft daylight from large windows on the left with a subtle rim light on her hair, cool blue and white palette with a hint of teal, optimistic and clean mood, 16:9 aspect ratio, sharp focus, high detail, cinematic, no text, no watermarks.`

This prompt follows the standard field order, uses concrete visual descriptors, and avoids vague language.[^13][^6][^7][^10]

***

## Canonical Video Prompt Template

Modern AI video tools (Runway Gen-4, Pika, Veo, Kling, Sora-like models) require the same semantic fields as images, plus **motion, shot type, camera movement, and duration**.[^11][^4][^5][^8]

### Structural Template

A widely used professional pattern is:

> `Shot type of [SUBJECT] doing [ACTION] in [ENVIRONMENT], [CAMERA MOVEMENT], [SCENE MOTION], [STYLE & LIGHTING], [TECHNICAL SPECS: lens, aspect ratio, duration, frame rate], [AUDIO / MUSIC if supported], [CONSTRAINTS]`

This aligns with published multi-layer frameworks for video prompt engineering.[^5][^8]

### Required vs Optional Fields for Video

**Required (core cinematic skeleton):**

- Subject
- Action (including emotional state)
- Environment / setting
- Shot type and framing
- Camera movement
- Duration (or approximate length)
- Style & lighting

**Recommended / optional:**

- Scene motion (what in the environment moves: weather, crowd, traffic, etc.)
- Technical specs (lens length, depth of field, frame rate, resolution if supported)
- Color & mood
- Audio / music descriptors
- Constraints / negative prompt
- Simple **time structure** (e.g., "0–2 seconds: close-up..., 2–4 seconds: camera pulls back..."), especially for more complex sequences.[^8][^11][^5]

### Canonical Video Field Schema

```text
VIDEO_PROMPT = {
  subject: string,                # required
  action: string,                 # required, include emotion/energy
  environment: string,            # required
  shot_type: string,              # required ("wide shot", "medium close-up")
  framing: string,                # required ("centered", "rule of thirds", etc.)
  camera_motion: string,          # required ("slow dolly forward", "static tripod")
  scene_motion: string,           # optional ("leaves blowing", "crowd walking")
  style: string,                  # required ("cinematic", "anime", "documentary")
  lighting: string,               # required
  color_mood: string,             # optional
  technical: {
    duration_seconds: int,        # required for most models (e.g., 4–8)
    aspect_ratio: string,         # e.g., "16:9", "9:16"
    lens_or_focal_length: string, # optional
    frame_rate: string            # optional ("24 fps cinematic", etc.)
  },
  audio: string,                  # optional (music/sfx, if model supports)
  structure: string,              # optional, time breakdown of key beats
  constraints: string             # optional
}
```

### Example: Professional Video Prompt

**Use case:** 6-second product teaser for an AI-powered fitness app.

**Structured fields:**

- Subject: "young athlete running on a nighttime city street"
- Action: "running towards camera with focused expression, sweat visible"
- Environment: "wet asphalt reflecting neon city lights, light rain in the air"
- Shot type: "medium tracking shot from waist up"
- Framing: "subject centered, background city lights creating bokeh"
- Camera motion: "steady handheld tracking backward, slight side-to-side movement"
- Scene motion: "light rain falling, car lights streaking softly in background"
- Style: "cinematic, high-contrast urban sports commercial"
- Lighting: "cool blue ambient city light with warm orange highlights from passing cars"
- Color & mood: "energetic, determined, high-intensity"
- Technical: duration 6 seconds, aspect ratio 16:9, 24 fps, simulated 50mm lens with shallow depth of field
- Audio: "pulsing electronic beat, distant city sounds"
- Structure: "entire 6 seconds is a single continuous shot, no cuts"
- Constraints: "no logos, no brand names"

**Serialized canonical prompt:**

> `6-second 16:9 cinematic medium tracking shot of a young athlete running towards the camera on a nighttime city street, wet asphalt reflecting neon lights and light rain in the air, subject centered waist up with background city lights creating soft bokeh, steady handheld camera tracking backward with slight side-to-side motion, cool blue ambient city light with warm orange highlights from passing cars, energetic high-contrast urban sports commercial style, shallow depth of field like a 50mm lens at night, sweat visible on the athlete's face, pulsing electronic beat and distant city sounds, single continuous shot with no cuts, no logos or brand names.`

This prompt follows industry guidance to focus on subject action, shot type, camera movement, and duration while keeping language concrete and physically grounded.[^4][^11][^5][^8]

***

## Model-Specific Considerations (Abstracted into the Standard)

While the standard is model-agnostic, different tools expect slightly different conventions.
This section lists the main differences and shows how the standard absorbs them.

### Image Models (DALL·E / GPT Image, Stable Diffusion, Midjourney-like)

- **DALL·E / GPT Image**: Respond well to detailed, natural language descriptions following the canonical pattern; aspect ratio may be set via UI or text tag.[^1][^6][^7]
- **Stable Diffusion-style UIs**: Support **positive** and **negative** prompts separately; the `constraints` field in the standard maps to the negative prompt box, with common boilerplate like "no text, no watermark, no distortions".[^12][^7]
- **Midjourney / similar**: Often encourage shorter, stylized prompts; the standard still applies, but fields may be compressed while preserving subject, environment, style, and lighting as minimum core.[^6][^12]

The skill using this standard should:

- Always fill full fields internally, then optionally **compress wording** for models that prefer shorter prompts.
- Map `constraints` to the appropriate negative prompt or tool options when available.

### Video Models (Runway Gen-4, Kling, Pika, Veo, Sora-like)

- Video models emphasize **movement, camera, and duration** more strongly than detailed static appearance.[^11][^4][^5][^8]
- Simpler prompts often perform better at the start; then users iterate by adding detail to specific layers (camera, style, action).[^4][^5][^8]
- Some tools (e.g., Kling) explicitly recommend the `SUBJECT + ACTION + SETTING + CAMERA + STYLE + AUDIO` pattern, which is a subset of the standard VIDEO_PROMPT schema.[^8]

An AI agent following this standard should:

- Always specify **subject, action, shot type, camera motion, duration, and aspect ratio**.
- Keep first drafts relatively compact, then refine one field at a time in follow-up prompts.

***

## Operational Pattern for an AI Skill

To turn this standard into a **reusable prompt-writing skill** for an AI agent, use the following operational pattern.

### 1. Interpret the User Request into Fields

Given a request like "Generate an image prompt of an anime doctor in a futuristic hospital," the agent should:

1. Identify **subject** ("anime doctor").
2. Infer or ask about **action/state** ("standing", "smiling", "using a tablet"), otherwise default to a neutral but explicit state.
3. Extract **environment** ("futuristic hospital" with more detail added by the agent).
4. Choose a **style** consistent with user intent ("detailed anime style"), clarifying if needed.
5. Set **composition, lighting, color & mood**, and minimal **technical specs** aligned to common use cases (e.g., 16:9 for banners, 4:5 for social posts).[^7][^13][^10][^6]

The agent should fill the full schema even if the user only supplied a short phrase.

### 2. Construct a Structured Internal Representation

Internally, the agent should create an object matching IMAGE_PROMPT or VIDEO_PROMPT, with defaults for missing fields.

Example (image):

```text
subject: "anime doctor in scrubs with stethoscope"
action_or_state: "standing confidently, smiling at the viewer"
environment: "sleek futuristic hospital corridor with glowing holographic medical displays"
style: "high-detail anime with soft shading"
composition: "medium shot centered with subtle leading lines down the corridor"
lighting: "bright, clean overhead hospital lighting with soft rim light behind the character"
color_mood: "cool whites and blues with a hopeful mood"
technical.aspect_ratio: "4:5"
quality_modifiers: "highly detailed, crisp line art"
constraints: "no text, no logos"
```

### 3. Serialize to a Canonical Prompt String

The agent then converts the structured representation to the canonical natural-language pattern.
It must preserve **field order** and **explicitly state** each core element.

Example serialization (image):

> `Medium shot of an anime doctor in scrubs with a stethoscope, standing confidently and smiling at the viewer in a sleek futuristic hospital corridor with glowing holographic medical displays, high-detail anime style with soft shading, bright clean overhead hospital lighting with a soft rim light behind the character, cool white and blue color palette with a hopeful mood, 4:5 aspect ratio, highly detailed crisp line art, no text or logos.`

### 4. Optional Compression or Adaptation per Model

When targeting specific generators, the agent may apply model-specific style rules **after** constructing the canonical prompt:

- Shorten for models that penalize very long prompts.
- Split constraints into dedicated negative-prompt fields.
- Convert aspect ratio to the UI or API parameter instead of text tokens.

The **canonical schema remains the source of truth**, even if final strings differ per tool.

### 5. Iterative Refinement Loop

For both images and videos, the standard assumes a **loop**:

1. Start with a prompt that follows the canonical structure.
2. Review output and identify which **field** needs adjustment (subject, style, camera, lighting, etc.).
3. Modify **one field at a time** and regenerate to isolate the effect.[^5][^6][^4][^8]

An AI skill can support this by storing the structured representation and updating fields instead of rewriting from scratch.

***

## Checklist: Minimum Professional Standard for Any Prompt

For quick use, any image or video prompt produced by an AI agent under this standard should satisfy the following checklist.

### Image Prompt Checklist

- Identifies a clear **subject** and what they/it are doing.
- Places the subject in a **specific environment**.
- Specifies **style/medium** (photo, 3D render, anime, painting, etc.).
- Defines **composition/shot type** (close-up, medium shot, wide shot, top-down, etc.).
- Describes **lighting** in physical terms (source, quality, direction, intensity).
- Includes **color & mood** (if relevant to the task).
- Mentions **aspect ratio or orientation** when known.
- Uses **concrete, visual language**, not vague adjectives alone.[^13][^10][^6][^7]
- States key **constraints** such as "no text" or "no logos" where necessary.

### Video Prompt Checklist

- Identifies **subject** and **action**, including emotional tone.
- Specifies **environment/setting**.
- Defines **shot type and framing**.
- Describes **camera motion** explicitly.
- Mentions **scene motion** where relevant.
- Specifies **style** and **lighting**.
- Includes **duration** and **aspect ratio**.
- Uses **simple time structure** for multi-beat shots where needed.[^11][^4][^5][^8]
- States any **audio/mood** cues if the model supports sound.

If any of these are missing, the agent should either infer sensible defaults or ask the user for clarification, then regenerate the prompt.

***

## How to Use This Document as a Skill

To implement this as a reusable **prompt-writing skill** in an AI agent:

1. **Store this schema and checklist** as the instruction set for the skill.
2. When the user requests an image or video prompt, the agent:
   - Parses the user request into the canonical fields.
   - Fills missing fields with defaults appropriate to the use case.
   - Constructs the structured IMAGE_PROMPT or VIDEO_PROMPT object.
   - Serializes it using the canonical pattern for images or video.
3. For advanced use, the skill can expose switches like:
   - `mode: "image" | "video"`
   - `verbosity: "compact" | "detailed"`
   - `target_model: "sd" | "dalle" | "runway" | "kling" | ...`

All variations still flow from the same **source of truth** defined in this document.
This ensures that every prompt your AI agency generates follows a consistent, professional pattern regardless of project or model.

---

## References

1. [OpenAI 4o Image Generation Guide](https://www.promptingguide.ai/guides/4o-image-generation) - Tips & Best Practices · If you hit the generation limit, ask ChatGPT how much time is left until you...

2. [Prompt engineering | OpenAI API](https://developers.openai.com/api/docs/guides/prompt-engineering) - Prompt engineering is the process of writing effective instructions for a model, such that it consis...

3. [Image prompt engineering techniques - Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/gpt-4-v-prompt-engineering) - Request explanations for generated responses, place the image before the text for single-image promp...

4. [Gen-4 Video Prompting Guide - Runway](https://help.runwayml.com/hc/en-us/articles/39789879462419-Gen-4-Video-Prompting-Guide) - This article covers different example structures, keywords, and prompting tips to help you get start...

5. [The Complete Guide to AI Video Prompt Engineering - Venice AI](https://venice.ai/blog/the-complete-guide-to-ai-video-prompt-engineering) - The six-layer framework for mastering AI video prompt engineering · 1. Subject and action · 2. Shot ...

6. [50 Best AI Image Prompts for AI Image Generators — OpenArt Blog](https://openart.ai/blog/best-ai-image-generator-prompts/) - Looking for the best AI image prompts? Discover 50 copy-paste prompt templates for portraits, anime,...

7. [Mastering AI Image Prompting for AI Image Generation](https://learnprompting.org/docs/image_prompting/introduction) - Image Prompting Techniques: This chapter outlines how to create consistent, high-quality images with...

8. [AI Video Prompt Engineering | metricsmule](https://metricsmule.com/ai/ai-video-prompt-engineering/) - For each prompt, strictly adhere to the framework: Start with the subject, describe the action vivid...

9. [Prompt Engineering Best Practices: Tutorial & Examples](https://launchdarkly.com/blog/prompt-engineering-best-practices/) - Structure your prompts clearly Use delimiters. Set clear boundaries. Break complex problems into ste...

10. [Prompt Engineering for Image Generative AIs](https://www.linkedin.com/pulse/prompt-engineering-image-generative-ais-how-mostly-get-gerald-yong-gvimc) - Here are 3 main tips. Do not use any text in the image. Be very specific in your prompt if you know ...

11. [How we Engineered a High-Quality AI Video Prompt (And ... - Reddit](https://www.reddit.com/r/PromptEngineering/comments/1mkuchf/how_we_engineered_a_highquality_ai_video_prompt/) - Hey everyone! I wanted to share a behind-the-scenes look at how we've been engineering prompts for A...

12. [Universal prompt template? : r/StableDiffusion - Reddit](https://www.reddit.com/r/StableDiffusion/comments/z509i9/universal_prompt_template/) - Pre-process prompts for text-to-image AI models like Stable Diffusion with large language models (fi...

13. [AI Image Prompts: Image Prompting Guide With Examples | LTX Blog](https://ltx.io/blog/ai-image-prompt-guide) - Learn how to write effective AI image prompts in 2026. Real examples for FLUX.2 Pro, Nano Banana Pro...

