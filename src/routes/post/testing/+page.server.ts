// import myGlobalState from "$lib/data/state.svelte";

import { loadMeta } from "$lib/server/meta/index.js";


export const load = async ({ fetch, route }) => {

  // myGlobalState.posts.push({
  //   slugs: ['testing'],
  //   meta: {
  //     title: 'title!',
  //     description: 'des',
  //   }
  // });

  const getWords = async (): Promise<[string, string]> => {
    return await (await fetch('https://random-word-api.herokuapp.com/word?number=2')).json() as [string, string];
  }

  const myFunction = async () => {
    return new Date().toISOString();
  }

  return {
    renderDate: await myFunction(),
    words: await getWords(),
    meta: loadMeta(route.id)
  }
}