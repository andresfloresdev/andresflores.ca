# Styling

Tailwind v4 via `@tailwindcss/vite`. **There is no `tailwind.config.js`** — v4 is configured in CSS, and everything lives in `src/styles/global.css`.

## Design tokens

The `@theme` block defines tokens; Tailwind generates utilities from them. Editing these values is most of a rebrand.

| Token | Generates | Default |
| :-- | :-- | :-- |
| `--color-canvas` | `bg-canvas` | `#ffffff` |
| `--color-surface` | `bg-surface` | `#f6f7f9` |
| `--color-ink` | `text-ink` | `#14161a` |
| `--color-muted` | `text-muted` | `#5b616e` |
| `--color-line` | `border-line` | `#e5e7eb` |
| `--color-brand` | `bg-brand` | `#14161a` |
| `--color-brand-hover` | `hover:bg-brand-hover` | `#34383f` |
| `--color-brand-fg` | `text-brand-fg` | `#ffffff` |
| `--container-page` | `max-w-page` | `70rem` |
| `--container-narrow` | `max-w-narrow` | `45rem` |
| `--font-sans` | `font-sans` | `var(--font-inter), …` |
| `--animate-nav-underline` | `animate-nav-underline` | active-nav underline, 340ms |

Names avoid Tailwind's built-in scale so nothing is shadowed. `canvas`/`ink` rather than `white`/`black` because a dark rebrand inverts them.

## Custom utilities

Defined with `@utility` below `@theme`:

- **`container-page`** — the centered page gutter. `width: 100%`, capped at `--container-page`, with responsive inline padding. Used by every section.
- **`prose-post`** — maps `@tailwindcss/typography` onto the tokens by setting `--tw-prose-*`. Applied as `class="prose prose-post"`.

`prose-post` also carries two overrides of plugin defaults:

- the plugin wraps inline `code` in **literal backtick characters** via `::before`/`::after`; those are set to `content: none`
- inline code gets a `--color-surface` background and tightened padding (`0.15em 0.25em`) so following punctuation does not look detached
- bullets moved from `--color-line` to `--color-muted`, which at `#e5e7eb` were nearly invisible

## The component styling contract

**`<Button>` and `<HeaderLink>` do not accept a `class` prop.** It is omitted from their types via `Omit<HTMLAttributes<'a'>, 'class' | 'class:list'>` and destructured out at runtime so a stray one cannot reach the element.

### Why

Tailwind breaks specificity ties by **stylesheet order, not class order**. Both `.hidden` and `.inline-flex` are single-class selectors with identical specificity, so the one emitted later in the generated CSS wins — regardless of what you typed.

Measured in this project's build:

```
.flex{         byte offset 23403
.hidden{       byte offset 23441
.inline-flex{  byte offset 23462   ← later, wins
```

So `<Button class="hidden sm:inline-flex">` rendered a **visible** button on mobile, even though `hidden` was second-to-last in the class attribute. The `sm:inline-flex` half was irrelevant — below `640px` it is not in play, and the fight was between the component's own base `inline-flex` and the passed-in `hidden`.

This generalizes to any property the component already sets: `rounded-full` vs `rounded-md`, `px-8` vs `px-4`, `text-lg` vs `text-sm`, `bg-white` vs `bg-brand`. Some happen to work today by luck of emit order, which is an implementation detail that can shift between Tailwind releases.

### The runtime strip matters as much as the type

Without destructuring `class` out, a runtime-passed `class` lands in `...props`, spreads onto the element **after** `class:list`, and replaces the component's styling entirely — a worse failure than the original. Verified: a page passing `class="hidden bg-red-500"` *and* `class:list={['rounded-full']}` renders with only the component's own classes.

### How to vary a component instead

- **New look** → add a `variant` or `size` to the component
- **Layout around it** (spacing, alignment, visibility) → wrap it in an element that owns those classes:

```astro
<div class="hidden sm:block">
	<Button href={ctaHref(locale)} size="sm">{t('cta.label')}</Button>
</div>
```

`Header.astro` uses exactly this for the mobile CTA.

If components ever need to be freely overridable by class, add [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) and reopen the `class` prop *through it*. Do not go back to plain concatenation.

## Base layer

`@layer base` in `global.css` sets body background/color/font, heading weight and tracking with `text-wrap: balance`, a `:focus-visible` ring, `scroll-behavior: smooth`, and a `prefers-reduced-motion` block that flattens animation and transition durations.

Tailwind's preflight resets everything, which is why long-form Markdown needs the typography plugin rather than inheriting sensible defaults.

## Fonts

Inter, loaded through `astro-font` in `src/layouts/Layout.astro`:

```astro
<AstroFont config={[{
  src: [],
  name: 'Inter',
  googleFontsURL: 'https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap',
  preload: false,
  display: 'swap',
  fallback: 'sans-serif',
  cssVariable: 'font-inter',
}]} />
```

`cssVariable: 'font-inter'` puts `--font-inter` on `:root`; `--font-sans` in `@theme` reads it. astro-font inlines the `@font-face` rules and generates a metric-matched fallback family, which limits layout shift while the webfont loads.

### `preload: false` is deliberate

Google serves Inter as **seven unicode subsets** (latin, latin-ext, cyrillic, cyrillic-ext, greek, greek-ext, vietnamese). With `preload: true`, astro-font emits a `<link rel="preload">` for every one of them and the browser fetches all seven.

The `@font-face` rules are inlined into the head either way, so the browser discovers the font immediately and downloads only the subset the page's text actually needs — roughly 15 kB for latin. The `subset=` query parameter does not help; the `css2` endpoint returns all seven regardless.

### Build-time network dependency

`astro-font` fetches from Google at build time to compute fallback metrics. **Builds need network access.** This is the main argument for switching to self-hosted files on a locked-down CI.

To swap fonts: change `googleFontsURL` and `name`, then update `--font-sans` if the CSS variable name changes.
