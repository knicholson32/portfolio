import { loadPosts } from '$lib/server/meta';


export const load = async () => {

  const postMeta = await loadPosts();

  return {
    postMeta
  }
}