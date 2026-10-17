# AETHER Gallery — Cloudflare deployment handoff

## Chosen route: Cloudflare Pages with GitHub integration

Cloudflare account: QORVIA (verified through connected account inspection on 2026-10-16). Use a **new**, isolated project named `aether-gallery-preview`. Do not connect any existing domains or modify EPS, HDC, or ORVIA deployments.

### Build settings
- Framework: React (Vite)
- Root directory: repository root (`/`)
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: `22` (set `NODE_VERSION=22` in the Pages project's environment variables if build image doesn't provide Node 22)
- Install: default `npm install` or `npm ci` once a lockfile is committed
- Assigned URL: Cloudflare generates a `*.pages.dev` address upon a successful deployment. Do not assume a URL until it has been provisioned.

### Deployment flow
1. Create a new GitHub repository dedicated to AETHER; upload the contents of this ZIP's `aether-gallery/` folder (not the ZIP itself) to the repository root. Do not alter existing repositories.
2. In Cloudflare dashboard go to Workers & Pages -> Create application -> Pages -> Import existing Git repository.
3. Select the new AETHER repository, configure the build settings above and click Save and Deploy.
4. Inspect the Cloudflare build logs and resolve any TypeScript/npm errors. Do not claim deployment success without a successful build and public response.
5. Validate the artwork image URLs, opening and closing the artwork viewer, navigation and zoom controls; test small and large mobile widths and keyboard-only use.
6. Keep the generated pages.dev URL as a standalone preview; custom domains require a separate explicit decision.

## Known blockers and safeguards
- During preparation `npm install` returned EAI_AGAIN; **production build not yet verified**. Cloudflare's build service may be able to fetch dependencies, but this is not a substitute for reviewing the logs.
- Original source image remains at `public/artworks/CALIGRAPHY-original.webp` unchanged.
- Do not enable D1, R2, Images, Workers APIs, or a custom domain until the gallery needs them; this version is a static React/Vite app.
- Do not delete any files or overwrite pre-existing projects.
- Do not use the production brand domains as deployment targets.

## Local tests, when npm connectivity is available
```bash
npm install
npm run typecheck
npm run build
npm run preview
```

## Documentation
- Cloudflare Pages Git integration: https://developers.cloudflare.com/pages/configuration/git-integration/
- Cloudflare Pages Vite builds: https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/

## Automated checks added (2026-10-16)
- `.github/workflows/validate.yml` runs on `main` pushes and pull requests, installing dependencies, checking TypeScript, verifying artwork integrity and building Vite.
- `scripts/verify-artworks.mjs` enforces the original uploaded artwork SHA-256 and checks all six WebP file signatures.
- `public/_headers` adds conservative default security headers to the eventual Cloudflare Pages static output.
- GitHub Actions CI **does not** deploy by itself. Cloudflare Pages Git integration performs the deployment once the dedicated repository is created and connected.
- The automatic checks themselves have **not** been run in GitHub or Cloudflare until the first commit and build.
