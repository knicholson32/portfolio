<script lang="ts">

  import { PUBLIC_URL } from '$env/static/public';

  interface Props {
    title: string;
    description: string;
    image?: string;
    slug: string;
  }

  let data: Props = $props();

</script>

<svelte:head>
  <meta property="og:title" content={data.title}>
  <meta property="og:description" content={data.description}>
  <meta property="og:logo" content="logo.png">
  {#if data.image !== undefined}
    <meta property="og:image" content={data.image}>
  {/if}
  <meta property="og:url" content="{PUBLIC_URL}/post/{data.slug}">
  <meta property="og:type" content="article">
</svelte:head>