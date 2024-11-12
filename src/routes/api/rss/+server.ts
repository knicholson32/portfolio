// import { json } from '@sveltejs/kit';

export const GET = async () => {

  console.log('GET!');

  return new Response('OK ' + new Date());
};
