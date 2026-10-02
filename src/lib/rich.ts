/*
  Two-tone copy. A phrase wrapped in *asterisks* renders as the italic grey
  accent (`.accent` in global.css), which is how headlines carry a quieter
  second voice, Fatfish style:
    'L’IA concrète, *pour de vraies entreprises.*'

  `richHtml` escapes the whole string first and only then turns the markers
  into spans, so copy can never inject markup. Render its output with set:html.
*/

export interface Segment {
	text: string;
	dim: boolean;
}

export function segments(template: string): Segment[] {
	const out: Segment[] = [];
	const marker = /\*([^*]+)\*/g;
	let last = 0;

	for (let match = marker.exec(template); match; match = marker.exec(template)) {
		if (match.index > last) out.push({ text: template.slice(last, match.index), dim: false });
		out.push({ text: match[1], dim: true });
		last = marker.lastIndex;
	}

	if (last < template.length) out.push({ text: template.slice(last), dim: false });
	return out;
}

/** The copy with its markers removed, for meta tags and aria labels. */
export function plain(template: string): string {
	return template.replace(/\*/g, '');
}

const escapeHtml = (value: string): string =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

export function richHtml(template: string): string {
	return escapeHtml(template).replace(/\*([^*]+)\*/g, '<em class="accent">$1</em>');
}

/** 1 -> "01" */
export const pad = (n: number): string => String(n).padStart(2, '0');

/*
  Keep hyphenated compounds on one line: "Est-ce", "Dis-nous", "360-02".
  French typography does not break short compounds at the hyphen, and a
  heading ending on "Est-" reads as broken. There is no CSS for this.
  A WORD JOINER (U+2060) after the hyphen forbids the break and is
  zero-width. Inter Tight has neither U+2060 nor U+2011, so the joiner falls
  back to a system font, which is harmless for an invisible character; a
  U+2011 would draw a visibly different hyphen.

  Applied to all page copy in src/i18n/copy/index.ts. Not applied to meta tags
  or mailto bodies, which should stay plain text.
*/
const WORD_JOINER = '\u2060';

export function nb(text: string): string {
	return text.replace(/([\p{L}\p{N}’'])-(?=[\p{L}\p{N}])/gu, `$1-${WORD_JOINER}`);
}

/** Undo `nb`, for text that leaves the page (meta tags, JSON-LD, email bodies). */
export function unjoin(text: string): string {
	return text.replaceAll(WORD_JOINER, '');
}

/** Apply `nb` to every string in a copy object, recursively. */
export function nbDeep<T>(value: T): T {
	if (typeof value === 'string') return nb(value) as T;
	if (Array.isArray(value)) return value.map(nbDeep) as T;
	if (value && typeof value === 'object') {
		return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, nbDeep(v)])) as T;
	}
	return value;
}
