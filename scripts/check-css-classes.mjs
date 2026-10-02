// Build gate: every custom class used in the built HTML must have a rule in
// the built CSS.
//
// A component class with no rule fails silently. `.pin-photo` was referenced
// by the home page and missing from global.css: the sticky photo collapsed to
// 0px and the section above it lost its clicks to an overlapping layer. Nothing
// else in the build caught it.
//
// Tailwind utilities are generated from the markup, so they always have a
// rule; this effectively checks the hand-written component classes.
//
// Usage: node scripts/check-css-classes.mjs [distDir]
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const files = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? files(join(d, n)) : [join(d, n)]));
const all = files(dist);
const css = all.filter((f) => f.endsWith('.css')).map((f) => readFileSync(f, 'utf8')).join('\n');

const used = new Map();
for (const f of all.filter((f) => f.endsWith('.html'))) {
	const html = readFileSync(f, 'utf8');
	for (const m of html.matchAll(/class="([^"]+)"/g)) {
		for (const c of m[1].split(/\s+/)) if (c) used.set(c, (used.get(c) ?? 0) + 1);
	}
}

// Hooks read only by scripts or attribute selectors have no rule on purpose.
const JS_ONLY = new Set(['split-line', 'is-set', 'is-open', 'is-active', 'word']);
// Tailwind escapes special characters in selectors: `md:col-span-4` is `.md\:col-span-4`.
const esc = (c) => c.replace(/[^a-zA-Z0-9_-]/g, (x) => '\\' + x);

const missing = [...used.keys()].filter((c) => {
	if (JS_ONLY.has(c) || c.startsWith('astro-')) return false;
	return !css.includes('.' + esc(c));
});

if (missing.length) {
	console.error(`[css-classes] ${missing.length} class(es) in the HTML with no CSS rule:`);
	for (const c of missing) console.error(`  .${c} (used ${used.get(c)}×)`);
	console.error('Add the rule to src/styles/global.css, or to JS_ONLY here if it is a script hook.');
	process.exit(1);
}
console.log(`[css-classes] OK: ${used.size} classes, every one has a rule`);
