<script lang="ts">
  import type { Snippet } from "svelte";
	let { children }: { children: Snippet } = $props();
</script>

<h1 class="text-3xl ">
  {@render children()}
</h1>