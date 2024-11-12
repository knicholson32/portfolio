<script lang="ts">
  import { onMount } from "svelte";


  onMount(() => {
    console.log('mounted!');
    return () => {
      console.log('Unmounted!');
    };
  });

</script>

WOW! This is fancy!