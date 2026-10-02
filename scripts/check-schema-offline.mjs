/*
  Offline JSON-LD check against the official schema.org vocabulary, for when
  validator.schema.org rate-limits this IP (302 to google.com/sorry).

  For every node in every built page's @graph:
  - its @type must exist in schema.org
  - every property must exist and be allowed on that type or one of its
    ancestors (domainIncludes), the check that caught `availableLanguage` on
    Service and `inLanguage` on a business on earlier sites
  - every @id reference must resolve to a node on the same page, or be an
    external organization we deliberately reference (AGENCY.id)

  Usage: node scripts/check-schema-offline.mjs [distDir]
  The vocabulary is cached in /tmp/schemaorg-current-https.jsonld.
*/
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const CACHE = '/tmp/schemaorg-current-https.jsonld';
if (!existsSync(CACHE)) {
	const res = await fetch('https://schema.org/version/latest/schemaorg-current-https.jsonld');
	if (!res.ok) {
		console.error(`could not download the vocabulary: ${res.status}`);
		process.exit(2);
	}
	writeFileSync(CACHE, await res.text());
}
const vocab = JSON.parse(readFileSync(CACHE, 'utf8'))['@graph'];
const short = (id) => String(id).replace(/^schema:/, '').replace(/^https?:\/\/schema\.org\//, '');
const asArr = (v) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

const classes = new Map();
const props = new Map();
for (const n of vocab) {
	const types = asArr(n['@type']).map(short);
	if (types.includes('rdfs:Class') || types.includes('Class')) {
		classes.set(short(n['@id']), asArr(n['rdfs:subClassOf']).map((s) => short(s['@id'])));
	}
	if (types.includes('rdf:Property') || types.includes('Property')) {
		props.set(short(n['@id']), asArr(n['schema:domainIncludes']).map((d) => short(d['@id'])));
	}
}
const ancestors = (t, seen = new Set()) => {
	if (seen.has(t)) return seen;
	seen.add(t);
	for (const p of classes.get(t) ?? []) ancestors(p, seen);
	return seen;
};

const files = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? files(join(d, n)) : [join(d, n)]));
const pages = files(dist).filter((f) => f.endsWith('.html'));
const EXTERNAL_IDS = new Set(['https://floresagency.ca/#organization']);
let problems = 0;
let nodes = 0;

for (const f of pages) {
	const blocks = [...readFileSync(f, 'utf8').matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)];
	for (const [, json] of blocks) {
		const data = JSON.parse(json);
		const ids = new Set();
		const refs = [];
		const visit = (node, path) => {
			if (Array.isArray(node)) return node.forEach((n, i) => visit(n, `${path}[${i}]`));
			if (!node || typeof node !== 'object') return;
			if (node['@id'] && node['@type']) ids.add(node['@id']);
			if (node['@id'] && !node['@type'] && Object.keys(node).length === 1) refs.push([node['@id'], path]);
			const types = asArr(node['@type']);
			if (types.length) {
				nodes++;
				const allowed = new Set(types.flatMap((t) => [...ancestors(t)]));
				for (const t of types) if (!classes.has(t)) (problems++, console.log(`${f}: ${path} unknown type ${t}`));
				for (const key of Object.keys(node)) {
					if (key.startsWith('@')) continue;
					const domain = props.get(key);
					if (!domain) {
						problems++;
						console.log(`${f}: ${path} unknown property ${key}`);
					} else if (!domain.some((d) => allowed.has(d))) {
						problems++;
						console.log(`${f}: ${path} ${key} is not allowed on ${types.join('/')} (domain: ${domain.join(', ')})`);
					}
				}
			}
			for (const [k, v] of Object.entries(node)) if (!k.startsWith('@')) visit(v, `${path}.${k}`);
		};
		visit(data['@graph'] ?? data, '@graph');
		for (const [id, path] of refs) {
			if (!ids.has(id) && !EXTERNAL_IDS.has(id)) (problems++, console.log(`${f}: ${path} references ${id}, not on this page`));
		}
	}
}

if (problems) {
	console.error(`[schema-offline] ${problems} problem(s) in ${nodes} nodes`);
	process.exit(1);
}
console.log(`[schema-offline] OK: ${nodes} nodes on ${pages.length} pages, every type and property valid on schema.org`);
