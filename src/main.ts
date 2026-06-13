import './style.css'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)



// Force scroll to top on every page load — prevents GSAP from waking mid-animation
// when Chrome restores the previous scroll position
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

import { initSmoothScroll } from './utils/scroll'

// 1. Lenis Smooth Scroll Foundation
initSmoothScroll()

const actIiRooms = document.querySelectorAll('.room-section')

/**
 * Splits text contents into nested word/character spans for premium staggered reveals.
 * Preserves accessibility defaults and HTML5 inline elements like <br>.
 */
function splitTextIntoSpans(element: HTMLElement, type: 'chars' | 'words' = 'chars') {
  const originalText = element.textContent || '';
  element.setAttribute('aria-label', originalText);
  
  const childNodes = Array.from(element.childNodes);
  const newContent = document.createDocumentFragment();
  
  childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      const parts = text.split(/(\s+)/);
      
      parts.forEach((part) => {
        if (part.trim() === '') {
          newContent.appendChild(document.createTextNode(part));
        } else {
          const wordSpan = document.createElement('span');
          wordSpan.className = type === 'chars' ? 'word-wrapper' : 'split-word';
          
          if (type === 'chars') {
            const chars = part.split('');
            chars.forEach((char) => {
              const charSpan = document.createElement('span');
              charSpan.className = 'split-char';
              charSpan.textContent = char;
              charSpan.setAttribute('aria-hidden', 'true');
              wordSpan.appendChild(charSpan);
            });
          } else {
            wordSpan.textContent = part;
            wordSpan.setAttribute('aria-hidden', 'true');
          }
          newContent.appendChild(wordSpan);
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.tagName === 'BR') {
        newContent.appendChild(document.createElement('br'));
      } else {
        newContent.appendChild(el.cloneNode(true));
      }
    }
  });
  
  element.innerHTML = '';
  element.appendChild(newContent);
}

// Split text elements for kinetic and stagger reveals immediately on load
const atelierTitle = document.querySelector('.atelier-title') as HTMLElement;
const atelierParagraphs = document.querySelectorAll('.atelier-body p');
const bridgeHeadline = document.querySelector('.bridge-headline') as HTMLElement;
const bridgeBody = document.querySelector('.bridge-body') as HTMLElement;

if (atelierTitle) splitTextIntoSpans(atelierTitle, 'chars');
atelierParagraphs.forEach((p) => splitTextIntoSpans(p as HTMLElement, 'words'));
if (bridgeHeadline) splitTextIntoSpans(bridgeHeadline, 'words');
if (bridgeBody) splitTextIntoSpans(bridgeBody, 'words');

const mm = gsap.matchMedia()

