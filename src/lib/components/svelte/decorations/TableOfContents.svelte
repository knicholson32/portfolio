<script lang="ts">
  import type { MarkdownHeading } from "node_modules/astro/dist/@types/astro";
  import TableOfContentsHeading from "./TableOfContentsHeading.svelte";
  import { onMount } from "svelte";
  import ChevronRight from 'lucide-svelte/icons/chevron-right';

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

  type FlatHeading = {setHighlight: (val: boolean) => void, offset: number, passed: boolean};

  let flatHeadings = $state<{[key: string] : FlatHeading}>({});

  let tocOpen = $state(false);

  $effect(() => {
    let lastOffsetPassed = -1;
    let lastHeadingPassed: FlatHeading | null = null;
    for (const key of Object.keys(flatHeadings)) {
      const heading = flatHeadings[key];
      heading.setHighlight(false);
      if (heading.passed && heading.offset > lastOffsetPassed) {
        lastOffsetPassed = heading.offset;
        lastHeadingPassed = heading;
      }
    }
    if (lastHeadingPassed !== null) lastHeadingPassed.setHighlight(true);
  });

  let scrollValue = $state(0);

  onMount(() => {
    const main = document.getElementById('main') as HTMLDivElement;
    main.addEventListener("scroll", (event) => scrollValue = main.scrollTop);
  })

  const menuClick = () => tocOpen = !tocOpen;

</script>

 <!-- 2xl:max-w-[calc(50vw-(64rem/2)-1.5rem)] -->
<nav class="relative text-xs pb-2 sm:p-4 sm:pt-6 select-none" onclick={menuClick} role="presentation">
  <span class="hidden sm:block text-lg font-medium text-amber-500 w-full text-left">On this page</span>
  <!-- <div class="hidden sm:hidden text-lg font-normal tracking-widest text-amber-500 w-full text-center uppercase">Table of Contents</div> -->
  <div class="sm:hidden text-lg font-normal tracking-widest text-amber-500 w-full text-center uppercase">Contents</div>
  <button class="sm:hidden absolute right-0 top-0.5 inline-flex items-center justify-center">
    <ChevronRight class="w-4 {tocOpen ? 'rotate-90' : 'rotate-0'}"/>
  </button>
  <ul class="list-none my-0 px-1 pr-2 {!tocOpen ? 'hidden' : ''} sm:block">
    {#each contents as heading}
      <TableOfContentsHeading heading={heading} bind:flatHeadings bind:scrollValue />
    {/each}
  </ul>
</nav>