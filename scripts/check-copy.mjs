/*
  Build gate for the copy: fails the build when the language files drift, or
  when a page breaks Andrés's writing rules or a decision from card AF-02.

  1. ui/fr.json and ui/en.json have exactly the same keys. (Page copy in
     src/i18n/copy/ is already enforced by TypeScript.)
  2. No em dash in any visitor-facing copy, source or built.
  3. The built HTML, txt and xml never contain a word on the off-limits list.

  Usage: node scripts/check-copy.mjs          (source only, before the build)
         node scripts/check-copy.mjs dist     (source and built output)
*/
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const problems = [];

const fr = JSON.parse(read('i18n/ui/fr.json'));
const en = JSON.parse(read('i18n/ui/en.json'));
for (const key of Object.keys(fr)) if (!(key in en)) problems.push(`ui/en.json is missing "${key}"`);
for (const key of Object.keys(en)) if (!(key in fr)) problems.push(`ui/fr.json is missing "${key}"`);

const sourceFiles = [
	'i18n/ui/fr.json',
	'i18n/ui/en.json',
	'i18n/copy/fr.ts',
	'i18n/copy/en.ts',
	'config/site.ts',
	...['fr', 'en'].flatMap((l) => readdirSync(new URL(`content/legal/${l}/`, root)).map((f) => `content/legal/${l}/${f}`)),
];

for (const file of sourceFiles) {
	read(file)
		.split('\n')
		.forEach((line, i) => {
			// Comments are for developers, not visitors.
			if (/^\s*(\/\/|\/\*|\*)/.test(line)) return;
			if (line.includes('\u2014')) problems.push(`src/${file}:${i + 1} contains an em dash`);
		});
}

/*
  Words that must never reach a visitor or a crawler, decided on card AF-02.
  This repo is public, so the words themselves are not written here: each is
  stored as the first 16 hex characters of the SHA-256 of its lowercase form.
  To add one: node -e "console.log(require('crypto').createHash('sha256').update('word').digest('hex').slice(0,16))"
*/
import { createHash } from 'node:crypto';
const BANNED = new Map([
	['ccedd614a7f6bd1d', 'a profile Andrés does not list'],
	['65ff69c13d62ffdf', 'a profile Andrés does not list'],
	['73d911df066f07d4', 'a Carte Blanche cofounder (not named for now)'],
	['ecaf69bb4b06f3f9', 'a Carte Blanche cofounder (not named for now)'],
	['8cfde6efdfc4ed5a', 'internal agency tooling'],
	['a5913db8bdb9dcc2', 'internal agency tooling'],
]);
const hash = (w) => createHash('sha256').update(w).digest('hex').slice(0, 16);
const bannedIn = (text) => {
	const found = new Set();
	for (const word of text.toLowerCase().normalize('NFC').match(/[\p{L}\p{N}]+/gu) ?? []) {
		const why = BANNED.get(hash(word));
		if (why) found.add(why);
	}
	return [...found];
};

const dist = process.argv[2];
if (dist) {
	const files = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? files(join(d, n)) : [join(d, n)]));
	for (const file of files(dist).filter((f) => /\.(html|txt|xml)$/.test(f))) {
		// Visible text and data only: drop scripts and styles, keep JSON-LD.
		const raw = readFileSync(file, 'utf8');
		const text = raw
			.replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>/g, '')
			.replace(/<style[\s\S]*?<\/style>/g, '');
		if (text.includes('\u2014')) problems.push(`${file} contains an em dash`);
		for (const why of bannedIn(text)) problems.push(`${file} mentions ${why}`);
	}
}

if (problems.length) {
	console.error(`[check-copy] ${problems.length} problem(s):\n` + problems.map((p) => `  - ${p}`).join('\n'));
	process.exit(1);
}
console.log(`[check-copy] ok: ${Object.keys(fr).length} UI keys in both languages, no em dashes${dist ? ', nothing off-limits in ' + dist : ''}`);
