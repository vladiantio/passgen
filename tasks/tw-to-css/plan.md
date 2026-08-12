# Implementation Plan: Migrate passgen from Tailwind CSS to Native CSS

## Overview

Replace Tailwind CSS (v3.4, `@tailwindcss/forms`, class strategy) with hand-written
native CSS in **CSS Modules**, using **native CSS nesting** (no build plugin) and a
**full port of Tailwind's Preflight** as the reset. The design-token layer
(`src/styles/root.css` CSS custom properties) is already framework-free and survives
unchanged. Migration is **incremental**: components move one by one while Tailwind
still compiles, then Tailwind is removed in the final task.

Stack: Vite 5 + React 18 + TS, deployed to GitHub Pages (`base: '/passgen/'`).
No test suite exists; verification = `pnpm build`, `pnpm lint`, `pnpm preview` +
manual visual checks.

## Architecture Decisions

- **CSS Modules** (`*.module.css` co-located next to each component). Class names are
  locally scoped, so semantic names (`.frame`, `.icon`, `.input`) are collision-free.
  No global BEM namespacing needed.
- **Native CSS nesting, no plugin.** Chrome 112+, Firefox 117+, Safari 16.5+ all
  support it; Vite passes CSS through untouched. Remove the PostCSS pipeline entirely
  (Tailwind and autoprefixer leave with it).
- **Full Preflight port.** Port `node_modules/tailwindcss/src/css/preflight.css`
  verbatim (adapted to remove `theme()` references and Tailwind-only internals like
  `--tw-content` / `--tw-border-spacing-x`) into `src/styles/reset.css`, rewritten
  with CSS nesting. Keeps current rendering byte-for-byte identical.
- **Fully semantic, zero utilities.** Every Tailwind utility becomes a semantic class
  on its component. The only shared layer is `src/styles/form-controls.css` (base
  styles for `input`, `input[type=checkbox]`, `input[type=radio]` — the ported
  `@tailwindcss/forms` behavior — plus the `--shadow` token).
- **Colors stay as HSLA var triplets.** `bg-opacity-75` / `text-opacity-60` become
  `hsla(var(--color-soft), 0.75)` — the vars already store `h, s%, l%`.
- **Dark mode is untouched.** Already handled by `html.dark` variable overrides in
  `root.css`; components never used `dark:` variants.
- **No `!important` needed.** All Tailwind `!` modifiers (`!bg-opacity-0`, `!m-0`,
  `checked:!bg-accent`) resolve through plain specificity in semantic CSS.
- **React conditional classes** (ThemeSelector selected state) use the module class
  object pattern (`className={selected ? styles.active : ''}`).

## Current Tailwind Usage (source of truth)

~80 unique utilities across 9 components + `App.tsx`. Variants in use:
`hover:`, `focus:`, `checked:`, `disabled:`, `sm:` (one breakpoint, 640px).
Theme colors: `bg-field`, `bg-soft`, `text-body`, `text-primary`, `text-accent`,
`text-success`, `text-muted`, `border-field`, `bg-secondary`, `ring-accent`,
`ring-primary`, `ring-secondary`, `ring-offset-soft`. Opacity modifiers:
`bg-opacity-75`, `bg-opacity-10`, `bg-opacity-0`, `text-opacity-60`, `opacity-60`,
`ring-opacity-40`. Custom classes already plain CSS: `.dropdown`, `.dropdown-end`,
`.dropdown-content` (in `global.css`). Forms plugin classes: `form-input`,
`form-checkbox`, `form-radio`.

### Utility → CSS mapping reference

