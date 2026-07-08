# 1. Rename "Games" to "Projects" and change public URLs

Date: 2026-06-29

## Status

Accepted

## Context

The portfolio's single content collection was named `games` and served detail pages at `/games/<slug>`. The body of work has outgrown the term — it now includes tools, embedded/electronics, ML, and academic projects, not only games. The owner wants the section, code, and URLs to reflect "Projects" as the canonical term.

The site is a static Astro build deployed to GitHub Pages, which offers no server-side redirect mechanism. Changing the URL path therefore breaks any existing inbound links or bookmarks to `/games/<slug>`.

## Decision

Rename "Games" to "Projects" everywhere: the content collection key, content directory, dynamic route, components, utilities, and tests. Change the public detail URL from `/games/<slug>` to `/projects/<slug>`.

Accept the breakage of old `/games/<slug>` links — no redirect shim is added.

## Consequences

- Code and URLs consistently use "Project"; the deprecated "Game" term is removed (see CONTEXT.md).
- Any external links, search-engine entries, or bookmarks pointing at `/games/<slug>` will 404. Given the site's small audience and early stage, this is judged acceptable over carrying a permanent legacy path or a redirect hack.
- If old links later prove valuable, a static `/games/<slug>` page that client-redirects to `/projects/<slug>` can be added — reversible at low cost, just not done now.
