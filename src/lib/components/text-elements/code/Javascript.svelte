<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import '$lib/assets/css/atom-one-dark.min.css';
  import CodeWrapper from "./CodeWrapper.svelte";

  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';

  // Then register the languages you need
  hljs.registerLanguage('javascript', javascript);

	let { children }: { children: Snippet } = $props();
  let container: HTMLElement;
  
  // TODO: Prerender this somehow?
  onMount(() => {
    hljs.highlightElement(container);
  });

</script>

<CodeWrapper>
  <pre class="javascript"><code class="hljs" bind:this={container}>{@render children()}</code></pre>
</CodeWrapper>

