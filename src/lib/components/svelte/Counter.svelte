<script lang="ts">
  import Star from 'lucide-svelte/icons/star';

  let {
    title,
  }: {
    title: string,
  } = $props()

  let count = $state(0);

  const click = () => {
    count++;
  }

</script>

<button on:click={click} class="px-4 py-1 border rounded-md my-3 hover:bg-gray-50 inline-flex items-center">{title} {count} <Star/> </button>
