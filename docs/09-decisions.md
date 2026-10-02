# Decisions and gotchas

Why things are the way they are. Several entries exist because something broke first.

## Decision log

| Decision | Rationale | Rejected alternative |
| :-- | :-- | :-- |
| Every locale prefixed, incl. default | Changing the default language moves no URLs | `prefixDefaultLocale: false` — flipping the default would rewrite every URL on the site |
| Route manifest instead of folder routing | Only way to get translated segments from one page file | Astro's "Translate Routes" recipe — needs one file per slug per language |
| One router, page bodies in `views/` | Astro allows one dynamic file per directory level | Page bodies in `src/pages/` — would collapse every page into the router |
| Omit untranslated routes, no fallback | Mixed-language pages fail quietly; missing pages can fail loudly | English content at French URLs — compliance exposure in Quebec |
| `translationKey` on posts | Slugs differ per language, so nothing structural links translations | Matching file names — defeats translated slugs |
| Components refuse a `class` prop | Tailwind resolves conflicts by stylesheet order, silently | Passing classes through — worked or failed depending on the property |
| Sitemap i18n option disabled | It cannot express translated slugs; partial coverage misleads | Leaving it on — alternates for `/en/`↔`/fr/` only, silence elsewhere |
| `preload: false` on Inter | Google serves 7 subsets; preloading fetches all of them | `preload: true` — 7 font requests for an English page |
| Short locale keys + separate `htmlLang` | `fr-CA` hreflang without `fr-CA` in every URL | `fr-CA` as the URL segment |
| Tailwind v4 CSS-first | One token block, no JS config to keep in sync | `tailwind.config.js` — not how v4 works |
| `@tailwindcss/typography` | Preflight strips Markdown styling entirely | Hand-rolled prose CSS |
| Legal text in a collection, not JSON | ~40 flat keys otherwise; lawyers edit Markdown | `ui/*.json` keys |
| Analytics injected only after consent | A banner over already-running tracking asserts false compliance | Script in HTML + a cosmetic banner |
| Config placeholders not interpolated into policy text | A config typo silently rewriting a published policy is worse than editing two files | Auto-substitution |
| `<Button>` renders `<button>` without `href` | An `<a>` with no `href` is unfocusable and announced as nothing | Anchors everywhere |
| Lenis `anchors` off, custom capture-phase handler | The built-in option does not prevent the native hash jump, so Lenis animates from a wrong measurement | `anchors: true` |
| `scrollTo` always takes an absolute number | Element targets resolve viewport-relative, correct only at scroll 0 | `scrollTo(element)` |
| Instance on `window.__lenis` | `window.lenis` is already declared by the library for feature detection | `window.lenis` |
| `build` runs `astro check` first | Type errors should block a deploy, not surface only in an editor | `check` as a separate opt-in script |
| `overrides: { typescript: "$typescript" }` | `@swup/plugin` pins typescript ^4 via microbundle, blocking `@astrojs/check` | `--legacy-peer-deps`, which no fresh clone would use |
| TypeScript pinned to 6.x | TS 7's native compiler does not expose the API `astro check` needs | Latest TypeScript |

## Bugs found, and what caused them

### Tailwind display conflict

`<Button class="hidden sm:inline-flex">` rendered a **visible** button on mobile. Tailwind emits `.inline-flex` (byte 23462) after `.hidden` (byte 23441); equal specificity means later wins, and class-attribute order is irrelevant.

Fixed by removing `class` from the component API and wrapping the button in `<div class="hidden sm:block">`. Full detail in [03-styling.md](03-styling.md).

### Active nav state was dead

After the i18n conversion, no nav item was ever marked active. `HeaderLink` still carried the Astro starter's path matching:

```js
const isActive = href === pathname || href === '/' + (subpath?.[0] || '');
```

which assumes unprefixed single-segment routes and never matches `/en/about-us/`.

Fixed by passing `isActive` down from the router's `view`. Path matching was not repaired because it also cannot tell that `/en/blog/hello-world/` belongs to the Blog item.

### Active state stale under swup

Once fixed, the active state still only updated on refresh: swup's default `containers: ['main']` never replaces the header. Fixed with `containers: ['main', 'header']` — see [07-view-transitions.md](07-view-transitions.md).

### Fade-in lost after that fix

Adding the header as a container broke the in-animation — pages faded out, then snapped in. Cause: swup replaces containers with `replaceWith(clone)`, and the fade class is added by the theme at runtime, so the clone mounts without it.

Fixed by putting `swup-transition-main` in the markup. **This one was introduced by the previous fix** — a reminder that swup changes need a before/after opacity trace, not a glance.

