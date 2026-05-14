---
title: "Skeleton Offense"
description: "Auto-chess tower-offense prototype where you draft skeleton units, combine matching triplets into higher tiers, and send your army down a spline path to attack enemy towers and bases."
date: "2024-10"
tags: ["Unity", "C#", "Auto-Chess", "Tower Defense", "3D", "NavMesh", "Splines", "URP"]
sourceUrl: "https://github.com/PlaceHoldersStudio/SkeletonOffense"
featured: false
---

## About This Game

Skeleton Offense is a prototype blending auto-chess drafting with tower-offense gameplay. Players buy units from a loot-box shop, place them on board slots, and watch three identical same-tier units automatically combine into a single stronger one. Once a round starts, the army marches down a spline path and breaks off to attack towers and a final enemy base.

### Features

- **Auto-Merge**: Three identical same-tier units in the camp automatically combine into a tier-up — detected via LINQ `GroupBy({Config, Tier})`
- **Spline Path + NavMesh Hybrid**: Units walk a Unity Splines path; when close enough to a precomputed aggro waypoint, they switch to NavMesh navigation to fight
- **Loot Box System**: `ILootGenerator<T>` interface with unit (tier-weighted), gold, and buff generators
- **Three Unit Types**: Swordsman, crossbowman, mage — each with distinct weapon ranges and tier-scaled damage

### Technical Highlights

- Stand positions pre-computed at spawn time via 200-sample NavMesh rejection loop, correlating each valid position to the earliest spline waypoint — aggro trigger is a single float comparison per frame
- State machine with seven states; machine is a thin dispatcher, all logic lives in state objects that cache component references at construction
- `StageManager` coroutine spawner supports per-unit `BulkSpawnCount` for burst-arrival enemy types
