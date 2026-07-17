---
title: "PCG Algorithm Analysis"
description: "My master's thesis comparing procedural dungeon generation algorithms through large-scale Unity experiments and statistical analysis."
date: "2025-09"
tags: ["Unity", "Python", "Analysis"]
# sourceUrl: "https://github.com/szejkerek/MasterThesis"  # private repo
teamSize: 1
---

## Overview

Most procedural-generation work is judged by eyeballing a handful of maps. My master's thesis (defended 2025, graded 5.0) judges it by generating thousands and measuring them. I built the generators in Unity, a batch harness that sweeps their parameter spaces, a metric suite scoring every dungeon structurally and through a simulated player, and a JSON export pipeline feeding a separate Python analysis layer.

📄 [Read the full thesis (PDF)](/files/procedural-dungeon-generation-thesis.pdf)

## What The Images Show

The lead image is the research tool mid-run, with labelled panels: **(A)** the configuration of the algorithm currently under test, **(B)** the study parameters, **(C)** partial test results, **(D)** the estimated time to completion, **(E)** a live visualization of the generated levels, and **(F)** the average execution time of each test.

Next come sample dungeons from the distinct algorithm families. Binary Space Partitioning produces clean rooms joined by corridors, Cellular Automata grows organic caves, Diffusion-Limited Aggregation forms thin branching passages, and Drunkard Walk carves sparse winding paths.

The final images come from the analytical layer: a line chart tracking a playability metric against algorithm parameters, a Spearman correlation heatmap linking parameters to level properties, and a comparison chart ranking the algorithms by mean normalized steps to exit.

## Technical Highlights

- **Multiple algorithms behind one interface.** Binary Space Partitioning, Cellular Automata, Drunkard Walk, Diffusion-Limited Aggregation, Perlin Noise and Simple Room each implement a common `IDungeonGenerator` and are built uniformly through a `DungeonGeneratorFactory`, so the rest of the system never special-cases an algorithm.
- **Parameter-sweeping batch harness.** `ResearchPerformer` iterates every combination in each algorithm's parameter definitions (roughly 108 to 144 configurations per algorithm), generating a batch of dungeons per configuration and reshuffling key and exit placement across iterations, which is what turns a handful of examples into datasets of thousands.
- **Structural and simulated metrics.** Sixteen metrics span structural geometry (critical-path length, walkable area, dead-end ratio, corridor linearity, average node degree, turn rate, centroid offset and more) and playability, the latter captured from a simulated player.
- **A simulated player as evaluator.** `SimplifiedPlayerSimulation` explores each dungeon with a 12-tile recursive-shadowcasting field of view, lazy A* replanning, and key-then-exit-then-frontier priorities, capturing map coverage, steps to exit and revisit ratio, so the score reflects how a dungeon plays rather than just how it looks.
- **Statistics-ready export.** Per-configuration results are pooled into means, standard error and confidence intervals and written to per-algorithm JSON files, then analysed in Python (correlation maps, density estimates and cross-algorithm comparisons).

Runs used fixed 50x50 maps with ten dungeons per configuration, adding up to thousands of dungeon evaluations across every algorithm.

## Learnings

The thesis was as much about experiment design as generation. Making the runs configurable, repeatable and measurable is what let the conclusions come from data instead of impressions.
