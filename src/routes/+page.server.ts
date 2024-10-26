import { showDashboard } from '$lib/flags';

const delay = (amt: number) => new Promise(resolve => setTimeout(resolve, amt));


export const load = async ({ fetch, params, parent, url }) => {

  const dashboard = await showDashboard();

  const myFunction = async () => {
    await delay(1001);
    console.log('RENDERED');
    return new Date().toISOString();
  }

  return {
    renderDate: await myFunction(),
    dashboard
  }
}