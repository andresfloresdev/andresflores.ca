# Verification

How this project was checked, and what to re-check after touching routing, styling, or transitions.

## Type checking runs first

```sh
npm run check     # astro check on its own
npm run build     # astro check && astro build
```

`build` is gated on `check`, so a type error fails the build rather than reaching a deploy. This catches the two mistakes this project has actually made: a view key that is not in the manifest, and a `class` prop passed to a component that refuses one.

Two install constraints worth knowing:

- **TypeScript is pinned to 6.x.** TS 7's native compiler does not expose the programmatic API `astro check` relies on, and fails with a clear message if you upgrade.
- **`package.json` carries `overrides: { "typescript": "$typescript" }`.** `@swup/plugin` depends on `microbundle`, a build tool it wrongly lists as a runtime dependency, which pins typescript `^4` and otherwise makes `npm install` fail on a peer conflict. Nothing in this project ever executes microbundle.

## Build output is the next signal

```sh
npm run build
```

A correct build prints 9 routes plus the redirect:

```
/en/rss.xml   /fr/rss.xml
/en/index.html            /fr/index.html
/en/about-us/index.html   /fr/a-propos/index.html
/en/blog/index.html       /fr/blogue/index.html
/en/blog/hello-world/index.html
/en/blog/second-post/index.html
/fr/blogue/bonjour-le-monde/index.html
/index.html               ← the / redirect
```

plus the intentional untranslated warning:

```
[i18n] 1 route(s) not built — untranslated:
  - post "untranslated-example" has no fr translation
```

If a page you expected is missing, its manifest row is missing a locale.

## Checking the built HTML

Faster than a browser for anything in the markup:

```sh
# hreflang set on a page
grep -oE '<link rel="alternate" hreflang="[^"]*" href="[^"]*"' dist/en/blog/hello-world/index.html

# which nav item is active
grep -oE 'aria-current="page"[^>]*>[^<]*' dist/en/about-us/index.html

# confirm no JS shipped for the language switcher at 2 locales
grep -c "languageMenuBound" dist/en/index.html    # expect 0

# every URL in the sitemap
grep -oE '<loc>[^<]*</loc>' dist/sitemap-0.xml
```

For Tailwind emit order (the class-conflict trap in [03-styling.md](03-styling.md)):

```sh
CSS=$(find dist/_astro -name "*.css" | head -1)
grep -o "\.hidden{" "$CSS"      # compare byte offsets with
grep -o "\.inline-flex{" "$CSS" # whichever appears later wins
```

## Browser checks

Playwright is **not** a project dependency — install it in a scratch directory so it never ships:

```sh
cd /tmp/scratch && npm init -y && npm i playwright
```

Launch with `channel: 'chrome'` to reuse the installed Google Chrome instead of downloading a browser:

```js
const browser = await chromium.launch({ channel: 'chrome' });
```

Serve the built site with `npx astro preview --port 4399` — test against the build, not the dev server, so the dev toolbar and unminified output do not interfere.

### Mobile

**Headless Chrome on macOS clamps its window to a 500 px minimum.** Passing `--window-size=390,844` produces a 390 px *screenshot* of a 500 px *viewport* — the image is cropped, and it looks exactly like horizontal overflow. This cost real time before it was identified; confirm with:

```sh
chrome --headless --screenshot=vp.png --window-size=390,844 \
  'data:text/html,<body style="font:40px monospace"><script>document.write(innerWidth)</script>'
# prints innerWidth=500
```

Use Playwright device emulation for real narrow viewports:

```js
const ctx = await browser.newContext(devices['iPhone 13']);
```

And assert numerically rather than eyeballing:

```js
await page.evaluate(() => ({
	vw: document.documentElement.clientWidth,
	sw: document.documentElement.scrollWidth,
}));
// sw must equal vw — anything larger is real overflow
```

### Routing

Assert that wrong-language segments 404, not just that right ones work:

```
200 /en/about-us/   200 /fr/a-propos/
404 /fr/blog/       404 /en/a-propos/
```

### Client-side navigation

Two things are easy to get wrong and invisible to static checks.

**Did it actually navigate client-side?** Set a marker and see if it survives:

```js
await page.evaluate(() => (window.__spa = true));
await page.click('nav a[href="/en/blog/"]');
await page.evaluate(() => window.__spa === true);   // true = no reload
```

Language switcher links must report **false** here — they carry `data-no-swup` deliberately.

**Did the transition actually run in both directions?** Sample opacity over time. Checking *minimum* opacity is not enough — it proves the fade-out only, and will happily pass while the fade-in is broken:

```js
await page.evaluate(() => {
	window.__t = []; const t0 = performance.now();
	const tick = () => {
		const m = document.querySelector('main');
		window.__t.push([Math.round(performance.now() - t0), +getComputedStyle(m).opacity,
			document.documentElement.className]);
		if (performance.now() - t0 < 1200) requestAnimationFrame(tick);
	};
	tick();
});
```

A healthy trace ramps **down** during `is-leaving` and **up** during `is-rendering`. A jump straight to `1.000` when `is-rendering` starts is the broken fade-in from [07-view-transitions.md](07-view-transitions.md).

## Regression checklist

After changing routing, i18n, or swup config:

- [ ] `npm run check` reports 0 errors
- [ ] build prints the expected route list and only intended `[i18n]` warnings
- [ ] wrong-language segments 404
- [ ] active nav item correct on home, a section index, and a post
- [ ] active nav updates during client-side navigation, without a reload
- [ ] transition ramps both directions; header opacity stays 1
- [ ] language switch does a full load and lands with the right `<html lang>`
- [ ] hreflang complete on translated pages, absent for missing languages
- [ ] `scrollWidth === clientWidth` at 390 px in every language

## Keep test scripts out of the repo

Everything above was run from a scratch directory. Nothing in `package.json` depends on Playwright, and no test files live in the project — deliberate, since this boilerplate is copied into client work.
