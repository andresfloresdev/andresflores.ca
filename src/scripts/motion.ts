/*
  Motion: GSAP + ScrollTrigger + SplitText, with Lenis.

  The curves are the ones Carte Blanche lifted from Fatfish (espaceaxc.com,
  window.custom_eases), so the timing has the same long settle:

    ff-out      a fast start that settles for a long time. Most entrances.
    ff-in-out   a slow wind-up, then a long settle. Lines, bands, frames.
    ff-in       the leave side of a transition.

  Entrances are declarative. A view marks an element and this file animates
  it the first time it scrolls into view:

    data-anim="lines"     SplitText lines rise out of a mask, staggered
    data-anim="rise"      the block rises 40px and fades in
    data-anim="rule"      a hairline draws from the left
    data-anim="frame"     an image frame wipes open upward, the image settles
    data-anim="label"     "/ Label": wipes in, then the letters type on
    data-anim="stagger"   its direct children rise one after another
    data-anim="drop"      falls in from above (header items)
    data-anim="wordmark"  its child rises out of it; the element clips
    data-anim="pill"      the hero portrait opens sideways inside the name

  `data-delay="0.2"` offsets one entrance. Elements inside `[data-intro]`
  play together as the page's opening sequence instead of on scroll.

  Scroll-linked effects (scrubbed, not one-shot):

    data-parallax         an overscanned image drifts inside its frame
    data-scrub-words      words go from faint to full as the reader passes
    data-journey          the sticky year follows the step in view, and a
                          flame line draws down the track
    data-marquee          a loop that speeds up and leans with scroll speed

  Everything is built inside a gsap.context per page, reverted before swup
  swaps the page, so nothing leaks across navigations.
*/
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText);

CustomEase.create('ff-out', 'M0,0,C0.084,0.61,0.214,0.802,0.28,0.856,0.356,0.918,0.374,1,1,1');
CustomEase.create('ff-in', 'M0,0 C0.5,0 0.581,0.06 0.625,0.086 0.72,0.143 0.9,0.23 1,1');
CustomEase.create(
	'ff-in-out',
	'M0,0,C0.25,0,0.294,0.023,0.335,0.05,0.428,0.11,0.466,0.292,0.498,0.502,0.532,0.73,0.586,0.88,0.64,0.928,0.679,0.962,0.698,1,1,1',
);

gsap.defaults({ ease: 'ff-out', duration: 1.2 });

export { gsap, ScrollTrigger, SplitText };

const root = document.documentElement;
export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------------------------------------------------------------------- */
/* Lenis, driven by GSAP's ticker so ScrollTrigger and Lenis share a clock. */
/* ---------------------------------------------------------------------- */
export let lenis: Lenis | null = null;

function startLenis() {
	if (lenis || reduceMotion.matches) return;
	lenis = new Lenis({ autoRaf: false, lerp: 0.1, wheelMultiplier: 0.95 });
	lenis.on('scroll', ScrollTrigger.update);
	window.__lenis = lenis;
}

function stopLenis() {
	lenis?.destroy();
	lenis = null;
	window.__lenis = undefined;
}

