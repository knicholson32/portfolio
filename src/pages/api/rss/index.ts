// @see https://github.com/delucis/astro-blog-full-text-rss/?tab=readme-ov-file


import { getContainerRenderer as MDXRenderer } from "@astrojs/mdx";
import { getContainerRenderer as svelteRenderer } from "@astrojs/svelte";
import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getCollection, type CollectionEntry, render } from "astro:content";
import { transform, walk } from "ultrahtml";
import sanitize from "ultrahtml/transformers/sanitize";
import { SITE_DESCRIPTION, SITE_TITLE } from "@consts";

export async function GET(context: APIContext) {
	// Get the URL to prepend to relative site links. Based on `site` in `astro.config.mjs`.
	let baseUrl = context.site?.href || "https://example.com";
	if (baseUrl.at(-1) === "/") baseUrl = baseUrl.slice(0, -1);

	// Load MDX renderer. Other renderers for UI frameworks (e.g. React, Vue, etc.) would need adding here if you were using those.
	const renderers = await loadRenderers([MDXRenderer(), svelteRenderer()]);

	// Create a new Astro container that we can render components with.
	// See https://docs.astro.build/en/reference/container-reference/
	const container = await AstroContainer.create({ renderers: renderers });

	// Load the content collection entries to add to our RSS feed.
	const posts: CollectionEntry<'post'>[] = (await getCollection("post")).sort((a: CollectionEntry<'post'>, b: CollectionEntry<'post'>) =>
		// Sort by publication date descending.
		a.data.pubDate > b.data.pubDate ? -1 : 1
	);

	// Loop over blog posts to create feed items for each, including full content.
	const feedItems: RSSFeedItem[] = [];
	for (const p of posts) {
		const post = p as CollectionEntry<'post'>;
		// Get the `<Content/>` component for the current post.
		post.body = post.body?.replace('client:idle', '') ?? '';
		try {
			const { Content } = await render(post);
			// Use the Astro container to render the content to a string.

			const rawContent = await container.renderToString(Content);
			// Process and sanitize the raw content:
			// - Removes `<!DOCTYPE html>` preamble
			// - Makes link `href` and image `src` attributes absolute instead of relative
			// - Strips any `<script>` and `<style>` tags
			// Thanks @Princesseuh — https://github.com/Princesseuh/erika.florist/blob/1827288c14681490fa301400bfd815acb53463e9/src/middleware.ts
			let coverImage: string;
			if (process.env.NODE_ENV === 'production') coverImage = `<img src="${baseUrl}${post.data.image.img.src}" alt="Cover image">`;
			else coverImage = `<img src="${baseUrl}/_image?href=${encodeURIComponent(post.data.image.img.src)}" alt="Cover image">`;
			const content = coverImage + await transform(rawContent.replace(/^<!DOCTYPE html>/, ''), [
				async (node) => {
					await walk(node, (node) => {
						if (node.name === "a" && node.attributes.href?.startsWith("/")) {
							node.attributes.href = baseUrl + node.attributes.href;
						}
						if (node.name === "img" && node.attributes.src?.startsWith("/")) {
							node.attributes.src = baseUrl + node.attributes.src;
						}
					});
					return node;
				},
				sanitize({ dropElements: ["script", "style"] }),
			]);
			
			feedItems.push({ ...post.data, link: `/post/${post.id}/`, content });
		} catch(e) {
			feedItems.push({ ...post.data, link: `/post/${post.id}/`, content: `<p>${post.data.description}</p><p>This post contains Javascript components that cannot be rendered here. Please <a href="${baseUrl}/post/${post.id}">visit the post</a> to continue reading.</p>`});
			console.log(e);
		}
	}
	
	// Return our RSS feed XML response.
	return rss({
		// stylesheet: '/rss/pretty-feed-v3.xsl',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: baseUrl,
		items: feedItems,
	});
}