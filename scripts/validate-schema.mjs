// Validate every built page's JSON-LD on validator.schema.org.
// Reads totalNumErrors / totalNumWarnings and walks the whole JSON for errorType
// (reading only tripleGroups[].errors under-reports). Exit 2 if unreachable.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const files = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? files(join(d, n)) : [join(d, n)]));
const pages = files(dist).filter((f) => f.endsWith('.html') && !f.endsWith(`${dist}/index.html`) && !/realisations|ecrits|\/work\/|writing|404/.test(f));

const walk = (o, out = []) => {
	if (Array.isArray(o)) o.forEach((x) => walk(x, out));
	else if (o && typeof o === 'object') {
		if (o.errorType) out.push({ type: o.errorType, args: o.args, owner: o.ownerSet ? Object.keys(o.ownerSet) : undefined });
		Object.values(o).forEach((v) => walk(v, out));
	}
	return out;
};

let bad = 0;
for (const f of pages) {
	const html = readFileSync(f, 'utf8');
	const body = new URLSearchParams({ html });
	let res;
	try {
		res = await fetch('https://validator.schema.org/validate', { method: 'POST', body, redirect: 'manual' });
	} catch (e) {
		console.error('unreachable', String(e));
		process.exit(2);
	}
	if (res.status !== 200) {
		console.error(`validator answered ${res.status}`);
		process.exit(2);
	}
	const text = (await res.text()).replace(/^\)\]\}'\s*/, '');
	const data = JSON.parse(text);
	const issues = walk(data);
	const types = [...new Set((data.tripleGroups ?? []).map((g) => g.type))];
	console.log(`${f.replace(dist, '')}: errors=${data.totalNumErrors} warnings=${data.totalNumWarnings} types=${types.join(',')}`);
	for (const i of issues) console.log('   ', JSON.stringify(i));
	if (data.totalNumErrors > 0 || issues.length) bad++;
	await new Promise((r) => setTimeout(r, 800));
}
process.exit(bad ? 1 : 0);
