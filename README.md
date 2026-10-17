# AETHER Gallery — Concept A: The Modern Museum

A responsive, artwork-first React exhibition concept with immersive inspection and Aether Prism controls.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Verify a production build
```bash
npm run build
npm run preview
```

## Functionality
- Desktop and mobile navigation; keyboard-accessible navigation and skip link
- Original three-canvas photograph presented in the hero and preserved in `public/artworks/CALIGRAPHY-original.webp`
- Three losslessly cropped source-derived previews; selected work opens viewer
- Viewer next/previous keyboard controls (left/right), Escape to close, plus/minus zoom, zero to reset
- Wheel, button, double-click and touch-pinch zoom; pointer dragging when enlarged
- Switchable wall backgrounds (surrounding the artwork, not recolouring it)
- Select ensemble or individual panels from the viewing-room console
- Reduced-motion and focus-state accommodations

## Artwork integrity
All artworks derive from the provided `CALIGRAPHY.webp`, 1800×1800 pixels. The original file is copied without changes. Exhibition previews are simple rectangular crops re-encoded as lossless WebP: no inpainting, AI reconstruction, recolouring, resampling or retouching is applied. Cropping reduces the available resolution and should not be mistaken for an independent high-resolution artwork master.

The gallery deliberately does not invent an artist, year of production, medium, dimensions, price, provenance, manufacturing process or print specification. The name AETHER is a working name for the concept, not an asserted trademark.

## Fonts
Google Fonts loaded from its CDN: Newsreader (display), Manrope (text), JetBrains Mono (interface), Amiri (Arabic-ready). Browser fallback fonts are defined in CSS. No font binaries are distributed with the project.

## Technical stack
React 18, TypeScript, Vite 6, CSS. No UI framework or animation dependency is required.

## Known boundaries
- Demo only: no live art catalogue backend, authentication, checkout, booking or submission endpoints.
- Zoom uses the available source pixels; it does not fabricate extra detail.
- Wall modes alter the area around the supplied source photograph, which already contains a light background.
- The actual canvas medium, artwork attribution and print properties have not been verified.
- Any production launch requires rights/licensing review of supplied artwork, domain/name clearance and final cross-browser accessibility QA.

No existing business sites, GitHub repositories or external assets are edited.

## Inspecting layout without dependencies
`qa/layout-fixture.html` is an offline static visual layout fixture. It is **not** the interactive React build. It can be viewed after extraction in an ordinary browser that allows local files.

See `QA_REPORT.md` for environmental limitations and required runtime checks.
