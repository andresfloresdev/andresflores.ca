/*
  Page transitions.

  1. Leave: a flame band with a rounded top rises from below the viewport
     and covers the page. The header slides away and the old page drifts up
     a little under the band. The name types onto the band.
  2. Swap: swup replaces #swup and the header behind the band. Scroll resets
     to the top while nothing is visible.
  3. Enter: the band keeps rising and leaves through the top while the new
     page rises 25vh into place, then the page's opening sequence plays.

  swup waits on the promises returned by the replaced `animation:out:await`
  and `animation:in:await` handlers. Reduced motion or browser history
  navigation: no band, an instant swap.

  Adapted from projet-carte-blanche/src/scripts/transition.ts.
*/
import { gsap, lenis, reduceMotion, ScrollTrigger, setupPage, teardownPage } from './motion';

const root = document.documentElement;
const band = () => document.querySelector<HTMLElement>('[data-page-band]');
const swupContainer = () => document.getElementById('swup');

let animating = false;

function leave(): Promise<void> {
	const el = band();
	if (!el || reduceMotion.matches) return Promise.resolve();
	animating = true;
	root.classList.add('is-transitioning');
	lenis?.stop();

	return new Promise((resolve) => {
		const tl = gsap.timeline({ onComplete: () => resolve() });
		gsap.set(el, { visibility: 'visible', yPercent: 0, y: window.innerHeight, height: window.innerHeight * 1.25 });
		const mark = el.querySelector('[data-band-mark]');
		if (mark) gsap.set(mark, { opacity: 0, yPercent: 60 });
		tl.to(el, { y: -window.innerHeight * 0.12, duration: 0.9, ease: 'ff-in-out' }, 0);
		tl.to(swupContainer(), { y: -window.innerHeight * 0.12, duration: 0.9, ease: 'ff-in-out' }, 0);
		if (mark) tl.to(mark, { opacity: 1, yPercent: 0, duration: 0.6, ease: 'ff-out' }, 0.4);
	});
}

function enter(): Promise<void> {
	const el = band();
	if (!el || reduceMotion.matches) {
		root.classList.remove('is-transitioning');
		return Promise.resolve();
	}
	const page = swupContainer();

	return new Promise((resolve) => {
		const tl = gsap.timeline({
			onComplete: () => {
				gsap.set(el, { visibility: 'hidden', clearProps: 'transform,height' });
				if (page) gsap.set(page, { clearProps: 'transform' });
				animating = false;
				lenis?.start();
				/*
				  setupPage measured every ScrollTrigger while #swup was still
				  translated 25vh down for the entrance. Measure again now.
				*/
				ScrollTrigger.refresh();
				resolve();
			},
		});
		const mark = el.querySelector('[data-band-mark]');
		if (page) gsap.set(page, { y: window.innerHeight * 0.25 });
		if (mark) tl.to(mark, { opacity: 0, yPercent: -60, duration: 0.45, ease: 'ff-in' }, 0);
		tl.to(el, { y: -window.innerHeight * 1.4, duration: 1.15, ease: 'ff-in-out' }, 0.1);
		if (page) tl.to(page, { y: 0, duration: 1.3, ease: 'ff-out' }, 0.3);
		tl.add(() => root.classList.remove('is-transitioning'), 0.55);
	});
}

export function bindTransitions() {
	const swup = window.swup;
	if (!swup) return;

	// History navigation (back/forward) swaps instantly, as browsers expect.
	swup.hooks.on('visit:start', (visit: { history: { popstate: boolean }; animation: { animate: boolean } }) => {
		if (visit.history.popstate || reduceMotion.matches) visit.animation.animate = false;
	});

	swup.hooks.replace('animation:out:await', () => leave());

	swup.hooks.before('content:replace', () => {
		teardownPage();
	});

	// Nothing on screen but the band: jump to the top.
	swup.hooks.replace('content:scroll', () => {
		lenis?.scrollTo(0, { immediate: true, force: true });
		window.scrollTo(0, 0);
	});

	swup.hooks.on('content:replace', () => {
		setupPage(document, animating ? 0.55 : 0);
		document.dispatchEvent(new CustomEvent('af:page'));
	});

	swup.hooks.replace('animation:in:await', () => enter());

	swup.hooks.on('animation:skip', () => {
		root.classList.remove('is-transitioning');
		lenis?.start();
	});

	// A link to #contact (or any hash) from another page: land on it smoothly.
	swup.hooks.replace('scroll:anchor', (_visit: unknown, { hash }: { hash: string }) => {
		const target = document.getElementById(decodeURIComponent(hash.replace(/^#/, '')));
		if (!target) return false;
		requestAnimationFrame(() => {
			lenis?.resize();
			const top = target.getBoundingClientRect().top + window.scrollY - headerOffset();
			if (lenis) lenis.scrollTo(Math.max(0, top), { duration: 1.4 });
			else window.scrollTo(0, Math.max(0, top));
		});
		return true;
	});
}

export function headerOffset() {
	return (document.querySelector<HTMLElement>('[data-header]')?.offsetHeight ?? 80) + 16;
}
