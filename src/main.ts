import './style.css'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 1. Lenis Smooth Scroll Foundation
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

const mm = gsap.matchMedia()

const heroContainer = document.querySelector('.hero-container') as HTMLElement
const threshold = document.querySelector('.threshold') as HTMLElement
const thresholdText = document.querySelector('.threshold-text') as HTMLElement
const sanctuaryVideo = document.querySelector('.sanctuary-video') as HTMLVideoElement
const methodSection = document.querySelector('.method-section') as HTMLElement
const punchlines = gsap.utils.toArray('.punchline-text') as HTMLElement[]

// 2. The Apple-Style Cinematic Experience
mm.add("(prefers-reduced-motion: no-preference)", () => {
  
  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: heroContainer,
      start: 'top top',
      end: '+=400%', 
      scrub: 1.2,
      pin: true,
      anticipatePin: 1,
    }
  });

  // A: The Cinematic Window (Open the Door)
  masterTl.to(thresholdText, { scale: 20, opacity: 0, ease: "power2.inOut", duration: 0.8 }, 0)
    .to(threshold, { backgroundColor: "rgba(9, 9, 11, 0)", ease: "power2.inOut", duration: 0.6 }, 0.2);

  // B: The Punchline Reveals (Gentle Dissolve)
  let startTime = 0.2; // Start practically immediately as the door opens
  punchlines.forEach((el, i) => {
    // Gentle drift up and slow dissolve IN (no harsh masking from 'under the ground')
    masterTl.fromTo(el, 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, ease: "power1.out", duration: 2.0 }, 
      startTime
    );
    
    // Hold prominently on screen for a very long time, then slowly dissolve OUT
    if (i < punchlines.length - 1) {
      masterTl.to(el, {
        y: -40, opacity: 0, ease: "power1.inOut", duration: 2.5
      }, startTime + 5.0); // Held perfectly on screen for 3 full relative units
    }
    
    // Start the next text while the current one is still slowly fading out to eliminate any empty gaps
    startTime += 6.5; 
  });

  // 3. The Flush Transition (Darken Hero)
  // With scaling removed, the method section will smoothly scroll up flush against the video. We darken the video naturally as it goes.
  gsap.fromTo(sanctuaryVideo, 
    { filter: 'brightness(1)' },
    { 
      filter: 'brightness(0.3)', // Deep shadows
      ease: "none",
      scrollTrigger: {
        trigger: methodSection,
        start: "top bottom", // Starts as soon as methodSection enters the screen
        end: "top top",      // Ends when it fully covers the hero
        scrub: true,
      }
    }
  );
})

// Reduced Motion Fallback
mm.add("(prefers-reduced-motion: reduce)", () => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: heroContainer, start: 'top top', end: 'bottom top', scrub: true }
  });
  tl.to(thresholdText, { opacity: 0, duration: 0.5 }, 0)
    .to(threshold, { opacity: 0, duration: 0.5 }, 0.5);
})
