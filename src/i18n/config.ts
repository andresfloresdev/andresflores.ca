/*
  Locale configuration, the single source of truth, imported by both the app
  and astro.config.mjs.

  Every locale is prefixed (/fr/, /en/), so changing DEFAULT_LOCALE moves no
  URLs. It only decides where `/` lands and which language fills gaps.

  Andrés works French first: French is the default, listed first, and is the
  canonical key list for UI strings and page copy.
*/

export const LOCALES = {
	fr: { label: 'Français', short: 'FR', htmlLang: 'fr-CA' },
	en: { label: 'English', short: 'EN', htmlLang: 'en-CA' },
} as const;

export type Locale = keyof typeof LOCALES;

/** Change this to flip a project's primary language. No URL moves. */
export const DEFAULT_LOCALE: Locale = 'fr';

export const LOCALE_KEYS = Object.keys(LOCALES) as Locale[];

export function isLocale(value: string): value is Locale {
	return value in LOCALES;
}
