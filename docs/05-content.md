# Content

## Collection

One collection, `blog`, defined in `src/content.config.ts`:

```ts
loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
schema: ({ image }) => z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	heroImage: z.optional(image()),
	translationKey: z.string(),
}),
```

## Layout on disk

```text
src/content/blog/
├── en/
│   ├── hello-world.md          translationKey: hello-world
│   └── second-post.md          translationKey: untranslated-example
└── fr/
    └── bonjour-le-monde.md     translationKey: hello-world
```

Because the glob's `base` is the collection root, entry ids include the folder: `en/hello-world`. `parsePostId()` splits that into `{ locale, slug }`.

The slug is the **file name**, so a post's URL segment is independent per language — `/en/blog/hello-world/` and `/fr/blogue/bonjour-le-monde/` are the same post.

Hero image paths are relative to the Markdown file, so from `blog/<locale>/` that is `../../../assets/placeholder.jpg`.

## `translationKey`

Required, and the mechanism that makes translated slugs workable.

Since the two files have different names and different URLs, nothing structural connects them. `translationKey` is the shared id that does:

- the language switcher uses it to jump between a post and its translation
- `getAlternates()` uses it to emit correct `hreflang` pairs
- the router uses it to report which posts are missing a language

Reuse the same value across every language of a post. It never appears in a URL, so it can be anything stable — the English slug is a reasonable convention.

A post whose `translationKey` has no counterpart in another language simply does not exist there. See [04-internationalization.md](04-internationalization.md).

## Per-language listing

`views/BlogIndex.astro` filters to the current locale:

```ts
const posts = (await getCollection('blog'))
	.map((post) => ({ post, parsed: parsePostId(post.id) }))
	.filter((item) => item.parsed?.locale === locale)
	.sort((a, b) => b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf());
```

Newest first. When a language has no posts, `t('blog.empty')` renders instead of an empty grid.

## Feeds

`src/pages/[lang]/rss.xml.js` generates one feed per language via its own `getStaticPaths()` over `LOCALE_KEYS` — `/en/rss.xml` and `/fr/rss.xml`.

Each feed contains only that language's posts, builds links from the manifest's blog segment, and sets `<language>`. `BaseHead` points at the current language's feed.

Verified: with two English posts and one French, the English feed has 2 items and the French feed 1.

## MDX

`@astrojs/mdx` is installed. Rename a post to `.mdx` to import components inside it. The glob already matches both extensions.

## Post rendering

`views/BlogPost.astro` calls `render(post)` and drops `<Content />` into `class="prose prose-post"`. See [03-styling.md](03-styling.md) for the typography adjustments that applies.
