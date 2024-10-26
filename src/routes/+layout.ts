import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { dev } from '$app/environment'; 



export const prerender = true;

injectSpeedInsights();