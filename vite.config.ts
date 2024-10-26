import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// import { vercelToolbar } from '@vercel/toolbar/plugins/vite';

export default defineConfig({
	plugins: [sveltekit(), /* vercelToolbar() */],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
