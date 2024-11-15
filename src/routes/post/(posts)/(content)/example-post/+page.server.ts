// import { loadPosts } from '$lib/server/meta';

export const prerender = true;

export const load = async () => {

  // const postMeta = await loadPosts();

  return {
    postMeta: 'test',
    myPageRenderDate: new Date().toISOString()
  }
}