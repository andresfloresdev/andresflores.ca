// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import swup from '@swup/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import { INDEXABLE, SITE_URL, indexingSummary } from './src/config/indexing.ts';
import { DEFAULT_LOCALE, LOCALE_KEYS } from './src/i18n/config.ts';
import { placeholderPaths } from './src/i18n/paths.ts';

// Printed on every build. A preview build that says ALLOWED, or a production
// build that says BLOCKED, is the thing to catch here.
console.log(indexingSummary());

// Pages that render the noindex Placeholder must never be in the sitemap.
const EXCLUDED = new Set(placeholderPaths());

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,

	i18n: {
		defaultLocale: DEFAULT_LOCALE,
		locales: LOCALE_KEYS,
		routing: {
			// Every language is prefixed, including the default. Changing
			// DEFAULT_LOCALE in src/i18n/config.ts moves no URLs.
			prefixDefaultLocale: true,
		},
	},

	// Static builds emit an HTML meta-refresh here. The host answers / with a
	// real 301 to /fr/ (public/_redirects); this stub is the fallback.
	redirects: {
		'/': `/${DEFAULT_LOCALE}/`,
	},

	integrations: [
		mdx(),
		// No `i18n` option: it pairs translations by identical paths and cannot
		// see translated slugs (/fr/a-propos <-> /en/about). BaseHead renders
		// the full hreflang set instead.
		// Withheld entirely on preview builds: a sitemap invites indexing of
		// every URL in it, which contradicts the noindex those pages send.
		...(INDEXABLE ? [sitemap({ filter: (page) => !EXCLUDED.has(new URL(page).pathname) })] : []),
		/*
		  Page transitions are drawn by GSAP (src/scripts/transition.ts), not a
		  swup theme. Containers: `#swup` (<main> and the footer) and `header`,
		  so the active nav item and the language link are current on every
		  page. `animationClass: false` stops swup waiting on CSS transitions;
		  `globalInstance` exposes window.swup for the hooks. Lenis owns the
		  scroller, so swup's smooth scrolling stays off.
		*/
		swup({
			containers: ['#swup', 'header'],
			theme: false,
			animationClass: false,
			smoothScrolling: false,
			globalInstance: true,
			loadOnIdle: false,
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
