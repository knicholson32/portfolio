<script lang="ts">
  import ChevronRight from "lucide-svelte/icons/chevron-right";

  let navOpen = $state(true);

  type Props = {
    chapter: {
      title: string,
      entries: {
        title: string,
        id: string,
        order?: number
      }[]
    },
    id: string
  }

  const { chapter, id }: Props = $props();

  let chapterContainsCurrent = false;
  for (const c of chapter.entries) {
      if (c.id === id) {
      chapterContainsCurrent = true;
      break;
    }
  }
  

</script>

<button class="flex flex-row items-center gap-1 w-full" onclick={() => navOpen = !navOpen}>
  <div class="relative text-lg font-medium w-full text-left whitespace-nowrap text-ellipsis overflow-hidden">
    {chapter.title}
  </div>
  <div class="flex-grow"></div>
  {#if chapterContainsCurrent}
    <ChevronRight class="w-4 transition-all text-amber-500 {navOpen ? 'rotate-90' : 'rotate-0'}" />
  {:else}
    <ChevronRight class="w-4 transition-all {navOpen ? 'rotate-90' : 'rotate-0'}" />
  {/if}
</button>
{#if navOpen}
  <ul class="list-none my-0 ml-2 mr-1 px-1 border-l border-neutral-200 dark:border-neutral-800">
    {#each chapter.entries as entry (entry.id)}
      {#if id === entry.id}
        <li class="py-1 ml-0 px-2 overflow-hidden text-ellipsis bg-amber-500 rounded-md">
          <a class="no-underline" href="/project/{entry.id}">
            <div class="w-full no-underline tracking-wider whitespace-nowrap text-ellipsis overflow-hidden font-medium text-neutral-950">{entry.title}</div>
          </a>
        </li>
      {:else}
        <li class="py-1 ml-1 overflow-hidden text-ellipsis">
          <a class="no-underline" href="/project/{entry.id}">
            <div class="no-underline tracking-wider whitespace-nowrap text-ellipsis overflow-hidden font-normal dark:font-light text-neutral-400 dark:text-neutral-300 hover:text-neutral-950 hover:dark:text-white">{entry.title}</div>
          </a>    
        </li>
      {/if}
    {/each}
  </ul>
{/if}