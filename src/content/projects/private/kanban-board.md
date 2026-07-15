---
title: "Kanban Board"
description: "A university Java project implementing a Kanban board with CRUD operations and an Apache Derby database."
date: "2023-01"
tags: ["Web", "Java"]
sourceUrl: "https://github.com/szejkerek/KanbanBoard"
teamSize: 1
---

## Overview

Kanban Board is a solo project from a university Java course, where each student got a randomly assigned topic and mine was a Kanban board. It is a browser-based board with To Do, In Progress and Done columns where tasks can be created, moved and deleted, backed by a Java servlet layer and an Apache Derby database over JDBC.

## Technical Highlights

- **HTTP verb routing.** The servlet maps REST-style semantics straight onto HTTP methods (PUT creates, POST moves, DELETE removes) with no framework in between. See [`KanbanServlet.java`](https://github.com/szejkerek/KanbanBoard/blob/production/src/main/java/pl/pols/lab/services/KanbanServlet.java).
- **Normalized schema with cascade deletes.** A master `tasks` table plus three column tables linked by foreign keys with `ON DELETE CASCADE`, so removing a task cleans up its column references automatically. See [`PersistentData.java`](https://github.com/szejkerek/KanbanBoard/blob/production/src/main/java/pl/pols/lab/services/PersistentData.java).
- **Generated keys on insert.** Inserts use `RETURN_GENERATED_KEYS` to grab the new task id and immediately link it into the right column table in one transaction, also in [`PersistentData.java`](https://github.com/szejkerek/KanbanBoard/blob/production/src/main/java/pl/pols/lab/services/PersistentData.java).
- **Server-rendered AJAX.** The servlet writes HTML table rows straight to the response and the page swaps them in via `innerHTML`, keeping the frontend to plain JavaScript. See [`KanbanServlet.java`](https://github.com/szejkerek/KanbanBoard/blob/production/src/main/java/pl/pols/lab/services/KanbanServlet.java).

## Learnings

A straightforward but useful first pass at a full CRUD stack: raw JDBC, a normalized relational schema, and wiring a Java backend to a browser UI without leaning on a framework.
