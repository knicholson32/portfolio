import { default as auto} from '@sveltejs/adapter-auto';
import { default as cf } from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	extensions: ['.svelte'],
	preprocess: [
		// mdsvex({
		// 	extensions: ['.md'],
		// 	// layout: {
		// 	// 	blog: 'src/layouts/+layout.svelte',
		// 	// 	// lab: 'src/layouts/lab.svelte',
		// 	// 	// styles: 'src/routes/styles/_examples/layout.svelte',
		// 	// 	_: 'src/layouts/+layout.svelte'
		// 	// },
		// 	// layout: 'src/layouts/+layout.svelte'
		// }),
		vitePreprocess()
	],
	kit: {
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore deliberate link to cdn image
				if (path.startsWith('/cdn-cgi/image/')) return;

				// otherwise fail the build
				console.error(message, referrer);
				throw new Error(message);
			}
		},
		adapter: process.env.VITEST ? auto() : cf({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			},
			platformProxy: {
				configPath: 'wrangler.toml',
				environment: undefined,
				experimentalJsonConfig: false,
				persist: false
			}
		})
	}
};

export default config;
