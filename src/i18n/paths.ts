import { LOCALE_KEYS, type Locale } from './config';
import { ROUTES, type RouteKey, isBuilt, segmentFor } from './routes';

/*
  Pure URL construction. Imports only config and routes (no JSON, no
  import.meta.glob) so astro.config.mjs can import it for the sitemap filter.
  src/i18n/utils.ts re-exports pathTo from here.
*/

/**
 * Build a URL for a route in a locale. Returns `undefined` when the page does
 * not exist in that language — callers use that to hide links rather than
 * emitting a dead one.
 */
export function pathTo(locale: Locale, routeKey: RouteKey, slug?: string): string | undefined {
	const segment = segmentFor(routeKey, locale);
	if (segment === undefined) return undefined;

	const parts = [locale, segment, slug].filter((part) => part !== undefined && part !== '');
	return `/${parts.join('/')}/`;
}

/** Every URL that renders the noindex Placeholder view. */
export function placeholderPaths(): string[] {
	const paths: string[] = [];
	for (const key of Object.keys(ROUTES) as RouteKey[]) {
		if (isBuilt(key)) continue;
		for (const locale of LOCALE_KEYS) {
			const href = pathTo(locale, key);
			if (href) paths.push(href);
		}
	}
	return paths;
}
