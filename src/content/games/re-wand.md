---
title: "ReWand"
description: "3D action prototype with a composable wand-casting skill system — delivery mechanics and hit effects are independently swappable ScriptableObjects — and a condition-driven enemy wave spawner."
date: "2025-11"
tags: ["Unity", "C#", "3D", "Action", "Zenject", "ScriptableObjects", "Design Patterns", "URP"]
sourceUrl: "https://github.com/PlaceHoldersStudio/ReWand"
featured: false
---

## About This Project

ReWand is a Unity 6 third-person action prototype. The player casts spells using four skill slots, each backed by a `SkillDefinitionSO` that independently specifies a delivery mechanism (projectile, beam, burst) and a list of hit effects (damage, force push). The beam is a held-charge ability that continuously raycasts and applies damage on a time interval while held.

Enemies are managed by a data-driven wave spawner with OR-of-AND condition groups — a wave fires when any single group has all its conditions met (kill count, wave count, elapsed time, custom events). Repeatable waves evaluate conditions against per-binding deltas, not global totals.

### Technical Highlights

- **IChargeable pattern**: delivery types opt into charge behaviour via an interface; `AbilityController` tests `is IChargeable` at input time and routes to a `ChargeState` object that encapsulates all per-charge mutable state
- **ScriptableObject skill decomposition**: `DeliverySO` + `List<EffectSO>` on `SkillDefinitionSO` — new spells require zero new code, only new asset configurations
- **Wave condition evaluator**: pure C# class (no MonoBehaviour) with per-binding delta snapshots enabling "kill 10 more" conditions on repeatable waves
- **Zenject DI**: `SpawnRunner` receives `EnemyPoolManager` via `[Inject]`; no singleton coupling
- **Pool auto-registration**: `SpawnRunner` scans wave config at startup and registers all required object pools automatically
