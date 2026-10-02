/*
  Every fact about Andrés that the site states, in one place.

  The pages, the JSON-LD and llms.txt all read from here, so a fact cannot
  say one thing on the About page and another in the structured data.
  Assistants repeat what they find, so nothing goes in this file unless
  Andrés confirmed it. The record of what he confirmed, and when, is
  card AF-02 (client andres-flores, project AF).

  Deliberately absent (Andrés, 2026-10-02). scripts/check-copy.mjs fails the
  build if any of these reach a page:
  - Profiles other than the four in PROFILES (he does not want them listed).
  - Carte Blanche's other cofounders. Not named for now.
  - Behind-the-scenes of how the agency runs. AI is described only the way
    `aiLine` says it.
*/
import type { Locale } from '../i18n/config';

type L = Record<Locale, string>;

export const PERSON = {
	name: 'Andrés Flores',
	alternateName: 'Andres Flores',
	givenName: 'Andrés',
	familyName: 'Flores',
	email: 'info@andresflores.ca',
	city: { fr: 'Montréal', en: 'Montreal' } satisfies L,
	region: 'QC',
	country: 'CA',
	since: 2015,
	/** Languages he works in. Only confirmed ones (AF-02). */
	languages: [
		{ code: 'fr', name: { fr: 'Français', en: 'French' } },
		{ code: 'en', name: { fr: 'Anglais', en: 'English' } },
	],
	jobTitle: { fr: 'Entrepreneur et développeur web', en: 'Entrepreneur and web developer' } satisfies L,
	/** The one line. Approved by Andrés in AF-02. */
	oneLine: {
		fr: "Andrés Flores est un entrepreneur et développeur web montréalais. Il dirige l'Agence Flores, a cofondé Carte Blanche et bâtit sur le web depuis 2015.",
		en: 'Andrés Flores is a Montreal entrepreneur and web developer. He runs Agence Flores, cofounded Carte Blanche and has been building on the web since 2015.',
	} satisfies L,
	/** How open to be about AI. Approved by Andrés in AF-02. */
	aiLine: {
		fr: "Il utilise l'IA dans son propre travail et aide ses clients à l'adopter, en formant leurs équipes ou en l'implantant dans leur entreprise et leurs outils.",
		en: 'He uses AI in his own work and helps his clients adopt it, by training their teams or by implementing it in their business and their tools.',
	} satisfies L,
	knowsAbout: {
		fr: [
			'Développement web',
			'Design web',
			'Développement front-end',
			'Astro',
			'Nuxt',
			'WordPress',
			'Intelligence artificielle en entreprise',
			'Formation en IA',
			'Implantation de l’IA',
		],
		en: [
			'Web development',
			'Web design',
			'Front-end development',
			'Astro',
			'Nuxt',
			'WordPress',
			'Artificial intelligence for business',
			'AI training',
			'AI implementation',
		],
	},
} as const;

