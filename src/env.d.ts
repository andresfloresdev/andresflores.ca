/*
  Globals set by the site's scripts (src/scripts/).

  Every listener is bound once on `document`, because swup swaps the page
  containers on navigation.
*/
import type Lenis from 'lenis';

declare global {
	interface Window {
		/*
		  Our Lenis instance (src/scripts/motion.ts). Deliberately NOT
		  `window.lenis`, which the library declares for its own detection.
		*/
		__lenis?: Lenis;
		/** src/scripts/app.ts has booted. The head fallback checks this. */
		__afReady?: boolean;
		/**
		  Exposed by @swup/astro (`globalInstance: true`). Typed loosely: swup
		  is a transitive dependency, so its types are not importable here.
		*/
		swup?: {
			hooks: {
				on: (hook: string, handler: (...args: any[]) => unknown, options?: object) => () => void;
				before: (hook: string, handler: (...args: any[]) => unknown, options?: object) => () => void;
				replace: (hook: string, handler: (...args: any[]) => unknown, options?: object) => () => void;
			};
		};
	}
}

export {};
