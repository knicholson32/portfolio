<script lang="ts">
  import type { Snippet } from "svelte";
	let { href, target = '_blank', children }: { href: string, target?: '_blank' | '_parent' | '_self' | '_top', children: Snippet } = $props();
</script>

<a {href} {target} class="text-purple-400 underline decoration-white font-medium font-sans inline-flex items-center">
  {@render children()}
</a>