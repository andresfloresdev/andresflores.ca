# Internal documentation

Engineering notes for the `tela-astro` boilerplate. **Not published** — this folder sits outside `src/pages/` and `public/`, so Astro never turns it into a route. It ships in the repo, not on the website.

Last reviewed: 2026-07-26

## What goes where

| Doc | Read it for |
| :-- | :-- |
| [01-overview.md](01-overview.md) | What this project is, the stack, the principles behind it |
| [02-architecture.md](02-architecture.md) | Folder layout, the router, how a request becomes a page |
| [03-styling.md](03-styling.md) | Tailwind v4 setup, design tokens, the component styling contract, fonts |
| [04-internationalization.md](04-internationalization.md) | Locales, the route manifest, translations, the language switcher |
| [05-content.md](05-content.md) | Blog collections, `translationKey`, per-language feeds |
| [06-seo.md](06-seo.md) | hreflang, canonical, sitemap, the root redirect |
| [07-view-transitions.md](07-view-transitions.md) | swup containers, and Lenis smooth scroll |
| [08-recipes.md](08-recipes.md) | Step-by-step: add a page, a post, a language, rebrand |
| [09-decisions.md](09-decisions.md) | Why things are the way they are, and the bugs behind several of them |
| [10-verification.md](10-verification.md) | How to actually test this thing, plus a testing trap worth knowing |
| [11-legal-and-consent.md](11-legal-and-consent.md) | Law 25 privacy policy, consent gating, per-client checklist |

## How this differs from the root `README.md`

The root README is for whoever picks up the boilerplate and builds a client site with it: how to use it, what to edit first.

These docs are for whoever maintains or extends the boilerplate itself. They carry the **why** — the constraints discovered, the alternatives rejected, and the root causes of bugs that shaped the current design. Several decisions here look arbitrary until you know what broke.

## Ground rules

Three constraints show up repeatedly and explain most of the non-obvious code:

1. **Astro's file routing cannot produce translated URL segments.** A folder named `blog/` is the literal segment `blog` in every language. Hence the route manifest.
2. **Tailwind resolves utility conflicts by stylesheet order, not class order.** Hence components that refuse a `class` prop.
3. **swup replaces container *elements*, and only the containers you name.** Hence `containers: ['main', 'header']` and a transition class that lives in the markup.

If a change fights one of these, the change is probably wrong.