/** The profiles he confirmed (AF-02). Order is the order shown. */
export const PROFILES = [
	{ key: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/andres-flores-64538ba2/' },
	{ key: 'github', label: 'GitHub', url: 'https://github.com/andresfloresdev' },
	{ key: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/theandresflores/' },
	{ key: 'x', label: 'X', url: 'https://x.com/andresfloresdev' },
] as const;

/** His page on the agency site. Part of sameAs: it is about the same person. */
export const AGENCY_PROFILE_URL = 'https://floresagency.ca/equipe/andres-flores/';

export const AGENCY = {
	name: 'Agence Flores',
	alternateName: 'Flores Agency',
	url: 'https://floresagency.ca/',
	/*
	  The id the agency site will use for itself (AF-11 adds the same node
	  there). Both sites then describe one organization, not two.
	*/
	id: 'https://floresagency.ca/#organization',
	founded: 2022,
	what: {
		fr: "Une agence web montréalaise. Elle conçoit et développe des sites web, rédige du contenu et bâtit des marques pour les entreprises d'ici.",
		en: 'A Montreal web agency. It designs and builds websites, writes content and builds brands for local businesses.',
	} satisfies L,
} as const;

export const CARTE_BLANCHE = {
	name: 'Carte Blanche',
	/** No domain yet (AF-13). The node has no url until it launches. */
	url: '',
	founded: 2026,
	what: {
		fr: "Des séances privées, en personne à Montréal, pour les entrepreneurs qui veulent comprendre l'IA et l'implanter dans leur entreprise.",
		en: 'Private, in-person sessions in Montreal for entrepreneurs who want to understand AI and put it to work in their business.',
	} satisfies L,
} as const;

/** His mentor at 2 Associés. Named with care: Hugues died in 2021. */
export const MENTOR = {
	name: 'Hugues Brunelle',
	url: 'https://huguesbrunelle.com/',
} as const;

/*
  The journey, oldest first. `when` is shown as written. Years are only
  given where Andrés gave them; the stage and the 2 Associés years are not
  dated on purpose.
*/
export const JOURNEY = [
	{
		key: 'start',
		when: { fr: '2015', en: '2015' },
		year: 2015,
		title: { fr: 'Les débuts', en: 'The start' },
		body: {
			fr: "Je commence la pige pendant mes études. Mon premier client est un ami d'un de mes professeurs. Des cours de programmation me lancent, puis j'apprends par moi-même avec YouTube, Udemy et beaucoup de projets.",
			en: 'I start freelancing while at university. My first client is a friend of one of my teachers. Programming classes get me going, then I teach myself with YouTube, Udemy and a lot of projects.',
		},
	},
	{
		key: 'okidoo',
		when: { fr: 'Stage', en: 'Internship' },
		year: null,
		title: { fr: 'Okidoo', en: 'Okidoo' },
		body: {
			fr: 'Mon stage en agence web, chez Okidoo.',
			en: 'My internship at a web agency, Okidoo.',
		},
	},
	{
		key: 'deux-associes',
		when: { fr: 'Pige', en: 'Freelance' },
		year: null,
		title: { fr: '2 Associés', en: '2 Associés' },
		body: {
			fr: "Le gros de ma carrière de pigiste. J'y travaille, j'y apprends et j'y suis guidé par Hugues Brunelle, mon mentor, décédé en 2021.",
			en: 'Most of my freelance career. I work, learn and get mentored there by Hugues Brunelle, who passed away in 2021.',
		},
		link: MENTOR,
	},
	{
		key: 'stm',
		when: { fr: '2020 à 2022', en: '2020 to 2022' },
		year: 2020,
		title: { fr: 'STM', en: 'STM' },
		body: {
			fr: 'Développeur front-end à la Société de transport de Montréal, comme consultant.',
			en: 'Front-end developer at the Société de transport de Montréal, as a consultant.',
		},
	},
	{
		key: 'agency',
		when: { fr: '2022', en: '2022' },
		year: 2022,
		title: { fr: 'Agence Flores', en: 'Agence Flores' },
		body: {
			fr: "Je lance officiellement mon agence web à Montréal.",
			en: 'I officially launch my web agency in Montreal.',
		},
		link: { name: 'floresagency.ca', url: AGENCY.url },
	},
	{
		key: 'carte-blanche',
		when: { fr: '2026', en: '2026' },
		year: 2026,
		title: { fr: 'Carte Blanche', en: 'Carte Blanche' },
		body: {
			fr: "Je cofonde Carte Blanche, des séances pour aider les entrepreneurs à adopter l'IA.",
			en: 'I cofound Carte Blanche, sessions that help entrepreneurs adopt AI.',
		},
	},
] as const;

/*
  Brands he worked on as a freelancer for agencies, then as a consultant.
  Named only, never with results: client results need the client's OK (AF-12).
*/
export const CLIENTS = ['DavidsTea', 'CNESST', 'DuProprio', 'Laura Canada', 'Fizik', 'Yu Centrik', 'STM'] as const;

/** Law 25. Andrés is his own privacy officer. */
export const PRIVACY = {
	officer: {
		name: 'Andrés Flores',
		title: { fr: 'Responsable de la protection des renseignements personnels', en: 'Privacy officer' } satisfies L,
		email: 'info@andresflores.ca',
	},
	dataResidency: 'Quebec, Canada',
} as const;

/*
  Analytics is off: no script, no consent banner. Setting scriptUrl brings
  the banner back (src/components/ConsentBanner.astro) and the privacy policy
  must then name the provider.
*/
export const ANALYTICS = {
	scriptUrl: '',
	dataDomain: '',
} as const;
