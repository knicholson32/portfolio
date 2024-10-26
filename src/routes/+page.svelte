<script lang="ts">

  export let data;

  export const prerender = false

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<p>Rendered on: {data.renderDate}</p>
<p>{data.dashboard}</p>