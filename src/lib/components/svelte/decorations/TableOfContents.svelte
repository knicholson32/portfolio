<script lang="ts">
  import type { MarkdownHeading } from "node_modules/astro/dist/@types/astro";
  import TableOfContentsHeading from "./TableOfContentsHeading.svelte";
  import { onMount } from "svelte";
  import ChevronRight from 'lucide-svelte/icons/chevron-right';
  import ChevronDown from 'lucide-svelte/icons/chevron-down';

  type Props = {
    headings: MarkdownHeading[];
  };

  const {
    headings,
  }: Props = $props()

  type TOC = {
    depth: number;
    text: string;
    slug: string;
    subheadings: TOC[];
  };

  const buildToc = (headings: MarkdownHeading[]) => {
    const toc: TOC[] = [];
    const parentHeadings = new Map();
    headings.forEach((h) => {
      const heading = { ...h, subheadings: [] };
      parentHeadings.set(heading.depth, heading);
      // Change 2 to 1 if your markdown includes your <h1>
      if (heading.depth === 2) {
        toc.push(heading);
      } else {
        parentHeadings.get(heading.depth - 1).subheadings.push(heading);
      }
    });
    return toc;
  };

  const contents = buildToc([{
    depth: 2,
    text: 'Overview',
    slug: 'overview'
  }, ...headings]);

  type FlatHeading = {setHighlight: (val: boolean) => void, offset: number, passed: boolean, title: string, slug: string};

  let flatHeadings = $state<{[key: string] : FlatHeading}>({});
  
  let tocOpen = $state(false);

  let currentHeading: { title: string, slug: string } | null = $state({ title: 'Overview', slug: 'overview' });

  $effect(() => {
    let lastOffsetPassed = -1;
    let lastHeadingPassed: FlatHeading | null = null;
    lastHeadingPassed = null;
    for (const key of Object.keys(flatHeadings)) {
      const heading = flatHeadings[key];
      heading.setHighlight(false);
      if (heading.passed && heading.offset > lastOffsetPassed) {
        lastOffsetPassed = heading.offset;
        lastHeadingPassed = heading;
      }
    }
    if (lastHeadingPassed !== null) lastHeadingPassed.setHighlight(true);
    currentHeading = lastHeadingPassed === null ? null : { title: lastHeadingPassed.title, slug: lastHeadingPassed.slug };
  });

  let scrollValue = $state(0);

  onMount(() => {
    document.onscroll = () => scrollValue = document.scrollingElement?.scrollTop ?? 0;
    scrollValue = document.scrollingElement?.scrollTop ?? 0;
  })

  const menuClick = () => tocOpen = !tocOpen;

  let innerWidth = $state(0);
  let isLarge = $derived(innerWidth >= 1024);
  let isXL = $derived(innerWidth >= 1280);
  let scrollOffset = $derived(isLarge ? 0 : isXL ? 16 : 32);
  
</script>

<svelte:window bind:innerWidth />


<nav class="flex gap-2 cursor-pointer lg:cursor-auto px-4 lg:p-0 lg:block text-xs select-none w-full overflow-x-hidden" onclick={menuClick} role="presentation">
  <span class="hidden lg:block text-lg font-medium text-amber-500 w-full text-left">On this page</span>
  <ul class="absolute bg-neutral-50 dark:bg-neutral-950 lg:dark:bg-transparent border-b lg:border-b-0 border-neutral-200 dark:border-neutral-800 lg:relative top-[calc(2rem-0px)] left-0 right-0 lg:top-0 lg:block list-none my-0 pb-2 px-4 lg:p-0 lg:px-1 pr-2 w-full overflow-x-hidden {!tocOpen && !isLarge ? 'hidden' : ''}">
    {#each contents as heading}
      <TableOfContentsHeading heading={heading} bind:flatHeadings bind:scrollValue {scrollOffset} />
    {/each}
  </ul>
  <div class="lg:hidden">
    On This Page
  </div>
  <div class="lg:hidden">
    |
  </div>
  <div class="lg:hidden inline-flex gap-2 text-amber-500">
    {currentHeading?.title}
  </div>
  <div class="lg:hidden flex-grow"></div>
  <ChevronDown class="w-4 h-4 lg:hidden {tocOpen ? 'rotate-180' : ''}"/>
</nav>