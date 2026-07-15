---
title: "Knot Fun"
description: "Co-op arena shooter where players are physically tethered by a Verlet-physics rope that swings through the environment and deals damage to enemies on contact."
date: "2024-12"
tags: ["Game", "Unity"]
# sourceUrl: "https://github.com/PlaceHoldersStudio/KnotFun"  # private repo
teamSize: 6
---

## About This Game

Knot Fun is a 3D co-op arena shooter where two players are connected by a physically simulated rope. The rope is not merely visual — it collides with geometry and damages enemies on contact, turning cooperative positioning into the core combat mechanic.

### Features

- **Physics Rope**: Verlet integration rope that swings dynamically and deals damage
- **Co-op Play**: Two or more players connected — coordination is required
- **Wave Combat**: Fight enemy waves with distinct types (melee, ranged, AOE, throw)
- **Upgrade System**: Procedurally generated card upgrades between waves driven by Google Sheets balance data
- **Tension Feedback**: Rope colour shifts from grey to yellow as players approach maximum distance

### Technical Highlights

- Custom Verlet integration rope simulation with multi-pass constraint solving and sphere-based collision response
- Per-weapon possibility matrix prevents nonsensical upgrades via rejection sampling
- Multi-player force accumulation aggregates impulses per player before applying them to avoid same-frame interference
- Google Sheets CSV backend for live balance editing, parsed with a custom quoted-field CSV parser

### Achievement

**1st Place** at the BEST IT Festival Game Jam (theme: "In a time loop").