gsap.ticker.add((time) => lenis?.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
startLenis();
reduceMotion.addEventListener('change', (e) => (e.matches ? stopLenis() : startLenis()));

/* ---------------------------------------------------------------------- */
/* Entrances.                                                              */
/* ---------------------------------------------------------------------- */
type Builder = (el: HTMLElement) => gsap.core.Timeline | gsap.core.Tween;

const splits: SplitText[] = [];

const markSet = (el: Element) => el.classList.add('is-set');

/*
  Reverting a SplitText after its entrance can move the text by a pixel or
  two. Down a long page those shifts add up, and every ScrollTrigger below
  them was measured against the old layout. Re-measure once reverts settle.
*/
let refreshTimer = 0;
function revertAndRefresh(split: SplitText) {
	split.revert();
	window.clearTimeout(refreshTimer);
	refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
}

const builders: Record<string, Builder> = {
	lines(el) {
		const split = SplitText.create(el, {
			type: 'lines',
			mask: 'lines',
			linesClass: 'split-line',
			autoSplit: false,
		});
		splits.push(split);
		gsap.set(split.lines, { yPercent: 110 });
		markSet(el);
		return gsap.to(split.lines, {
			yPercent: 0,
			duration: 1.25,
			stagger: 0.09,
			ease: 'ff-out',
			onComplete: () => revertAndRefresh(split),
		});
	},

	rise(el) {
		gsap.set(el, { y: 40, opacity: 0 });
		markSet(el);
		return gsap.to(el, { y: 0, opacity: 1, duration: 1.3, clearProps: 'transform,opacity' });
	},

	drop(el) {
		gsap.set(el, { y: -24, opacity: 0 });
		markSet(el);
		return gsap.to(el, { y: 0, opacity: 1, duration: 1.1, clearProps: 'transform,opacity' });
	},

	rule(el) {
		gsap.set(el, { scaleX: 0 });
		markSet(el);
		return gsap.to(el, { scaleX: 1, duration: 1.4, ease: 'ff-in-out' });
	},

	frame(el) {
		const img = el.querySelector('img');
		gsap.set(el, { clipPath: 'inset(100% 0% 0% 0% round 1.25rem)' });
		if (img) gsap.set(img, { scale: 1.35 });
		markSet(el);
		const tl = gsap.timeline();
		tl.to(el, { clipPath: 'inset(0% 0% 0% 0% round 1.25rem)', duration: 1.4, ease: 'ff-in-out', clearProps: 'clipPath' });
		if (img) tl.to(img, { scale: 1, duration: 1.8, ease: 'ff-out' }, 0.15);
		return tl;
	},

	label(el) {
		const split = SplitText.create(el, { type: 'chars', autoSplit: false });
		splits.push(split);
		gsap.set(split.chars, { opacity: 0 });
		markSet(el);
		const tl = gsap.timeline();
		tl.from(el, { clipPath: 'inset(0 100% 0 0)', duration: 0.6, ease: 'ff-out', clearProps: 'clipPath' });
		tl.to(split.chars, { opacity: 1, duration: 0.001, stagger: 0.03, onComplete: () => revertAndRefresh(split) }, 0.1);
		return tl;
	},

	stagger(el) {
		const kids = [...el.children] as HTMLElement[];
		gsap.set(kids, { y: 40, opacity: 0 });
		markSet(el);
		return gsap.to(kids, { y: 0, opacity: 1, duration: 1.2, stagger: 0.09, clearProps: 'transform,opacity' });
	},

	// The element clips; its child rises out of it in one long move.
	wordmark(el) {
		const inner = el.firstElementChild as HTMLElement | null;
		markSet(el);
		if (!inner) return gsap.timeline();
		gsap.set(inner, { yPercent: 104 });
		return gsap.to(inner, { yPercent: 0, duration: 1.6, ease: 'ff-out' });
	},

	/*
	  The portrait pill in the hero name: it opens from nothing to its width,
	  pushing "Flores" over, while the photo settles from a zoom. Measured
	  before it is collapsed, so the end state is exactly the CSS width.
	*/
	pill(el) {
		const width = el.getBoundingClientRect().width;
		const img = el.querySelector('img');
		gsap.set(el, { width: 0 });
		if (img) gsap.set(img, { scale: 1.6 });
		markSet(el);
		const tl = gsap.timeline();
		tl.to(el, { width, duration: 1.5, ease: 'ff-in-out', clearProps: 'width' });
		if (img) tl.to(img, { scale: 1, duration: 2, ease: 'ff-out', clearProps: 'transform' }, 0.1);
		return tl;
	},
};

function showAll(scope: ParentNode) {
	scope.querySelectorAll('[data-anim]').forEach(markSet);
}

/* ---------------------------------------------------------------------- */
/* Scroll-linked effects.                                                  */
/* ---------------------------------------------------------------------- */

/* Words go from faint to full ink as the paragraph crosses the screen. */
function scrubWords(el: HTMLElement) {
	const split = SplitText.create(el, { type: 'words', wordsClass: 'word', autoSplit: false });
	splits.push(split);
	gsap.fromTo(
		split.words,
		{ opacity: 0.14 },
		{
			opacity: 1,
			ease: 'none',
			stagger: 0.1,
			scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
		},
	);
}

/*
  The journey: the sticky numeral shows the step in view (its year, or its
  label when the step is not dated), rolling up or down with the direction
  of travel. The flame line draws down the track as the list scrolls by.
*/
function journey(section: HTMLElement) {
	const display = section.querySelector<HTMLElement>('[data-journey-year]');
	const caption = section.querySelector<HTMLElement>('[data-journey-caption]');
	const list = section.querySelector<HTMLElement>('[data-journey-list]');
	const progress = section.querySelector<HTMLElement>('[data-journey-progress]');
	const items = [...section.querySelectorAll<HTMLElement>('[data-step]')];

	if (progress && list) {
		gsap.fromTo(
			progress,
			{ scaleY: 0 },
			{ scaleY: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 60%', end: 'bottom 60%', scrub: 0.4 } },
		);
	}

	let current = -1;
	/*
	  Every numeral is absolutely placed in a one-line box, so swapping never
	  moves the layout. Each swap sends EVERY numeral still on screen out (a
	  fast scroll can start a new swap before the last one finished) and
	  brings one new numeral in.
	*/
	const show = (index: number, direction: 1 | -1) => {
		if (index === current || !display) return;
		current = index;
		items.forEach((item, i) => item.classList.toggle('is-active', i <= index));
		const step = items[index];
		for (const old of [...display.children] as HTMLElement[]) {
			gsap.killTweensOf(old);
			gsap.to(old, { yPercent: -110 * direction, duration: 0.7, ease: 'ff-out', onComplete: () => old.remove() });
		}
		const next = document.createElement('span');
		next.textContent = step.dataset.big ?? '';
		display.appendChild(next);
		gsap.fromTo(next, { yPercent: 110 * direction }, { yPercent: 0, duration: 0.8, ease: 'ff-out' });
		if (caption) caption.textContent = step.dataset.small ?? '';
	};

	items.forEach((item, i) => {
		ScrollTrigger.create({
			trigger: item,
			start: 'top 62%',
			end: 'bottom 62%',
			onEnter: () => show(i, 1),
			onEnterBack: () => show(i, -1),
		});
	});
	// The first step is the starting state, so the numeral is never empty.
	if (display && items[0]) {
		display.innerHTML = '';
		const first = document.createElement('span');
		first.textContent = items[0].dataset.big ?? '';
		display.appendChild(first);
		if (caption) caption.textContent = items[0].dataset.small ?? '';
		current = 0;
		items[0].classList.add('is-active');
	}
}

/* A loop of brand names. Scrolling speeds it up and tilts it a little. */
function marquee(el: HTMLElement) {
	const track = el.querySelector<HTMLElement>('[data-marquee-track]');
	if (!track) return;
	const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
	const lean = gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3.out' });
	ScrollTrigger.create({
		trigger: el,
		start: 'top bottom',
		end: 'bottom top',
		onUpdate: (self) => {
			const v = self.getVelocity();
			loop.timeScale(1 + Math.min(Math.abs(v) / 350, 5));
			lean(gsap.utils.clamp(-8, 8, v / -260));
			gsap.delayedCall(0.15, () => {
				gsap.to(loop, { timeScale: 1, duration: 0.9, ease: 'power2.out', overwrite: true });
				lean(0);
			});
		},
	});
}

/* ---------------------------------------------------------------------- */
/* Per-page setup.                                                         */
/* ---------------------------------------------------------------------- */
let ctx: gsap.Context | null = null;

/**
 * Build every entrance and scroll effect for the page inside `scope`.
 * `introDelay` holds the opening sequence back (behind the loader or the
 * transition band).
 */
export function setupPage(scope: ParentNode = document, introDelay = 0) {
	teardownPage();

	if (reduceMotion.matches) {
		showAll(scope);
		return;
	}

	ctx = gsap.context(() => {
		const all = [...scope.querySelectorAll<HTMLElement>('[data-anim]')];

		// Opening sequence: everything inside [data-intro] plays in one timeline.
		const intro = gsap.timeline({ delay: introDelay });
		all
			.filter((el) => el.closest('[data-intro]'))
			.forEach((el, i) => {
				const builder = builders[el.dataset.anim ?? ''];
				if (!builder) return markSet(el);
				const at = el.dataset.delay !== undefined ? Number(el.dataset.delay) : i * 0.12;
				intro.add(builder(el), at);
			});

		// Everything else plays when it scrolls into view.
		all
			.filter((el) => !el.closest('[data-intro]'))
			.forEach((el) => {
				const builder = builders[el.dataset.anim ?? ''];
				if (!builder) return markSet(el);
				const anim = builder(el);
				anim.pause(0);
				const delay = Number(el.dataset.delay ?? 0);
				ScrollTrigger.create({
					trigger: el,
					start: el.dataset.start ?? 'top 88%',
					once: true,
					onEnter: () => {
						if (delay) gsap.delayedCall(delay, () => anim.play());
						else anim.play();
					},
				});
			});

		scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((frame) => {
			const img = frame.querySelector('img');
			if (!img) return;
			const amount = Number(frame.dataset.parallax || 8);
			gsap.fromTo(
				img,
				{ yPercent: -amount },
				{ yPercent: amount, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } },
			);
		});

		scope.querySelectorAll<HTMLElement>('[data-scrub-words]').forEach(scrubWords);
		scope.querySelectorAll<HTMLElement>('[data-journey]').forEach(journey);
		scope.querySelectorAll<HTMLElement>('[data-marquee]').forEach(marquee);
	}, scope as Element);

	// Images load lazily and fonts may settle late: measure again.
	requestAnimationFrame(() => ScrollTrigger.refresh());
}

export function teardownPage() {
	ctx?.revert();
	ctx = null;
	while (splits.length) splits.pop()?.revert();
}

/* Refresh once every image above the fold has a size. */
window.addEventListener('load', () => ScrollTrigger.refresh());

/* Keep the motion class honest for the CSS that hides pending entrances. */
reduceMotion.addEventListener('change', () => {
	root.classList.toggle('motion', !reduceMotion.matches);
	if (reduceMotion.matches) showAll(document);
});
