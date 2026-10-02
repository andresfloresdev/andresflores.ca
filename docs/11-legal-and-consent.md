# Legal pages and consent

> **This is scaffolding, not legal advice.** The privacy policy is a template. Every client needs their own counsel to review it against what the business actually collects before it is published. The template says so at the top of both language versions — leave that notice in place until a lawyer has been through it.

## The `legal` collection

Legal documents are Markdown in a content collection, not translation keys:

```text
src/content/legal/
├── en/privacy.md
└── fr/privacy.md
```

Frontmatter: `title`, `description`, `lastUpdated`. Schema is in `src/content.config.ts`, alongside `blog`, using the same `<locale>/<slug>` id convention.

Markdown rather than `ui/*.json` because a ten-section legal document would be ~40 flat keys, and this is text that clients and lawyers edit directly. It renders through `prose prose-post`, the same as blog posts.

`lastUpdated` lives **only** in frontmatter. There is deliberately no `lastUpdated` in `src/config/site.ts` — two sources of truth for a policy's revision date is exactly the sort of thing that drifts and then misstates when the policy last changed.

## The privacy page

`src/views/Privacy.astro`, routed as `privacy` in the manifest:

| Locale | URL |
| :-- | :-- |
| en | `/en/privacy-policy/` |
| fr | `/fr/politique-de-confidentialite/` |

Three parts: the title with its last-updated date, a **responsible-person contact block** rendered from `PRIVACY.officer` in `src/config/site.ts`, then the Markdown body.

The contact block is not decoration. Law 25 requires a designated person responsible for personal information protection, with published contact details. It renders from config so it cannot drift out of sync with the rest of the site.

If the entry is missing, the view **throws** rather than rendering an empty page. A blank legal page is worse than a failed build.

Legal routes appear in a second footer row via `LEGAL` in `src/i18n/routes.ts`, kept separate from `NAV` so they stay out of the main menu.

## Consent

`src/components/ConsentBanner.astro`, rendered from `Layout` after the footer — outside swup's swapped containers, so it survives client-side navigation.

### The rule that matters

**Non-essential tracking must not run before consent.** A banner that displays while analytics has already loaded is worse than no banner: it asserts a compliance posture that does not exist.

So the analytics script is **never in the server-rendered HTML**. It is injected into `<head>` by JavaScript only after consent is granted.

```ts
// src/config/site.ts — leave scriptUrl empty to ship no analytics at all
export const ANALYTICS = {
	scriptUrl: '',
	dataDomain: '',
};
```

Defaults are Plausible-shaped; any provider works. Config reaches the script through `data-` attributes on the banner element, because Astro bundles `<script>` tags and they cannot read frontmatter.

### Behaviour

| State | Banner | Analytics |
| :-- | :-- | :-- |
| No decision stored | shown | not loaded |
| `granted` | hidden | injected on load |
| `denied` | hidden | never injected |
| localStorage unreadable | shown | not loaded |

Stored as `consent.analytics` in `localStorage`, every access wrapped in `try`/`catch` — it throws in some privacy modes, and that must not break the page.

`window.showConsentBanner()` reopens it; the footer's "Cookie settings" button calls it. That control is what makes the policy's "withdraw at any time" wording true rather than aspirational — **if you remove the control, fix the policy text too.**

### Refusing must be as easy as accepting

Law 25 does not accept a prominent "Accept" beside a buried "Refuse" link. Both are the same `<Button>` at the same size — primary and secondary variants. Do not demote refuse to a text link.

### Buttons, not links

The consent controls first shipped as `<a>` with no `href`, which looks fine and is **unusable by keyboard** — an anchor without `href` is not focusable and is announced as nothing. `<Button>` now renders a real `<button>` when no `href` is passed, and an `<a>` when one is. See [09-decisions.md](09-decisions.md).

## Verifying it

Static checks catch some of this:

```sh
grep -c 'plausible\|googletagmanager' dist/en/index.html   # must be 0
grep -o '<div id="consent-banner" hidden' dist/en/index.html
```

But gating is behavioural. The checks worth re-running after touching consent, all confirmed passing:

1. fresh visit → banner shown, no script
2. accept control is focusable and is a `BUTTON`
3. refuse → hidden, `denied`, no script
4. **reload after refuse → still no script** (the one that actually proves gating)
5. footer control reopens the banner
6. accept → script injected with `data-domain`
7. reload after accept → injected automatically
8. keyboard <kbd>Enter</kbd> activates refuse
9. localStorage blocked → banner shows, zero page errors

Method is in [10-verification.md](10-verification.md). Set `ANALYTICS.scriptUrl` to a throwaway local path while testing, then restore it.

## Per-client checklist

- [ ] counsel reviews and adapts both language versions
- [ ] fill `[COMPANY NAME]` / `[NOM DE L'ENTREPRISE]` and `[ANALYTICS PROVIDER]` / `[FOURNISSEUR D'ANALYSE]` in the Markdown
- [ ] set `PRIVACY.officer` to a real person
- [ ] set `ANALYTICS.scriptUrl` and `dataDomain`, or leave empty for no analytics
- [ ] confirm `PRIVACY.dataResidency` matches where data actually lives
- [ ] bump `lastUpdated` in frontmatter on any revision

Placeholders in the Markdown are **not** auto-substituted from config, on purpose. A config typo silently rewriting a published privacy policy is a worse failure than editing two files.