| Tailwind utility | Native CSS |
|---|---|
| `flex`, `flex-col`, `flex-wrap`, `items-center`, `justify-between`, `justify-center`, `self-center`, `flex-1`, `flex-auto`, `flex-none`, `inline-block`, `relative`, `align-middle` | The equivalent flexbox rule inside the module class (`.row`, `.col`, `.grow`...) |
| `p-1..p-8`, `px-*`, `py-*`, `gap-*`, `space-x-*`, `space-y-*`, `m-*`, `mt-6`, `mb-6`, `my-6`, `mx-auto`, `-me-2`, `w-*`, `h-*`, `size-*` | Hardcoded `0.25rem` multiples in module classes (`.icon { width: 1.5rem; height: 1.5rem }`) |
| `bg-field`, `bg-soft`, `bg-secondary`, `bg-accent`, `bg-transparent` | `background-color: hsla(var(--color-field), 1)` etc. |
| `text-body`, `text-primary`, `text-accent`, `text-success`, `text-muted` | `color: hsla(var(--color-*), 1)` |
| `border-field` | `border-color: hsla(var(--color-field), 1)` |
| `shadow` (default) | `--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `rounded`, `rounded-lg`, `rounded-xl`, `rounded-full` | `border-radius: 0.25rem / 0.5rem / 0.75rem / 9999px` |
| `transition`, `transition-colors`, `transition-all`, `transition-shadow`, `duration-300` | `transition: ...` per module |
| `text-2xl`, `text-sm`, `font-mono` | `font-size: 1.5rem`, `font-family: var(--font-mono)` |
| `bg-opacity-75` / `text-opacity-60` / `opacity-60` | `hsla(var(--color-*), 0.75 / 0.6)` or `opacity: 0.6` |
| `hover:bg-opacity-10`, `hover:bg-primary` | `&:hover { background-color: hsla(var(--color-primary), 0.1) }` |
| `hover:text-opacity-100` | `&:hover { color: hsla(var(--color-body), 1) }` |
| `focus:ring-*`, `focus:ring-offset-soft`, `focus:ring-opacity-40`, `focus:ring-4`, `focus:border-secondary`, `focus:outline-none` | `&:focus-visible { outline: none; box-shadow: 0 0 0 4px hsla(var(--color-*), 0.4) }` |
| `checked:!bg-accent`, `checked:!border-transparent`, `checked:!bg-primary` | `&:checked { background-color: ...; border-color: transparent }` |
| `disabled:!text-muted`, `disabled:hover:!bg-opacity-0` | `&:disabled { color: ... }` / `&:disabled:hover { ... }` |
| `sm:w-0`, `sm:flex-none` | `@media (min-width: 640px) { ... }` |
| `bg-gradient-to-r from-X to-Y` | `background: linear-gradient(to right, hsla(var(--color-X), 1), hsla(var(--color-Y), 1))` |
| `backdrop-blur` | `backdrop-filter: blur(8px)` |
| `form-input`, `form-checkbox`, `form-radio` | Ported `@tailwindcss/forms` rules in `form-controls.css` |
| `max-w-screen-md`, `max-w-xs`, `w-max`, `w-68` | `max-width: 768px` / `20rem` / `max-content` / `17rem` |
| `text-pretty`, `text-center` | `text-wrap: pretty; text-align: center` |
| `select-none` | `user-select: none` |
| `outline-none` | `outline: none` (inside focus-visible handling) |
| `z-10`, `z-50` | `z-index: 10 / 50` |

## Task List

### Phase 1: Foundation

#### Task 1: Create `reset.css` (Preflight port) and restructure `global.css`

**Description:** Port Tailwind v3.4 Preflight from
`node_modules/tailwindcss/src/css/preflight.css` into `src/styles/reset.css` using
native CSS nesting. Replace `@tailwind base` in `global.css` with
`@import 'reset.css'`. Keep `@tailwind components/utilities` in place for now.
Preserve the existing `body`, `h1`, `b`, `strong` rules (convert to nesting).
Root.css and fonts.css untouched.

**Acceptance criteria:**
- [ ] `reset.css` covers every Preflight rule: border-box, margin/typography resets,
      link inheritance, form-control font inheritance, `appearance` handling,
      `img/video` sizing, `textarea` resize — with no `theme()` references and no
      Tailwind-internal `--tw-*` variables
- [ ] `global.css` imports `reset.css` instead of `@tailwind base`; file order is
      reset → root → fonts → body styles

**Verification:**
- [ ] `pnpm build` succeeds
- [ ] `pnpm lint` passes
- [ ] `pnpm preview` — app renders identical to pre-migration (compare light/dark/system)

**Dependencies:** None

**Files likely touched:**
- `src/styles/reset.css` (new)
- `src/styles/global.css`

**Estimated scope:** Small (2 files)

#### Task 2: Create shared `form-controls.css` foundation

**Description:** Port the `@tailwindcss/forms` (class strategy) behavior into a
shared `src/styles/form-controls.css`: base `input` appearance reset, the
`form-checkbox` / `form-radio` appearance-none + border + checked-state styling
(accent, transparent border), and the `--shadow` design token. Exported selectors
are the base classes modules will compose from (CSS Modules `composes` or shared
selector via `:global` — decide during implementation, prefer module-local
duplication kept minimal).

**Acceptance criteria:**
- [ ] Checkbox/radio base style (appearance none, 1px border, field background)
      exists once in the shared file
- [ ] `--shadow` token defined (Tailwind default `shadow` value)

**Verification:**
- [ ] `pnpm build` succeeds
- [ ] No visual change yet (file is not referenced by components until Task 4)

**Dependencies:** None (Task 1 optional but preferable for order)

**Files likely touched:**
- `src/styles/form-controls.css` (new)

**Estimated scope:** Small (1 file)

### Checkpoint: Foundation
- [ ] `pnpm build` + `pnpm lint` pass
- [ ] `pnpm preview` renders identically to the pre-migration commit
- [ ] Review reset.css against preflight.css source before proceeding

### Phase 2: Component Migrations (one component class set per task)

#### Task 3: Migrate `Frame` and `App` layout

**Description:** Create `Frame.module.css` (`.frame`: `bg-soft` →
`hsla(var(--color-soft), 1)`, `rounded-xl`, `--shadow`). Create
`App.module.css` with all layout: page padding, `nav` (flex, justify-between),
`.brand` row, `main` (max-width 768px, margin auto), and the single
`@media (min-width: 640px)` block for `sm:w-0` / `sm:flex-none` on the settings
column. Icon sizing (`size-6`, `w-6 h-6`) becomes a local `.icon` class.

**Acceptance criteria:**
- [ ] No `className` in `App.tsx`/`Frame.tsx` contains a Tailwind utility — only
      module classes
- [ ] Responsive behavior at 640px matches pre-migration layout
- [ ] Frame card look (soft bg, rounded, shadow) matches pre-migration

**Verification:**
- [ ] `pnpm build`, `pnpm lint` pass
- [ ] `pnpm preview` — compare header, centered main column, icon sizing

**Dependencies:** Task 1

**Files likely touched:**
- `src/components/Frame.module.css` (new)
- `src/components/Frame.tsx`
- `src/App.tsx`
- `src/App.module.css` (new)

**Estimated scope:** Medium (4 files)

#### Task 4: Migrate `Checkbox` and `RadioButton`

**Description:** Create `Checkbox.module.css` and `RadioButton.module.css`
composing the shared form-controls base: field background, 1px `border-field`,
`rounded` + `mr-2` layout on a flex row, `shadow`, `transition`, focus ring
(`ring-accent`/`ring-primary`, `ring-offset-soft` → box-shadow), and
`:checked` accent fill + transparent border.

**Acceptance criteria:**
- [ ] Checkbox/radio look identical to pre-migration in all states: default,
      checked, focus, dark mode
- [ ] No Tailwind utilities remain in these components

**Verification:**
- [ ] `pnpm build`, `pnpm lint` pass
- [ ] `pnpm preview` — toggle all four checkboxes + both radios, focus with Tab,
      verify in dark and light

**Dependencies:** Tasks 2, 3

**Files likely touched:**
- `src/components/Checkbox.module.css` (new), `Checkbox.tsx`
- `src/components/RadioButton.module.css` (new), `RadioButton.tsx`
- possibly `src/styles/form-controls.css`

**Estimated scope:** Medium (4-5 files)

#### Task 5: Migrate `PasswordButton`

**Description:** Create `PasswordButton.module.css`: `rounded-full`, padding,
`transition`, hover/focus `background-color: hsla(var(--color-primary/accent), 0.1)`
(was `!bg-opacity-0` + `hover:!bg-opacity-10`), `:disabled` → `text-muted` and
`:disabled:hover` transparent (no !important — plain specificity), `color` prop
selects `success` vs `accent` text + background classes via module class object.

**Acceptance criteria:**
- [ ] Button hover/focus/disabled states visually identical to pre-migration
      (accent tint on hover, no background on disabled)
- [ ] Copy button turns success-colored when copied

**Verification:**
- [ ] `pnpm build`, `pnpm lint` pass
- [ ] `pnpm preview` — hover, focus, disabled (empty password), copied state

**Dependencies:** Task 3

**Files likely touched:**
- `src/components/PasswordButton.module.css` (new)
- `src/components/PasswordButton.tsx`

**Estimated scope:** Small (2 files)

#### Task 6: Migrate `PasswordLengthField`

**Description:** Create `PasswordLengthField.module.css`: number input (port of
`form-input`: `bg-field`, `border-field`, `rounded-xl`, `shadow`, `w-20`,
`focus:border-secondary` + focus ring), and the react-range track/thumb styles
(secondary fill, `h-2.5`/`h-5` geometry, thumb `rounded-full bg-secondary shadow`
+ `focus:ring-4 focus:ring-secondary focus:ring-opacity-40`).

**Acceptance criteria:**
- [ ] Number input and range slider render identically to pre-migration in all
      states including focus and dark mode
- [ ] Slider thumb shows secondary-colored 4px halo on focus

**Verification:**
- [ ] `pnpm build`, `pnpm lint` pass
- [ ] `pnpm preview` — drag slider end-to-end (4-64), focus both controls

**Dependencies:** Tasks 2, 3

**Files likely touched:**
- `src/components/PasswordLengthField.module.css` (new)
- `src/components/PasswordLengthField.tsx`
- possibly `src/styles/form-controls.css`

**Estimated scope:** Medium (2-3 files)

#### Task 7: Migrate `ProgressBar`

**Description:** Create `ProgressBar.module.css`: track (`bg-field`, `rounded-full`,
`h-2.5`) and fill (`linear-gradient`, 4 color variants via `data-color` attribute
or class object; `transition-all duration-300` on width).

**Acceptance criteria:**
- [ ] Progress fill color matches score color (primary gradient default, plus
      danger/warning/success) in both themes
- [ ] Width animation (300ms) preserved

**Verification:**
- [ ] `pnpm build`, `pnpm lint` pass
- [ ] `pnpm preview` — type a weak and a strong password; watch color + animation

**Dependencies:** Task 3

**Files likely touched:**
- `src/components/ProgressBar.module.css` (new)
- `src/components/ProgressBar.tsx`

**Estimated scope:** Small (2 files)

#### Task 8: Migrate `Tooltip`

**Description:** Create `Tooltip.module.css`: floating container (`w-max max-w-xs`,
`backdrop-blur`, `bg-field` at 75% → `hsla(var(--color-field), 0.75)`, `rounded-lg`,
`text-sm`, `--shadow`, `py-2 px-3`, `z-50`, centered, `text-wrap: pretty`). The
`!m-0` reset is handled by a plain `margin: 0` rule. Position (top/left) stays in
the inline `style` prop (floating-ui) — untouched.

**Acceptance criteria:**
- [ ] Tooltip visually identical (blur, translucent field background, shadow) in
      light and dark
- [ ] No layout shift from the removed `!m-0` utility

**Verification:**
- [ ] `pnpm build`, `pnpm lint` pass
- [ ] `pnpm preview` — hover every tooltip trigger; check placement + focus

**Dependencies:** Task 3

**Files likely touched:**
- `src/components/Tooltip.module.css` (new)
- `src/components/Tooltip.tsx`

**Estimated scope:** Small (2 files)

#### Task 9: Migrate `ThemeSelector` and remove legacy `.dropdown` CSS

**Description:** Create `ThemeSelector.module.css`: port `.dropdown`,
`.dropdown-end`, `.dropdown-content` from `global.css` (with `-me-2`, `mt-6`,
`z-10`, `w-68`, `bg-soft` 75%, `backdrop-blur`, `rounded-xl`, `shadow`); menu item
buttons (flex column, `rounded-lg px-4 py-2`, `hover:bg-primary` at 10%); selected
state via module class object → `text-primary`. Delete the `.dropdown` rules from
`global.css`.

**Acceptance criteria:**
- [ ] Dropdown opens/closes via the same outside-click handler; panel position
      matches pre-migration
- [ ] Selected theme highlighted in `text-primary`; hover tint matches

**Verification:**
- [ ] `pnpm build`, `pnpm lint` pass
- [ ] `pnpm preview` — open dropdown, click all three options, click outside to close

**Dependencies:** Tasks 1, 3

**Files likely touched:**
- `src/components/ThemeSelector.module.css` (new)
- `src/components/ThemeSelector.tsx`
- `src/styles/global.css`

**Estimated scope:** Medium (3 files)

### Checkpoint: Component Migration Complete
- [ ] `pnpm build` + `pnpm lint` pass
- [ ] `rg "className" src` shows zero Tailwind utility tokens in any className string
- [ ] Full manual pass: both themes, all controls, tooltips, dropdown, slider
- [ ] Review with human before removing Tailwind

### Phase 3: Cleanup

#### Task 10: Remove Tailwind from the toolchain

**Description:** Delete `tailwind.config.js`, `postcss.config.cjs`, and the
remaining `@tailwind components/utilities` directives from `global.css` (keep the
plain rules). Remove deps: `tailwindcss`, `@tailwindcss/forms`, `autoprefixer`.
Remove `prettier-plugin-tailwindcss` from `prettier.config.cjs` and from
devDependencies. Final grep audit for `tailwind`/`tw-` references.

**Acceptance criteria:**
- [ ] No `tailwind`/`@tailwindcss`/`autoprefixer`/`prettier-plugin-tailwindcss`
      in `package.json`, configs, or `pnpm-lock.yaml`
- [ ] No `@tailwind` directive anywhere in `src/`
- [ ] `pnpm install` produces a clean lockfile; `pnpm build` works

**Verification:**
- [ ] `pnpm build`, `pnpm lint`, `pnpm format` pass
- [ ] `pnpm preview` — full final visual pass in light + dark + system
- [ ] `git diff` reviewed: no stray utilities, no leftover Tailwind tokens

**Dependencies:** Tasks 1-9 (all migrations complete)

**Files likely touched:**
- `AGENTS.md`
- `package.json`, `pnpm-lock.yaml`
- `tailwind.config.js` (deleted), `postcss.config.cjs` (deleted)
- `prettier.config.cjs`
- `src/styles/global.css`

**Estimated scope:** Medium (4-5 files)

### Final Checkpoint
- [ ] All acceptance criteria met
- [ ] `pnpm build` + `pnpm lint` clean
- [ ] GitHub Pages deploy preview (`.github/workflows/deploy.yml`) succeeds from
      `main`
- [ ] Ready for human review

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Preflight port drifts from Tailwind's reset → subtle rendering diffs | Med | Port from the exact `preflight.css` in `node_modules`; visual-diff after Task 1; keep Tailwind until the end so a regression is easy to bisect |
| `@tailwindcss/forms` checkbox/radio styling is fiddly (appearance, focus ring, checked border) | Med | Shared `form-controls.css` in one place; explicit state matrix in Task 4 verification (default/checked/focus/dark) |
| Opacity-modifier semantics (`text-opacity-60` vs `opacity-60`) misread as the same thing | Low | Mapping table above; `text-*`/`bg-*` opacity → `hsla(var(--color-*), x)`, bare `opacity-60` → `opacity: 0.6` |
| Native nesting unsupported in older browsers | Low | App is a GitHub Pages hobby project; modern-browser baseline accepted by user |
| Conditional/duplicated class strings (ThemeSelector, ProgressBar) missed during grep audit | Low | Grep audit in Task 10 + manual interaction pass; runtime props drive module class objects |
| Lockfile/install churn when removing deps | Low | Single `pnpm install` in Task 10; verify build immediately after |

## Open Questions

- None blocking. Minor: whether `App.tsx`'s password input (`font-mono`, flex-1)
  styles live in `App.module.css` (yes — it's not a standalone component) and
  whether form-controls base is composed via `:global` selectors or per-module
  duplication (decide during Task 4; prefer `composes`).
