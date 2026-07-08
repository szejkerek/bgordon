# Context — Glossary

Canonical language for this portfolio. Terms only; no implementation detail.

## Project

A piece of work shown in the **Projects** section of the homepage. Formerly called a **Game**, but the portfolio now spans games, tools, embedded work, ML, and academic work — so "Project" is the canonical term across UI, code, content collection, and the `/projects/<slug>` URL.

- "Game" is **deprecated** as a domain term. Do not introduce new `game`/`Game` identifiers.
- The achievement→project link field is still named on achievements; it points to a Project by id.

## Tag

A free-text label in a Project's `tags[]` array (e.g. `Unity`, `C++`, `URP`). Tags drive the Projects filter: every distinct tag across **published** projects becomes one filter button.

- Filter buttons are ordered by **project count descending**, ties broken **alphabetically**.
- `All` is the default button and clears the filter.
- The filter is **single-select**: one tag (or `All`) active at a time.

## Jam

Previously a display chip on Project cards/detail naming a game-jam event (e.g. `ZTGK 2024`). **Removed** — the `jam` concept no longer exists in schema, content, or UI. Game-jam participation, where relevant, lives in a Project's `tags[]` (e.g. `Game Jam`) or prose.
