<script lang="ts">
  import Head from "$lib/components/generic/Head.svelte";
  import OpenGraph from "$lib/components/generic/OpenGraph.svelte";

  let { 
    data: data,
    children
  } = $props();


</script>

{#if data.slug !== null && data.meta !== null}
  <Head title={data.meta.item.title} description={data.meta.item.summary ?? ''}/>
  <OpenGraph title={data.meta.item.title} description={data.meta.item.summary ?? 'No description provided.'} slug={data.slug} image={data.meta.item.image}/>
{/if}

{@render children?.()}