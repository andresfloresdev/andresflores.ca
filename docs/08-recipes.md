# Recipes

## Start a new client project

1. `src/consts.ts` — `SITE_TITLE`
2. `src/styles/global.css` — the `@theme` block ([03-styling.md](03-styling.md))
3. `astro.config.mjs` — `site`
4. `src/i18n/ui/*.json` — all copy
5. `src/i18n/routes.ts` — slugs per language
6. `src/i18n/config.ts` — `DEFAULT_LOCALE` if the client is French-primary
7. `public/favicon.*`, `src/assets/placeholder.jpg`
8. Delete `src/content/blog/en/second-post.md` (the untranslated demo)
9. Replace `src/content/blog/en/hello-world.md` and its French counterpart

## Add a page

Three edits.

**1. Declare its URLs** in `src/i18n/routes.ts`:

```ts
export const ROUTES = {
	home:     { en: '',          fr: ''          },
	about:    { en: 'about-us',  fr: 'a-propos'  },
	blog:     { en: 'blog',      fr: 'blogue'    },
	services: { en: 'services',  fr: 'services'  },   // ← new
};
```

Add it to `NAV` if it belongs in the menu.

**2. Create the view** at `src/views/Services.astro`. Copy `About.astro` — it is the minimal shape:

```astro
---
interface Props { locale: Locale }
const { locale } = Astro.props;
const t = useTranslations(locale);
---
<Layout locale={locale} view="services" title={…} description={…}>
	…
</Layout>
```

The `view` prop must match the manifest key, or alternates and active nav resolve wrong.

**3. Register it** in the `VIEWS` map in `src/pages/[lang]/[...path].astro`.

**4.** Add its strings to every `src/i18n/ui/*.json`.

To leave a page out of a language, omit that locale from its manifest row. The build will tell you it did so.

## Add a blog post

Create `src/content/blog/<locale>/<slug>.md`:

```yaml
---
title: '…'
description: '…'
pubDate: 'Mar 04 2026'
heroImage: '../../../assets/placeholder.jpg'   # optional
translationKey: 'my-post'
---
```

For the translation, create a file in the other locale's folder — **any file name** — with the same `translationKey`. The slugs are independent; the key is what pairs them.

## Add a language

Three declarative steps, no code changes.

**1.** `src/i18n/config.ts`:

```ts
export const LOCALES = {
	en: { label: 'English',  htmlLang: 'en-CA' },
	fr: { label: 'Français', htmlLang: 'fr-CA' },
	es: { label: 'Español',  htmlLang: 'es'    },
};
```

**2.** Copy `src/i18n/ui/en.json` to `src/i18n/ui/es.json` and translate. It is picked up automatically.

**3.** Give every `ROUTES` row an `es` segment (omit rows that should not exist in Spanish).

Content: add `src/content/blog/es/` and files with matching `translationKey`s.

At three or more locales the language switcher becomes a dropdown automatically. This path was exercised end-to-end with a temporary Spanish locale.

## Change the default language

```ts
// src/i18n/config.ts
export const DEFAULT_LOCALE: Locale = 'fr';
```

That is the whole change. **No URL moves** — verified by building both ways and diffing the route list. What changes: where `/` redirects, which language `x-default` points at, and which language `t()` falls back to.

## Add a nav item

Add its route key to `NAV` in `src/i18n/routes.ts`. Header and footer both read it, labels come from `nav.<key>` in the UI JSON, and per-locale filtering is automatic.

## Add a button variant

Edit the `variants` (or `sizes`) map in `src/components/Button.astro`. Do **not** reach for a `class` prop — see [03-styling.md](03-styling.md).

## Add per-page state to the header

If the new state is server-rendered, `header` is already a swup container so it will update. If you add another element outside `main` that carries per-page state, add its selector to `containers` in `astro.config.mjs` — keeping `main` first ([07-view-transitions.md](07-view-transitions.md)).

## Add a legal page

1. `src/content/legal/<locale>/<slug>.md` for each language, with `title`, `description`, `lastUpdated`
2. a row in `ROUTES`, and the key added to `LEGAL` in `src/i18n/routes.ts` so it appears in the footer
3. a view (copy `src/views/Privacy.astro`) and an entry in the router's `VIEWS` map
4. a `nav.<key>` string in every `ui/*.json`

## Turn on analytics

Set `ANALYTICS.scriptUrl` and `dataDomain` in `src/config/site.ts`. It loads only after consent — see [11-legal-and-consent.md](11-legal-and-consent.md). Leave `scriptUrl` empty to ship none.

Update `[ANALYTICS PROVIDER]` in both privacy policy Markdown files to name the provider.

## Remove the blog entirely

1. Delete the `blog` row from `ROUTES` and from `NAV`
2. Delete `src/views/BlogIndex.astro`, `src/views/BlogPost.astro`, and their `VIEWS` entries
3. Delete the post-generating loop in the router's `getStaticPaths()`
4. Delete `src/pages/[lang]/rss.xml.js`, `src/content/`, `src/content.config.ts`
5. Remove `@astrojs/rss` and `@astrojs/mdx`
6. Drop the feed `<link>` from `BaseHead.astro`
