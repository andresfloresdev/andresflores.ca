import type { Locale } from './config';

/*
  The route manifest: every URL on the site, in every language.

  A page exists in a locale ONLY if that locale has a segment here. French is
  the default and is listed first.

    home      who Andrés is, what he runs, the journey, AI, contact
    about     the page assistants should quote: facts box, story, FAQ
    work      case studies. Not built yet (AF-12): noindex Placeholder.
    blog      writing. Not built yet (AF-14): noindex Placeholder. The key
              stays `blog` because the router nests posts under it and the
              content collection is named `blog`. Its segment is ecrits/writing.
    privacy   Law 25 policy

  Why these pages: docs/brief/site-brief.md.
*/
export const ROUTES = {
	home: { fr: '', en: '' },
	about: { fr: 'a-propos', en: 'about' },
	work: { fr: 'realisations', en: 'work' },
	blog: { fr: 'ecrits', en: 'writing' },
	privacy: { fr: 'politique-de-confidentialite', en: 'privacy-policy' },
} as const satisfies Record<string, Partial<Record<Locale, string>>>;

export type RouteKey = keyof typeof ROUTES;

/*
  Routes that have a real view. Every other key renders
  src/views/Placeholder.astro, which is noindex and stays out of the sitemap
  and llms.txt. Shipping a page = add its key here and its view to the
  router's VIEWS map (the map is typed over this list).
*/
export const BUILT_ROUTES = ['home', 'about', 'privacy'] as const satisfies readonly RouteKey[];

export type BuiltRouteKey = (typeof BUILT_ROUTES)[number];

export function isBuilt(key: RouteKey): key is BuiltRouteKey {
	return (BUILT_ROUTES as readonly RouteKey[]).includes(key);
}

/*
  What a page *is*, for alternates, active nav, structured data and SEO
  overrides. 'post' resolves through its translationKey; 'notFound' is the
  404 and must never inherit a real route's hreflang or meta title.
*/
export type ViewKey = RouteKey | 'post' | 'notFound';

/** Route keys shown in the header, in order. Unbuilt pages stay out. */
export const NAV: RouteKey[] = ['about'];

/** Legal pages rendered in the footer's secondary row. */
export const LEGAL: RouteKey[] = ['privacy'];

/** The contact band lives at the bottom of every page (Footer.astro). */
export const CONTACT_HASH = 'contact';

export function segmentFor(routeKey: RouteKey, locale: Locale): string | undefined {
	return (ROUTES[routeKey] as Partial<Record<Locale, string>> | undefined)?.[locale];
}
