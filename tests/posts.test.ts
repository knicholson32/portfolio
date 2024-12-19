import { SITE_TITLE } from '@consts';
import { expect, test } from '@playwright/test';
import type { CollectionEntry } from 'astro:content';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.title()).toBe('Main | ' + SITE_TITLE);
});


const posts = await (await fetch('http://localhost:4321/api/posts')).json() as CollectionEntry<'post'>[];

for (const post of posts) {
	const id = post.id;
	test(`Expect post '${post.data.title} -> ${id}' to load`, async ({ page }) => {
		const response = await page.goto(`/post/${id}`);
		expect(response).not.toBe(null);
		expect(response?.status()).toBe(200);
		expect(await page.title()).toBe(post.data.title + ' | ' + SITE_TITLE);
	});
}