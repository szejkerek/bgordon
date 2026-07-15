---
title: "JustDown"
description: "A 3D game demo built with C++ and OpenGL, featuring custom physics, shaders, parallax mapping, HDR, and bloom.."
date: "2023-06"
tags: ["Game", "OpenGL", "C++"]
sourceUrl: "https://github.com/szejkerek/JustDown"
teamSize: 1
---

## Overview

JustDown is a solo 3D game demo I wrote from scratch in C++ and OpenGL 3.3 with no game engine, loosely inspired by *Only Up!* but reversed, so the player descends instead of climbs. Everything an engine normally hides, the renderer, the shaders, the post-processing, the physics and the level loading, I built by hand, which was the whole point of the project.

## Technical Highlights

- **From-scratch OpenGL renderer.** Manages the VAO/VBO setup, two vertex layouts (standard and parallax), framebuffers, and a uniform-location cache that avoids redundant lookups every frame. See [`Model.h`](https://github.com/szejkerek/JustDown/blob/main/src/Model.h).
- **Steep parallax mapping.** The fragment shader ray-marches a height map in tangent space with an adaptive layer count (8 at normal incidence, up to 32 at grazing angles) and interpolates between crossing samples to remove banding. See [`Parallax/FragmentShader.fs`](https://github.com/szejkerek/JustDown/blob/main/src/Shaders/Parallax/FragmentShader.fs).
- **HDR bloom with ping-pong buffers.** A bright-pass extraction into `RGB16F` targets, a ten-pass separable Gaussian blur alternating between two framebuffers, then an additive composite. See [`PostProcess.h`](https://github.com/szejkerek/JustDown/blob/main/PostProcess.h).
- **Per-face TBN construction.** Tangent and bitangent vectors are computed analytically from UV deltas and packed as extra vertex attributes, so every point light works correctly in tangent space. See [`Model.h`](https://github.com/szejkerek/JustDown/blob/main/src/Model.h).
- **Physics with fall damage.** Gravity-integrated movement, AABB collision, and floor-versus-wall discrimination from the contact normal, with fall damage scaled by drop height past a threshold. See [`Player.h`](https://github.com/szejkerek/JustDown/blob/main/src/Player.h).
- **Declarative scene format.** A plain-text `.scene` file lists models, textures, transforms, skybox and spawn point, and the loader picks the right shader variant from the texture count, so levels change with no recompile. See [`Level0.scene`](https://github.com/szejkerek/JustDown/blob/main/Data/Level0.scene).

## Learnings

Building the low-level stack myself gave me a much clearer picture of what engines quietly handle, from GPU buffer management to the framebuffer juggling that post-processing needs. It remains one of the most technically valuable things I have built.
