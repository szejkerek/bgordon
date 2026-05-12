---
title: "CardsEstateQuest"
description: "A digital two-player strategy game that faithfully adapts a university-developed urban planning card game into an interactive 3D experience."
date: "2024-06"
tags: ["C#", "Unity", "Card Game", "Strategy", "State Pattern", "ScriptableObjects", "Addressables", "DOTween", "URP", "Turn-Based", "Design Patterns"]

image: "/images/games/cards-estate-quest/1.png"
gallery:
  - "/images/games/cards-estate-quest/2.png"
  - "/images/games/cards-estate-quest/3.png"
featured: true
teamSize: 1
---

## About This Game

CardsEstateQuest is a digital adaptation of *Gra w Osiedle* — a physical card game created by the URBANMODEL research group at the Silesian University of Technology's Faculty of Architecture. Two players compete across three rounds, taking opposing roles (Developer or Ecologist) and strategically placing building cards on a shared grid. The Developer scores based on building intensity; the Ecologist scores based on biologically active area. The neighbor-averaging mechanic means placement position matters as much as card choice.

Players enter a nickname, choose difficulty, and play to a best-of-three. Scores are compared in real time against configurable parameter goals defined in `DifficultySO` ScriptableObjects, adding a secondary objective beyond raw point accumulation.

### Features

- **Role-based scoring** — Developer and Ecologist roles assigned each round; each role scores a different card parameter
- **Neighbor-averaging mechanic** — placed card scores the mean of its own values and all occupied cardinal neighbors, rewarding spatial clustering
- **Configurable difficulty** — all gameplay parameters live in `DifficultySO` ScriptableObjects; no code changes needed to balance
- **Ghost preview** — transparent card preview before placement, traversing arbitrary model hierarchies recursively
- **Quadrant-aware tooltips** — tooltip pivot flips based on screen quadrant so it never clips off-screen
- **Pause-safe UI animations** — DOTween sequences use unscaled time, continuing to play at `Time.timeScale = 0`

### Technical Architecture

The game loop is driven by a **State pattern**: `RoundManager` delegates every `Update()` call to the current `IRoundState`. Four plain C# state classes — `RoundPreparationState`, `RoundPlayState`, `RoundEndState`, `GameEndState` — each encapsulate a single phase. Transitions are explicit `TransitionTo()` calls, keeping each phase isolated and independently readable.

Cards and difficulties are **ScriptableObjects** loaded at runtime via **Unity Addressables** using string labels, keeping asset references out of scene hierarchies. `GordonEssentials` — the author's own utility library — provides the `Singleton<T>` base class, scene loading, and `DataLoader<T>` helpers used throughout.

The grid generates an N×M layout at runtime. `GridItem` handles hover/click via `OnMouse*` callbacks, manages ghost preview rendering, and runs neighbor-aware parameter scoring on placement. Neighbor lookup uses world-space position offsets derived from `GridManager.gridSpacing` rather than a discrete array, keeping grid indexing encapsulated in one place.

### Engineering Highlights

**Neighbor-averaging with correct denominator** — The scorer seeds both parameter accumulators with the placed card's own values before iterating neighbors, then divides by `neighborCount + 1`. The `+1` is load-bearing: it counts the placed card itself, so an isolated placement scores exactly its own values. Getting this wrong produces systematically incorrect scores for every placement.

**Quadrant-aware tooltip** — Rather than fixed-offset + clamp (which overlaps the cursor in corners), the tooltip's `RectTransform.pivot` is set dynamically each frame based on cursor screen quadrant. `pivot.x = 1` in the right half (tooltip grows leftward), `0` in the left half. A `threshold` nudge adds clearance from the cursor hotspot. `SmoothDamp` provides inertial lag for polished feel.

**Online incremental mean** — Percentage-type parameters (e.g., biologically active area ratio) use the formula `mean += (x - mean) / n`, updating in O(1) with no stored history. The same path handles card removal by passing a negated value and decrementing the count, making the aggregator bidirectional without a full history replay.
