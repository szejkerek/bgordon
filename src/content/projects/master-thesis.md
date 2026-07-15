---
title: "Procedural Dungeon Generation"
description: "A master's thesis presenting a framework for evaluating and comparing procedural dungeon-generation algorithms — BSP, Cellular Automata, Diffusion-Limited Aggregation, and Drunkard Walk — in Unity, backed by a statistical analysis of their output."
date: "2024-08"
tags: ["Game", "Unity"]
sourceUrl: "https://github.com/szejkerek/MasterThesis"
teamSize: 1
---

## About This Project

A master's thesis presenting a complete framework for evaluating and comparing procedural dungeon generation. A Unity generator implements four classic algorithms — Binary Space Partitioning (BSP), Cellular Automata, Diffusion-Limited Aggregation (DLA), and Drunkard Walk — and produces dungeon layouts that are then tested, measured, and compared in a consistent way through a statistical analysis of their structural properties.

### Features

- **Four generation algorithms** — BSP, Cellular Automata, DLA, and Drunkard Walk, each configurable and rendered in the Unity scene
- **Batch experiment runs** — multiple runs per algorithm exported to JSON for offline analysis
- **Statistical analysis** — a separate analysis stage compares the generators across metrics and stability runs, backing the thesis conclusions with data
