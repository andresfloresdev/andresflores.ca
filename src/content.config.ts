import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Posts live in src/content/blog/<locale>/, so the entry id is
	// e.g. `en/hello-world`. A post exists in a language only if a file
	// exists in that language's folder.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Shared id that links a post to its translations. Posts in different
			// languages with the same translationKey are treated as the same post,
			// which is what lets the language switcher jump between them.
			translationKey: z.string(),
		}),
});

const legal = defineCollection({
	// Legal documents live in src/content/legal/<locale>/, so the entry id is
	// e.g. `en/privacy`. A document exists in a language only if a file
	// exists in that language's folder.
	loader: glob({ base: './src/content/legal', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		lastUpdated: z.coerce.date(),
	}),
});

export const collections = { blog, legal };
