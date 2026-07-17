---
title: "Physically Based Rendering"
description: "University experiments with pbrt-v4 exploring rendering, volumetric light, and GPU path tracing."
date: "2024-10"
tags: ["Graphics", "C++"]
sourceUrl: "https://github.com/szejkerek/RRO"
teamSize: 1
---

## Overview

A set of physically based rendering experiments built on the pbrt-v4 reference renderer during university labs. Instead of touching the renderer's core, I authored and configured scenes to study how modern light transport behaves: comparing integrators, materials and participating media, then analysing how each parameter moved noise, image quality and render time.

## Technical Highlights

- **Material and light-transport study.** A Cornell-box-style scene instances one mesh nine times with different BxDFs (diffuse, dielectric, textured) under identical lighting, isolating how each material responds. See [`scene.pbrt`](https://github.com/szejkerek/RRO/blob/main/Scenes/scene.pbrt).
- **Volumetric media.** A participating-media scene lit by a spotlight, rendered with pbrt's volumetric path integrator to study fog and scattering. Output in [`spotFog.png`](https://github.com/szejkerek/RRO/blob/main/Scenes/spotFog.png).
- **Path tracing versus bidirectional.** The same setup rendered with unidirectional and bidirectional path tracing to compare noise and convergence. See [`bidir.png`](https://github.com/szejkerek/RRO/blob/main/Scenes/bidir.png).
- **Spectral rendering.** Scenes authored for pbrt's sampled-spectrum pipeline instead of RGB, combining procedural and image-based textures. See [`template/scene.pbrt`](https://github.com/szejkerek/RRO/blob/main/Scenes/template/scene.pbrt).
- **GPU rendering with CUDA and OptiX.** The build was configured for GPU-accelerated rendering, with a live `tev` display server and progressive samples-per-pixel for fast iteration. See [`commands.txt`](https://github.com/szejkerek/RRO/blob/main/Scenes/commands.txt).

## Learnings

The value here was less about writing renderer code and more about reading how a production-grade renderer is put together, and learning to reason about rendering choices from measured output rather than guesswork.
