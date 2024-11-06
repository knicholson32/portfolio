<script lang="ts">
  import type { Snippet } from "svelte";
	let { children }: { children: Snippet } = $props();
</script>

<p class="">
  {@render children()}
</p>