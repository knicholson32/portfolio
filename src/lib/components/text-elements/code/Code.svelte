<script lang="ts">
  import CodeWrapper from "./CodeWrapper.svelte";
  import type { Snippet } from "svelte";
	let { children }: { children: Snippet } = $props();

</script>

<CodeWrapper>
  <pre><code class="hljs">{@render children()}</code></pre>
</CodeWrapper>

