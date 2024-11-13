<script lang="ts">
  import Head from "$lib/components/generic/Head.svelte";

  let { 
    data: data,
  } = $props();


</script>

<Head title="Post Test" description="Wow2!"/>



{#each Object.keys(data.postMeta.posts) as slug}
    <a href="/post/{slug}">{data.postMeta.posts[slug].item.title}</a> <br/>
{/each}