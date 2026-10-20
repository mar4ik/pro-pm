# The Idea Factory

A 30-second looping SVG + GSAP film for the hero of the AI քեզ Project Manager landing page. One idea (a lightbulb) enters the factory and three managers turn it into a project plan, an event ticket and a product.

## Stack

- React 18 + TypeScript (Vite)
- SVG for every illustrated object, character and machine (`src/Factory.tsx`, `src/Character.tsx`)
- GSAP 3 master timeline with labelled scenes (`src/timeline.ts`): `birth` 0s, `pm` 5s, `event` 12s, `product` 19s, `reveal` 26s, `end` 30s
- Controls, progress bar, station jumps and reduced-motion handling (`src/IdeaFactory.tsx`)
- Styling in `src/styles.css`, colours mapped onto the AI Քեզ Բան brand palette

Every movable SVG group has an id (for example `bulb`, `pm-lever`, `ev-stage`, `phone`, `mgr-ev-arm-r`, `mgr-pr-head`) so parts can be animated independently.

## Run locally

```bash
cd redesign/idea-factory
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). The dev page mounts the experience into `#idea-factory` on a dark background.

## Build and embed

```bash
npm run build
```

This writes a fixed-name bundle into `redesign/factory/`: `factory.js`, `factory.css` and a standalone `index.html`. The landing page embeds it with:

```html
<link rel="stylesheet" href="factory/factory.css">
<div id="idea-factory"></div>
<script type="module" src="factory/factory.js"></script>
```

Any page can host it the same way: add the stylesheet, an empty element with `id="idea-factory"`, and the module script. The component sizes itself to the element's width and keeps a 1200×640 aspect ratio.

## Controls

Play/pause, restart, jump to Project, Event or Product, and a clickable progress bar with scene markers. When the visitor prefers reduced motion the finished factory is shown still, and play remains available. For debugging, the master timeline is exposed as `window.__factory` (for example `__factory.pause(15)` to inspect a frame).
