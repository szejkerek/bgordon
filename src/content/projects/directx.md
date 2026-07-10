---
title: "DirectX Fundamentals"
description: "A series of progressive DirectX 12 labs covering the full GPU rendering pipeline — from a bare triangle to geometry-shader billboards and tessellated heightmap displacement."
date: "2024-06"
tags: ["Graphics", "C++"]
sourceUrl: "https://github.com/szejkerek/DirectX-Fundamentals"
teamSize: 1
---

## About This Project

A set of progressive DirectX 12 labs that walk through the GPU rendering pipeline stage by stage — starting from a single triangle and building up to camera-facing billboards generated in the geometry shader and terrain displaced by a heightmap through the tessellation pipeline. Hands-on training in low-level HLSL shader programming.

### Engineering Highlights

**Camera-aligned billboards in the geometry shader** — The geometry shader expands each input vertex into a camera-facing quad (two triangles), emitting up to 18 vertices per triangle. It builds a view-aligned orthonormal basis on the GPU: `look` points from the vertex to the camera, `cross(look, world_up)` gives `right`, and `cross(look, right)` gives `up`. The pixel shader discards fully black fragments for cheap alpha cutout transparency without blend-state changes.

**Heightmap displacement via tessellation** — After the hull shader sets tessellation factors, the domain shader bilinearly interpolates the four patch corners across the generated `SV_DomainLocation`, samples a heightmap texture at the interpolated UV, and displaces the vertex's Y coordinate before projecting to clip space — turning a flat quad patch into displaced terrain entirely on the GPU.
