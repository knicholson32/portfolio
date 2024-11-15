<script lang="ts">
  import Head from "$lib/components/generic/Head.svelte";

  let { 
    data: data,
  } = $props();

  const posts = data.posts.posts;


</script>

<Head title="Post Test" description="Wow2!"/>



{#each Object.keys(posts) as slug}
    <a href="/post/{slug}">{posts[slug].title}</a> <br/>
{/each}