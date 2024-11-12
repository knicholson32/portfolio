<script lang="ts">
  import Head from "$lib/components/generic/Head.svelte";

  let { 
    data: data,
  } = $props();


</script>

<Head title="Post Test" description="Wow2!"/>



{#each Object.keys(data.posts) as slug}
    <a href="/post/{slug}">{data.posts[slug].title}</a> <br/>
{/each}