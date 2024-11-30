<script lang="ts">
  import { onMount } from 'svelte';
  import TableOfContentsHeading from './TableOfContentsHeading.svelte'


  
  type TOC = {
    depth: number;
    text: string;
    slug: string;
    subheadings: TOC[];
  };

  type FlatHeading = {setHighlight: (val: boolean) => void, offset: number, passed: boolean};

  type Props = {
    heading: TOC;
    flatHeadings: {[key: string] : FlatHeading};
    scrollValue: number;
  };

  let {
    heading,
    flatHeadings = $bindable(),
    scrollValue = $bindable()
  }: Props = $props()

  let element: HTMLHeadingElement | null = null;
  let anchor: HTMLAnchorElement | null = null;
  let passed = $state(false);
  let highlight = $state(heading.slug === 'overview');
  const setHighlight = (val: boolean) => highlight = val;
  flatHeadings[heading.slug] = {
    setHighlight,
    offset: -2,
    passed: false
  };

  onMount(() => {
    element = document.getElementById(heading.slug) as HTMLHeadingElement;
  });

  $effect(() => {
    let lastPassed = passed;
    if (element !== null) passed = element.offsetTop - 30 < scrollValue;
    if (anchor !== null && lastPassed !== passed) flatHeadings[heading.slug] = { setHighlight, offset: element?.offsetTop ?? -1, passed };
  });

  const textFormatNormal = 'text-neutral-700 dark:text-neutral-400 font-normal dark:font-light';
  const textFormatH2 = 'text-neutral-950 dark:text-neutral-300 font-medium';

</script>

<li class="pt-1 my-0 py-0 px-0 overflow-hidden text-ellipsis">
  <a bind:this={anchor} class="no-underline tracking-wider whitespace-nowrap {heading.depth === 2 ? textFormatH2 : textFormatNormal} sm:font-normal sm:dark:font-light sm:text-neutral-400 sm:dark:text-neutral-500 {highlight ? 'sm:!text-amber-500 sm:dark:!text-amber-500' : ''}" href={"#" + heading.slug}>
    {heading.text}
  </a>
  {#if heading.subheadings.length > 0}
    <ul class="list-none my-0 pl-3 ml-0">
      {#each heading.subheadings as sub}
        <TableOfContentsHeading heading={sub} bind:flatHeadings bind:scrollValue />
      {/each}
    </ul>
  {/if}
</li>