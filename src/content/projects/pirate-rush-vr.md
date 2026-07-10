---
title: "Pirate Rush VR"
description: "A VR rhythm-action game for Oculus Quest 2 where players slice flying fruit and shoot barrels as a pirate, submitted as an engineering thesis."
date: "2024-01"
tags: ["Game", "Unity", "VR"]
playUrl: "https://szejkerek.itch.io/pirate-rush-vr"
sourceUrl: "https://github.com/szejkerek"
teamSize: 1
---

## About This Game

PirateRushVR is a standalone VR arcade game for Oculus Quest 2, developed as an undergraduate engineering thesis. Players wield a sabre to slice inbound fruit projectiles and a flintlock pistol to shoot barrels, earning score multipliers for clean play while dodging bombs fired by surrounding cannon towers.

Before each session, players enter a nickname via an in-VR keyboard and choose a difficulty level. Scores persist to a local leaderboard, and a real-time in-game display tracks the current run against the personal best. Comfort options include adjustable volume, snap/smooth turning, and a comfort mode to reduce simulator sickness. The game ships as a sideloaded APK installed via ADB.

### Features

- **Dual-weapon gameplay** — slice fruit with a sabre, shoot barrels with a flintlock pistol; wrong weapon on wrong target deducts score
- **Perfect slice bonus** — awards extra points when the cut passes near the center of the mesh, evaluated via exact volume computation
- **Difficulty system** — Easy / Medium / Hard via `DifficultySO` ScriptableObjects; all spawn rates, timing, and tolerances are inspector-configurable
- **Persistent leaderboard** — scores serialized to JSON on device, compared in real time during gameplay
- **Slow-motion freeze** — special projectiles trigger a time-scale effect using `unscaledDeltaTime` so UI and input remain responsive

### Technical Architecture

The project is structured around manager singletons (`GameManager`, `CannonsManager`, `ScoreManager`, `HealthManager`, `AudioManager`, `SlowMotionManager`) using a two-level `StaticInstance<T>` / `Singleton<T>` MonoBehaviour hierarchy. A `SystemBootstrapper` runs via `[RuntimeInitializeOnLoadMethod(BeforeSceneLoad)]` and uses Addressables to instantiate a `PersistentSystems` prefab before the first scene loads, avoiding `DontDestroyOnLoad` clutter.

Cannon towers drive projectile spawning through a custom **`TickEngine` at 32 Hz**, decoupled from the rendering frame rate. The combo system uses a `Queue<ICannonBehavior>` of Command objects — `CannonSpawnBehavior` and `CannonWaitBehavior` — created by a `ComboItemFactory`. Named combo sequences are loaded from `ComboDatabase` ScriptableObjects via Addressables labels; when the queue drains, a probability roll decides between replaying a named combo and generating a fresh procedural one from `DifficultySO` weights.

The weapon system is built on an abstract `Weapon` base class. `Sabre` performs Linecast-based hit detection and invokes EzySlice to cut the target mesh into two hulls. `Pistol` fires a `Bullet` prefab on the XR trigger action. Projectile effects (damage, healing, freeze) are ScriptableObject chains on each `ProjectileSO`, applied at hit time via `Projectile.ApplyEffects` — composing multi-effect projectiles from the inspector without code changes.

### Engineering Highlights

**Perfect slice detection via signed mesh volume** — Judging whether a cut passed near the center of a non-uniform mesh cannot use bounding boxes. Instead, `CalculateVolume` applies the divergence theorem: each surface triangle forms a signed tetrahedron with the origin, and summing `(v1 × v2) · v3 / 6` over all triangles gives exact mesh volume. After EzySlice produces both hulls, `IsSlicePerfect` checks whether each hull's volume ratio falls within `[0.5 ± tolerance]`, where `perfectSliceTolerance` comes from `DifficultySO`.

**Ballistic trajectory with configurable apex height** — Cannon towers derive launch velocity analytically from kinematics: `v_y = sqrt(-2 * g * h)` for a desired apex `h`, total flight time `sqrt(-2h/g) + sqrt(2*(dy-h)/g)`, horizontal velocity = XZ displacement ÷ flight time. Because `gravity` is sampled from a per-shot `Interval<float>`, each projectile follows a visually distinct arc while aiming remains accurate.

**Tick-rate-independent combo timing** — The `TickEngine` fires `UpdateOnTick` at 32 Hz regardless of GPU frame rate, which matters on the Quest 2's variable-refresh-rate display. `ComboItemFactory.CalculateTicks` converts authored durations (e.g., 750 ms) into tick counts at the current tick rate, so rebalancing difficulty never requires changing timing constants in code.
