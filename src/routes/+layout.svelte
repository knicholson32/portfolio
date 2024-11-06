<script lang="ts">
	import '../app.css';
	// import global from '$lib/data/state.svelte';

	let { children } = $props();
</script>



{@render children?.()}
