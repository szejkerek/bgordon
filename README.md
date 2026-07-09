# bgordon.pl

Portfolio site made using Astro + Svelte

## Run

```bash
npm install
npm run dev      # http://localhost:4321

npm run build    # production → ./dist
npm run preview  # preview the build
```

## Add a project

1. New file `src/content/projects/<slug>.md`:

```markdown
---
title: "Title"
description: "Short description"
date: "2024-01"                 # format YYYY-MM
tags: ["Unity", "C#"]
playUrl: "https://..."          # optional
sourceUrl: "https://github..."  # optional
teamSize: 1                     # optional
draft: false                    # true = hidden in production
---

## About This Project
Content...
```

2. Images go in `public/images/projects/<slug>/`:
   - `thumbnail.*` — card thumbnail
   - `1.*`, `2.*`, … — gallery (ordered by number)

## Add a book

New file `src/content/books/<slug>.md`:

```markdown
---
title: "Title"
author: "Author"
status: "reading"               # reading | finished | want-to-read
startDate: "2025-09"            # optional
finishDate: "2026-01"           # optional
image: "/images/books/<slug>.png"  # optional (cover)
thoughts: "My notes..."         # optional
draft: false
---
```

Cover: drop the file in `public/images/books/` and point `image` to it.

## Add an achievement

New file `src/content/achievements/<slug>.md`:

```markdown
---
title: "1st Place"
event: "Game Jam 2024"
date: "2024-01"
description: "Description"
type: "winner"                  # winner | finalist | participant | publication | organization
icon: "trophy"                  # trophy | medal | star | award | book | users
url: "https://..."              # optional
image: "..."                    # optional
gallery: ["...", "..."]         # optional
rank: "1/50"                    # optional
participants: "50"              # optional
draft: false
---
```

## Static data

`src/content/site/` — `hero.json`, `work-experience.json`, `education.json`.
