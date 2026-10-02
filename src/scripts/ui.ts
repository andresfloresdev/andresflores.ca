/*
  Behaviours: header hide and show, FAQ accordion, same-page anchors, the
  Montreal clock. All bound once on `document`, so they keep working after
  swup swaps the page.
*/
import { gsap, lenis, reduceMotion } from './motion';
import { headerOffset } from './transition';

const root = document.documentElement;

/* ---------------------------------------------------------------------- */
/* Header: hides going down, returns going up, frosts once off the top.    */
/* ---------------------------------------------------------------------- */
function bindHeader() {
	let lastY = window.scrollY;
	let ticking = false;
	const update = () => {
		ticking = false;
		const y = Math.max(0, window.scrollY);
		root.classList.toggle('is-scrolled', y > 24);
		if (y < 160) root.classList.remove('is-hidden-header');
		else if (y > lastY + 4) root.classList.add('is-hidden-header');
		else if (y < lastY - 4) root.classList.remove('is-hidden-header');
		lastY = y;
	};
	window.addEventListener(
		'scroll',
		() => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		},
		{ passive: true },
	);
	document.addEventListener('focusin', (e) => {
		if ((e.target as Element).closest?.('[data-header]')) root.classList.remove('is-hidden-header');
	});
	document.addEventListener('af:page', () => {
		lastY = 0;
		root.classList.remove('is-hidden-header', 'is-scrolled');
	});
	update();
}

/* ---------------------------------------------------------------------- */
/* Accordion: native <details>, height animated with GSAP.                 */
/* ---------------------------------------------------------------------- */
function bindAccordion() {
	document.addEventListener('click', (e) => {
		const summary = (e.target as Element).closest?.<HTMLElement>('.acc > summary');
		if (!summary) return;
		const details = summary.parentElement as HTMLDetailsElement;
		const body = details.querySelector<HTMLElement>('.acc__body');
		if (!body || reduceMotion.matches) return;
		e.preventDefault();

		const close = (d: HTMLDetailsElement) => {
			const b = d.querySelector<HTMLElement>('.acc__body');
			if (!b) return void (d.open = false);
			gsap.fromTo(
				b,
				{ height: b.offsetHeight },
				{
					height: 0,
					duration: 0.7,
					ease: 'ff-out',
					onComplete: () => {
						d.open = false;
						gsap.set(b, { clearProps: 'height' });
						requestAnimationFrame(() => lenis?.resize());
					},
				},
			);
			d.classList.remove('is-open');
		};

		if (details.open) {
			close(details);
			return;
		}
		// One open at a time within a group.
		const group = details.closest('[data-acc-group]');
		group?.querySelectorAll<HTMLDetailsElement>('details[open]').forEach((d) => d !== details && close(d));

		details.open = true;
		details.classList.add('is-open');
		const inner = body.querySelector<HTMLElement>('.acc__inner');
		gsap.fromTo(body, { height: 0 }, { height: body.scrollHeight, duration: 0.9, ease: 'ff-out', clearProps: 'height' });
		if (inner) gsap.fromTo(inner, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'ff-out', delay: 0.08 });
		requestAnimationFrame(() => lenis?.resize());
	});
}

/* ---------------------------------------------------------------------- */
/* Back to top and same-page hash links, through Lenis.                    */
/* ---------------------------------------------------------------------- */
function bindScrollLinks() {
	document.addEventListener(
		'click',
		(e) => {
			const me = e as MouseEvent;
			if (me.button !== 0 || me.metaKey || me.ctrlKey || me.shiftKey || me.altKey) return;
			const link = (e.target as Element).closest?.<HTMLAnchorElement>('a[href*="#"]');
			if (!link || link.target === '_blank') return;
			const url = new URL(link.href, location.href);
			if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;

			e.preventDefault();
			e.stopPropagation();
			if (url.hash === '#top') {
				if (lenis) lenis.scrollTo(0, { duration: 1.6 });
				else window.scrollTo({ top: 0 });
				return;
			}
			const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
			if (!target) return;
			history.pushState(null, '', url.hash);
			const top = target.getBoundingClientRect().top + window.scrollY - headerOffset();
			if (lenis) lenis.scrollTo(Math.max(0, top), { duration: 1.4 });
			else window.scrollTo({ top: Math.max(0, top) });
		},
		true,
	);
}

/* ---------------------------------------------------------------------- */
/* Montreal clock: every [data-clock] shows the time in Montreal.          */
/* ---------------------------------------------------------------------- */
function bindClock() {
	const format = (lang: string) =>
		new Intl.DateTimeFormat(lang, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Toronto' });
	const tick = () => {
		const lang = root.lang || 'fr-CA';
		const time = format(lang).format(new Date());
		document.querySelectorAll<HTMLElement>('[data-clock]').forEach((el) => {
			if (el.textContent !== time) el.textContent = time;
		});
	};
	tick();
	window.setInterval(tick, 15_000);
	document.addEventListener('af:page', tick);
}

export function bindUi() {
	bindHeader();
	bindAccordion();
	bindScrollLinks();
	bindClock();
}
