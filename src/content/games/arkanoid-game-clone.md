---
title: "Arkanoid Game Clone"
description: "A faithful C++ recreation of the 1986 Taito arcade classic, complete with all 33 original levels and a boss fight."
date: "2022-06"
tags: ["C++", "SFML", "Game Development", "2D Physics", "OOP", "Collision Detection", "Scene Management", "Design Patterns", "Windows"]
sourceUrl: "https://github.com/szejkerek/ArkanoidGameClone"
featured: false
teamSize: 1
---

## About This Project

ArkanoidGameClone is a feature-complete reproduction of Arkanoid, the 1986 Taito arcade game, built in C++17 with SFML. It includes all 33 original stages loaded from external text-format map files, four brick types, three power-ups, and a dedicated boss encounter. A main menu, level selector with stage previews, tutorial screen, and high-score tracking round out the feature set.

### Features

- **All 33 original stages** — loaded from flat 325-character text files validated at runtime by `std::regex`
- **Segmented Vaus paddle** — seven independently collidable parts (`BluePart`, `RedPart`, `GreyPart`, `CentralPart`) each return a distinct reflection vector, reproducing zone-based angle steering
- **Four brick types** — colour bricks, silver bricks (HP scales with stage: `2 + stageNumber/8`), gold bricks, and the 64-HP boss brick worth 10,000,000 points
- **Three power-ups** — health restore, ball-split, and slow-down via a two-stage random roll with overlap prevention
- **Template resource manager** — single `Resource<T>` handles textures, fonts, and sound buffers with `O(1)` cache and filesystem auto-discovery

### Technical Architecture

`SceneManager` owns the active `Scene` and dispatches `Update`/`draw` each frame. Concrete scenes (`MenuScene`, `TutorialScene`, `LevelSelectorScene`, `GameScene`) inherit from abstract `Scene` and manage their own logic in isolation.

Entities inherit from abstract `EntityRectangle` / `EntityCircle` base classes. Bricks implement `IBrick`. The Vaus paddle decomposes into seven `IVausPart` subclass instances each with a hardcoded `GetReflectionVector()`.

### Engineering Highlights

**AABB penetration-depth collision** — Overlap rectangle from `FloatRect::intersects` → minimum dimension identifies the struck face → ball displaced outward by penetration depth → standard reflection formula `r = d - 2(d·n)n` applied. Without the displacement step, the reflected ball re-triggers on the next frame and oscillates. The same two free functions (`CalculateCorrectionVector`, `ReflectedVector`) handle both brick and paddle collisions.

**Text-file stage format with regex validation** — Each stage is a flat 325-character grid of single-character brick codes. `Stage` runs `std::regex` against the full file before constructing any objects, failing fast on malformed input rather than silently producing corrupt layouts or undefined behavior from an unchecked `switch` fall-through.

**Template lazy-loading resource cache** — `Resource<T>` stores `shared_ptr<ResourceType>` in `unordered_map`, walks the asset tree with `std::filesystem::recursive_directory_iterator` on first access, and returns raw non-owning pointers thereafter. The `ResourceManager` singleton wraps three typed `Resource<T>` instances, eliminating duplicated loading logic across all SFML asset types.
