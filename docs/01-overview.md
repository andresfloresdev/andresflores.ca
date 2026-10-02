# Overview

## What this is

A reusable starting point for client websites. Not a product, not a demo — the thing you clone at the start of an engagement and rebrand.

It began as the official Astro blog starter and was stripped down to: a homepage (header, hero, CTA, footer), an about page, a blog, and bilingual routing. Everything Astro-branded was removed.

## Design goals

| Goal | How it shows up |
| :-- | :-- |
| Rebrand in minutes, not hours | All visual tokens in one `@theme` block; all copy in JSON; all URLs in one manifest |
| Bilingual from day one | Every locale prefixed, translated slugs, per-language feeds |
| Wrong things fail loudly | Untranslated routes are reported at build; components reject ambiguous props |
| No hidden magic | One router, one manifest, one token block — each with a comment explaining itself |

## Stack

| Package | Role |
| :-- | :-- |
| `astro` ^7.1.3 | Static site generator, content collections, image pipeline |
| `tailwindcss` ^4.3.3 + `@tailwindcss/vite` | Styling, configured entirely in CSS |
| `@tailwindcss/typography` | Long-form post content (`prose`) |
| `astro-font` | Inter, self-described `@font-face` with a metric-matched fallback |
| `@astrojs/mdx` | Components inside Markdown |
| `@astrojs/sitemap` | Sitemap at build |
| `@astrojs/rss` | One feed per language |
| `@swup/astro` | Client-side page transitions |
| `astro-reveal` | CSS-only scroll reveals via `data-reveal` |
| `sharp` | Image optimization |

Output is **static**. Nothing here assumes a server, and the i18n design deliberately avoids Astro features that require `output: 'server'`.

## What was removed from the Astro starter

- Astro social links in the header and footer
- The demo about page and five lorem-ipsum posts
- Five of the six placeholder images; the survivor was Astro-branded marketing art and was replaced with a neutral generated placeholder (`src/assets/placeholder.jpg`)
- The Bear Blog stylesheet, replaced with Tailwind and a token set
- The Atkinson local font setup (`fonts` in `astro.config.mjs`, the `<Font>` tag, and the two `.woff` files)
- The Astro-branded README

## Known dependency risk

`npm audit` reports high-severity advisories, all of them transitive through `@swup/astro` — its plugin packages list build tooling (`microbundle`, `shelljs`, `rollup-plugin-terser`) as runtime dependencies. None of it reaches the browser and there is no upstream fix.

If a client's security review objects, the fix is to drop swup for Astro's built-in view transitions. That would also remove the two swup constraints described in [07-view-transitions.md](07-view-transitions.md).
