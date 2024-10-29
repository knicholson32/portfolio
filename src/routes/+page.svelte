<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { onMount } from "svelte";

  let myWords: Promise<[string, string]> = new Promise((_resolve, _reject) => {  });
  const getWords = async () => {
    myWords = new Promise((_resolve, _reject) => {  });
    myWords = (await fetch('https://random-word-api.herokuapp.com/word?number=2')).json() as unknown as Promise<[string, string]>;
  }

  export let data;

  onMount(() => {
    getWords();
  });

</script>

<h1>Welcome to SvelteKit!</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<p>Rendered on: {data.renderDate}</p>


<div class="inline-flex gap-2 items-center">
  <Button onClick={getWords} label="New Words" backgroundColor="#ffffff" />
  {#each data.words as word}
    <span>{word}</span>
  {/each}

  {#await myWords}
    <span class="text-xs text-gray-500 italic lowercase">Loading</span>
  {:then words} 
    {#each words as word}
      <span class="animate-bounce">{word}</span>
    {/each}
  {/await}
</div>