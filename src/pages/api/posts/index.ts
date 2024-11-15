import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('post');
  return new Response(JSON.stringify(posts), { status: 200 });
}
