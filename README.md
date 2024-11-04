# Keenan's Portfolio
![Website](https://img.shields.io/website?url=https%3A%2F%2Fkeenannicholson.com%2F) ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/knicholson32/portfolio/unit-tests.yml?branch=main&label=main)
 ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/knicholson32/portfolio/unit-tests.yml?branch=development&label=dev)


Welcome to my portfolio and project log! This site showcases my professional journey, highlighting key projects, personal achievements, and growth over time. Here, you’ll find detailed write-ups of the work I’ve done, from initial concept to final execution, alongside insights into the challenges faced and lessons learned.

## Why This Exists
I have a lot of random projects and interests. Hopefully this will let me organize what I do just a bit better. 🚀

## Framework
This project uses [`svelte 5`](https://svelte.dev/docs/svelte/overview) and [`sveltekit`](https://svelte.dev/docs/kit/introduction). It is pre-rendered and served from [`Cloudflare Pages`](https://pages.cloudflare.com/).

[Visit the production site here.](https://www.keenannicholson.com)

## Build and Deployment
This portfolio is built with `@sveltejs/adapter-cloudflare` and deployed to [`Cloudflare Pages`](https://pages.cloudflare.com/). All routes are pre-rendered and statically served from `Cloudflare`.

Deployments are automatically executed when pushing and during pull requests. Unit tests and E2E testing are also done automatically.

## Folder Structure
All source code is in `src`, with `lib` and `routes` being the primary development folders.

```shell
Directory       Client/Server   Description
───────────────────────────────────────────
src
 ├─lib
 │  ├─components      C         # Svelte components
 │  ├─events          C         # Client-side event library
 │  ├─helpers        S/C        # Client-side and server-side helpers
 │  ├─server          S         # Primary server code
 │  │  ├─helpers      S         # Server-side helper functions
 │  │  ├─prisma       S         # Prisma instance
 │  │  └─settings     S         # Settings sub-system
 │  └─types          S/C        # Shared client-side and server types
 └─routes            S/C        # Front-end routes and API endpoints
    └─[pages]        S/C        # Actual pages and posts

tests
 └─[tests]            S         # Tests that are executed during the build process
```
