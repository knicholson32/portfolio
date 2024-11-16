import { defineCollection, z } from 'astro:content';

const post = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// heroImage: z.string().optional(),
		heroImage: image().refine((img) => img.width >= 1080, {
			message: "Cover image must be at least 1080 pixels wide!",
		}),
		// coverAlt: z.string(),
		aspect: z.number().optional()
	}),
});

export const collections = { post };
