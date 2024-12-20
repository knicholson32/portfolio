<script lang="ts">
    import Menu from "lucide-svelte/icons/menu";
    import escapeOrClickOutside from "./events/escapeOrClickOutside";
    import { slide } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import type { Snippet } from "svelte";


  type Props = {
    children: Snippet
    menuText?: string
  }

  const {
    children,
    menuText
  }: Props = $props();

  let menuOpen = $state(false);

  let menuFrame: HTMLDivElement | undefined = $state(undefined);
  const closeMenu = () => menuOpen = false;

</script>

{#if children.length > 0}
  <div class="md:hidden border-r border-neutral-200 dark:border-neutral-800"></div>
{/if}
<div class="md:hidden inline-flex items-center" bind:this={menuFrame} use:escapeOrClickOutside={{callback:closeMenu, except: menuFrame}}>
  <button onclick={() => menuOpen = !menuOpen} aria-label="Open menu"><Menu class="w-5 h-5"/></button>
  {#if menuOpen}
    <div transition:slide={{ delay: 0, duration: 250, easing: cubicOut, axis: 'y' }} class="absolute top-16 left-0 right-0 pb-4 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
      <div class=" text-neutral-950 dark:text-neutral-50 w-full p-2 uppercase text-center border-b border-neutral-200 dark:border-neutral-800">
        {menuText ?? 'Menu'}
      </div>
      <div>
        {@render children?.()}
      </div>
    </div>
  {/if}
</div>
