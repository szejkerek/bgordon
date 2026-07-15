---
title: "The Backyard"
description: "Isometric resource management game set in a kid's treehouse, featuring childhood outdoor games. Created during a 48-hour GameJamPlus event."
date: "2023-05"
tags: ["Game", "Unity"]
# sourceUrl: "https://github.com/PlaceHoldersStudio/TheBackyard"  # private repo
teamSize: 5
---

## Overview

The Backyard is an isometric game built by a five-person team over a 48-hour GameJamPlus in Lublin, set around a kid's treehouse and built out of classic childhood outdoor games. It never shipped and did not place, but it was a genuine team crucible: several people were touching Unity for the first time, so much of the work was learning the engine, splitting responsibilities and getting a rough idea to playable inside two days.

## Technical Highlights

- **Modular character customization.** Rather than drawing every character by hand, a `CustomModularSet` assembles each kid from nine independent sprite layers (body, hair, brows, eyes, nose and mouth, plus skin, hair and shoe colour channels) drawn from authored pools, so a small art set combines into thousands of distinct looks. This was our best trick for getting variety cheaply under jam time.
- **Resource-management loop.** A day and night cycle with a limited hour budget and a "Caps" currency ties the minigames to a metagame, so winning a game earns money but burns hours and players have to weigh how many to risk.
- **Childhood minigames.** Arcade challenges sit inside that loop, including a rising "floor is lava" hazard with escalating speed phases and a game of tag driven by simple chase-and-flee agents.

## Learnings

The real lesson was scoping and teamwork under a hard deadline, especially bringing teammates who were new to Unity into one shared codebase without stalling the whole group.

