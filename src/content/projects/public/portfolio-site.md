---
title: "This Portfolio Site"
description: "My personal portfolio website showcasing my projects, skills, and experience."
date: "2026-07"
tags: ["Web"]
sourceUrl: "https://github.com/szejkerek/bgordon"
teamSize: 1
---

## Overview

You are looking at it. This portfolio is built solo with Astro, Svelte 5 and TypeScript, with all project, achievement and book content living in Markdown collections rather than a CMS. A few deliberate architectural choices keep it fast, statically generated, and hard to break as the content grows.

## Technical Highlights

- **Build-time reference integrity.** Every achievement's link to a project is validated in one place at build time; a broken or private reference throws during the build instead of shipping a dead link, also in [`content.ts`](https://github.com/szejkerek/bgordon/blob/main/src/utils/content.ts).
- **Centralized collection readers.** All content access flows through a single module that enforces draft filtering and newest-first sorting, and pages are not allowed to call `getCollection` directly.
- **Consent Mode v2.** Analytics load with all storage denied by default and a GDPR banner flips consent only on explicit opt-in. See [`Layout.astro`](https://github.com/szejkerek/bgordon/blob/main/src/layouts/Layout.astro).

