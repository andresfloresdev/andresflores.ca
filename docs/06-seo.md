# SEO

## Head

`src/components/BaseHead.astro` renders, per page: canonical URL, title, description, Open Graph (with `og:image` falling back to `src/assets/placeholder.jpg`), Twitter card, the current language's feed link, sitemap link, and the `hreflang` set.

## hreflang

Rendered from the `alternates` map that `Layout` resolves, so it contains **only languages the page actually exists in**.

Translated post:

```html
<link rel="alternate" hreflang="en-CA" href="https://example.com/en/blog/hello-world/">
<link rel="alternate" hreflang="fr-CA" href="https://example.com/fr/blogue/bonjour-le-monde/">
<link rel="alternate" hreflang="x-default" href="https://example.com/en/blog/hello-world/">
```

Untranslated post — no fabricated French URL:

```html
<link rel="alternate" hreflang="en-CA" href="https://example.com/en/blog/second-post/">
<link rel="alternate" hreflang="x-default" href="https://example.com/en/blog/second-post/">
```

`x-default` points at the `DEFAULT_LOCALE` version when the page exists there, so flipping the default moves it automatically.

`<html lang>` uses the full tag (`en-CA` / `fr-CA`), not the URL segment.

## Per-page overrides

Meta title and description resolve in this order: `seo.<view>.title` in the UI JSON → the `title` prop the view passed → `SITE_TITLE`. Same for description.

So overriding any page's meta in either language is a JSON key, with no change to the view:

```json
"seo.home.title": "Your Brand — a short, keyword-led tagline"
```

`useOptionalTranslation()` exists for this. The normal `t()` falls back to returning the key string, which would cheerfully render `seo.home.title` as a page title.

Blog posts are excluded from the lookup: a `seo.post.*` key would apply to every post identically.

`noindex` is a `Layout` prop, emitting `<meta name="robots" content="noindex, nofollow">`. Nothing is emitted when false — `index, follow` is the default and just adds noise.

## Structured data

`src/components/JsonLd.astro` emits one `<script type="application/ld+json">` with a `@graph`, built from `BUSINESS` and `SOCIAL`:

| Page | Nodes |
| :-- | :-- |
| any | `Organization` + `WebSite` |
| a post | + `BlogPosting` |
| anything else | + `WebPage` |

`sameAs` is omitted entirely when no social profiles are set, rather than emitted empty.

Page URLs here are **not** trailing-slash-stripped: they must match `<link rel="canonical">` exactly, or the two disagree about the page's identity.

A client with a physical storefront should change `Organization` to `LocalBusiness` and add `geo`, `openingHoursSpecification`, and `priceRange` — all already present in `BUSINESS`.

## robots.txt

`public/robots.txt`, served at `/robots.txt`. The sitemap directive needs an **absolute** URL, so it hardcodes the domain and cannot read `astro.config.mjs` — update it when `site` changes.

## 404

`src/pages/404.astro`. A static build emits one `404.html` for every unmatched URL, so with all locales prefixed there is no way to know the requested language. It renders in `DEFAULT_LOCALE` but shows every language stacked, each block carrying its own `lang`, with a home link per language.

It uses `view="notFound"`, which keeps it out of hreflang, out of the active nav, and away from `seo.<view>.*`. Passing a real route key makes the 404 silently inherit that page's meta title — see [09-decisions.md](09-decisions.md).

## Sitemap

`@astrojs/sitemap` runs with **no `i18n` option**, on purpose.

That option pairs translations by matching the path *after* the locale prefix — it assumes `/en/about-us/` ↔ `/fr/about-us/`. With translated slugs it cannot see the pairing. Enabling it produced alternates for `/en/` ↔ `/fr/` only (both have an empty path) and silence on every other page.

Partial coverage is a trap in a boilerplate: it looks like i18n is handled, then quietly is not for each new page. The head tags are the complete set and are sufficient on their own.

If a project needs sitemap-level alternates, use the integration's `serialize` hook and set `item.links` from the manifest — reverse-resolving URL → route key → alternates, plus the collection for posts.

The redirect page at `/` is correctly excluded from the sitemap.

## The root redirect

`redirects: { '/': '/en/' }` in `astro.config.mjs`, derived from `DEFAULT_LOCALE`.

In a **static** build Astro emits an HTML page with `<meta http-equiv="refresh">` plus a canonical link. That works, but a real `301` at the CDN or host is better for production. Configure it per host; the generated page is the fallback.

`redirectToDefaultLocale` in Astro's `i18n.routing` is not used — it depends on the i18n middleware, which is a server-output feature.

## Head sync during client-side navigation

`@swup/astro` runs with `updateHead: true` (its default), so canonical, `hreflang`, and `<title>` all update on client-side navigation. Verified after a swup hop to `/en/blog/`:

```
canonical: https://example.com/en/blog/
fr-CA:     https://example.com/fr/blogue/
title:     Writing and updates | Your Brand
```

This matters less for crawlers — they fetch each URL directly and get correct server-rendered head — but it keeps the document honest for anything reading live DOM.

## Before launch

- [ ] set `site` in `astro.config.mjs` to the real domain (URLs in hreflang, canonical, sitemap, and feeds are absolute and derive from it)
- [ ] replace `public/favicon.svg` and `public/favicon.ico`
- [ ] replace `src/assets/placeholder.jpg` — it is the OG fallback image
- [ ] set a host-level 301 for `/`
- [ ] confirm no `[i18n] route(s) not built` warnings remain that were not intended