// Act I Elements
const heroContainer = document.querySelector('.hero-container') as HTMLElement
const threshold = document.querySelector('.threshold') as HTMLElement
const punchlines = gsap.utils.toArray('.punchline-text') as HTMLElement[]
const actIForeground = document.querySelector('.act-i-foreground') as HTMLElement
// fallow-ignore-next-line complexity
mm.add("(prefers-reduced-motion: no-preference)", () => {
  
  // ==========================================
  // ACT I: THE THRESHOLD (Hero Sequence)
  // ==========================================
  // Generate SVG Rects for Horizontal Blinds Transition
  const BLIND_COUNT = 30;
  const blindsGroup = document.getElementById('blinds-group');
  const topRects: SVGRectElement[] = [];
  const bottomRects: SVGRectElement[] = [];
  const h = 1.0 / BLIND_COUNT; 

  if (blindsGroup) {
    for (let i = 0; i < BLIND_COUNT; i++) {
      const yStart = i * h;
      const centerY = yStart + (h / 2);
      
      const rectTop = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rectTop.setAttribute('x', '-0.05');
      rectTop.setAttribute('y', yStart.toString());
      rectTop.setAttribute('width', '1.1');
      rectTop.setAttribute('height', (h / 2 + 0.002).toString());
      rectTop.setAttribute('fill', 'white');
      blindsGroup.appendChild(rectTop);
      topRects.push(rectTop);

      const rectBottom = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rectBottom.setAttribute('x', '-0.05');
      rectBottom.setAttribute('y', centerY.toString());
      rectBottom.setAttribute('width', '1.1');
      rectBottom.setAttribute('height', (h / 2 + 0.002).toString());
      rectBottom.setAttribute('fill', 'white');
      blindsGroup.appendChild(rectBottom);
      bottomRects.push(rectBottom);
    }
  }

  // ==========================================
  // LATERITE FOG REVEAL ENTRANCE (Starts on Load)
  // ==========================================
  const arrivalTl = gsap.timeline({
    onComplete: () => {
      // Once fog completes, remove the SVG filter to free up GPU for the rest of the timeline
      gsap.set('#arrival-brand', { filter: 'none', clearProps: 'filter' });
    }
  });

  // Animate the fog reveal (No opacity fade! This fixes the scrolling reverse bug)
  arrivalTl.fromTo('#arrival-brand', 
    { letterSpacing: "0.1em" },
    { letterSpacing: "0.25em", duration: 3.5, ease: "power1.out" }, 0.5
  ).to('#arrival-blur', { attr: { stdDeviation: 0 }, duration: 2.5, ease: "power2.inOut" }, 0.5)
   .to('#arrival-displacement', { attr: { scale: 0 }, duration: 2.5, ease: "power2.inOut" }, 0.5);

  // ==========================================
  // MASTER TIMELINE (Scroll-Triggered)
  // ==========================================
  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.pinned-scene-wrapper',
      start: 'top top',
      end: '+=200%', 
      pin: true,
      scrub: 1, 
      anticipatePin: 1
    }
  });

    // Open the Door (Scale the SVG mask massively from the absolute center)
    masterTl.to('#mask-scale-group', { 
        scale: 120, 
        transformOrigin: "50% 50%", 
        ease: "power2.in", 
        duration: 1.5 
      }, 0)
      .to(threshold, { opacity: 0, ease: "power1.inOut", duration: 0.5 }, 0.8);

    // Fade in viewport header and footer once threshold opens
    masterTl.to(['.viewport-header', '.viewport-footer'], {
      autoAlpha: 1,
      duration: 1.0,
      ease: "power2.out"
    }, 0.8);

    // Staircase sequential build
    punchlines.forEach((el, i) => {
      const time = 1.0 + i * 0.45; // stagger line starts
      
      // Animate the text line slide up & fade in
      masterTl.fromTo(el, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.8 }, 
        time
      );

      // Find if this line has a guide-line and animate its width
      const guideLine = el.querySelector('.guide-line');
      if (guideLine) {
        masterTl.fromTo(guideLine,
          { width: "0vw" },
          { width: "12vw", ease: "power1.inOut", duration: 0.8 },
          time + 0.3 // start line drawing slightly after text begins revealing
        );
      }
    });

    // Fade out the entire staircase layout together before the Atelier panel appears
    masterTl.to('.staircase-layout', {
      y: -50,
      opacity: 0,
      ease: "power2.in",
      duration: 1.0
    }, 4.2);

    // Spatial Reframing: Cinematic Aspect Ratio Squeeze
    // Physically crops the video using the exact specs from the global motion library
    masterTl.fromTo('.hero-container', 
      { clipPath: "inset(0vh 0vw 0vh 0vw round 0px)" },
      { 
        clipPath: "inset(15vh 55vw 15vh 5vw round 24px)", 
        ease: "power3.inOut", 
        duration: 1.8 
      }, 
      4.6
    );
    masterTl.fromTo('.hero-container',
      { "--after-opacity": 0 },
      {
        "--after-opacity": 0.3, // Subtle dimming to focus on the Atelier Panel
        ease: "power3.inOut",
        duration: 1.8
      },
      4.6
    );

    // INVERT HEADER/FOOTER COLORS: Dark text over the new bright Ivory background
    // Using fromTo guarantees it starts as Ivory regardless of scroll position on load
    masterTl.fromTo(['.brand', '.nav-links a', '.concierge-inquiry-capsule'], 
      { color: "#F7E8CF", textShadow: "0 2px 10px rgba(26,21,18,0.3)" },
      {
        color: "#1a1512",
        textShadow: "none",
        ease: "power3.inOut",
        duration: 1.8
      }, 4.6);
    
    // Invert CTA background/border specifically
    masterTl.fromTo('.concierge-inquiry-capsule', 
      { borderColor: "rgba(247, 232, 207, 0.4)", backgroundColor: "transparent" },
      {
        borderColor: "rgba(26, 21, 18, 0.4)",
        backgroundColor: "transparent",
        ease: "power3.inOut",
        duration: 1.8
      }, 4.6);

    // The Atelier Panel slides perfectly into the void created by the squeeze
    masterTl.fromTo('.atelier-panel',
      { xPercent: 100, opacity: 1 }, 
      { xPercent: 0, ease: "power3.inOut", duration: 1.8 },
      4.6
    );

    // Premium kinetic jingle reveal for Atelier Title (THE ATELIER OF SILENCE)
    const titleChars = document.querySelectorAll('.atelier-title .split-char');
    titleChars.forEach((char, index) => {
      const startTime = 5.2 + index * 0.035;
      masterTl.to(char, {
        y: -8,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "power2.out"
      }, startTime)
      .to(char, {
        x: -3,
        rotation: -4,
        duration: 0.08,
        ease: "none"
      }, startTime + 0.4)
      .to(char, {
        x: 3,
        rotation: 3,
        duration: 0.08,
        ease: "none"
      }, startTime + 0.48)
      .to(char, {
        x: -1.5,
        rotation: -2,
        duration: 0.06,
        ease: "none"
      }, startTime + 0.56)
      .to(char, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.18,
        ease: "power2.out"
      }, startTime + 0.62);
    });

    // Premium word stagger reveal for Atelier Body paragraphs
    const bodyWords = document.querySelectorAll('.atelier-body .split-word');
    masterTl.fromTo(bodyWords, {
      y: 30,
      opacity: 0,
      filter: "blur(4px)"
    }, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.02,
      ease: "power3.out",
      duration: 0.8
    }, 5.8);

    // Fade out viewport UI and Atelier Panel (directly from squeezed state)
    masterTl.to(['.viewport-header', '.viewport-footer', '.atelier-panel'], {
      autoAlpha: 0,
      y: -30,
      ease: "power2.inOut",
      duration: 1.0
    }, 7.0);

    // Apply the mask to the foreground wrapper right before the transition
    masterTl.call(() => {
      actIForeground.classList.add('act-i-foreground-masked');
    }, undefined, 7.0);

    // CURTAIN REVEAL: SVG Mask Horizontal Blinds (wiping the squeezed video)
    masterTl.to(topRects, {
      attr: {
        y: (i) => {
          const yStart = i * h;
          return yStart + (h / 2);
        },
        height: 0
      },
      stagger: { each: 0.015, from: "end" },
      ease: "power2.inOut",
      duration: 1.0
    }, 7.0);

    masterTl.to(bottomRects, {
      attr: {
        height: 0
      },
      stagger: { each: 0.015, from: "end" },
      ease: "power2.inOut",
      duration: 1.0
    }, 7.0);

    // Make the narrative bridge wrapper visible
    masterTl.to('.bridge-content', {
      opacity: 1,
      ease: "none",
      duration: 0.1
    }, 7.0);

    // Staggered reveals for Narrative Bridge elements
    masterTl.fromTo('.bridge-number', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: "power2.out", duration: 0.8 },
      7.4
    );

    const bridgeHeadlineWords = document.querySelectorAll('.bridge-headline .split-word');
    masterTl.fromTo(bridgeHeadlineWords, {
      y: 30,
      opacity: 0,
      filter: "blur(4px)"
    }, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.04,
      ease: "power3.out",
      duration: 0.8
    }, 7.6);

    const bridgeBodyWords = document.querySelectorAll('.bridge-body .split-word');
    masterTl.fromTo(bridgeBodyWords, {
      y: 30,
      opacity: 0,
      filter: "blur(4px)"
    }, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.018,
      ease: "power3.out",
      duration: 0.8
    }, 8.0);

    masterTl.fromTo('.bridge-scroll-indicator',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, ease: "power2.out", duration: 1.0 },
      8.8
    );
  // ==========================================
  // ACT II: THE DESCENT (Vertical Parallax)
  // ==========================================
  // Strict, confined snapping using GSAP so it NEVER affects Act I or Act III
  ScrollTrigger.create({
    trigger: '.act-ii-wrapper',
    start: 'top top',
    end: 'bottom bottom',
    snap: {
      snapTo: 1 / (actIiRooms.length - 1),
      duration: { min: 0.3, max: 0.8 },
      delay: 0.05,
      ease: "power2.inOut"
    }
  });



  // Reset clip-path on entering Act II
  ScrollTrigger.create({
    trigger: '.act-ii-wrapper',
    start: 'top bottom',
    onEnter: () => {
      gsap.to('.hero-container', { clipPath: "inset(0vh 0vw 0vh 0vw round 0px)", duration: 0.5 });
    }
  });

  // ==========================================
  // ACT II -> ACT III TRANSITION (Cinematic Frame Expansion)
  // ==========================================
  // Act III physically overlaps the final pinned card of Act II by -100vh.
  // As the dark "veil" of Act III smoothly slides up over the Wine Bar, 
  // the picture frame on the right expands from a small geometric square into its full portrait glory!
  gsap.fromTo('.editorial-frame', 
    { clipPath: "inset(40% 40% 40% 40% round 10px)", opacity: 1, y: 0 }, 
    {
      clipPath: "inset(0% 0% 0% 0% round 20px)",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#storytelling-section",
        start: "top top", // Starts as the dark veil begins covering the Wine Bar
        end: "+=100%", // Finishes exactly as the overlap ends
        scrub: 1.2
      }
    }
  );

  // Parallax translation on the fixed container across the entire descent
  gsap.fromTo('#master-bg-video-container', 
    { yPercent: -10 },
    { 
      yPercent: 10, 
      ease: 'none',
      scrollTrigger: {
        trigger: '.act-ii-wrapper',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );

  actIiRooms.forEach((room) => {
      const captionTitle = (room as HTMLElement).querySelector('.room-caption-title');
      const captionDesc = (room as HTMLElement).querySelector('.room-caption-desc');

      // Parallax translation for the physical video inside each room
      const roomVideoContainer = (room as HTMLElement).querySelector('.room-video-container');
      const roomVideo = (room as HTMLElement).querySelector('.room-video-container video');
      
      if (roomVideoContainer && roomVideo) {
        // 1. The subtle "Cylinder" 3D tilt on the container itself
        gsap.fromTo(roomVideoContainer,
          { rotationX: -15, scale: 1 }, 
          {
            rotationX: 15, scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: room,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );

        // 2. The standard vertical parallax on the video inside
        gsap.fromTo(roomVideo,
          { yPercent: -30 }, 
          {
            yPercent: 30, 
            ease: "none",
            scrollTrigger: {
              trigger: room,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }

      // Staggered reveal for Title and Description
      const captionElements = [captionTitle, captionDesc];
      
      captionElements.forEach((el, elIdx) => {
          if (!el) return;
          gsap.fromTo(el,
              { y: 30, opacity: 0 },
              {
                  y: 0, opacity: 1,
                  ease: 'power2.out',
                  scrollTrigger: {
                      trigger: room,
                      start: `top ${70 - elIdx * 5}%`,
                      end: `center ${50 - elIdx * 5}%`,
                      scrub: true
                  }
              }
          );
          gsap.fromTo(el,
              { y: 0, opacity: 1 },
              {
                  y: -30, opacity: 0,
                  ease: 'power2.in',
                  scrollTrigger: {
                      trigger: room,
                      start: `center ${50 - elIdx * 5}%`,
                      end: `bottom ${30 - elIdx * 5}%`,
                      scrub: true
                  }
              }
          );
      });
  });


  // ==========================================
  // ACT III: HYBRID CLIENT STORYTELLING & ACT IV OUTRO
  // ==========================================
  
  const storyTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#storytelling-section",
      start: "top top",
      end: "bottom bottom",
      pin: ".editorial-container",
      scrub: 1.2,
      onEnter: () => {
        // Fade in the editorial frame smoothly
        gsap.to('.editorial-frame', { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });
      },
      onLeaveBack: () => {
        gsap.to('.editorial-frame', { opacity: 0, y: 30, duration: 0.8 });
      }
    }
  });

  const panels = gsap.utils.toArray('.storytelling-panel') as HTMLElement[];

  // Split text for stagger
  let splits: any[] = [];
  panels.forEach(panel => {
    // Only split the headline/quote text
    const textTarget = panel.querySelector('.story-headline, .testimonial-quote');
    if (textTarget) {
      splits.push(new SplitType(textTarget as HTMLElement, { types: 'words,chars' }));
    } else {
      splits.push(null);
    }
  });

  // Set initial states
  gsap.set(panels, { opacity: 0, visibility: 'hidden' });
  gsap.set(panels[0], { opacity: 1, visibility: 'visible' });
  
  // Initially, all chars are hidden except for panel 0
  splits.forEach((split, i) => {
    if (split) {
      gsap.set(split.chars, { y: 20, opacity: 0 });
      if (i === 0) {
        gsap.set(split.chars, { y: 0, opacity: 1 });
      }
    }
  });

  // Phase 1: The Wait (0s to 1s)
  // The frame is expanding due to the separate clipPath ScrollTrigger. 
  // Text 1 and Image 1 sit completely still for the first 100vh of scroll.
  storyTl.to({}, { duration: 1 });

  // Phase 2: Slide to Image 2 & Text 2 (1s to 2s)
  storyTl.to('.editorial-carousel', { yPercent: -33.333, duration: 0.5, ease: 'power2.inOut' }, 1);
  storyTl.to(panels[0], { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 1);
  if (splits[0]) storyTl.to(splits[0].chars, { y: -20, opacity: 0, duration: 0.5, ease: 'power2.inOut', stagger: 0.01 }, 1);

  storyTl.to(panels[1], { opacity: 1, visibility: 'visible', duration: 0.5, ease: 'power2.inOut' }, 1);
  if (splits[1]) storyTl.to(splits[1].chars, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.01 }, 1.2);
  storyTl.to({}, { duration: 0.5 }); // Hold Image 2

  // Phase 3: Slide to Image 3 & Text 3 (2s to 3s)
  storyTl.to('.editorial-carousel', { yPercent: -66.666, duration: 0.5, ease: 'power2.inOut' }, 2);
  storyTl.to(panels[1], { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 2);
  if (splits[1]) storyTl.to(splits[1].chars, { y: -20, opacity: 0, duration: 0.5, ease: 'power2.inOut', stagger: 0.01 }, 2);

  storyTl.to(panels[2], { opacity: 1, visibility: 'visible', duration: 0.5, ease: 'power2.inOut' }, 2);
  if (splits[2]) storyTl.to(splits[2].chars, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.01 }, 2.2);
  storyTl.to({}, { duration: 0.5 }); // Hold Image 3

  // ACT IV: OUTRO RESOLUTION
  const outroTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#outro-section",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1.2
    }
  });

  // Soft blur and dim overlay on active background video
  // (Left over for Act II descent if we want)
  outroTl.fromTo("#master-bg-video-container .bg-video", 
    { filter: "brightness(0.75) blur(0px)" },
    { 
      filter: "brightness(0.3) blur(10px)",
      ease: "power2.inOut",
      duration: 2.0
    }
  );
});
// Reduced Motion Fallback
mm.add("(prefers-reduced-motion: reduce)", () => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: heroContainer, start: 'top top', end: 'bottom top', scrub: true }
  });
  tl.to(threshold, { opacity: 0, duration: 0.5 }, 0.5);
});