### Leftover Astro branding

The placeholder image kept from the starter was Astro's "Build the web you want" marketing art, visible on every blog card and post hero. Replaced with a neutral generated placeholder.

Worth noting because it survived a pass that was explicitly about removing Astro branding — the file name (`blog-placeholder-1.jpg`) gave no hint of its contents.

### Typography plugin rendering literal backticks

`@tailwindcss/typography` wraps inline `code` in actual backtick characters via `::before`/`::after`. Overridden in `prose-post`, along with bullets that were nearly invisible at `--color-line`.

### Active underline snapped instead of animating

A CSS transition on the underline could never work — swup mounts a new `<header>`, and transitions do not run on freshly mounted elements. Switched to a keyframe animation, which replays on mount.

That then replayed on same-section navigation (`/blog/` → `/blog/a-post/` keeps **Blog** active), so a script in `Layout.astro` compares the active item across the swap and fast-forwards the animation when it is unchanged. See [07-view-transitions.md](07-view-transitions.md).

### The 404 inherited the homepage's identity

The 404 shipped with `view="home"` — the only value the type allowed. That made it pick up the homepage's `seo.home.title` as its meta title, emit hreflang pointing at real home URLs, and mark **Home** active in the nav. Three systems, one wrong value.

Fixed with a `ViewKey` type (`RouteKey | 'post' | 'notFound'`), `getAlternates` returning empty for `notFound`, and optional chaining in `segmentFor` — without it, `ROUTES['notFound'][locale]` throws.

Each piece was individually correct; the bug lived only in their interaction. That is the standard failure mode when work is split across shared plumbing.

### Consent buttons were unusable by keyboard

They rendered as `<a>` with no `href`, because `<Button>` only ever emitted anchors. Visually perfect, completely inoperable by keyboard or screen reader — on the control that gates tracking consent. `<Button>` now picks its element from `href`.

Static greps passed this happily (`id="consent-accept"` was present). Only checking the rendered tag name caught it.

### Dates rendered a day early

`lastUpdated: '2026-07-26'` displayed as **25 juill. 2026**. A bare `YYYY-MM-DD` is parsed as UTC midnight, and `toLocaleDateString` then formats in the build machine's timezone — anywhere west of Greenwich that is the previous day. `FormattedDate` now formats with `timeZone: 'UTC'`.

Latent site-wide, not just on the new page: blog posts dodged it only because their dates are written `Jan 15 2026`, which parses as *local* midnight. Any post authored with an ISO date would have been a day early.

### Nav landmarks mislabelled

Both navs had `aria-label={t('nav.home')}`, announcing the landmark as "Home"/"Accueil". Now `nav.main` / `nav.footer`.

## Things that look wrong but are not

- **`main` is first in `containers`** — the transition theme animates `containers[0]`. Reordering makes the header fade.
- **`swup-transition-main` hardcoded in `Layout.astro`** — a theme-internal class name in markup, but the only way the class survives element replacement. Classic swup does exactly this.
- **`astro.config.mjs` imports `src/i18n/config.ts`** — app code in build config, so `DEFAULT_LOCALE` has one definition rather than two that drift.
- **`en.json` statically imported in `utils.ts` while others are globbed** — the static import exists only to derive the `UIKey` type.
- **`pathTo()` returns `undefined`** — deliberately not throwing, so "filter it out of the nav" is a one-liner.
- **`second-post.md` has no French translation** — a fixture demonstrating the untranslated path. Delete it in a real project.
- **The nav underline is an `animation`, not a `transition`** — transitions do not run on newly mounted elements, and swup mounts a new header every navigation.

### Type checking was not wired up

`astro build` does not type-check, so for most of this project's life a bad manifest key or a forbidden `class` prop was only visible in an editor. Both of those shipped at least once — see the 404 and consent-button entries above.

`npm run build` now runs `astro check` first. Verified it catches both:

```
Type '"abuot"' is not assignable to type 'ViewKey'. Did you mean '"about"'?
Type '{ … class: string; }' is not assignable to type 'IntrinsicAttributes & Props'
```

Wiring it up surfaced 7 pre-existing errors, all real: undeclared `window` globals on the enhancement scripts (now in `src/env.d.ts`), an implicit `any`, a stale import, and the router passing `post` to views whose type required it.

## Open items

- **Root redirect is a meta-refresh** in static output. Prefer a host-level 301.
- **`astro-font` needs network at build time** to compute fallback metrics.
- **`npm audit` advisories** all come from `@swup/astro`'s transitive build tooling. No upstream fix.
