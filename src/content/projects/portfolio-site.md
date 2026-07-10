---
title: "This Portfolio Site"
description: "The very site you're looking at right now. Yes, it lists itself as a project — so if you open it, you're one click away from an infinite loop of portfolios."
date: "2026-07"
tags: ["Web", "TypeScript"]
sourceUrl: "https://github.com/szejkerek/bgordon"
playUrl: "https://bgordon.pl"
teamSize: 1
---

## About This Project

This is the portfolio site itself — an Astro + Svelte static site deployed to GitHub Pages. It renders every other project on this page from Markdown content collections, and then, for good measure, renders itself too. Click through and you'll find this exact card waiting for you again. Turtles all the way down. 🐢

### Features

- **Astro + Svelte islands** — static structure in `.astro`, interactive bits (nav, galleries, tag filter) as hydrated Svelte 5 components
- **Markdown content collections** — projects, achievements, and books are plain `.md` files validated by Zod schemas at build time
- **Recursion easter egg** — the site is listed among its own projects, so navigating into it just brings you back here
- **Cyberpunk theme** — dark palette driven entirely by CSS custom-property design tokens, no framework

### Technical Details

File-based routing with dynamic `[slug]` detail pages generated from the same content collections that feed the homepage grid. Consent-mode analytics, SEO meta, and image resolution from convention-based folders. Deployed automatically via GitHub Actions on every push to `main` — including, eventually, the commit that added this entry.
