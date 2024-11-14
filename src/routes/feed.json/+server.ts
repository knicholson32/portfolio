import type Feed from '@json-feed-types/1_1'
import type { Item } from '@json-feed-types/1_1'
import { PUBLIC_URL } from '$env/static/public';
import { loadPosts } from '$lib/server/meta';
import { keenanrnicholson } from '$lib/types/meta/authors';

export const prerender = true;

export const GET = async () => {
  
  // const postMeta = loadPosts();



  // for (let i = 0; i < postMeta.sortOrder.length; i++) {
  //   const slug = postMeta.sortOrder[i];
  //   const post = postMeta.posts[slug].item;
  //   if (post.author === undefined) post.author = keenanrnicholson;
  //   post.url = `${PUBLIC_URL}/post/${post.url}`;
  //   items.push(post as Item);
  //   if (post.image !== undefined && !post.image.startsWith('http')) {
  //     post.image = `${PUBLIC_URL}/${post.image.replace(/^\/|\/$/g, '')}`;
  //   }
  // }
  

  



  // const res = await getPageContent('/src/routes/_content/posts/2024-11-post-testing-portfolio/index.md');

  const posts = await loadPosts();

  console.log(posts);

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
    const post = posts.posts[slug].frontmatter;
    const html = posts.posts[slug].content;
    const item: Item = {
      id: slug,
      url: `${PUBLIC_URL}/post/${slug}`,
      image: !post.image.src.startsWith('http') ? `${PUBLIC_URL}/${post.image.src.replace(/^\/|\/$/g, '')}` : post.image.src,
      content_html: html,
      author: keenanrnicholson
    };
    // if (post.author === undefined) post.author = keenanrnicholson;
    // post.url = `${PUBLIC_URL}/post/${post.url}`;
    // if (post.image !== undefined && !post.image.startsWith('http')) {
    //   post.image = `${PUBLIC_URL}/${post.image.replace(/^\/|\/$/g, '')}`;
    // }
    items.push(item);
  }

  return new Response(JSON.stringify(feed), { status: 200, statusText: 'OK', headers });

};
