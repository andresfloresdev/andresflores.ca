# Architecture

## Layout

```text
src/
├── assets/placeholder.jpg      processed by Astro's image pipeline
├── components/                 presentational, reusable
│   ├── BaseHead.astro          all <head> content
│   ├── Button.astro            variants/sizes; refuses a `class` prop
│   ├── CtaSection.astro
│   ├── FormattedDate.astro     locale-aware
│   ├── Footer.astro
│   ├── Header.astro
│   ├── HeaderLink.astro        nav item; takes `isActive`
│   ├── Hero.astro
│   └── LanguageSwitcher.astro  toggle at 2 locales, dropdown at 3+
├── consts.ts                   SITE_TITLE only — everything else is translated
├── content.config.ts           blog collection schema
├── content/blog/{en,fr}/       one folder per language
├── i18n/
│   ├── config.ts               LOCALES + DEFAULT_LOCALE (also read by astro.config.mjs)
│   ├── routes.ts               the route manifest
│   ├── alternates.ts           which languages a given page exists in
│   ├── utils.ts                t(), pathTo(), ctaHref(), parsePostId()
│   └── ui/*.json               UI strings, auto-discovered
├── layouts/Layout.astro        the page shell
├── pages/
│   ├── [lang]/[...path].astro  the only page router
│   └── [lang]/rss.xml.js       per-language feeds
├── views/                      one file per unique page
│   ├── Home.astro
│   ├── About.astro
│   ├── BlogIndex.astro
│   └── BlogPost.astro
└── styles/global.css           Tailwind import, @theme tokens, custom utilities
```

## Why `views/` exists

Astro allows exactly one dynamic route file per directory level. Once URL segments are translated per language, `/en/about-us/` and `/fr/a-propos/` cannot come from a file named `about.astro` — they have to come from a dynamic segment.

That means every page sharing a URL *shape* shares a route file. If page bodies lived in `src/pages/`, they would all have to be crammed into that one file.

So `src/pages/` holds thin routing, and `src/views/` holds one file per unique page. The "one file per page" property is preserved; it just moved.

## The render chain

```
src/pages/[lang]/[...path].astro     getStaticPaths() builds every localized URL
        │                            props: { locale, view, post? }
        ▼
src/views/<View>.astro               page body; picks its own copy via t()
        │
        ▼
src/layouts/Layout.astro             <html lang>, fonts, resolves alternates
        │
        ├─► BaseHead.astro           title, canonical, hreflang, OG, feed link
        ├─► Header.astro             nav (per-locale), active state, switcher, CTA
        ├─► <slot />                 the view's markup, inside <main>
        └─► Footer.astro
```

## The router

`src/pages/[lang]/[...path].astro` is the only page route in the project. Its `getStaticPaths()`:

1. walks `LOCALE_KEYS` × `ROUTES`, emitting `{ lang, path }` for every declared segment
2. walks the blog collection, emitting `{ lang, path: '<blogSegment>/<slug>' }` for each post in that language
3. collects everything that was *not* emitted for lack of a translation and prints it as a build warning

Props carry `view` (a key into the `VIEWS` map) and, for posts, the collection entry. The template is two lines:

```astro
const View = VIEWS[view];
<View locale={locale} post={post} />
```

Adding a page means adding a manifest row, a file in `views/`, and an entry in `VIEWS`. See [08-recipes.md](08-recipes.md).

### Why one router and not several

With every locale prefixed, a nested catch-all under `[lang]/` is unambiguous — there is no unprefixed tree to collide with. Splitting per content type is impossible anyway: a separate blog route would need to match both `/en/blog/…` and `/fr/blogue/…`, which no static folder name can do, and two root-level catch-alls cannot coexist.

## `view` is the page identity

`view` is threaded from the router through the view to `Layout`, and on to `Header`. It is not cosmetic — two things depend on it:

- **alternates** — `getAlternates(view, post)` resolves which languages the page exists in
- **active nav** — `Header` maps `view` to a nav key (`post` → `blog`)

Deriving either from `Astro.url.pathname` was tried and fails: path matching cannot tell that `/en/blog/hello-world/` belongs to the Blog nav item, and breaks outright when slugs differ per language. See [09-decisions.md](09-decisions.md).

## Config imports app code

`astro.config.mjs` imports `./src/i18n/config.ts` so `DEFAULT_LOCALE` and the locale list have exactly one definition. This works — Astro loads the config through esbuild — and it is what keeps changing the default language a one-line edit rather than a two-place edit that silently drifts.
