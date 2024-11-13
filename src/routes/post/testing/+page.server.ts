// import myGlobalState from "$lib/data/state.svelte";


export const load = async ({ fetch, route, parent }) => {

  // myGlobalState.posts.push({
  //   slugs: ['testing'],
  //   meta: {
  //     title: 'title!',
  //     description: 'des',
  //   }
  // });

  const data = await parent();

  const getWords = async (): Promise<[string, string]> => {
    return await (await fetch('https://random-word-api.herokuapp.com/word?number=2')).json() as [string, string];
  }

  const myFunction = async () => {
    return new Date().toISOString();
  }

  return {
    renderDate: await myFunction(),
    words: await getWords(),
    meta: data.postMeta.posts[route.id.replace('/post/', '')]
  }
}