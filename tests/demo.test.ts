import { expect, test } from '@playwright/test';
import { JSONFeedItem } from '../src/lib/types/meta/generated/jsonfeed';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.title()).toBe('My Home Page');
});


const posts = ((await (await fetch('http://localhost:5173/feed.json')).json()) as { items: JSONFeedItem[] }).items;

for (const post of posts) {
	const slug = post.id.substring(5);
	test(`Expect post '${post.title} -> ${slug}' to load`, async ({ page }) => {
		const response = await page.goto(`/post/${slug}`);
		expect(response).not.toBe(null);
		expect(response?.status()).toBe(200);
		expect(await page.title()).toBe(post.title);
	});
}