<script lang="ts">

  import { inview } from 'svelte-inview';

  const {
    children,
    slug
  } = $props();

  let transition = $state(true);



</script>

<div use:inview
    on:inview_enter={(event) => {
      const { inView, entry, scrollDirection, observer, node} = event.detail;
      transition = inView;
    }}
    on:inview_leave={(event) => {
      const { inView, entry, scrollDirection, observer, node} = event.detail;
      transition = inView;
    }} class="hero-image -mt-10" style="view-transition-name: {transition ? `img-${slug.replaceAll('/','-')}` : 'none'} !important;">
  {@render children()}
</div>