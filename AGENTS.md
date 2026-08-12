# AGENTS.md

Single-package React 18 + TypeScript + Vite 5 (SWC) app with hand-written native CSS (password generator). No Tailwind, no PostCSS pipeline, no monorepo, no backend.

## Commands

Use **pnpm** (`pnpm-lock.yaml` is the lockfile; do not add a `package-lock.json`).

- `pnpm dev` — dev server
- `pnpm build` — typechecks (`tsc -b`) then bundles; this is the only typecheck entry point (no separate `typecheck` script)
- `pnpm exec tsc -b` — typecheck only
- `pnpm lint` — ESLint (flat config, `eslint.config.js`)
- `pnpm format` — Prettier over `src/`
- No tests exist; verification is `lint` + `tsc -b` + `build`.

Run `pnpm format` after edits: Prettier auto-sorts imports (`@/...` group first, then relative, separated by blank line) via `@trivago/prettier-plugin-sort-imports`.

## CSS architecture

- **CSS Modules** (`*.module.css` co-located next to each component): class names are locally scoped, so semantic names (`.frame`, `.icon`, `.row`) are collision-free. Import as `styles from './X.module.css'`; never hardcode hashed names, never use Tailwind-style utility strings in `className`.
- **Native CSS nesting** (Chrome 112+, Firefox 117+, Safari 16.5+). Vite passes CSS through untouched — there is no PostCSS pipeline.
- `src/styles/reset.css` is the ported Tailwind Preflight (plain CSS reset).
- `src/styles/form-controls.css` is the only shared layer: `--shadow` token plus `.form-input`, `.form-checkbox`, `.form-radio` base classes (ported from `@tailwindcss/forms`). Components consume them via `composes: form-checkbox from '../styles/form-controls.css'` (Vite bundles the file once; its classes are hashed into the module export). Per-control colors plug in through custom properties (`--focus-ring-color`, `--checked-color`, `--button-color`) — no `!important`, no cascade-order dependence.
- `src/styles/global.css` holds the reset/root/fonts imports and a few global element rules only.

## Gotchas

- `vite.config.ts` hardcodes `base: '/passgen/'` for GitHub Pages — don't "fix" it; local preview of built output lives under `/passgen/`.
- Path alias `@/*` → `src/*` (tsconfig `paths` + `vite-tsconfig-paths`). Use it in imports.
- `src/init.ts` is loaded by `index.html` **before** `main.tsx`: it applies the saved theme to `<html>` and closes `details.dropdown` elements on outside click. The ThemeSelector `details` keeps the literal global class `dropdown` (`:global(.dropdown)` in its module) because `init.ts` selects `details.dropdown` — don't hash it.
- Theming: all colors are CSS variables consumed as `hsla(var(--color-*), <alpha-value>)` (see `src/styles/root.css`). Dark mode toggles the `html.dark` class and only overrides variable values — add new colors as HSL components in `root.css`, never as hardcoded values.
- Fonts are self-hosted via `@fontsource-variable/*` packages referenced in `src/styles/fonts.css` (no CDN).
- Password strength uses `@zxcvbn-ts/core`; forms use `react-hook-form`; sliders use `react-range`.
- UI copy is Spanish (`<html lang="es">`).

## Deployment

Pushing to `main` auto-deploys via `.github/workflows/deploy.yml` to GitHub Pages (builds with pnpm via `pnpm/action-setup`; don't break `dist/` output path).
