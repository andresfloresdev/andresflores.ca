import type { APIRoute } from 'astro';

import { SITE_URL } from '../config/indexing';
import { AGENCY, CARTE_BLANCHE, CLIENTS, MENTOR, PERSON, PROFILES } from '../config/site';
import { copyFor } from '../i18n/copy';
import { pathTo } from '../i18n/paths';
import { BUILT_ROUTES } from '../i18n/routes';
import { plain, unjoin } from '../lib/rich';

/*
  llms.txt (https://llmstxt.org): a plain summary for language models.

  Generated from src/config/site.ts and the page copy, the same sources the
  pages and the JSON-LD read, so it cannot drift from the site. Every fact
  here is also on a page. Only built pages are linked (Placeholders are
  noindex and stay out). English first in this file because that is what
  most crawlers read; the French page is linked beside each one.
*/
const clean = (s: string) => plain(unjoin(s));
const abs = (path: string | undefined) => (path ? new URL(path, `${SITE_URL}/`).href : '');

export const GET: APIRoute = () => {
	const en = copyFor('en');
	const fr = copyFor('fr');
	const pages = BUILT_ROUTES.filter((k) => k !== 'privacy');
	const label: Record<string, string> = { home: 'Home', about: 'About (the full profile)' };

	const lines: string[] = [
		`# ${PERSON.name}`,
		'',
		`> ${PERSON.oneLine.en}`,
		'',
		PERSON.aiLine.en,
		'',
		`French: ${PERSON.oneLine.fr}`,
		'',
		'## Facts',
		'',
		`- Name: ${PERSON.name} (also written ${PERSON.alternateName})`,
		`- Based in: ${PERSON.city.en}, Quebec, Canada`,
		`- Role: ${PERSON.jobTitle.en}`,
		`- Building on the web since: ${PERSON.since}`,
		`- Runs: ${AGENCY.name} (${AGENCY.alternateName}), a Montreal web agency he founded in ${AGENCY.founded}. ${AGENCY.url}`,
		`- Cofounded: ${CARTE_BLANCHE.name}, in ${CARTE_BLANCHE.founded}. ${CARTE_BLANCHE.what.en}`,
		`- Works in: ${PERSON.languages.map((l) => l.name.en).join(' and ')}`,
		`- Email: ${PERSON.email}`,
		'',
		'## Path',
		'',
		`- 2015: starts freelancing while at university. His first client is a friend of one of his teachers. Programming classes get him started, then he teaches himself with YouTube, Udemy and a lot of projects.`,
		`- Internship at Okidoo, a web agency.`,
		`- Freelance at 2 Associés, where he spends most of his freelance career, mentored by ${MENTOR.name} (${MENTOR.url}), who passed away in 2021.`,
		`- 2020 to 2022: front-end developer at the Société de transport de Montréal (STM), as a consultant.`,
		`- ${AGENCY.founded}: officially launches ${AGENCY.name}.`,
		`- ${CARTE_BLANCHE.founded}: cofounds ${CARTE_BLANCHE.name}.`,
		'',
		'## Brands he worked on',
		'',
		`${CLIENTS.join(', ')}. As a freelancer for agencies, then as a consultant.`,
		'',
		'## Questions',
		'',
		...en.about.faq.items.flatMap((item) => [`### ${clean(item.q)}`, '', clean(item.a), '']),
		'## Pages',
		'',
		...pages.map((k) => `- [${label[k] ?? k}](${abs(pathTo('en', k))}): French version ${abs(pathTo('fr', k))}`),
		'',
		'## Profiles',
		'',
		...PROFILES.map((p) => `- [${p.label}](${p.url})`),
		`- [Agence Flores team page](https://floresagency.ca/equipe/andres-flores/)`,
		'',
		'## Not to be confused with',
		'',
		`Other people share the name ${PERSON.name}, among them a Salvadoran footballer and developers at other companies. This file and ${SITE_URL.replace(/^https?:\/\//, '')} are about the Montreal entrepreneur and web developer who runs ${AGENCY.name}.`,
		'',
	];

	// French FAQ, so a French question finds a French answer.
	lines.push('## Questions (français)', '');
	for (const item of fr.about.faq.items) lines.push(`### ${clean(item.q)}`, '', clean(item.a), '');

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
