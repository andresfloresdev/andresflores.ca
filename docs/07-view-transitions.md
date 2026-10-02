# View transitions and scrolling

`@swup/astro` provides client-side navigation with a fade transition. It imposes two constraints that are easy to break and hard to diagnose, both of which cost real debugging time.

## Configuration

```js
swup({ containers: ['main', 'header'], smoothScrolling: false }),
```

## Constraint 1 — the header must be a container

swup defaults to `containers: ['main']`. It replaces only `<main>`, so `<header>` persists across navigation — along with any per-page state rendered into it.

**Symptom:** the active nav item never changes during client-side navigation. It updates only on a hard refresh.

**Fix:** name the header as a container too.

### Order matters

`@swup/astro` passes `mainElement: containers[0]` to the transition theme, so **only the first container is animated**. Keeping `main` first means content fades while the header swaps instantly. Put `header` first and the header fades on every navigation.

Measured, sampling computed opacity every 30 ms through a transition:

```
header min opacity: 1.000   ← never fades
main   min opacity: 0.006   ← transition runs
```

Anything else carrying per-page state belongs in this list, with `main` still first.

## Constraint 2 — the transition class must be in the markup

```astro
<main id="main" class="flex-1 swup-transition-main">
```

`swup-transition-main` is the class `@swup/fade-theme` animates:

```css
html.is-changing .swup-transition-main { opacity: 1; transition: opacity var(--swup-fade-theme-duration) }
html.is-animating .swup-transition-main { opacity: 0 }
```

Normally `@swup/theme` adds that class at runtime and re-adds it on the `content:replace` hook. But swup replaces containers by **swapping the element**:

```js
current.replaceWith(incoming.cloneNode(true))
```

The clone comes from the fetched document, which does not carry a runtime-added class. So the new `<main>` mounts at opacity 1, and the theme patches the class on afterwards — too late, because swup removes `is-animating` almost immediately after.

**Symptom:** the page fades *out* correctly, then the new page appears instantly at full opacity, followed by a few hundred ms of nothing.

Measured before the fix:

```
 438  0.002   is-changing is-animating is-leaving     ← faded out
 457  1.000   is-changing is-animating is-rendering   ← snapped to full
 491  1.000   is-changing is-rendering                ← dead time
```

After putting the class in the markup:

```
 438  0.002   is-leaving      ← out
 473  0.011   is-rendering    ← in starts
 539  0.267   is-rendering
 605  0.608   is-rendering
 840  0.998   is-rendering
```

**Keep `swup-transition-main` on `<main>` if you restyle the layout.** This is really just classic swup usage — you put the transition class on your container; `@swup/astro` automates it in a way that does not survive element replacement.

## Consequence — the active nav underline is an animation, not a transition

Because the header is replaced with a fresh element, a CSS **transition** on the active indicator never runs: transitions require a change on an existing element, and this one is newly mounted. It would snap in.

So the underline uses a keyframe animation (`--animate-nav-underline` in `global.css`), which replays every time the element is created:

```
scaleX: 0.000 → 0.391 → 0.639 → 0.783 → 0.872 → 0.924 → 0.956 → 0.993
```

### Suppressing the redundant replay

That is correct when the section changes, and wrong when it does not. `/en/blog/` → `/en/blog/hello-world/` keeps **Blog** active, but the element is still new, so the underline would collapse and regrow on an item that did not change.

A small script in `Layout.astro` compares the active item either side of the swap, using the `astro:before-swap` / `astro:after-swap` events `@swup/astro` dispatches, and calls `.finish()` on the animation when it is the same item. `astro:after-swap` fires in the same task as the DOM swap, so this lands before the first paint — no visible flash.

`getAnimations({ subtree: true })` is what reaches a `::after` animation; without `subtree` it returns nothing.

Measured behaviour:

| Navigation | Underline |
| :-- | :-- |
| Home → Blog | animates |
| Blog → post (same section) | instant |
| post → About | animates |

Without JavaScript the underline animates every time — a fine baseline, just slightly chattier.

Under `prefers-reduced-motion: reduce` the base layer flattens it (`animation-duration: 1e-05s`), verified.

## Language switching bypasses swup

