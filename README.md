# Keenan's Portfolio

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fkeenannicholson.com%2F)](https://www.keenannicholson.com/) [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/knicholson32/portfolio/unit-tests.yml?branch=main&label=main)](https://www.keenannicholson.com/)
 [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/knicholson32/portfolio/unit-tests.yml?branch=development&label=dev)](https://development.portfolio-eic.pages.dev/)

Welcome to my portfolio and project log! This site showcases my professional journey, highlighting key projects, personal achievements, and growth over time. Here, you’ll find detailed write-ups of the work I’ve done, from initial concept to final execution, alongside insights into the challenges faced and lessons learned.

## Why This Exists

I have a lot of random projects and interests. Hopefully this will let me organize what I do just a bit better. 🚀

## Framework

This project uses [`astro`](https://docs.astro.build/en/getting-started/) and [`svelte 5`](https://svelte.dev/docs/svelte/overview). It is pre-rendered and served from [`Cloudflare Pages`](https://pages.cloudflare.com/).

[Visit the production site here.](https://www.keenannicholson.com)

## Build and Deployment

This portfolio is deployed to [`Cloudflare Pages`](https://pages.cloudflare.com/). All routes are pre-rendered and statically served from `Cloudflare`.

Deployments are automatically executed when pushing and during pull requests. Unit tests and E2E testing are also done automatically.

## Folder Structure

All source code is in `src`, with `lib` and `pages` being the primary development folders.

```shellscript
Directory       Client/Server   Description
───────────────────────────────────────────
src
 ├─content
 │  ├─post            S         # Post pages (nested)
 │  └─config.ts       S         # Post config
 ├─lib
 │  ├─components     S/C        # Components
 │  ├─helpers        S/C        # Client-side and server-side helpers
 │  ├─layouts        S/C        # Page layouts
 │  └─styles         S/C        # Global styles
 └─pages             S/C        # Front-end routes and API endpoints
    └─[pages]        S/C        # Actual pages and posts

tests
 └─[tests]            S         # Tests that are executed during the build process
```
