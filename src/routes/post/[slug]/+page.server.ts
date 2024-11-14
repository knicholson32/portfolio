import { getDirectoriesSync } from '$lib/server/helpers';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
  const posts = getDirectoriesSync('src/routes/_content/posts/');
  return posts.flatMap((p) => { return { slug: p } });
};

export const prerender = true;