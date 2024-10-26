<script lang="ts">
  export let data;

</script>

{#await data.async}
  Waiting...
{:then}
  Test {data.async.value}
{/await}