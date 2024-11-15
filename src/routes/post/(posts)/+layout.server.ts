import { getFrontmatter } from '$lib/server/posts';

export const prerender = true;

export const load = async ({ route }) => {
  // Get the slug by only the string after '(content)/' the last
  const slug = route.id.substring(route.id.indexOf('(content)/') + 10);

  return {
    frontmatter: await getFrontmatter(slug, 'post'),
    slug,
    renderDateString: new Date().toISOString()
  }
}