# Common Patterns & Reusable Code

- **GSAP ScrollTrigger Pinned Sections:** We rely heavily on pinning sections and scrubbing animations (like scaling up videos or revealing text) linked to the scroll position.
- **Gallery Caption Lockup:** 
  ```html
  <div class="room-caption">
    <h2 class="room-caption-title">ROOM NAME</h2>
    <p class="room-caption-desc">Uppercase tracked description.</p>
  </div>
  ```
- **Video Background Layers:** Using `video { object-fit: cover; width: 100vw; height: 100vh }` combined with `z-index` layering to place typography smoothly over cinematic motion.
