# andresflores.ca, site brief

Andrés Flores's personal site, rebuilt from scratch on tela-astro (branch
`astro-rebuild`), replacing the 2016 Nuxt 2 portfolio on `master`. Tracked as
project `AF` (client `andres-flores`).

This repo is public. Measurements, the decisions behind the facts and the
off-limits list live on the AF cards, not here.

## Goal

Be known, by search engines and by AI assistants, for everything he does:
Agence Flores, Carte Blanche, building on the web since 2015, AI training and
implementation. The site is the source assistants should quote about him.
The before and after measurements are on cards AF-01, AF-03 and AF-16.

## Facts

All in `src/config/site.ts`, confirmed by Andrés on card AF-02. Nothing else
may be stated, and anything listed as off limits on AF-02 must never appear
(`scripts/check-copy.mjs` checks the built output).

## Pages

| Key | FR | EN | Status |
|---|---|---|---|
| home | /fr/ | /en/ | built |
| about | /fr/a-propos/ | /en/about/ | built, the page assistants quote |
| work | /fr/realisations/ | /en/work/ | Placeholder, noindex (AF-12) |
| blog | /fr/ecrits/ | /en/writing/ | Placeholder, noindex (AF-14) |
| privacy | /fr/politique-de-confidentialite/ | /en/privacy-policy/ | built, draft to review |

Also generated: `/robots.txt` (every crawler allowed, AI agents named),
`/llms.txt` (from site.ts and the page copy), `/sitemap-index.xml` (production only).

## Structured data

One Person (`https://andresflores.ca/#person`) on every page, with
Agence Flores (`https://floresagency.ca/#organization`, the same id the agency
site will use) and Carte Blanche as Organizations he founded. About is a
ProfilePage with the Person as mainEntity, plus a FAQPage built from the same
items the page shows. sameAs: LinkedIn, GitHub, Instagram, X, his Agence
Flores team page.

## Design

A builder's notebook: warm paper (#f2efe9), ink (#15120f), one flame accent
(#ff4f1f). Bricolage Grotesque (opsz axis), Newsreader italic for the quiet
half of headlines, JetBrains Mono for labels and years. Apart from Agence Flores
(teal/navy) and Carte Blanche (white/lime) on purpose.

Motion: GSAP + ScrollTrigger + SplitText + Lenis, Fatfish curves from the Carte
Blanche build. First-visit loader counts 2015 to now. Hero name rises out of
masks while the portrait pill opens inside "Flores". Statement words light up
on scroll. Journey: sticky numeral that rolls to the step in view, flame line
drawing down the track. Brand marquee that speeds up and leans with scroll.
Page transitions: a flame band rises, the new page lifts in.

## Checks

`npm run build` runs, in order:

1. `scripts/check-copy.mjs`: ui keys match, no em dashes in source
2. `astro check`
3. `astro build`
4. `scripts/check-swup-scripts.mjs`
5. `scripts/check-css-classes.mjs`
6. `scripts/check-copy.mjs dist`: no em dash and nothing off limits in built HTML, txt, xml
7. `scripts/check-schema-offline.mjs dist`: every JSON-LD type and property valid on schema.org

`scripts/validate-schema.mjs` posts to validator.schema.org (exit 2 when rate
limited). Browser checks run from /tmp/pw (see AGENTS.md).

## Open

- Hosting and DNS move (AF-04).
- Privacy policy is a draft to review.
- Photoshoot coming: swap `src/assets/andres-flores.jpg` and `public/andres-flores.jpg`,
  then re-run `scripts/make-brand-assets.mjs` for the OG images.
