<script>
  import Head from '$lib/components/generic/Head.svelte';
  import OpenGraph from '$lib/components/generic/OpenGraph.svelte';
  import CFImage from '$lib/components/CFImage.svelte';
  import { MoveLeft } from 'lucide-svelte'

  let {
    data,
    children
   } = $props();

</script>


<Head title={data.frontmatter.title} description={data.frontmatter.summary}/>
<OpenGraph title={data.frontmatter.title} description={data.frontmatter.summary} slug={data.slug} image={data.frontmatter.image.url} />

<!-- <a href="/post"><MoveLeft /></a> -->

<div class="flex flex-col gap-3 px-5 py-2">
  <div class="flex flex-col gap-2">
    <a class="inline-flex gap-3 items-center group hover:-ml-1 transition-all" href="/post">
      <MoveLeft class="w-6" />
      <span class="uppercase text-xs">Posts</span>
    </a>
    <div class="flex flex-col gap-1">
      <div class="text-3xl">{data.frontmatter.title}</div>
      <div class="font-thin">{data.frontmatter.summary}</div>
    </div>

    <div>
      {#if data.frontmatter.image.url.startsWith('http')}
        <img style={data.frontmatter.image.aspect === undefined ? '' : `aspect-ratio: ${data.frontmatter.image.aspect};`} class="object-cover rounded-lg w-full" src={data.frontmatter.image.url} alt="test"/>
      {:else}
        <CFImage style={data.frontmatter.image.aspect === undefined ? '' : `aspect-ratio: ${data.frontmatter.image.aspect};`} class="object-cover rounded-lg w-full" src={data.frontmatter.image.url} imgClass='icon' />
      {/if}
    </div>
  </div>

  <div class="mt-4 mb-2 w-full border-b border-white border-dashed opacity-30"></div>

  <div class="flex flex-col gap-4">
    {@render children?.()}
  </div>
</div>

