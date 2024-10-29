<script>
	import { page } from '$app/stores';
</script>

<!-- <h1>Error: {$page.error.message}</h1> -->

<main class="relative isolate min-h-full">
  <img src="https://images.unsplash.com/photo-1729731322011-f945437445be?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?format=auto&exp=8&con=-15&sat=-15" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover object-top">
  <div class="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
    <p class="text-base/8 font-semibold text-zinc-700">404</p>
    <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-zinc-700 sm:text-7xl">Page not found</h1>
    <p class="mt-6 text-pretty text-lg font-medium text-zinc-700/70 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
    <div class="mt-10 flex justify-center">
      <a href="#" class="text-sm/7 font-semibold text-zinc-700"><span aria-hidden="true">&larr;</span> Back to home</a>
    </div>
  </div>
</main>