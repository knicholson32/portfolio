<script lang="ts">
	import '../app.css';
 
  import { mountVercelToolbar } from '@vercel/toolbar/vite';
  import { onMount } from 'svelte';
 
  onMount(() => mountVercelToolbar());
 
	let { children } = $props();
</script>

{@render children()}
