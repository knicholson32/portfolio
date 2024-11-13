<script lang="ts">
  import Button from "$lib/components/generic/Button.svelte";
  import { onMount } from "svelte";
  import { P, Span } from '$lib/components/text-elements';

  let myWords: Promise<[string, string]> = $state(new Promise(() => { } ));

  const getWords = async () => {
    myWords = new Promise(() => {  });
    myWords = (await fetch('https://random-word-api.herokuapp.com/word?number=2')).json() as unknown as Promise<[string, string]>;
  }

  let { 
    data: data,
  } = $props();

  onMount(() => {
    getWords();
  });

  
  let myVariable = $state(0);
  let myVarTimesTwo = $derived.by(() => {
    return myVariable * 2;
  });


  // $inspect(myVariable).with(console.trace);

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

<br />

{myVariable} {myVarTimesTwo}
<button onclick={() => myVariable++}>Increment</button>

<P>Test!</P>
<P>Test!<Span>my Span</Span></P>
<P>Test!</P>

<a href="/">Home</a>
