<script lang="ts">
  import Head from "$lib/components/generic/Head.svelte";

  let { 
    data: data,
  } = $props();

  console.log(data.postMeta.posts);


</script>

<Head title="Post Test" description="Wow2!"/>



{#each Object.keys(data.postMeta.posts) as slug}
    <a href="/post/{slug}">{data.postMeta.posts[slug].frontmatter.title}</a> <br/>
{/each}