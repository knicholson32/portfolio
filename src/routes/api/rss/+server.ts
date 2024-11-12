// import { json } from '@sveltejs/kit';

import { loadPosts } from "$lib/server/meta";

export const prerender = true;

export const GET = async () => {
  
  const posts = loadPosts();

  const headers: Headers = new Headers();
  headers.append('Content-Type', 'application/feed+json');

  const test = {
    "version": "https://jsonfeed.org/version/1.1",
    "title": "My Example Feed",
    "home_page_url": "https://example.org/",
    "feed_url": "https://example.org/feed.json",
    "items": [
      {
        "id": "2",
        "content_text": "This is a second item.",
        "url": "https://example.org/second-item"
      },
      {
        "id": "1",
        "content_html": "<p>Hello, world!</p>",
        "url": "https://example.org/initial-post"
      }
    ]
  }


  return new Response(JSON.stringify(test), { status: 200, statusText: 'OK', headers });
};
