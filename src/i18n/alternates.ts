import { getCollection } from 'astro:content';
import { LOCALE_KEYS, type Locale } from './config';
import type { ViewKey } from './routes';
import { parsePostId, pathTo } from './utils';

/** locale -> URL, containing only the languages this page actually exists in. */
export type Alternates = Partial<Record<Locale, string>>;

/**
 * Which languages the current page is available in.
 *
 * Pages resolve through the route manifest; posts resolve through their shared
 * `translationKey`, so a post pairs with its translation even though the two
 * files have different slugs. Languages that are missing simply do not appear,
 * which is what lets the switcher disable them instead of linking to a 404.
 */
export async function getAlternates(
	view: ViewKey,
	post?: { data: { translationKey: string } },
): Promise<Alternates> {
	const alternates: Alternates = {};

	// The 404 is not a route, so it has no translations to point at. Emitting
	// hreflang here would claim the error page is the localized twin of a real one.
	if (view === 'notFound') return alternates;

	if (view === 'post') {
		if (!post) return alternates;

		for (const entry of await getCollection('blog')) {
			if (entry.data.translationKey !== post.data.translationKey) continue;

			const parsed = parsePostId(entry.id);
			if (!parsed) continue;

			const href = pathTo(parsed.locale, 'blog', parsed.slug);
			if (href) alternates[parsed.locale] = href;
		}

		return alternates;
	}

	for (const locale of LOCALE_KEYS) {
		const href = pathTo(locale, view);
		if (href) alternates[locale] = href;
	}

	return alternates;
}
