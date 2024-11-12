<script lang="ts">
  import Head from "$lib/components/generic/Head.svelte";

  let { 
    data: data,
    children
  } = $props();


</script>

{#if data.slug !== null && data.meta !== null}
  <Head title={data.meta.title} description={data.meta.description}/>
{/if}

{@render children?.()}