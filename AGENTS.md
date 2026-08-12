# AGENTS.md

Single-package React 18 + TypeScript + Vite 5 (SWC) + Tailwind CSS 3 app (password generator). No monorepo, no backend.

## Commands

Use **pnpm** (`pnpm-lock.yaml` is the lockfile; do not add a `package-lock.json`).

- `pnpm dev` — dev server
- `pnpm build` — typechecks (`tsc -b`) then bundles; this is the only typecheck entry point (no separate `typecheck` script)
- `pnpm exec tsc -b` — typecheck only
- `pnpm lint` — ESLint (flat config, `eslint.config.js`)
- `pnpm format` — Prettier over `src/`
- No tests exist; verification is `lint` + `tsc -b` + `build`.

Run `pnpm format` after edits: Prettier auto-sorts imports (`@/...` group first, then relative, separated by blank line) and Tailwind classes via plugins.

## Gotchas

- `vite.config.ts` hardcodes `base: '/passgen/'` for GitHub Pages — don't "fix" it; local preview of built output lives under `/passgen/`.
- Path alias `@/*` → `src/*` (tsconfig `paths` + `vite-tsconfig-paths`). Use it in imports.
- `src/init.ts` is loaded by `index.html` **before** `main.tsx`: it applies the saved theme to `<html>` and closes `details.dropdown` elements on outside click. Don't move theme bootstrap into React.
- Theming: all colors are CSS variables consumed by Tailwind as `hsla(var(--color-*), <alpha-value>)` (see `tailwind.config.js` + `src/styles/root.css`). Dark mode toggles the `html.dark` class and only overrides variable values — add new colors as HSL components in `root.css`, never as hardcoded values.
- Fonts are self-hosted via `@fontsource-variable/*` packages referenced in `src/styles/fonts.css` (no CDN).
- Password strength uses `@zxcvbn-ts/core`; forms use `react-hook-form`; sliders use `react-range`.
- UI copy is Spanish (`<html lang="es">`).

## Deployment

Pushing to `main` auto-deploys via `.github/workflows/deploy.yml` to GitHub Pages (builds with pnpm via `pnpm/action-setup`; don't break `dist/` output path).
