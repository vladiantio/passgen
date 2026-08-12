# Migration: Tailwind → Native CSS (CSS Modules + nesting)

## Phase 1: Foundation

- [ ] Task 1: Create `src/styles/reset.css` — full port of Tailwind Preflight
      (`node_modules/tailwindcss/src/css/preflight.css`) using CSS nesting; replace
      `@tailwind base` in `global.css` with `@import 'reset.css'`
      - Verify: `pnpm build`, `pnpm lint`, `pnpm preview` renders identically
- [ ] Task 2: Create `src/styles/form-controls.css` — port of `@tailwindcss/forms`
      (class strategy) base for input/checkbox/radio + `--shadow` token
      - Verify: `pnpm build`; not yet referenced by components

### Checkpoint: Foundation
- [ ] Build + lint pass; preview identical to pre-migration commit
- [ ] reset.css reviewed against preflight.css source

## Phase 2: Component Migrations

- [ ] Task 3: Migrate `Frame` + `App` layout (`Frame.module.css`, `App.module.css`:
      nav, main 768px, sm: breakpoint, icon sizing)
      - Verify: build/lint + preview; responsive at 640px
- [ ] Task 4: Migrate `Checkbox` + `RadioButton` (module CSS composing
      form-controls.css; checked/focus/disabled states)
      - Verify: build/lint + preview; all states in light + dark
- [ ] Task 5: Migrate `PasswordButton` (hover/focus tint, success color, disabled)
      - Verify: build/lint + preview; hover/focus/disabled/copied states
- [ ] Task 6: Migrate `PasswordLengthField` (number input + react-range track/thumb)
      - Verify: build/lint + preview; drag 4-64, focus states
- [ ] Task 7: Migrate `ProgressBar` (linear-gradient fill, 4 colors, 300ms transition)
      - Verify: build/lint + preview; weak/strong password colors
- [ ] Task 8: Migrate `Tooltip` (backdrop-blur, 75% field bg, shadow, z-50)
      - Verify: build/lint + preview; hover all tooltip triggers
- [ ] Task 9: Migrate `ThemeSelector` + remove `.dropdown` rules from `global.css`
      - Verify: build/lint + preview; dropdown open/close + selection highlight

### Checkpoint: Components Done
- [ ] `rg "className" src` — zero Tailwind tokens in className strings
- [ ] Full manual pass: both themes, all controls, tooltips, dropdown, slider
- [ ] Human review before Tailwind removal

## Phase 3: Cleanup

- [ ] Task 10: Remove Tailwind from toolchain — delete `tailwind.config.js`,
      `postcss.config.cjs`, `@tailwind components/utilities` directives; remove
      `tailwindcss`, `@tailwindcss/forms`, `autoprefixer`, `prettier-plugin-tailwindcss`;
      `pnpm install`; final grep audit
      - Verify: `pnpm build`, `pnpm lint`, `pnpm format`, preview, GitHub Pages deploy

### Final Checkpoint
- [ ] All acceptance criteria met; build/lint clean; deploy preview green
- [ ] Ready for human review
