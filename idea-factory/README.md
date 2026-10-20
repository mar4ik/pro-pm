# The Idea Factory

A 16-second looping SVG + GSAP film for the hero of the AI քեզ Project Manager landing page. One huge lamp drops in, bursts into idea bubbles, which gather into an event stage, which becomes a phone, and the loop restarts. No people, machines or controls; the hero supplies the ink background.

## Stack

- React 18 + TypeScript (Vite)
- SVG for every illustrated object and machine (`src/Factory.tsx`)
- GSAP 3 master timeline with labelled scenes (`src/timeline.ts`): `lamp` 0s, `ideas` 2.9s, `event` 7.2s, `product` 11.4s, `end` 16s
- Mounting and reduced-motion handling (`src/IdeaFactory.tsx`)
- Styling in `src/styles.css`, colours mapped onto the AI Քեզ Բան brand palette

Every movable SVG group has an id (`bulb`, `idea-1`…`idea-5`, `ev-stage`, `phone`, `ui-*`) so parts can be animated independently.

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

Any page can host it the same way: add the stylesheet, an empty element with `id="idea-factory"`, and the module script. The component sizes itself to the element's width and keeps a square aspect ratio.

## Behaviour

Autoplays and loops; there are no on-screen controls. When the visitor prefers reduced motion a single still frame (the assembled phone) is shown. For debugging, the master timeline is exposed as `window.__factory` (for example `__factory.pause(15)` to inspect a frame).
