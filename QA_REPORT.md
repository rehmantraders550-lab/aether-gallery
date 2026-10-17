# AETHER / Gallery Concept A — Development QA

**Build state:** Source-complete prototype, runtime verification pending dependency availability.

## Completed source-level checks

| Check | Result | Evidence / qualification |
|---|---|---|
| React/TypeScript syntax | PASS | All 7 TypeScript/TSX sources parsed and transpiled with globally installed TypeScript; zero syntax diagnostics. This does not replace a full typecheck. |
| CSS syntax | PASS | `tinycss2` found zero top-level parsing errors across 170 rules. This is not a full browser style validation. |
| Image source preservation | PASS | Original 1800×1800 WebP copied byte-for-byte; SHA-256 matched. |
| Artwork crop pixel fidelity | PASS | Pillow image difference showed all five lossless crop files pixel-identical to their original source regions. |
| User's CSS signature | PASS by source inspection | Main button retains prism gradient, 2px/4px underline, timings, movement and typography; opening class selector corrected. |
| Responsive CSS coverage | PASS by source inspection | Breakpoints at 1220, 980, 680 and 380 px; hover alternatives, mobile navigation and responsive viewer styles included. |
| Keyboard & reduced-motion affordances | PRESENT, not browser-verified | Focus styles, skip link, dialog close, arrows, plus/minus/zero controls and reduced-motion media query. |
| Repository scope | PASS | Work created only in a new local directory; no GitHub write or existing sites modified. |

## Blocked environment-level checks

- `npm install` could not contact `registry.npmjs.org` (`EAI_AGAIN`), so `npm run build` and a dependency-backed React runtime smoke test could not run here.
- Chromium and Playwright could launch but local navigation returned `ERR_BLOCKED_BY_ADMINISTRATOR`; desktop/mobile screenshots and in-browser behaviour were not verified.
- Because of the above, do **not** treat this as final production QA.

## Next acceptance tests (on a machine with npm access)

1. Run `npm install && npm run build` and resolve any compile/type issues.
2. Run `npm run dev`, inspect at 1440×900, 1024×768, 768×1024, 390×844 and 320×700.
3. Check navigation opening/closing on touch, CTA-to-viewer, and all artwork cards.
4. Test modal focus containment, Escape, keyboard previous/next and reset.
5. Inspect pinch zoom, drag pan, wheel zoom and scaling boundaries on actual mobile and desktop devices.
6. Verify wall controls change the background only, never art pixels.
7. Test 200% text zoom, keyboard-only navigation, contrast and reduced motion.
8. Verify the source artwork rights, physical dimensions, provenance, and metadata before any public launch.

## Art integrity note

Previews use pixel-preserving crops. This does not guarantee that the original photograph faithfully represents print pigments or metallic foil under a calibrated print workflow. The website has no basis to assert physical print media or actual finish specifications.

## Cloudflare Git handoff validation (2026-10-16)
- Added a GitHub Actions workflow that validates source integrity, TypeScript, and Vite production compilation on `main` and pull requests. The workflow is committed as a source file only; it has **not executed remotely**.
- Executed `npm run verify:artworks` equivalent (`node scripts/verify-artworks.mjs`) locally. **PASS** for all six WebP assets and original SHA-256.
- npm registry access is blocked in the current sandbox, so actual npm install and React/Vite production build are still **UNVERIFIED**.
- Cloudflare QORVIA account access was confirmed; no Pages project or deployment created.
- No repository named `rehmantraders550-lab/aether-gallery` or `.../aether-gallery-preview` was found. GitHub connector exposes no repository-creation operation. The user must create a dedicated repository or provide an existing approved one before Git-to-Cloudflare integration can be performed.
