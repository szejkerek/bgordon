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

You play a battery that drains as it moves, and different terrain drains it faster, so a simple platformer quietly becomes a resource puzzle where every jump and route choice costs energy. Electro Exile (released as *The Last Battery*) came out of my first-ever game jam, a four-person team, third place at the BEST IT Festival. I owned player movement and the core architecture.

## Technical Highlights

- **Movement that feels right.** I built the player controller with variable jump height, coyote time and head-bump handling, tuned so a tap gives a snappy hop while holding jump extends the arc. The whole thing runs on physics velocity rather than a jump state machine.
- **Timestamp-based coyote time.** The forgiveness window is driven by a grounded timestamp checked on jump input rather than formal states, with careful ordering between the wall checks and the jump logic to keep the timing reliable.

## Learnings

As my first jam, it was a crash course in rapid prototyping and working as a team under a hard deadline. The movement and architecture work here became a foundation I carried into later Placeholders Studio projects.
