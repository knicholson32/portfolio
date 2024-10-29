const delay = (amt: number) => new Promise(resolve => setTimeout(resolve, amt));


export const load = async ({ fetch, params, parent, url }) => {

  const getWords = async (): Promise<[string, string]> => {
    return await (await fetch('https://random-word-api.herokuapp.com/word?number=2')).json() as [string, string];
  }

  const myFunction = async () => {
    return new Date().toISOString();
  }

  return {
    renderDate: await myFunction(),
    words: await getWords()
  }
}