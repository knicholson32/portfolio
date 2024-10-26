<script lang="ts">
	import '../app.css';
  import { onMount } from 'svelte';
	
  import { mountVercelToolbar } from '@vercel/toolbar/vite';
  onMount(() => mountVercelToolbar());
 
 
	let { children } = $props();
</script>

{@render children()}
