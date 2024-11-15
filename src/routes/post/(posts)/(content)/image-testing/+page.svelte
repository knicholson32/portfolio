<script module lang="ts">
  import type { FrontmatterFormat } from "$lib/types/meta/generated/frontmatter";
  
  export const frontmatter = {
    title: 'Image Testing',
    summary: 'A series of images to test the Svelte image compression library',
    image: {
      url: 'https://images.unsplash.com/photo-1731530357802-08d982917720?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      aspect: 1,
      alt: 'A close up of a leaf with a person\'s hand on it',
      attribution: 'Photo by <a href="https://unsplash.com/@soheili?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mahdi Soheili</a> on <a href="https://unsplash.com/photos/a-close-up-of-a-leaf-with-a-persons-hand-on-it-vQxvdGHlwBU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
    },
    meta: {
      date: [
        '2021-02-25'
      ],
      categories: [
        'code',
        'design'
      ],
      tags: [
        'images'
      ]
    }
  } satisfies FrontmatterFormat;
</script>

<script lang="ts">
  import * as el from '$lib/components/text-elements';

  let {
    data
  } = $props();

</script>

<el.p>
  Frontmatter: {JSON.stringify(data.frontmatter)}
</el.p>

<el.p>Here is an image of a leaf</el.p>
<enhanced:img src="./images/mahdi-soheili-vQxvdGHlwBU-unsplash.jpg" alt="test"/>

<el.p>And one of a boardwalk</el.p>
<enhanced:img src="./images/boardwalk.jpg" alt="test"/>