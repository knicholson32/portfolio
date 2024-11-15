import type Feed from '@json-feed-types/1_1'
import type { Item } from '@json-feed-types/1_1'
import { PUBLIC_URL } from '$env/static/public';
import { loadPosts } from '$lib/server/posts';
import { keenanrnicholson } from '$lib/types/meta/authors';
import textVersion from 'textversionjs';

export const prerender = true;

export const GET = async ({ fetch }) => {
  
  const posts = await loadPosts();

  const items: Item[] = [];

  const feed = {
    "version": "https://jsonfeed.org/version/1.1",
    "title": "Keenan Nicholson's Dev Log",
    "home_page_url": PUBLIC_URL,
    "feed_url": PUBLIC_URL + '/feed.json',
    "items": items
  } satisfies Feed;

  const headers: Headers = new Headers();
  headers.append('Content-Type', 'application/feed+json');

  for (let i = 0; i < posts.sortOrder.length; i++) {
    const slug = posts.sortOrder[i];

    
    const post = posts.posts[slug];

    const item: Item = {
      id: 'post/' + slug,
      title: post.title,
      summary: post.summary,
      content_text: textVersion(await (await fetch(`/post/${slug}`)).text(), {}),
      url: `${PUBLIC_URL}/post/${slug}`,
      image: !post.image.url.startsWith('http') ? `${PUBLIC_URL}/${post.image.url.replace(/^\/|\/$/g, '') }` : post.image.url,
      author: keenanrnicholson,
    };
    items.push(item);
  }

  return new Response(JSON.stringify(feed), { status: 200, statusText: 'OK', headers });

};
