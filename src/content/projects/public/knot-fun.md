---
title: "Knot Fun"
description: "An award-winning local co-op arena shooter where players fight enemy swarms while physically connected by a damage-dealing rope."
date: "2024-12"
tags: ["Unity", "C#"]
# sourceUrl: "https://github.com/PlaceHoldersStudio/KnotFun"  # private repo
teamSize: 4
---

## Overview

Every player is tied to the others by a simulated rope that limits how far you can spread, reacts to the environment, and slices through any enemy it sweeps, so positioning and coordination become the whole fight. Knot Fun is a local co-op arena shooter, first built by a four-person team at the BEST IT Festival Game Jam in Gliwice where it won first place, then expanded by the full Placeholders Studio team and shown at ZTGK, Digital Dragons and Game Access. I built the first working rope prototype that set the mechanic's direction, then focused on combat feedback and polish.

## Technical Highlights

- **Verlet rope at the centre of combat.** The rope is a chain of segments simulated with position-based Verlet integration and multi-pass constraint solving, colliding against scene geometry, which gives it stable springy behaviour without explicit spring forces.
- **N-player rope topology.** The rope network links players in a chain and closes into a loop for three or more, accumulating pull forces per player so the group is physically held together no matter the player count.
- **Tension you can read.** Rope tension drives a colour and emission ramp on the rope material, so players can see how stretched they are before it yanks them back.
- **Data-driven upgrades.** Between levels an upgrade generator samples stat modifiers against a weapon-possibility matrix and per-stat bounds, with balance data authored in spreadsheets and imported, keeping the procedural upgrades sensible and in balance.
- **Escalating swarms.** Enemy count, spawn rate, health and speed scale each level, feeding a pooled enemy list with per-enemy damage cooldowns so a single rope sweep cannot multi-hit the same target.

## Learnings

Working on a jam-winning game that then went to industry showcases taught me how a rough prototype survives contact with real players, and how much of that survival comes from iteration and feel rather than the original idea.
