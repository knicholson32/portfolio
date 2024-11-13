import { expect, test } from '@playwright/test';
import { loadPosts } from '../src/lib/server/meta';


test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(await page.title()).toBe('My Home Page');
});


const posts = loadPosts();

for (const slug of Object.keys(posts.posts)) {
	const post = posts.posts[slug];

	test(`Expect post '${post.item.title} -> ${slug}' to load`, async ({ page }) => {
		const response = await page.goto(`/post/${slug}`);
		expect(response).not.toBe(null);
		expect(response?.status()).toBe(200);
		expect(await page.title()).toBe(post.item.title);
	});
}