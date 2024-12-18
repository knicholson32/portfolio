/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				'xs': '475px',
			},
			fontSize: {
				xxs: [
					'0.6rem',
					{
						lineHeight: '1rem'
					}
				]
			},
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-10deg)' },
					'50%': { transform: 'rotate(10deg)' },
				}
			},
			animation: {
				wiggle: 'wiggle 0.75s ease-in-out infinite',
			},
			// fontFamily: {
			// 	'mono': ['monospace'] // ['"JetBrains Mono"']
			// },
			colors: {
				neutral: {
					150: '#F0F0F0',
					925: '#171717',
					940: '#121212'
				},
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwind-scrollbar'),
	],
}
