/*
  Whether THIS build may be indexed, and which URL it calls itself.

  Indexing is derived from the URL the build is told it lives at, never from
  a hand-set NOINDEX flag: a flag has to be flipped twice and the second flip
  is the one that gets forgotten. A preview deploy (workers.dev, localhost)
  stays blocked on its own.

  Production build: SITE_URL=https://andresflores.ca npm run build
  Every build prints `[indexing] ALLOWED` or `BLOCKED`. A production build
  must say ALLOWED. Pattern from tlm-avocats and projet-carte-blanche.
*/

/** Hosts allowed into search engines. andresflores.com 301s here (AF-04). */
export const CANONICAL_HOSTS: string[] = ['andresflores.ca'];

const hostOf = (value: string): string => {
	try {
		return new URL(value).host.toLowerCase();
	} catch {
		return '';
	}
};

/* Build-time only. Pass SITE_URL in CI; local builds fall back to localhost. */
const rawUrl = process.env.SITE_URL || 'http://localhost:4321';

/** Absolute origin used for canonical, hreflang, og:url, JSON-LD and llms.txt. */
export const SITE_URL = rawUrl.replace(/\/+$/, '');

export const DEPLOY_HOST = hostOf(SITE_URL);

/** True only when the build is served from one of CANONICAL_HOSTS. */
export const INDEXABLE = CANONICAL_HOSTS.includes(DEPLOY_HOST);

/**
  The identity the structured data uses, whatever host this build is served
  from. A preview build must still describe the same Person node as
  production, so the @id never takes a localhost origin.
*/
export const IDENTITY_ORIGIN = 'https://andresflores.ca';

/** One line for the build log, so a wrong launch state is visible in CI output. */
export const indexingSummary = (): string =>
	INDEXABLE
		? `[indexing] ALLOWED: ${DEPLOY_HOST} is a canonical host`
		: `[indexing] BLOCKED: ${DEPLOY_HOST || 'no host'} is not in CANONICAL_HOSTS ` +
			`(${CANONICAL_HOSTS.join(', ')}); every page ships noindex`;
