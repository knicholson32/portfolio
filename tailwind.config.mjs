/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				'xs': '475px',
			},
			// fontFamily: {
			// 	'mono': ['monospace'] // ['"JetBrains Mono"']
			// },
			colors: {
				neutral: {
					925: '#171717'
				},
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
