import gsap from 'gsap';
import SplitType from 'split-type';

const targetText = document.getElementById('target-text');
const buttons = document.querySelectorAll('.toggle-btn');
const originalText = `"We reject the decoration of mid-market design. Here, the raw materials are the ornament: smoked oak, travertine, and shadow."`;

// State tracking
let currentAnimTl: gsap.core.Timeline | null = null;
let currentSplit: SplitType | null = null;

// Reset function
function resetPlayground() {
  if (currentAnimTl) {
    currentAnimTl.kill();
  }
  if (currentSplit) {
    currentSplit.revert();
  }
  if (targetText) {
    targetText.innerHTML = originalText;
    gsap.set(targetText, { clearProps: 'all' });
  }
}

function playPremiumStagger() {
  resetPlayground();
  if (!targetText) return;

  // Premium B2B Stagger logic
  currentSplit = new SplitType(targetText, { types: 'words,chars' });
  
  gsap.set(currentSplit.chars, { y: 50, opacity: 0 });
  
  currentAnimTl = gsap.timeline();
  currentAnimTl.to(currentSplit.chars, {
    y: 0,
    opacity: 1,
    stagger: 0.02,
    ease: "power4.out",
    duration: 1.2,
  });
}

function playSplitFlap() {
  resetPlayground();
  if (!targetText) return;

  currentSplit = new SplitType(targetText, { types: 'words,chars' });
  
  // Fake the mechanical split-flap look with rotateX and staggered snaps
  gsap.set(currentSplit.chars, { 
    rotateX: -90, 
    opacity: 0,
    transformOrigin: "bottom center",
    filter: "blur(2px)"
  });

  currentAnimTl = gsap.timeline();
  currentAnimTl.to(currentSplit.chars, {
    rotateX: 0,
    opacity: 1,
    filter: "blur(0px)",
    stagger: 0.03,
    ease: "back.out(1.7)", // mechanical snap feel
    duration: 0.4
  });
}

function play3DCylinder() {
  resetPlayground();
  if (!targetText) return;

  // The cylinder needs distinct phrases rather than one paragraph.
  // We will temporarily restructure the DOM inside the target-text
  const phrases = [
    "We reject the decoration",
    "of mid-market design.",
    "Here, the raw materials",
    "are the ornament:",
    "smoked oak,",
    "travertine,",
    "and shadow."
  ];

  let cylinderHTML = `<div class="cylinder__wrapper" style="position: relative; perspective: 1500px; height: 400px; display: flex; align-items: center; justify-content: center;">`;
  cylinderHTML += `<div class="cylinder__text__wrapper" style="transform-style: preserve-3d;">`;
  
  phrases.forEach(phrase => {
    cylinderHTML += `<div class="cylinder__item" style="position: absolute; backface-visibility: hidden; white-space: nowrap; font-size: clamp(2rem, 4vw, 3rem);">${phrase}</div>`;
  });
  
  cylinderHTML += `</div></div>`;
  targetText.innerHTML = cylinderHTML;

  const textItems = document.querySelectorAll('.cylinder__item');
  const textWrapper = document.querySelector('.cylinder__text__wrapper');

  if (textWrapper && textItems.length > 0) {
    const radius = 250; 
    const spacing = 180 / textItems.length;

    textItems.forEach((item, index) => {
      const angle = (index * spacing * Math.PI) / 180;
      const rotationAngle = index * -spacing;
      const y = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
        
      (item as HTMLElement).style.transform = `translate3d(-50%, -50%, 0) translate3d(0, ${y}px, ${z}px) rotateX(${rotationAngle}deg)`;
    });

    currentAnimTl = gsap.timeline();
    // Simulate scroll by just animating it through space
    currentAnimTl.fromTo(textWrapper, 
      { rotateX: -80 },
      { 
        rotateX: 270, 
        ease: "power2.inOut", 
        duration: 8 // Give it time to slowly roll
      }
    );
  }
}

// Button Listeners
buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // UI active state
    buttons.forEach(b => b.classList.remove('active'));
    (e.target as HTMLElement).classList.add('active');

    const animType = (e.target as HTMLElement).dataset.anim;

    if (animType === 'stagger') playPremiumStagger();
    if (animType === 'splitflap') playSplitFlap();
    if (animType === 'cylinder') play3DCylinder();
  });
});

// Play default on load
window.addEventListener('DOMContentLoaded', () => {
  const defaultBtn = document.querySelector('[data-anim="stagger"]');
  if (defaultBtn) {
    (defaultBtn as HTMLElement).click();
  }
});
