/*
  swup only swaps the containers listed in astro.config.mjs (`containers`),
  and its scripts plugin only runs the <script> tags inside what it swapped.
  A page's own script that lands anywhere else only runs when that page is
  loaded directly: reached by a click from another page it never loads, and the
  page looks fine but does nothing.

  Astro puts a view's <script> where it sits in the template. Written after
  `</Layout>`, it ends up after </html>: outside every container. So every
  script that is not on EVERY page must sit inside a swup container.
  JSON-LD is data, not code, and is exempt.

  Usage: node scripts/check-swup-scripts.mjs [distDir]
  Wire it in: "build": "... && astro build && node scripts/check-swup-scripts.mjs"
*/
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = process.argv[2] ?? 'dist';
// Keep in sync with swup({ containers }) in astro.config.mjs. A tag name or an `#id`.
const CONTAINERS = ['#swup', 'header'];

const htmlFiles = (dir) =>
	readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) return htmlFiles(path);
		return name.endsWith('.html') ? [path] : [];
	});

/** Every <script>, with an identity (src, or the inline body) and its offset. */
const scriptsOf = (html) =>
	[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
		.filter((m) => !/type="application\/ld\+json"/.test(m[1]))
		.map((m) => ({ id: /src="([^"]+)"/.exec(m[1])?.[1] ?? `inline:${m[2].trim().slice(0, 80)}`, at: m.index }));

/*
  [open, close] offsets of each container. An `#id` container is found by its
  opening tag, and its end by counting nested tags of the same name.
*/
const rangeOf = (html, selector) => {
	const open = selector.startsWith('#')
		? html.search(new RegExp(`<[a-z][a-z0-9]*\\b[^>]*\\sid="${selector.slice(1)}"`))
		: html.search(new RegExp(`<${selector}[\\s>]`));
	if (open < 0) return null;
	const tag = /^<([a-z][a-z0-9]*)/.exec(html.slice(open))[1];
	const token = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'g');
	token.lastIndex = open;
	let depth = 0;
	for (let m = token.exec(html); m; m = token.exec(html)) {
		depth += m[1] ? -1 : 1;
		if (depth === 0) return [open, m.index];
	}
	return null;
};

const rangesOf = (html) => CONTAINERS.map((sel) => rangeOf(html, sel)).filter(Boolean);

const pages = htmlFiles(dist)
	.map((file) => {
		const html = readFileSync(file, 'utf8');
		return { file: relative(dist, file), scripts: scriptsOf(html), ranges: rangesOf(html) };
	})
	// A page with no swup container is not a Layout page (Astro's meta-refresh
	// redirect stubs, e.g. `/` -> `/fr/`). It has no scripts, so leaving it in
	// empties the "on every page" set below and flags every layout script.
	.filter((page) => page.ranges.length > 0);
if (!pages.length) {
	console.error(`[swup-scripts] no HTML in ${dist}`);
	process.exit(1);
}

// Scripts on every page are the layout's own: they run on the first load and
// bind for good, so they may live anywhere.
const everywhere = pages
	.map((page) => new Set(page.scripts.map((s) => s.id)))
	.reduce((common, ids) => new Set([...common].filter((id) => ids.has(id))));

const problems = pages.flatMap((page) =>
	page.scripts
		.filter((s) => !everywhere.has(s.id))
		.filter((s) => !page.ranges.some(([open, close]) => s.at > open && s.at < close))
		.map((s) => `${page.file}: ${s.id.slice(0, 90)}`),
);

if (problems.length) {
	console.error(
		`[swup-scripts] ${problems.length} page script(s) outside <${CONTAINERS.join('>/<')}>: they never run when the page is reached by a click (swup).\n` +
			'Move the <script> inside <Layout>…</Layout> in the view.\n  ' +
			problems.join('\n  '),
	);
	process.exit(1);
}
console.log(`[swup-scripts] OK: ${pages.length} pages, every page-specific script inside a swup container`);
