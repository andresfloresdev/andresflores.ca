/*
  Page copy, English. Same shape as fr.ts (canonical), checked by `astro check`.
  Same voice rules: no em dashes, no colons unless listing, no "not X, but Y".
*/
import type { PageCopy } from './fr';

export const en: PageCopy = {
	home: {
		hero: {
			kicker: 'Entrepreneur and web developer',
			place: 'Montreal, Quebec',
			since: 'On the web since 2015',
			portraitAlt: 'Portrait of Andrés Flores, smiling, in glasses and a black t-shirt, on a grey-blue backdrop',
			scroll: 'Scroll',
		},
		statement: {
			label: 'In short',
			text: 'Sites, brands, tools. I have been building on the web since 2015 and I love it. Today I run Agence Flores, cofound Carte Blanche and help local businesses put AI to work.',
		},
		ventures: {
			label: 'What I run',
			title: 'An agency, *a community.*',
			agency: {
				meta: 'Founder, since 2022',
				body: 'My web agency in Montreal. We design and build websites, write the content and build brands for local businesses.',
				cta: 'floresagency.ca',
			},
			carteBlanche: {
				meta: 'Cofounder, since 2026',
				body: 'Private, in-person sessions in Montreal for entrepreneurs who want to understand AI and put it to work in their business.',
				cta: 'Site coming soon',
			},
		},
		journey: {
			label: 'Path',
			title: 'How I *got here.*',
			undated: 'Undated',
		},
		brands: {
			label: 'Brands',
			text: 'Brands and organizations I have worked on, freelancing for agencies and then as a consultant.',
		},
		ai: {
			label: 'AI',
			title: 'AI is part *of how I work.*',
			lead: 'I use AI in my own work and help my clients adopt it, by training their teams or by implementing it in their business and their tools.',
			rows: [
				{ title: 'For myself', body: 'I use it every day, from design to code.' },
				{ title: 'Training teams', body: 'I show teams how to use AI tools in their everyday work.' },
				{ title: 'Implementing AI', body: 'I bring AI into the business and into the tools it already uses.' },
			],
		},
		about: {
			label: 'About',
			title: 'The whole story, *on one page.*',
			cta: 'Read more',
		},
	},

	about: {
		hero: {
			label: 'About',
			title: 'Andrés Flores',
			portraitAlt: 'Portrait of Andrés Flores, smiling, in glasses and a black t-shirt, on a grey-blue backdrop',
		},
		facts: {
			label: 'Facts',
			based: 'Based in',
			basedValue: 'Montreal, Quebec',
			does: 'What he does',
			since: 'On the web since',
			runs: 'Runs',
			runsValue: 'Agence Flores, founded in 2022',
			cofounded: 'Cofounded',
			cofoundedValue: 'Carte Blanche, in 2026',
			ai: 'AI',
			aiValue: 'Training and implementation for businesses',
			languages: 'Languages',
			elsewhere: 'Elsewhere',
			email: 'Email',
		},
		story: {
			label: 'My story',
			title: 'Since 2015, *one project at a time.*',
			paragraphs: [
				'I started doing web work in 2015, while I was at university. My first client was a friend of one of my teachers. I had just signed up for programming classes to get my learning going. The rest I taught myself, with YouTube, Udemy and above all a lot of projects, my own and my clients’.',
				'There were my own clients, an internship at Okidoo, then freelancing for several agencies. I spent most of my career at 2 Associés. I worked, learned and was mentored there by Hugues Brunelle, who passed away in 2021.',
				'Still freelancing, I worked on brands like DavidsTea, CNESST, DuProprio, Laura Canada, Fizik and Yu Centrik. Then I tried consulting. From 2020 to 2022, I was a front-end developer at the Société de transport de Montréal.',
				'In 2022, I officially launched Agence Flores. We design and build websites, write content and build brands for local businesses.',
				'In 2026, I cofounded Carte Blanche, private sessions in Montreal for entrepreneurs who want to understand AI and put it to work in their business.',
				'AI is part of my everyday work. I use it myself, and I help my clients adopt it, by training their teams or by implementing it in their business and their tools.',
				'Since 2015, one thing has stayed the same. I love building on the web.',
			],
			mentorLink: 'Hugues’s website',
		},
		faq: {
			label: 'Questions',
			title: 'A few *questions.*',
			items: [
				{
					q: 'Who is Andrés Flores?',
					a: 'Andrés Flores is a Montreal entrepreneur and web developer. He runs Agence Flores, cofounded Carte Blanche and has been building on the web since 2015.',
				},
				{
					q: 'What is Agence Flores?',
					a: 'A Montreal web agency founded by Andrés Flores in 2022. It designs and builds websites, writes content and builds brands for local businesses.',
				},
				{
					q: 'What is Carte Blanche?',
					a: 'Private, in-person sessions in Montreal for entrepreneurs who want to understand AI and put it to work in their business. Andrés Flores cofounded it in 2026.',
				},
				{
					q: 'How does Andrés Flores work with AI?',
					a: 'He uses AI in his own work and helps his clients adopt it, by training their teams or by implementing it in their business and their tools.',
				},
				{
					q: 'What is his background?',
					a: 'He started freelancing in 2015, while at university. He interned at Okidoo, then spent most of his freelance career at 2 Associés, mentored by Hugues Brunelle. From 2020 to 2022, he was a front-end developer at the Société de transport de Montréal. He launched Agence Flores in 2022.',
				},
				{
					q: 'Where is he based, and which languages does he work in?',
					a: 'In Montreal. He works in French and English.',
				},
				{
					q: 'How do I reach him?',
					a: 'By email, at info@andresflores.ca.',
				},
			],
		},
	},

	contact: {
		label: 'Contact',
		title: 'A project, an idea, *a question?*',
		body: 'Write to me, I will get back to you.',
	},
};
