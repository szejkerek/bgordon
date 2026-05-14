---
title: "Lethal Speed"
description: "A fast-paced parkour action game where movement mastery and split-second sword combat decide how quickly you can clear three distinct levels."
date: "2023-09"
tags: ["C#", "Unity", "Game Development", "State Machine", "Parkour", "Physics-Based Movement", "Enemy AI", "NavMesh", "Animation Rigging", "DOTween", "Addressables", "Speedrunning", "CI/CD"]
sourceUrl: "https://github.com/szejkerek/LethalSpeed"
featured: true
teamSize: 6
---

## About This Game

LethalSpeed is a Unity first-person speedrunning game built around a deep parkour movement system and sword-based combat. Players select one of three levels and eliminate all enemies as fast as possible using an extensive movement toolkit: sprinting, crouching, sliding, wall-running, dashing, grapple-hook launching, and spring-joint rope swinging. A persistent timer records best completion times per level.

The combat system is deliberately constrained to a single melee sword attack — creating constant tension to close distance quickly before taking gunfire. Death triggers a brief slow-motion effect. As **Project Manager** of the 6-person team, I was responsible for the movement system architecture, enemy AI, weapon implementation, and core gameplay systems.

### Features

- **Eleven movement states** — each an independent C# class; the main loop contains no switch statements, all branching delegated to the current state object
- **Seven-point vision system** — enemy raycasts to center, head, feet, and four side points with a voting rule for correct partial-occlusion detection
- **Procedural rope visualization** — scalar spring-damper drives wave amplitude; sine + cosine on perpendicular axes with 90° phase offset produces a 3D helical wave
- **Persistent leaderboard** — best times serialized to JSON (AES-256 encrypted options) via `IDataService`/`JsonDataService`
- **CI/CD pipeline** — GitHub Actions + Game-CI runs PlayMode and EditMode tests before Windows 64-bit builds; Library folder cached between runs

### Technical Architecture

**Player movement:** `PlayerMovement` delegates `Update`/`Move`/`Begin`/`End` to the current `MovementState`. Eleven states (Running, Air, Crouching, Sliding, Dashing, Wallrunning, Grappling, Swinging, LedgeClimbing, Death, Idle-equivalent) are plain C# classes receiving the context as a parameter. Transitions happen inside each state's `CheckForModeChange`, keeping transition logic localized to the state that knows when to exit.

**Enemy AI:** `StateMachineEnemyAI` delegates `UpdateState` via nine states created by `StateFactoryEnemyAI`. `VisionEnemyAI`, `LocomotionEnemyAI` (NavMesh), and `WeaponEnemyAI` are composed rather than inherited. Emotional transitions (flee/engage) are gated by a global cooldown timer plus per-encounter boolean flags, preventing oscillation jitter without hysteresis logic.

**Persistent systems:** `SystemsBootstrapper` uses `RuntimeInitializeOnLoadMethod(BeforeSceneLoad)` to instantiate Addressable prefabs before any gameplay scene's `Awake` runs, eliminating scene-load-order dependency problems.

### Engineering Highlights

**Wall-tangent direction at runtime** — `Vector3.Cross(wallNormal, Vector3.up)` gives the unsigned horizontal tangent. Sign disambiguation: compare `(orientation.forward - forwardDir).magnitude` vs. `(orientation.forward + forwardDir).magnitude` and pick the smaller distance. Works at any wall angle without storing left/right wall flags.

**Tiered speed clipping** — Large overshoots (>1 m/s above cap) decay gradually via time-scaled deceleration preserving momentum feel; small overshoots snap immediately to cap. `_initialSpeed` at wall-run start is tracked separately from `CurrentMaxSpeed`, allowing players to carry momentum from a pre-wall-run dash through the wall phase — rewarding movement chaining.

**Multi-point occluded vision** — Seven body-part positions derived from player position and live scale (`playerHeight * localScale.y` correctly repositions top/bottom during crouch). Voting rule: any core part (center, top, bottom) unoccluded OR ≥2 side points simultaneously unoccluded. Prevents wall-hidden detection while correctly handling partial-exposure cases.
