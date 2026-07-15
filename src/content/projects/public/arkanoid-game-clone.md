---
title: "Arkanoid Game Clone"
description: "My first game project, built in C++ and SFML as a recreation of the classic Arkanoid arcade game."
date: "2022-06"
tags: ["Game", "C++"]
sourceUrl: "https://github.com/szejkerek/ArkanoidGameClone"
teamSize: 1
---

## Overview

Arkanoid Game Clone was the first game I ever built, a solo university project recreating the 1986 arcade classic in C++17 and SFML with no game engine. Working without an engine meant writing the core systems, scenes, collisions, resources and UI, from first principles, which was exactly what I wanted from it.

## Technical Highlights

- **Collision without tunnelling.** Ball-versus-brick uses AABB penetration depth to decide which face was hit, pushes the ball out of the collider, then applies the reflection formula `r = d - 2(d·n)n`, so the ball never oscillates through a thin brick across frames. See [`Ball.cpp`](https://github.com/szejkerek/ArkanoidGameClone/blob/main/ArkanoidClone/SourceCode/Entity/Objects/Ball.cpp).
- **Hand-written scene management.** A `SceneManager` owns the active scene and forwards updates; the menu, game, level-selector and tutorial scenes derive from a common base and manage their own lifecycle. See [`SceneManager.h`](https://github.com/szejkerek/ArkanoidGameClone/blob/main/ArkanoidClone/SourceCode/Scenes/SceneManager.h).
- **Templated resource cache.** A generic `Resource<T>` lazily loads textures, fonts and sounds from disk and caches them as `shared_ptr`, so all three asset types share one implementation. See [`Resources.h`](https://github.com/szejkerek/ArkanoidGameClone/blob/main/ArkanoidClone/SourceCode/Utility/Resources.h).
- **Arcade-accurate paddle.** The bat is split into seven zones, each returning its own reflection vector, reproducing the original's angle steering rather than a plain surface-normal bounce. See [`VausPart.h`](https://github.com/szejkerek/ArkanoidGameClone/blob/main/ArkanoidClone/SourceCode/Entity/Objects/VausPart.h).
- **Data-driven levels.** All 33 stages are flat 13x25 text grids validated with `std::regex` on load, where single characters map to brick types, so levels can be edited without touching code. See the [stage files](https://github.com/szejkerek/ArkanoidGameClone/tree/main/ArkanoidClone/Resources/Stages/Original).
- **Power-ups and scaling difficulty.** Extra life, multi-ball and slow-down drop on a weighted roll, and silver bricks scale their hit points with the stage number. See [`PowerUp.h`](https://github.com/szejkerek/ArkanoidGameClone/blob/main/ArkanoidClone/SourceCode/Entity/Objects/PowerUp.h).

## Learnings

As my first game, it taught me how the loop, rendering, input, collisions and object-oriented structure actually fit together. That foundation is the thing everything I have built since stands on.
