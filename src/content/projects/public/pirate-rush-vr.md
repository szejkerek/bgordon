---
title: "Pirate Rush VR"
description: "An arcade high-score VR game for Oculus Quest 2 where players slice flying fruit with a sabre and shoot down barrels with a pistol."
date: "2024-01"
tags: ["Game", "Unity", "VR"]
playUrl: "https://szejkerek.itch.io/pirate-rush-vr"
sourceUrl: "https://github.com/szejkerek/PirateRushVR"
teamSize: 1
---

## Overview

Pirate Rush VR is my engineering thesis, a standalone arcade high-score game for the Oculus Quest 2 that runs directly on the headset as a sideloaded APK with no PC tether. You play a pirate armed with a sabre and a flintlock: slice inbound fruit, shoot barrels, dodge bombs from the cannon towers around you, and chain clean hits into a score multiplier across three difficulty tiers, with an on-device leaderboard for comparing runs. I built it solo, covering gameplay, the weapon and projectile systems, the combo pipeline, VR comfort, on-device persistence, and the Quest 2 build. Because the thesis centred on comfort, I added configurable locomotion, snap and smooth turning, and a comfort mode that reduces simulator sickness.

## Technical Highlights

- **Runtime mesh slicing.** The sabre cuts arbitrary fruit meshes live along the blade's swing plane using EzySlice, then gives each half its own collider and rigidbody so the two pieces fall apart naturally. Scoring a clean cut on an irregular mesh is the harder part, since a bounding box tells you nothing about where the blade passed, so I compute the mesh's exact volume with the divergence theorem (one signed tetrahedron per triangle) and compare both halves against a tolerance tuned per difficulty. Code in [`Sabre.cs`](https://github.com/szejkerek/PirateRushVR/blob/main/Assets/__Scripts/Player/Weapons/Sabre.cs).
- **Analytic ballistic aiming.** Cannon towers solve for launch velocity from kinematics (v_y = sqrt(-2gh) for a target apex height) to loft projectiles at the player along configurable arcs, in [`CannonShooting.cs`](https://github.com/szejkerek/PirateRushVR/blob/main/Assets/__Scripts/Cannons/CannonShooting.cs).
- **Data-driven projectiles.** Each projectile is a ScriptableObject carrying an effect chain such as damage, heal, or freeze, so a new behaviour is a new asset rather than new code. See [`Projectile.cs`](https://github.com/szejkerek/PirateRushVR/blob/main/Assets/__Scripts/Projectiles/Projectile.cs).
- **Stable swipe velocity.** Valve's [`VelocityEstimator`](https://github.com/szejkerek/PirateRushVR/blob/main/Assets/__Scripts/Utility/VelocityEstimator.cs) samples the blade tip into a circular buffer to give a reliable slash-speed reading, which the XR toolkit does not expose directly at the resolution the slicing needs.
- **Slow motion without breaking input.** [`SlowMotionManager`](https://github.com/szejkerek/PirateRushVR/blob/main/Assets/__Scripts/Managers/SlowMotionManager.cs) runs its freeze ramps on `Time.unscaledDeltaTime`, so the effect stays wall-clock accurate even while `Time.timeScale` is bent.

## Learnings

Authoring gameplay as ScriptableObjects (difficulty tiers, projectile effects, combo sequences) held up well through iteration, so late rebalancing came down to editing data rather than touching code.
