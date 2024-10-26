const delay = (amt: number) => new Promise(resolve => setTimeout(resolve, amt));


export const load = async ({ fetch, params, parent, url }) => {

  const myFunction = async () => {
    await delay(1001);
    console.log('RENDERED');
    return new Date().toISOString();
  }

  return {
    renderDate: await myFunction()
  }
}