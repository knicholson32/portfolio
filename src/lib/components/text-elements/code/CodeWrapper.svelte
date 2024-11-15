<script lang="ts">

  import type { Snippet } from "svelte";
	let { children }: { children: Snippet } = $props();

</script>

<div class="rounded-lg overflow-hidden">
  {@render children()}
</div>

