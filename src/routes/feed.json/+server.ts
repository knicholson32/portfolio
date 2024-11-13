import type Feed from '@json-feed-types/1_1'
import type { Item } from '@json-feed-types/1_1'
import { PUBLIC_URL } from '$env/static/public';
import { loadPosts } from '$lib/server/meta';
import { keenanrnicholson } from '$lib/types/meta/authors';

export const prerender = true;

export const GET = async () => {
  
  const postMeta = loadPosts();

  const headers: Headers = new Headers();
  headers.append('Content-Type', 'application/feed+json');
  const items: Item[] = [];



  for (let i = 0; i < postMeta.sortOrder.length; i++) {
    const slug = postMeta.sortOrder[i];
    const post = postMeta.posts[slug].item;
    if (post.author === undefined) post.author = keenanrnicholson;
    post.url = `${PUBLIC_URL}/post/${post.url}`;
    items.push(post as Item);
  }
  

  const test = {
    "version": "https://jsonfeed.org/version/1.1",
    "title": "Keenan Nicholson",
    "home_page_url": PUBLIC_URL,
    "feed_url": PUBLIC_URL + '/feed.json',
    "items": items
  } satisfies Feed;


  return new Response(JSON.stringify(test), { status: 200, statusText: 'OK', headers });
};
