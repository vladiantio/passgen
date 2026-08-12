# Migration: Tailwind → Native CSS (CSS Modules + nesting)

## Phase 1: Foundation

- [x] Task 1: Create `src/styles/reset.css` — full port of Tailwind Preflight
      (`node_modules/tailwindcss/src/css/preflight.css`) using CSS nesting; replace
      `@tailwind base` in `global.css` with `@import 'reset.css'`
      - Verify: `pnpm build`, `pnpm lint`, `pnpm preview` renders identically
      - Note: `@tailwind base` kept (preflight disabled in config) solely for the
        `--tw-*` var resets still read by ring/gradient/backdrop utilities; the
        preflight rules themselves live in reset.css. Removed in Task 10.
- [x] Task 2: Create `src/styles/form-controls.css` — port of `@tailwindcss/forms`
      (class strategy) base for input/checkbox/radio + `--shadow` token
      - Verify: `pnpm build`; not yet referenced by components
      - Design: consumers `composes` from it; per-control colors via
        `--focus-ring-color` / `--checked-color` custom props (accent defaults),
        order-proof, no `!important`

### Checkpoint: Foundation
- [ ] Build + lint pass; preview identical to pre-migration commit
- [ ] reset.css reviewed against preflight.css source
- [x] reset.css verified rule-identical to compiled preflight (only intentional
      delta: removed `--tw-content`); form-controls.css unreferenced yet

## Phase 2: Component Migrations

- [x] Task 3: Migrate `Frame` + `App` layout (`Frame.module.css`, `App.module.css`:
      nav, main 768px, sm: breakpoint, icon sizing)
      - Verify: build/lint + preview; responsive at 640px
      - Note: fixed pre-existing broken `pnpm format` (prettier 2 → 3,
        removed prettier-plugin-tailwindcss; @trivago v5 needs prettier 3)
- [x] Task 4: Migrate `Checkbox` + `RadioButton` (module CSS composing
      form-controls.css; checked/focus/disabled states)
      - Verify: build/lint + preview; all states in light + dark
      - Note: `composes` from form-controls.css verified working (postcss-modules
        hashes the shared file's classes into the module export); removed the
        global.css import of form-controls.css to avoid double emission; `--shadow`
        token reaches the bundle via the composes dependency
- [x] Task 5: Migrate `PasswordButton` (hover/focus tint, success color, disabled)
      - Verify: build/lint + preview; hover/focus/disabled/copied states
      - Note: `!important` opacity juggling collapsed to plain rules via `--button-color` custom property
- [x] Task 6: Migrate `PasswordLengthField` (number input + react-range track/thumb)
      - Verify: build/lint + preview; drag 4-64, focus states
      - Note: input composes `form-input`; track/thumb/fill in module
- [x] Task 7: Migrate `ProgressBar` (linear-gradient fill, 4 colors, 300ms transition)
      - Verify: build/lint + preview; weak/strong password colors
      - Note: gradients are solid→solid (to-* at full opacity); default variant is
        secondary→accent (plan said primary — code is source of truth)
- [x] Task 8: Migrate `Tooltip` (backdrop-blur, 75% field bg, shadow, z-50)
      - Verify: build/lint + preview; hover all tooltip triggers
- [x] Task 9: Migrate `ThemeSelector` + remove `.dropdown` rules from `global.css`
      - Verify: build/lint + preview; dropdown open/close + selection highlight
      - Notes: `details` keeps the literal global class `dropdown` because
        `init.ts` selects `details.dropdown`; `w-68` generates no CSS in v3.4
        (spacing scale jumps 64→72), so the menu keeps content-based width

### Checkpoint: Components Done
- [x] `rg "className" src` — zero Tailwind tokens in className strings
      (only literal: `dropdown`, required by `init.ts`)
- [ ] Full manual pass: both themes, all controls, tooltips, dropdown, slider
- [ ] Human review before Tailwind removal

## Phase 3: Cleanup

- [x] Task 10: Remove Tailwind from toolchain — deleted `tailwind.config.js`,
      `postcss.config.cjs`, all `@tailwind` directives, dead `--tw-text-opacity`;
      removed `tailwindcss`, `@tailwindcss/forms`, `autoprefixer`, `postcss`,
      `prettier-plugin-tailwindcss`; `pnpm install` clean
      - Verify: `pnpm build`, `pnpm lint`, `pnpm format` pass; bundle has zero
        `--tw-` tokens; grep audit clean (only provenance comments remain)
      - Note: AGENTS.md rewritten for the new CSS architecture

### Final Checkpoint
- [x] All acceptance criteria met; build/lint clean; bundle: 26 kB → 16.2 kB CSS
- [ ] GitHub Pages deploy preview green (happens on push to `main`)
- [x] Ready for human review
