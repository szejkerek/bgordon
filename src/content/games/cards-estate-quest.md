---
title: "CardsEstateQuest"
description: "Two-player strategy game adapted from a card game."
date: "2024-06"
tags: ["C#", "Unity", "Addressables"]

featured: true
teamSize: 3
---

## About

CardsEstateQuest is a digital adaptation of *Gra w Osiedle*, a physical card game created by the URBANMODEL student group at the Faculty of Architecture of the Silesian University of Technology.

Two players compete across three rounds, taking opposing roles: Developer or Ecologist. They place building cards on a shared grid. The Developer scores based on building intensity, while the Ecologist scores based on biologically active area. The neighbor-averaging mechanic makes placement position as important as card choice.

Players enter a nickname, choose difficulty, and play a best-of-three match. Scores are compared in real time against configurable parameter goals.

## Technical Architecture

The game loop uses the **State pattern**. `RoundManager` delegates round behavior to the current `IRoundState`.

The round flow is split into four plain C# state classes:

- `RoundPreparationState`
- `RoundPlayState`
- `RoundEndState`
- `GameEndState`

Each class handles one phase. Transitions use explicit `TransitionTo()` calls, keeping phases isolated.

Cards and difficulties are stored as **ScriptableObjects** and loaded at runtime with **Unity Addressables**, keeping asset references out of scene hierarchies.

The grid generates an `N × M` layout at runtime. `GridItem` handles hover and click interactions through `OnMouse*` callbacks, manages ghost preview rendering, and runs neighbor-aware parameter scoring on placement.

## Tooltip Positioning

The tooltip uses a quadrant-aware pivot instead of a fixed offset with clamping.

Its `RectTransform.pivot` is updated each frame based on the cursor screen quadrant:

- `pivot.x = 1` in the right half, so the tooltip grows leftward.
- `pivot.x = 0` in the left half, so the tooltip grows rightward.

A `threshold` nudge adds clearance from the cursor hotspot.
