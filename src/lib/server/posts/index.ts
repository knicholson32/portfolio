import { getDirectoriesSync } from '$lib/server/helpers';
import { validate, type Schema } from '$lib/types/meta';
import type { FrontmatterFormat } from '$lib/types/meta/generated/frontmatter';
import chalk from 'chalk';
import highlight from 'cli-highlight';

/**
 * Get the frontmatter data from a page. This function is only to be used during server prerendering.
 * @param slug the slug of the page
 * @param type the type of page
 * @returns the frontmatter
 */
export const getFrontmatter = async (slug: string, type: 'post'): Promise<FrontmatterFormat> => {
  // Change the target for this dynamic import based on whether or not this is `pnpm run dev` or `pnpm run build`.
  // This is required because the build changes the file name from '+page.svelte' to '_page.svelte.js' during compilation.
  // Additionally, this function is ran as a compiled component during build prerendering, so we need to properly point
  // to the correct build output folder that contained the build pages during that process.
  let folder, importTarget: string;
  if (process.env.BUILD === 'VITE_BUILD') {
    // We are building the site. The pages are all built and not stored in the original locations
    importTarget = '_page.svelte.js';
    switch (type) {
      default:
      case 'post':
        folder = '../entries/pages/post/(posts)/(content)';
        break;
    }
  } else {
    // We are running `dev`. The pages are all in their un-built locations and states.
    importTarget = '+page.svelte';
    switch (type) {
      default:
      case 'post':
        folder = '/src/routes/post/(posts)/(content)';
        break;
    }
  }

  // Import the page and extract the frontmatter (because it is a module in the file)
  const frontmatter = (await import(/* @vite-ignore */`${folder}/${slug}/${importTarget}`)).frontmatter as FrontmatterFormat;

  // Check that the frontmatter exists
  if (frontmatter === undefined) {
    // It doesn't. Throw an error and suggest a fix.
    throw new Error(`${chalk.gray('No Frontmatter found for slug \'')}${chalk.blue('/' + slug)}${chalk.gray('\'. Include a frontmatter for the post as shown:')}
      
      ${chalk.gray(`<script module lang="ts">`)}${highlight(`
        import type { FrontmatterFormat } from "$lib/types/meta/generated/frontmatter";
        export const frontmatter = {
          title: 'test',
          summary: 'summary',
          image: {
            src: '/my-image.png',
            alt: 'alt text',
          },
          meta: {
            date: [
              '2021-02-25'
            ],
            categories: [
              'code',
              'design'
            ],
            tags: [
              'colors',
              'branding'
            ]
          }
          // ...as required by the spec
        } satisfies FrontmatterFormat;`, { language: 'javascript' })}
      ${chalk.gray(`</script>`)}`);
  }

  // Validate the frontmatter
  if (!validate(frontmatter)) {
    // There are validation errors. Print them and fail.
    throw Error(`Invalid frontmatter format: '${chalk.blue('/' + slug)}':\n\n${validate.errors?.flatMap((e, i) => `${i + 1}. ${chalk.gray(chalk.italic(e.message))} \n`)}`);
  }

  // Return the frontmatter
  return frontmatter;
}

/**
 * Load all posts for the site, and return their frontmatters
 * @returns the posts
 */
export const loadPosts = async (): Promise<{ sortOrder: string[], posts: { [key: string]: Schema.Frontmatter } }> => {
  // Get all posts in the post directory
  const postDirectories = getDirectoriesSync('./src/routes/post/(posts)/(content)/');

  // Initialize the return
  const posts: { [key: string]: Schema.Frontmatter } = {};

  // Initialize a timestamp sorting array
  const timestamps: {slug: string, rfc3339: string}[] = [];

  // Loop through each post
  for (const dir of postDirectories) {
      // Get the frontmatter
      const data = await getFrontmatter(dir, 'post');
      // Assign the frontmatter data to the post
      posts[dir] = data
      // Log the timestamp. This is used to create a sortOrder array for the posts
      timestamps.push({ slug: dir, rfc3339: data.meta.date[0] });
  }

  // Return the sort order and posts
  return {
    sortOrder: (timestamps.sort((a, b) => new Date(a.rfc3339).getTime() - new Date(b.rfc3339).getTime())).flatMap((v) => v.slug),
    posts
  }
}