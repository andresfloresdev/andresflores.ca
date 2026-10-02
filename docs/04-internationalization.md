# Internationalization

The largest piece of this boilerplate, and the one with the most non-obvious constraints.

## URL shape

Every language is prefixed, **including the default**:

```
/                          → redirects to /en/
/en/   /en/about-us/   /en/blog/   /en/blog/hello-world/
/fr/   /fr/a-propos/   /fr/blogue/ /fr/blogue/bonjour-le-monde/
/en/rss.xml   /fr/rss.xml
```

Nothing lives at the root.

### Why not leave the default unprefixed

Unprefixed English gives marginally nicer URLs, and it is Astro's default (`prefixDefaultLocale: false`). It was rejected because **switching a project's primary language would move every URL on the site** — English pages descend into `/en/`, French pages climb to the root. On a live site that is a full redirect map and an SEO event.

With everything prefixed, the default locale decides only two things: where `/` redirects, and which language is `x-default`. Flipping it is one line:

```ts
// src/i18n/config.ts
export const DEFAULT_LOCALE: Locale = 'fr';
```

**This was verified, not assumed.** Building with `'fr'` produced an identical URL list; the only changes were `/` redirecting to `/fr/` and `x-default` pointing at the French URLs.

This matters for bilingual Quebec clients, where French-primary is a normal request and sometimes a mid-project one.

## Configuration

`src/i18n/config.ts` is the single source of truth, imported by both the app and `astro.config.mjs`:

```ts
export const LOCALES = {
	en: { label: 'English',  htmlLang: 'en-CA' },
	fr: { label: 'Français', htmlLang: 'fr-CA' },
} as const;

export const DEFAULT_LOCALE: Locale = 'en';
```

The short key is the **URL segment**; `htmlLang` is the **BCP-47 tag** used for `<html lang>`, `hreflang`, and date formatting. That split gives Quebec clients correct `fr-CA`/`en-CA` signals without putting a region code in every URL.

`astro.config.mjs` sets `i18n.routing.prefixDefaultLocale: true` so `Astro.currentLocale` and the `astro:i18n` helpers behave, plus `redirects: { '/': '/en/' }`.

## The route manifest

**Astro's file-based routing cannot produce translated URL segments.** A folder named `blog/` is the literal segment `blog` in every language. Astro's `i18n` config translates the *locale prefix* (`/fr/`, even `/french/`), not path segments — and its `locales: [{ path, codes }]` form carries restrictions that rule it out for a static site.

The official "Translate Routes" recipe only rewrites *links*; it still expects a real file at `src/pages/fr/prestations-de-service.astro`, i.e. one file per slug per language. That is the duplication this design avoids.

So URLs come from a table:

```ts
// src/i18n/routes.ts
export const ROUTES = {
	home:  { en: '',          fr: ''         },
	about: { en: 'about-us',  fr: 'a-propos' },
	blog:  { en: 'blog',      fr: 'blogue'   },
} as const satisfies Record<string, Partial<Record<Locale, string>>>;

export const NAV: RouteKey[] = ['home', 'blog', 'about'];
export const CTA_ROUTE: RouteKey = 'home';
export const CTA_HASH = 'contact';
```

`NAV` controls which routes appear in the header and footer, and in what order. Blog posts are not in this table — their existence is driven by file presence.

## Untranslated content

**A route exists in a language only if its translation is declared.** One rule, no special cases:

- omit a locale from a `ROUTES` row → that page has no URL in that language
- no file in `src/content/blog/fr/` → that post has no French URL

Nothing falls back. A French URL never serves English body copy.

### Why omit rather than fall back

A mixed-language page fails **quietly** — it ships and nobody notices for months. A missing page can be made to fail **loudly**. For a boilerplate reused across projects, prefer the loud failure.

In Quebec specifically, French URLs serving English body copy is a compliance exposure, not only an aesthetic one.

### The three safeguards

Omission is only safe because nothing dead-ends:

1. **Nav is derived per locale.** `Header`/`Footer` map over `NAV`, call `pathTo()`, and drop entries that return `undefined`. An untranslated page is simply not listed — no dead links.
2. **The language switcher disables unavailable languages** rather than linking to a 404 or dumping the reader on the homepage.
3. **The build reports what is missing:**

```
[i18n] 1 route(s) not built — untranslated:
  - post "untranslated-example" has no fr translation
```

`src/content/blog/en/second-post.md` is deliberately English-only so this behavior is visible out of the box. Delete it when starting a real project.

### If a project does want fallback

Astro's built-in `i18n.fallback` with `fallbackType: 'rewrite'` will **not** work — it matches on file structure, which the manifest replaces. Implement it in the router's `getStaticPaths()` instead: emit the missing locale's path with the default locale's content, and adjust `getAlternates` to match.

## Helpers

`src/i18n/utils.ts`:

| Function | Purpose |
| :-- | :-- |
| `useTranslations(locale)` → `t(key)` | UI string lookup; falls back to `DEFAULT_LOCALE`, then to the key itself so a miss is visible |
| `pathTo(locale, routeKey, slug?)` | URL for a route, or `undefined` if it does not exist in that language |
| `ctaHref(locale)` | The primary CTA target (`home` + `#contact`) |
| `parsePostId(id)` | `'en/hello-world'` → `{ locale: 'en', slug: 'hello-world' }` |

`pathTo` returning `undefined` rather than throwing is what makes "filter it out of the nav" a one-liner at every call site.

`src/i18n/alternates.ts` resolves which languages a page exists in — through the manifest for pages, through `translationKey` for posts.

## UI strings

`src/i18n/ui/*.json`, flat dot-namespaced keys (`nav.home`, `home.title`, `cta.label`).

Files are discovered with `import.meta.glob('./ui/*.json', { eager: true })`, so **adding a language does not require editing `utils.ts`**. `en.json` is imported statically as well, purely to derive the `UIKey` type — it is the canonical key list.

Keep keys in `en.json` even when a language is missing a translation; `t()` falls back to the default locale rather than rendering blank.

## The language switcher

`src/components/LanguageSwitcher.astro` branches on `LOCALE_KEYS.length`:

- **Two languages** → a plain link to the one you are *not* reading (`/en/` shows `FR`). Ships **no JavaScript**.
- **Three or more** → a `<details>` dropdown listing all languages with the current one marked. Closes on Escape (returning focus to the trigger) and on outside click.

The dropdown's script is `is:inline` inside the conditional, so it is only emitted when actually needed — verified zero occurrences in the built HTML at two locales. Its listeners are attached to `document` so they survive swup swapping the page container, with a `window.__languageMenuBound` guard against stacking.

Every switcher link carries **`data-no-swup`**. See [07-view-transitions.md](07-view-transitions.md) for why.

Languages with no translation of the current page render as a disabled `<span>` with a screen-reader explanation.

## Dates

`FormattedDate.astro` takes a `locale` and formats through `LOCALES[locale].htmlLang`, so French pages get French month abbreviations. Passing the locale is required at every call site that renders a date.
