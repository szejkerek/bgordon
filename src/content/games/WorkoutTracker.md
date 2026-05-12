---
title: "WorkoutTracker"
description: "A social fitness tracker where users log workouts, follow friends, and share progress."
date: "2023-06"
tags: ["TypeScript", "Svelte", "SvelteKit", "Firebase", "Firestore", "Tailwind CSS", "Full-Stack", "NoSQL", "Social Platform", "Fitness", "Bitwise Flags", "Svelte Stores", "Vite", "Node.js"]
image: "/images/games/workout-tracker/1.png"
gallery:
  - "/images/games/workout-tracker/2.png"
sourceUrl: "https://github.com/szejkerek/WorkoutTracker"
featured: false
teamSize: 1
---

## About This Project

WorkoutTracker is a full-stack SvelteKit web application for logging gym sessions, tracking body measurements, and engaging with a fitness community. Users build custom exercise libraries, record workouts against structured training plans, and follow other users through a social feed with posts, likes, and comments. The app is fully localised in Polish.

### Features

- **Custom exercise library** — named categories with exercises specifying which metrics to track (weight, reps, distance, time — any combination encoded as bitwise flags)
- **Social feed** — posts, likes, comments with nested author resolution via parallel `Promise.all`
- **Body measurement tracking** — weight, body fat %, muscle mass history over time
- **Calendar view** — temporal overview of logged workouts
- **Session-persistent auth** — custom Svelte store backed by `localStorage`, no cookie/session server

### Technical Architecture

SvelteKit monolith: frontend `.svelte` pages and backend `+server.ts` API endpoints co-located in the same route tree under `src/routes/`. Firebase Firestore (NoSQL) handles all persistence — separate collections for Users, Exercises, UserCategories, DoneExercises, Posts, TrainingPlans, BodyProfiles. Relationships stored as IDs; the API layer performs join-like assembly at read time.

The `userSessionData` store wraps a private `writable` and exposes only `subscribe`/`set`, preventing arbitrary `update` mutations. Initialized from `localStorage` at store creation so the first render is never in an uninitialized flash; auto-syncs via `subscribe` callback on every change.

Firestore Admin SDK runs server-side only via SvelteKit's `.server.ts` convention, preventing credential leakage into client bundles.

### Engineering Highlights

**Bitwise exercise type flags** — `Weight = 1`, `Reps = 1 << 1`, `Distance = 1 << 2`, `Time = 1 << 3`. Any combination of metrics stored as a single integer and checked with bitwise AND in Svelte template conditionals (`{#if exercise.exerciseType & ExerciseEnum.Weight}`). O(1) per metric, no switch statements; adding a new metric requires only a new bit and a new template row.

**Nested `Promise.all` for denormalized enrichment** — Firestore stores foreign keys. Serving a fully hydrated `Post[]` requires resolving post authors and, within each post, all comment authors. The GET `/api/posts` handler uses nested `Promise.all`: all posts resolved concurrently in the outer call, all comment authors per post resolved concurrently in the inner call — meaningfully better than sequential waterfall fetches at the cost of an O(P + P×A + C + C×A) fetch pattern that grows with social graph size.

**Cascading deletes** — Firestore has no FK constraints. Deleting a `UserCategory` triggers deletion of all its `Exercises`, each triggering deletion of all corresponding `DoneExercise` records — three-level async cascade implemented imperatively via `forEach` with async callbacks. Not atomic; a failure mid-cascade could leave orphaned records (acknowledged tradeoff).
