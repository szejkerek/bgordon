---
title: "Electro Exile"
description: "Game where you control a battery that must manage its stored electricity while navigating through a world filled with power-draining objects. 3rd place winner at BEST IT Festival."
date: "2022-11"
tags: ["Game", "Unity"]

playUrl: "https://carbon-crab-games.itch.io/the-last-battery"
# sourceUrl: "https://github.com/PlaceHoldersStudio/ElectroExile"  # private repo
teamSize: 4
---

## Overview

Electro Exile (released as *The Last Battery*) is a platformer from my first-ever game jam, built by a four-person team and awarded third place at the BEST IT Festival. You play a battery that steadily loses charge as it moves, and different parts of the environment drain it at different rates, so a straightforward platformer becomes a small resource-management puzzle where every jump and route choice costs energy. On the team I owned the player movement and the project's core architecture.

## Technical Highlights

- **Movement that feels right.** I built the player controller with variable jump height, coyote time and head-bump handling, tuned so a tap gives a snappy hop while holding jump extends the arc. The whole thing runs on physics velocity rather than a jump state machine.
- **Timestamp-based coyote time.** The forgiveness window is driven by a grounded timestamp checked on jump input rather than formal states, with careful ordering between the wall checks and the jump logic to keep the timing reliable.

## Learnings

As my first jam, it was a crash course in rapid prototyping and working as a team under a hard deadline. The movement and architecture work here became a foundation I carried into later Placeholders Studio projects.
