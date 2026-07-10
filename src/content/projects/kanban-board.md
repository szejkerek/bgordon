---
title: "Kanban Board"
description: "A Java Kanban board with a JDBC backend over an Apache Derby database, serving a browser front-end with tasks that move across To-Do, In-Progress, and Done columns."
date: "2023-01"
tags: ["Web", "Java"]
sourceUrl: "https://github.com/szejkerek/KanbanBoard"
teamSize: 1
---

## About This Project

A Java backend for a browser-based Kanban board, backed by an Apache Derby SQL database over JDBC. Tasks are stored in a normalized schema and moved between the To-Do, In-Progress, and Done columns. Fifth-semester project.

### Engineering Highlights

**Two-phase insert with generated keys** — Creating a task inserts a row into the normalized `tasks` master table, immediately retrieves the auto-generated primary key via `Statement.RETURN_GENERATED_KEYS`, and uses that key to insert a foreign-key reference into the appropriate column junction table (`toDo`, `inProgress`, or `done`). This links records across the relational schema without exposing the generated ID to the caller.
