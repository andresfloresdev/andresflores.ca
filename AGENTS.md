# andresflores.ca

Andrés Flores's personal site, rebuilt on tela-astro (branch `astro-rebuild`).
Its job is to make search engines and AI assistants describe him correctly and
name him. Start with `docs/brief/site-brief.md`: the goal, the pages,
the confirmed facts, what is off limits, and the checks.

Project tracker: client `andres-flores`, project `AF`. Cards AF-02 (facts),
AF-05 (this rebuild), AF-06 (About), AF-07 (schema), AF-08 (robots, sitemap,
llms.txt).

**This repo is public.** Keep internal notes out of it: no client data, no
measurement results, no names of people or accounts Andrés asked to keep off
the site, nothing about the agency's internal tools. Those live on the cards.

## Facts live in one file

`src/config/site.ts` holds every fact the site states. Pages, JSON-LD and
llms.txt all read from it. **Never add a fact Andrés has not confirmed on
AF-02.** Assistants repeat what they find, so an invented year or a guessed
title becomes a wrong answer about him.

What stays off the site is listed on AF-02. `scripts/check-copy.mjs` enforces
it on the built output, with the words stored as hashes so this public repo
does not spell them out. AI is described only the way `PERSON.aiLine` says it.

## Voice

- No em dashes (the build fails on one). No colons unless listing items. No
  "not X, but Y".
- French first, French uses "tu". First person on the site ("je"), third person
  in the FAQ and llms.txt (the form assistants quote).
- Short sentences, real specifics.

## Where things live

| What | Where |
|---|---|
| Facts | `src/config/site.ts` |
| Page copy | `src/i18n/copy/fr.ts` (canonical), `en.ts` (type-checked against it) |
| UI strings, SEO titles | `src/i18n/ui/fr.json`, `en.json` |
| Routes (FR/EN segments, built vs placeholder) | `src/i18n/routes.ts` |
| Indexing (canonical host, noindex on previews) | `src/config/indexing.ts` |
| JSON-LD | `src/components/JsonLd.astro` |
| robots.txt, llms.txt | `src/pages/robots.txt.ts`, `src/pages/llms.txt.ts` |
| Design tokens and every component style | `src/styles/global.css` |
| Entrances, scroll effects, Lenis | `src/scripts/motion.ts` |
| Page transition | `src/scripts/transition.ts` |
| Header, accordion, anchors, clock | `src/scripts/ui.ts` |
| Boot, first-visit loader | `src/scripts/app.ts` |
| Favicons and OG images | `scripts/make-brand-assets.mjs` (run from /tmp/pw) |

## Build and verify

```
npm install
npm run build                                # all gates, see the brief
SITE_URL=https://andresflores.ca npm run build   # production: must print [indexing] ALLOWED
npx astro preview --port 4329
```

Every build without `SITE_URL=https://andresflores.ca` is noindex with no
sitemap, by design.

Browser checks run from `/tmp/pw` (playwright lives there; this repo is ESM):

```
cp scripts/screenshot-build.mjs /tmp/pw/ && cd /tmp/pw && node screenshot-build.mjs http://localhost:4329 /tmp/af-shots /fr/ /fr/a-propos/
```

Word breaks: run the client-website-kickoff skill's `check-word-breaks.mjs` with
`reducedMotion: 'reduce'` on the page (entrances here are GSAP, not CSS, so
finishing CSS animations does not settle the layout).

## Motion contract

Views ship no scripts. They mark elements (`data-anim`, `data-parallax`,
`data-scrub-words`, `data-journey`, `data-marquee`) and `motion.ts` animates
them. The list is at the top of `motion.ts`. swup swaps `header` and `#swup`;
`scripts/check-swup-scripts.mjs` fails the build if a page script sits outside
them. Reduced motion: no loader, no band, no Lenis, everything visible.

Test interactive pages by clicking to them from another page, never only by
loading them (swup).

## Traps met building it

- **The footer wordmark is sized from its measured width.** "Andrés Flores" is
  5.64em wide at 1440px and 5.95em at 390px (the opsz axis widens small sizes).
  `font-size: calc((100vw - margins) / 6)` fits everywhere. Re-measure if the
  font, weight or tracking changes.
- **The journey numeral**: each swap sends every numeral still on screen out,
  because a fast scroll starts a new swap before the last one ends. The
  numerals are absolutely placed in a fixed-height box so the swap never moves
  the layout.
- **validator.schema.org rate-limits** (302 to google.com/sorry). The build uses
  `scripts/check-schema-offline.mjs`, which checks types and properties against
  the schema.org vocabulary itself and was proven to fail on a bad property.
- **OG images**: Chromium's `setContent` page cannot load `file://` fonts, so
  the script embeds them as data URLs. Look at the PNG after each run.
