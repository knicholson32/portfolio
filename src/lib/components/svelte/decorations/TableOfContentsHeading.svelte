<script lang="ts">
  import { onMount } from 'svelte';
  import TableOfContentsHeading from './TableOfContentsHeading.svelte'


  
  type TOC = {
    depth: number;
    text: string;
    slug: string;
    subheadings: TOC[];
  };

  type FlatHeading = {setHighlight: (val: boolean) => void, offset: number, passed: boolean, title: string, slug: string};

  type Props = {
    heading: TOC;
    flatHeadings: {[key: string] : FlatHeading};
    scrollValue: number;
    scrollOffset?: number
  };

  let {
    heading,
    flatHeadings = $bindable(),
    scrollValue = $bindable(),
    scrollOffset = 100,
  }: Props = $props()

  let element: HTMLHeadingElement | null = null;
  let anchor: HTMLAnchorElement | null = null;
  let passed = $state(false);
  let highlight = $state(heading.slug === 'overview');
  const setHighlight = (val: boolean) => highlight = val;
  flatHeadings[heading.slug] = {
    setHighlight,
    offset: -2,
    passed: false,
    title: heading.text,
    slug: heading.slug
  };

  onMount(() => {
    element = document.getElementById(heading.slug) as HTMLHeadingElement;
  });

  //                    h2  h3  h4  h5  h6
  const scrollLookup = [30, 30, 20, 12, 6];

  $effect(() => {
    let lastPassed = passed;
    if (element !== null) passed = element.offsetTop - (scrollOffset + scrollLookup[heading.depth - 2]) < scrollValue;
    if (anchor !== null && lastPassed !== passed) flatHeadings[heading.slug] = { setHighlight, offset: element?.offsetTop ?? -1, passed, title: heading.text, slug: heading.slug };
  });

  // const textFormatNormal = 'text-neutral-700 dark:text-neutral-300 font-normal dark:font-light';
  // const textFormatH2 = 'text-neutral-950 dark:text-neutral-300 font-medium';

</script>

<li class="pt-1.5 my-0 py-0 px-0 overflow-hidden text-ellipsis">
  <a bind:this={anchor} class="no-underline tracking-wider whitespace-nowrap font-normal dark:font-light text-neutral-800 dark:text-neutral-300 sm:hover:text-neutral-950 sm:hover:dark:text-white {highlight ? '!text-amber-500 dark:!text-amber-500' : ''}" href={"#" + heading.slug}>
    {heading.text}
  </a>
  {#if heading.subheadings.length > 0}
    <ul class="list-none my-0 pl-3 ml-0">
      {#each heading.subheadings as sub}
        <TableOfContentsHeading heading={sub} bind:flatHeadings bind:scrollValue scrollOffset={scrollOffset} />
      {/each}
    </ul>
  {/if}
</li>