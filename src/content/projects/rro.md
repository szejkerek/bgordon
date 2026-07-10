---
title: "Physically Based Rendering"
description: "Physically based rendering experiments built on the pbrt-v4 research renderer — spectral rendering, volumetric scattering, and GPU path tracing via CUDA/OptiX."
date: "2024-10"
tags: ["Graphics", "C++"]
sourceUrl: "https://github.com/szejkerek/RRO"
teamSize: 1
---

## About This Project

Physically based rendering experiments built on top of pbrt-v4, the research renderer from *Physically Based Rendering: From Theory to Implementation*. The work explores the modern PBR pipeline — spectral rendering, null-scattering volumetrics, and GPU-accelerated path tracing — as a course on advanced rendering (RRO).

### Highlights

- **Spectral rendering** — all light-transport computation is performed on point-sampled spectra; RGB is confined to scene description and final output
- **Modernized volumetric scattering** — a `VolPathIntegrator` based on the null-scattering path-integral formulation, with tighter majorants for the `GridDensityMedium`
- **GPU path tracing** — the full CPU `VolPathIntegrator` functionality runs on the GPU on CUDA + OptiX systems
- **CMake build with submodules** — third-party dependencies vendored via git submodules; release build by default
