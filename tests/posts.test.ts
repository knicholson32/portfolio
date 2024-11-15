import { expect, test } from '@playwright/test';
import type { CollectionEntry } from 'astro:content';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.title()).toBe('Keenan\'s Devlog');
});


const posts = await (await fetch('http://localhost:4321/api/posts')).json() as CollectionEntry<'post'>[];

for (const post of posts) {
	const slug = post.slug;
	test(`Expect post '${post.data.title} -> ${slug}' to load`, async ({ page }) => {
		const response = await page.goto(`/post/${slug}`);
		expect(response).not.toBe(null);
		expect(response?.status()).toBe(200);
		expect(await page.title()).toBe(post.data.title);
	});
}