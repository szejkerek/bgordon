---
title: "Paper Blades"
description: "An award-winning roguelike strategy game where players command origami samurai with their voice."
date: "2024-06"
tags: ["Game", "Unity"]
# sourceUrl: "https://github.com/PlaceHoldersStudio/PaperBlades"  # private repo
teamSize: 6
---

## Overview

Paper Blades is a roguelike strategy game set in a stylised feudal Japan where you command a squad of origami samurai using voice commands. Built by a six-person Placeholders Studio team, it became a turning point for the studio, winning second place at the 16th ZTGK competition along with the Digital Dragons Award, the Game Access Award, and long-term legal support from GameDev Lawyer. It was one of the first projects to bring us wider recognition and to turn our group into a proper studio. I worked on the game's voice-control side and built much of the shared systems layer it ran on.

## Technical Highlights

- **Voice-commanded units.** Spoken commands are recognised and mapped to orders that drive the samurai, which behave as GOAP-based ally agents pursuing goals rather than following scripted steps, so the squad reacts to instructions in the middle of a fight.
- **Readable voice feedback.** An on-screen visualiser shows what the game heard, so players can trust that a command actually registered before committing to it.
- **Decoupled event bus.** Much of the game runs on a ScriptableObject event bus that lets systems talk without direct references, with a dispatch loop that safely handles listeners removing themselves mid-event.
- **Reusable studio systems.** The audio manager, with DOTween-driven music crossfades and positional sound, and a multi-profile save and load layer were built to be reused, and later became part of the template the studio carried into new projects.

## Learnings

Beyond the awards, Paper Blades proved we could take an unusual concept, voice control of a strategy game, and build it into something polished enough to show to the industry. It also taught me the value of building systems as reusable foundations rather than one-off game code.
