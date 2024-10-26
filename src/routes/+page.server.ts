const delay = (amt: number) => new Promise(resolve => setTimeout(resolve, amt));


export const load = async ({ fetch, params, parent, url }) => {

  const myFunction = async () => {
    await delay(1000);
    return new Date();
  }

  return {
    renderDate: await myFunction()
  }
}