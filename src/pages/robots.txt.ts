import type { APIRoute } from 'astro';

import { CANONICAL_HOSTS, DEPLOY_HOST, INDEXABLE } from '../config/indexing';

/*
  robots.txt, generated so the Sitemap line can never point at a host this
  build does not live on.

  Every crawler is welcome, search and AI alike: being read and quoted by
  assistants is the point of this site (card AF-08). The AI agents are
  listed by name so a blanket rule added upstream (Cloudflare's managed
  robots.txt, for instance) is easy to spot against this file.

  Preview builds still say `Allow: /`. A disallowed page is never fetched, so
  the crawler never reads the `noindex` in its head, and Google can index a
  forbidden URL bare when something links to it. Crawl allowed, indexing
  refused in the document head (BaseHead.astro), sitemap withheld.
*/
const AI_AGENTS = [
	'GPTBot',
	'OAI-SearchBot',
	'ChatGPT-User',
	'ClaudeBot',
	'Claude-SearchBot',
	'Claude-User',
	'PerplexityBot',
	'Perplexity-User',
	'Google-Extended',
	'Applebot-Extended',
	'CCBot',
];

export const GET: APIRoute = ({ site }) => {
	const lines = ['# Generated at build time. Edit src/pages/robots.txt.ts.', '', 'User-agent: *', 'Allow: /', ''];

	for (const agent of AI_AGENTS) lines.push(`User-agent: ${agent}`);
	lines.push('Allow: /', '');

	if (INDEXABLE && site) {
		lines.push(`Sitemap: ${new URL('sitemap-index.xml', site).href}`, '');
	} else {
		lines.push(
			'# Preview build: every page sends noindex and no sitemap is advertised.',
			`# Built for host: ${DEPLOY_HOST || 'none'}. Indexing turns on when served from:`,
			`# ${CANONICAL_HOSTS.join(', ')}`,
			'',
		);
	}

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