Every link in `LanguageSwitcher.astro` carries `data-no-swup`, which swup's `ignoreVisit` honours.

Changing language is a **document-level** change: `<html lang>` and the head's `hreflang` set both differ. swup swaps the named containers, so a client-side language switch would leave a French page announcing itself as English.

Verified: the switch reports `client-side: false` (a real page load), lands with `lang="fr-CA"`, and shows the correct nav item active.

## Astro lifecycle events

`@swup/astro` dispatches `astro:before-swap`, `astro:after-swap`, and `astro:page-load` on the corresponding swup hooks, so code expecting Astro's view-transition lifecycle works.

Component `<script>` tags do **not** re-run on client-side navigation. Anything needing to survive it should attach listeners to `document` — which is exactly what the language dropdown does.

## If swup is removed

Dropping it for Astro's built-in view transitions would remove both constraints and the transitive `npm audit` advisories ([01-overview.md](01-overview.md)). It would also require revisiting:

- `containers` (no longer meaningful)
- `swup-transition-main` on `<main>`
- `data-no-swup` on switcher links (Astro's equivalent opt-out is `data-astro-reload`)

## Smooth scroll (Lenis)

`src/components/SmoothScroll.astro`, rendered from `Layout` after the footer. Lenis 1.3.x with `autoRaf`, so there is no ticker to keep alive.

### What it had to be reconciled with

| Existing behaviour | Resolution |
| :-- | :-- |
| `scroll-behavior: smooth` in `global.css` | **Removed.** Lenis drives scrolling via `window.scrollTo`; native smoothing on top of it fights the library |
| swup's `smoothScrolling` (on by default) | **Off** in `astro.config.mjs`. It enables SwupScrollPlugin — two libraries animating one scroller. Also drops that plugin from the bundle |
| astro-reveal's `animation-timeline: view()` | Works unchanged. Lenis moves the real scroll position rather than transforming a container |
| `position: sticky` header | Unaffected, for the same reason |

### Reduced motion

Lenis **never initialises** under `prefers-reduced-motion: reduce`, and is destroyed if the preference changes mid-session. Hijacking the scrollbar is precisely what that preference asks you not to do.

The same-page anchor interception is also skipped in that state, so the browser's native jump still works — otherwise anchors would break for exactly the people least able to work around it.

### Three traps, all found by testing

#### `anchors: true` is not enough

Lenis's built-in `anchors` option reacts to the click but does **not** prevent the browser's native hash jump. The page jumps to the target first, then Lenis animates from a position measured against the already-jumped viewport — scrolling *backwards* to the wrong place. Observed: a click that should land at 358 settled at 173.

So `anchors` is off, and a **capture-phase** click handler intercepts same-page hash links instead — capture so it beats swup's own delegated handler, with `stopPropagation` so swup never treats it as navigation.

#### Never pass an element to `scrollTo`

Lenis resolves an element target from its **viewport-relative** top, so `scrollTo(el)` is only correct at scroll position 0. Anywhere else it undershoots by the current scroll offset.

`scrollToTarget()` computes an absolute document position instead:

```js
const top = target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
window.__lenis?.scrollTo(Math.max(0, top));
```

`HEADER_OFFSET` is `-80`, keeping anchored sections clear of the sticky header.

#### Measure on the next frame after a swap

Lenis clamps a scroll target against the document height it knows **at call time** and never re-clamps. Measuring during `astro:page-load`, before swapped-in content has laid out, silently stops short — 10px on these pages, but potentially an image's height on a media-heavy one. The handler waits a frame and calls `lenis.resize()` first.

### The instance lives on `window.__lenis`

Not `window.lenis` — **the library already declares that global** for its own feature-detection object (`{ version, horizontal, snap, touch }`). Assigning the instance there would overwrite it.

### Verified

- wheel produces an eased ramp (42 distinct steps), not a jump
- anchors land correctly same-page, cross-page from three different origins, on deep-link, and in French
- scroll resets to 0 on navigation; Lenis's limit stays in sync with the new page
- reduced motion: no instance, native scrolling and native anchors intact
- reveal animations, consent banner, sticky header, and mobile layout all unaffected

Add `data-lenis-prevent` to any independently scrollable sub-region (a modal body, a code block with its own overflow).
