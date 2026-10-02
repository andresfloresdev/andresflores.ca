import { nb } from '../lib/rich';
import { DEFAULT_LOCALE, LOCALE_KEYS, type Locale } from './config';
import { pathTo } from './paths';
import { CONTACT_HASH } from './routes';
import frUI from './ui/fr.json';

export { pathTo };

/*
  Every ui/*.json is picked up automatically.

  fr.json is the canonical key list that `t()` is typed against. French is
  this site's primary language; do not flip the anchor to en.json.
  scripts/check-i18n.mjs fails the build when the two files drift.
*/
export type UIKey = keyof typeof frUI;

const modules = import.meta.glob<{ default: Record<string, string> }>('./ui/*.json', {
	eager: true,
});

const UI = Object.fromEntries(
	Object.entries(modules).map(([path, module]) => [path.split('/').pop()!.replace('.json', ''), module.default]),
) as Record<Locale, Record<string, string>>;

/**
 * Translation lookup for a locale. Falls back to the default locale, then to
 * the key itself so a missing string is visible rather than blank. Output
 * passes through `nb` so hyphenated compounds do not break across lines.
 */
export function useTranslations(locale: Locale) {
	return function t(key: UIKey): string {
		return nb(UI[locale]?.[key] ?? UI[DEFAULT_LOCALE][key] ?? key);
	};
}

/** Like `t()` but returns `undefined` for a missing key. */
export function useOptionalTranslation(locale: Locale) {
	return function tOptional(key: string): string | undefined {
		return UI[locale]?.[key] || UI[DEFAULT_LOCALE]?.[key] || undefined;
	};
}

/** The contact band, at the bottom of every page. */
export function contactHref(): string {
	return `#${CONTACT_HASH}`;
}

/** `fr/bonjour` -> `{ locale: 'fr', slug: 'bonjour' }` */
export function parsePostId(id: string): { locale: Locale; slug: string } | undefined {
	const separator = id.indexOf('/');
	if (separator === -1) return undefined;
	const locale = id.slice(0, separator) as Locale;
	if (!LOCALE_KEYS.includes(locale)) return undefined;
	return { locale, slug: id.slice(separator + 1) };
}
