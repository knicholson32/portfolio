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
		image: z.object({
			img: image().refine((img) => img.width >= 1080, {
				message: "Cover image must be at least 1080 pixels wide!",
			}),
			alt: z.string(),
			aspect: z.number().optional()
		}),
		repo: z.union([
			z.string(),
			z.object({
				user: z.string(),
				repo: z.string()
			})
		]).optional(),
		tags: z.array(z.string()).optional(),
		related: z.array(z.string()).optional(),
		minutesRead: z.string().optional()
	}),
});

const project = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// heroImage: z.string().optional(),
		image: z.object({
			img: image().refine((img) => img.width >= 1080, {
				message: "Cover image must be at least 1080 pixels wide!",
			}),
			alt: z.string(),
			aspect: z.number().optional()
		}).optional(),
		repo: z.union([
			z.string(),
			z.object({
				user: z.string(),
				repo: z.string()
			})
		]).optional(),
		project: z.union([
			z.string(),
			z.object({
				id: z.string(),
				useAsProjectPage: z.boolean()
			})
		]).optional(),
		chapter: z.union([
			z.string(),
			z.object({
				id: z.string(),
				order: z.number()
			})
		]).optional(),
		tags: z.array(z.string()).optional(),
		related: z.array(z.string()).optional(),
		minutesRead: z.string().optional()
	}),
});



export const collections = { 
	post,
	project
};
