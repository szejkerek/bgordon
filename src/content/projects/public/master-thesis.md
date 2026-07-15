---
title: "Procedural Dungeon Generation"
description: "My master’s thesis comparing  procedural dungeon generation algorithms through large-scale Unity experiments and statistical analysis."
date: "2024-08"
tags: ["Game", "Unity"]
# sourceUrl: "https://github.com/szejkerek/MasterThesis"  # private repo
teamSize: 1
---

## Overview

My master's thesis is a solo Unity project that implements four classic procedural dungeon-generation algorithms and compares them objectively, not by eyeballing a few maps but by generating thousands and measuring them. I built the generators, a batch harness that sweeps their parameter spaces, a metric suite that scores every dungeon both structurally and through a simulated player, and a JSON export pipeline feeding external statistical analysis.

## Technical Highlights

- **Four algorithms behind one interface.** Binary Space Partitioning, Cellular Automata, Diffusion-Limited Aggregation and Drunkard Walk each implement a common `IDungeonGenerator` and are built uniformly through a `DungeonGeneratorFactory`, so the rest of the system never special-cases an algorithm.
- **Parameter-sweeping batch harness.** `ResearchPerformer` iterates every combination in each algorithm's parameter definitions (roughly 108 to 144 configurations per algorithm), generating a batch of dungeons per configuration and reshuffling key and exit placement across iterations, which is what turns a handful of examples into datasets of thousands.
- **Structural and simulated metrics.** Ten structural tests (critical-path length, walkable area, dead-end ratio, corridor linearity, average node degree, turn rate, centroid offset and more) measure geometry directly, alongside playability metrics from a simulated player.
- **A simulated player as evaluator.** `SimplifiedPlayerSimulation` explores each dungeon with a 12-tile recursive-shadowcasting field of view, lazy A* replanning, and key-then-exit-then-frontier priorities, capturing map coverage, steps to exit and revisit ratio, so the score reflects how a dungeon plays rather than just how it looks.
- **Statistics-ready export.** Per-configuration results are pooled into means, standard error and confidence intervals and written to per-algorithm JSON files, ready to analyse externally.

Runs used fixed 50x50 maps with ten dungeons per configuration, adding up to a few thousand dungeon evaluations across all four algorithms.

## Learnings

The thesis was as much about experiment design as generation. Making the runs configurable, repeatable and measurable is what let the conclusions come from data instead of impressions.
