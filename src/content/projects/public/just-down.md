---
title: "JustDown"
description: "A from-scratch 3D game demo built in C++ and OpenGL, featuring physics-based movement, advanced rendering effects, and a declarative scene format."
date: "2023-06"
tags: ["Game", "OpenGL", "C++"]
sourceUrl: "https://github.com/szejkerek/JustDown"
teamSize: 1
---

## About This Project

JustDown is a 3D first-person environment implemented directly against the OpenGL 3.3 Core Profile API in C++17, without a pre-built game engine. It demonstrates real-time physics simulation, multi-light Phong shading, parallax-mapped surfaces, and a two-pass HDR bloom pipeline — all built from low-level primitives.

Players walk through the level, jump, observe from a free-fly debug camera, and take proportional fall damage when dropping from height. The level is defined by a plain-text `.scene` file; no recompilation needed to edit geometry, textures, or lighting.

### Features

- **Steep parallax mapping** — per-pixel sub-layer linear interpolation reduces UV banding; layer count is view-angle-adaptive (`mix(8, 32, dot(normal, viewDir))`)
- **HDR bloom pipeline** — dual-attachment FBO for bright-pass extraction → 10-iteration separable Gaussian blur via ping-pong framebuffers → additive combine pass
- **Physics movement** — gravity, AABB collision response (floor vs. wall contact distinguished by center-to-center Y component), proportional fall damage
- **Declarative `.scene` format** — lists models, textures, positions, rotations, scales, and skybox; auto-selects shader variant by texture count
- **Shader uniform cache** — `unordered_map` in `Shader` avoids redundant `glGetUniformLocation` calls per frame

### Technical Architecture

`Application.cpp` owns the main loop, initializes GLFW + GLAD, and threads delta time through the entire update stack for frame-rate-independent physics. `Scene` manages a flat list of `Model` instances, owns the shader pool and skybox, and dispatches each model to the correct shader variant. `Player` resolves horizontal movement relative to camera orientation, integrates gravity per frame, and delegates collision queries to `Scene::checkPlayerCollision`. `PostProcess` wraps the HDR framebuffer pipeline.

`Model` is header-only and handles OBJ parsing, GPU buffer setup (8-float layout for standard materials, 14-float for parallax), transformation, AABB computation, and rendering. All shaders load from files at runtime.

### Engineering Highlights

**Parallax mapping in tangent space** — Requires per-vertex TBN matrix computed from per-face UV deltas using the inverse UV-parallelogram formula: `f = 1 / det(UV_matrix)`, then `tangent = f * (deltaUV2.y * edge1 - deltaUV1.y * edge2)`. The vertex shader transforms light positions and view direction into tangent space before the fragment shader raymarches the height map. Sub-layer interpolation weights the UV estimate between the last two sampled depth boundaries, eliminating banding at low layer counts.

**Ping-pong Gaussian blur** — Horizontal and vertical 1D passes alternate across 10 iterations by binding the other ping-pong FBO each pass. The `firstIteration` flag routes the first blur pass to read from the brightness-extracted output rather than an uninitialized buffer. The `!horizontal` index at the final `glBindTexture` correctly identifies the last-written buffer regardless of pass-count parity.

**Wall-tangent direction** — Player movement perpendicular to a wall surface uses `Vector3.Cross(wallNormal, up)` for the horizontal tangent. The sign is resolved by comparing the player's current forward against both tangent directions — picking the closer one handles all wall angles without left/right flags.
