// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import { loadEnv } from "vite";
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';


const { PUBLIC_URL } = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_URL,
  integrations: [mdx(), sitemap(), tailwind({
    applyBaseStyles: false
  }), svelte()],
  output: 'static',
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  // output: 'server',
  // adapter: cloudflare(),
});