/*
  Page copy, French. This file is canonical: en.ts is type-checked against
  its shape. Every string passes through `nb` at load (src/i18n/copy/index.ts).

  Voice (Andrés's rules, enforced in part by scripts/check-copy.mjs):
  - No em dashes. No colons unless listing items. No "not X, but Y".
  - Short sentences, real specifics, French uses "tu".
  - Facts only from src/config/site.ts (confirmed on card AF-02).

  *Asterisks* mark the quiet half of a headline (serif italic, src/lib/rich.ts).
*/

export const fr = {
	home: {
		hero: {
			kicker: 'Entrepreneur et développeur web',
			place: 'Montréal, Québec',
			since: 'Sur le web depuis 2015',
			portraitAlt: "Portrait d'Andrés Flores, souriant, lunettes et chandail noir, sur fond gris-bleu",
			scroll: 'Défiler',
		},
		statement: {
			label: 'En bref',
			text: "Des sites, des marques, des outils. Depuis 2015, je bâtis sur le web et j'adore ça. Aujourd'hui, je dirige l'Agence Flores, je cofonde Carte Blanche et j'aide les entreprises d'ici à mettre l'IA au travail.",
		},
		ventures: {
			label: 'Ce que je mène',
			title: 'Une agence, *une communauté.*',
			agency: {
				meta: 'Fondateur, depuis 2022',
				body: "Mon agence web à Montréal. On conçoit et développe des sites, on rédige le contenu et on bâtit des marques pour les entreprises d'ici.",
				cta: 'floresagency.ca',
			},
			carteBlanche: {
				meta: 'Cofondateur, depuis 2026',
				body: "Des séances privées, en personne à Montréal, pour les entrepreneurs qui veulent comprendre l'IA et l'implanter dans leur entreprise.",
				cta: 'Site à venir',
			},
		},
		journey: {
			label: 'Parcours',
			title: "Le chemin *jusqu'ici.*",
			undated: 'Sans date',
		},
		brands: {
			label: 'Marques',
			text: "Des marques et des organisations sur lesquelles j'ai travaillé, à la pige pour des agences puis comme consultant.",
		},
		ai: {
			label: "L'IA",
			title: "L'IA fait partie *de mon travail.*",
			lead: "J'utilise l'IA dans mon propre travail et j'aide mes clients à l'adopter, en formant leurs équipes ou en l'implantant dans leur entreprise et leurs outils.",
			rows: [
				{ title: 'Pour moi', body: "Je m'en sers chaque jour, du design au code." },
				{ title: 'Former les équipes', body: "Je montre aux équipes comment se servir des outils d'IA dans leur travail de tous les jours." },
				{ title: "Implanter l'IA", body: "J'intègre l'IA dans l'entreprise et dans les outils qu'elle utilise déjà." },
			],
		},
		about: {
			label: 'À propos',
			title: "L'histoire au complet, *sur une seule page.*",
			cta: 'Lire la suite',
		},
	},

	about: {
		hero: {
			label: 'À propos',
			title: 'Andrés Flores',
			portraitAlt: "Portrait d'Andrés Flores, souriant, lunettes et chandail noir, sur fond gris-bleu",
		},
		facts: {
			label: 'En faits',
			based: 'Basé à',
			basedValue: 'Montréal, Québec',
			does: 'Ce qu’il fait',
			since: 'Sur le web depuis',
			runs: 'Dirige',
			runsValue: "l'Agence Flores, fondée en 2022",
			cofounded: 'A cofondé',
			cofoundedValue: 'Carte Blanche, en 2026',
			ai: "L'IA",
			aiValue: 'Formation et implantation pour les entreprises',
			languages: 'Langues',
			elsewhere: 'Ailleurs',
			email: 'Courriel',
		},
		story: {
			label: 'Mon histoire',
			title: 'Depuis 2015, *un projet à la fois.*',
			paragraphs: [
				"J'ai commencé à faire du web en 2015, pendant mes études. Mon premier client était un ami d'un de mes professeurs. Je venais de m'inscrire à des cours de programmation pour lancer mon apprentissage. Le reste, je l'ai appris par moi-même, avec YouTube, Udemy et surtout beaucoup de projets, les miens et ceux de mes clients.",
				"Il y a eu mes propres clients, un stage chez Okidoo, puis la pige pour plusieurs agences. J'ai passé la plus grande partie de ma carrière chez 2 Associés. J'y ai travaillé, appris et été guidé par mon mentor, Hugues Brunelle, décédé en 2021.",
				"Toujours à la pige, j'ai travaillé sur des marques comme DavidsTea, la CNESST, DuProprio, Laura Canada, Fizik et Yu Centrik. J'ai ensuite essayé la consultation. De 2020 à 2022, j'ai été développeur front-end à la Société de transport de Montréal.",
				"En 2022, j'ai lancé officiellement l'Agence Flores. On conçoit et développe des sites web, on rédige du contenu et on bâtit des marques pour les entreprises d'ici.",
				"En 2026, j'ai cofondé Carte Blanche, des séances privées à Montréal pour les entrepreneurs qui veulent comprendre l'IA et l'implanter dans leur entreprise.",
				"L'IA fait partie de mon travail de tous les jours. Je m'en sers moi-même, et j'aide mes clients à l'adopter, en formant leurs équipes ou en l'implantant dans leur entreprise et leurs outils.",
				"Depuis 2015, une chose n'a pas bougé. J'aime bâtir sur le web.",
			],
			mentorLink: 'Le site de Hugues',
		},
		faq: {
			label: 'Questions',
			title: 'En quelques *questions.*',
			items: [
				{
					q: 'Qui est Andrés Flores?',
					a: "Andrés Flores est un entrepreneur et développeur web montréalais. Il dirige l'Agence Flores, a cofondé Carte Blanche et bâtit sur le web depuis 2015.",
				},
				{
					q: "Qu'est-ce que l'Agence Flores?",
					a: "Une agence web montréalaise fondée par Andrés Flores en 2022. Elle conçoit et développe des sites web, rédige du contenu et bâtit des marques pour les entreprises d'ici.",
				},
				{
					q: "Qu'est-ce que Carte Blanche?",
					a: "Des séances privées, en personne à Montréal, pour les entrepreneurs qui veulent comprendre l'IA et l'implanter dans leur entreprise. Andrés Flores l'a cofondée en 2026.",
				},
				{
					q: "Comment Andrés Flores travaille-t-il avec l'IA?",
					a: "Il utilise l'IA dans son propre travail et aide ses clients à l'adopter, en formant leurs équipes ou en l'implantant dans leur entreprise et leurs outils.",
				},
				{
					q: 'Quel est son parcours?',
					a: "Il commence la pige en 2015, pendant ses études. Il fait un stage chez Okidoo, puis passe la plus grande partie de sa carrière de pigiste chez 2 Associés, guidé par son mentor Hugues Brunelle. De 2020 à 2022, il est développeur front-end à la Société de transport de Montréal. Il lance l'Agence Flores en 2022.",
				},
				{
					q: 'Où est-il basé, et dans quelles langues travaille-t-il?',
					a: 'À Montréal. Il travaille en français et en anglais.',
				},
				{
					q: 'Comment le joindre?',
					a: 'Par courriel, à info@andresflores.ca.',
				},
			],
		},
	},

	contact: {
		label: 'Contact',
		title: 'Un projet, une idée, *une question?*',
		body: 'Écris-moi, je te réponds.',
	},
};

/* Every leaf string widened, so en.ts can say different things in the same shape. */
type Widen<T> = T extends string ? string : T extends readonly (infer U)[] ? Widen<U>[] : { [K in keyof T]: Widen<T[K]> };

export type PageCopy = Widen<typeof fr>;
