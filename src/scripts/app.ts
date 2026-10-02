/*
  The one script every page loads (Layout.astro). It binds every behaviour
  once on `document`, sets up the first page's motion, and plays the
  first-visit loader.
*/
import { gsap, reduceMotion, setupPage } from './motion';
import { bindTransitions } from './transition';
import { bindUi } from './ui';

const root = document.documentElement;

bindUi();

/*
  swup is created by @swup/astro's own script. It may run before or after
  this module, so wait for `swup-enabled` on <html> if it is not there yet.
*/
function whenSwup(fn: () => void) {
	if (window.swup) return fn();
	const obs = new MutationObserver(() => {
		if (window.swup) {
			obs.disconnect();
			fn();
		}
	});
	obs.observe(root, { attributes: true, attributeFilter: ['class'] });
}
whenSwup(bindTransitions);

/*
  First visit in this tab: the years count from 2015 to now on night, then
  the loader lifts and the page's opening sequence starts underneath.
  About 1.6 s; it never plays again in the same tab.
*/
function playLoader(): number {
	const loader = document.querySelector<HTMLElement>('[data-loader]');
	if (!loader || !root.classList.contains('first-visit') || reduceMotion.matches) {
		root.classList.remove('first-visit');
		return 0;
	}
	try {
		sessionStorage.setItem('af.visited', '1');
	} catch {
		/* ignore */
	}
	const count = loader.querySelector<HTMLElement>('[data-loader-count]');
	const from = Number(count?.dataset.from ?? 2015);
	const to = Number(count?.dataset.to ?? new Date().getFullYear());
	const state = { year: from };
	const tl = gsap.timeline({
		onComplete: () => {
			root.classList.remove('first-visit');
			gsap.set(loader, { clearProps: 'all' });
		},
	});
	if (count) {
		tl.fromTo(count, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: 'ff-out' });
		tl.to(
			state,
			{
				year: to,
				duration: 0.9,
				ease: 'power2.inOut',
				onUpdate: () => {
					count.textContent = String(Math.round(state.year));
				},
			},
			0.2,
		);
		tl.to(count, { yPercent: -100, duration: 0.45, ease: 'ff-in' }, '+=0.15');
	}
	tl.to(loader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'ff-in-out' }, '-=0.2');
	return Math.max(0, tl.duration() - 0.5);
}

const introDelay = playLoader();
// Fonts change line breaks, and SplitText splits by line: wait for them.
document.fonts.ready.then(() => {
	setupPage(document, introDelay);
	window.__afReady = true;
});
