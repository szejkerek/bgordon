---
title: "Knot Fun"
description: "An award-winning local co-op arena shooter where players fight enemy swarms while physically connected by a damage-dealing rope."
date: "2024-12"
tags: ["Game", "Unity"]
# sourceUrl: "https://github.com/PlaceHoldersStudio/KnotFun"  # private repo
teamSize: 6
---

## Overview

Knot Fun is a local co-op arena shooter built by a six-person Placeholders Studio team at the BEST IT Festival Game Jam in Gliwice, where it won first place. Up to six players fight continuous swarms of enemies while every player is tied to the others by a simulated rope that reacts to the environment, limits how far the group can spread, and damages enemies it sweeps through, so positioning and coordination become the core of combat. I built the first working rope prototype that set the mechanic's direction during the jam, and afterwards focused on combat feedback and polish as the game went on to be shown at ZTGK, Digital Dragons and Game Access.

## Technical Highlights

- **Verlet rope at the centre of combat.** The rope is a chain of segments simulated with position-based Verlet integration and multi-pass constraint solving, colliding against scene geometry, which gives it stable springy behaviour without explicit spring forces.
- **N-player rope topology.** The rope network links players in a chain and closes into a loop for three or more, accumulating pull forces per player so the group is physically held together no matter the player count.
- **Tension you can read.** Rope tension drives a colour and emission ramp on the rope material, so players can see how stretched they are before it yanks them back.
- **Data-driven upgrades.** Between levels an upgrade generator samples stat modifiers against a weapon-possibility matrix and per-stat bounds, with balance data authored in spreadsheets and imported, keeping the procedural upgrades sensible and in balance.
- **Escalating swarms.** Enemy count, spawn rate, health and speed scale each level, feeding a pooled enemy list with per-enemy damage cooldowns so a single rope sweep cannot multi-hit the same target.

## Learnings

Working on a jam-winning game that then went to industry showcases taught me how a rough prototype survives contact with real players, and how much of that survival comes from iteration and feel rather than the original idea.
