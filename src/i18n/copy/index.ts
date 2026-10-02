import { nbDeep } from '../../lib/rich';
import type { Locale } from '../config';
import { en } from './en';
import { fr, type PageCopy } from './fr';

export type { PageCopy };

/*
  Page copy by locale. Typed as Record<Locale, …> so adding a language to
  LOCALES fails `astro check` until its copy file exists.

  Every string passes through `nbDeep` once, at module load, so hyphenated
  compounds never break across lines (see `nb` in src/lib/rich.ts). Copy
  values that are identifiers (route keys, hashes, ids) contain no hyphens.
*/
const COPY: Record<Locale, PageCopy> = { fr: nbDeep(fr), en: nbDeep(en) };

export function copyFor(locale: Locale): PageCopy {
	return COPY[locale];
}
