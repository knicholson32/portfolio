import { loadPosts } from '$lib/server/posts';


export const load = async () => {

  const posts = await loadPosts();

  return {
    posts
  }
}