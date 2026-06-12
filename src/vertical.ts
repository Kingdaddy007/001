import './style.css'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import { initSmoothScroll } from './utils/scroll'

// Smooth scroll foundation
const lenis = initSmoothScroll()

const cards = gsap.utils.toArray('.card') as HTMLElement[];
const numCards = cards.length;

// Geometry of the cylinder
const anglePerCard = 360 / numCards;
const radius = Math.round((window.innerHeight * 0.75 / 2) / Math.tan(Math.PI / numCards));

// Initialize cards in a 3D cylinder formation
// The cards pivot around the center of the cylinder, pushed back by `radius`.
cards.forEach((card, i) => {
  gsap.set(card, {
    rotationX: i * anglePerCard,
    transformOrigin: `50% 50% -${radius}px`
  });
});

// The wrapper must ALSO pivot around the center of the cylinder!
gsap.set('.infinite-content', {
  transformOrigin: `50% 50% -${radius}px`
});

// Create a timeline that spins the entire cylinder as we scroll
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1, // Smooth scrub
  }
});

// We animate the content wrapper to rotate. 
// If cards are at positive angles, wrapper must rotate negative to bring them front.
tl.fromTo('.infinite-content', 
  { rotationX: 0, xPercent: -50, yPercent: -50 },
  { 
    rotationX: -360 * 3, 
    xPercent: -50, 
    yPercent: -50,
    ease: "none"
  }
);

// We need an infinite wrap loop using GSAP's seamless logic, but for simplicity
// in this scrubbed version, we are mapping the entire scrollbar to a set number of rotations.
// For true infinite scrolling (teleportation), we can hook into Lenis.on('scroll').



lenis.on('scroll', (e: any) => {
  // If we reach the very bottom of the scroll track, snap back to the start
  // to create a true infinite loop without hitting the physical bottom.
  if (e.progress >= 0.98) {
    lenis.scrollTo(0, { immediate: true });
  }
});

// Make sure scroll starts at top
window.scrollTo(0, 0);
