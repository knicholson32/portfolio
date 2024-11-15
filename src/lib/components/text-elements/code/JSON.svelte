<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import '$lib/assets/css/atom-one-dark.min.css';
  import CodeWrapper from "./CodeWrapper.svelte";

  import hljs from 'highlight.js/lib/core';
  import json from 'highlight.js/lib/languages/json';

  // Then register the languages you need
  hljs.registerLanguage('json', json);

	let { children }: { children: Snippet } = $props();
  let container: HTMLElement;
  
  // TODO: Prerender this somehow?
  onMount(() => {
    hljs.highlightElement(container);
  });

</script>

<CodeWrapper>
  <pre class="json"><code class="hljs" bind:this={container}>{@render children()}</code></pre>
</CodeWrapper>

