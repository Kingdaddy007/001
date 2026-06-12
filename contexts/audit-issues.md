[P0] Issue: 7 videos preloading simultaneously with `preload="auto" autoplay` | Location: index.html (Act II videos) | Fix: Change to `preload="none"` or `metadata` and lazy-load them via ScrollTrigger.
[P0] Issue: Missing `#master-bg-video-active` elements | Location: main.ts / index.html | Fix: The script references video elements that were removed/renamed from index.html. Add them back or update the script.
[P1] Issue: Missing `<h1>` tag | Location: index.html | Fix: Change the `.atelier-title` or another primary heading to `<h1>`.
[P1] Issue: Inaccessible CTA Button | Location: index.html (.concierge-inquiry-capsule) | Fix: Change `<div>` to `<button>` or add `role="button"` and JS keyboard listeners.
[P2] Issue: Responsive layout for staircase text | Location: style.css (.staircase-layout) | Fix: Adjust `right: 12%` and text sizes on mobile viewports to prevent overflow.
