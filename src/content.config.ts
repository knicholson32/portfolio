import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { authors } from '@consts';


const post = defineCollection({
  loader: glob({ pattern: '**/*.[mdx|md]+', base: 'src/content/post' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // heroImage: z.string().optional(),
    image: z.object({
      img: image(),//.refine((img) => { console.log(JSON.stringify(img)); return img.width >= 1080 }, { message: "Cover image must be at least 1080 pixels wide!" }),
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
  loader: glob({ pattern: '**/*.[mdx|md]+', base: 'src/content/project' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().refine((author) => author in authors, 'The author must exist.').optional(),
    // heroImage: z.string().optional(),
    image: z.object({
      img: image(),//.refine((img) => { console.log(JSON.stringify(img)); return img.width >= 1080 }, { message: "Cover image must be at least 1080 pixels wide!" }),
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
    ]),
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


// const probes = defineCollection({
//   // `loader` can accept an array of multiple patterns as well as string patterns
//   // Load all markdown files in the space-probes directory, except for those that start with "voyager-"
//   loader: glob({ pattern: ['*.md'], base: 'src' }),
//   schema: z.object({
//     name: z.string(),
//     type: z.enum(['Space Probe', 'Mars Rover', 'Comet Lander']),
//     launch_date: z.date(),
//     status: z.enum(['Active', 'Inactive', 'Decommissioned']),
//     destination: z.string(),
//     operator: z.string(),
//     notable_discoveries: z.array(z.string()),
//   }),
// });

// export const collections = { probes };