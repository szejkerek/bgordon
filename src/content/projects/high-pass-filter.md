---
title: "High Pass Image Filter"
description: "A multi-threaded image sharpening tool that compares the performance of C++ and hand-written x64 Assembly implementations of the same convolution filter."
date: "2023-08"
tags: ["Graphics", "C++", "Assembly"]
sourceUrl: "https://github.com/szejkerek/HighPassImageFilter"
teamSize: 1
---

## About This Project

HighPassImageFilter is a Windows console application that applies a 3×3 high-pass convolution kernel (`[-1,-1,-1 / -1,9,-1 / -1,-1,-1]`) to bitmap images using two interchangeable native DLL backends: one in C++ and one in x64 MASM Assembly. The tool exists to quantify the performance difference between a compiler-optimised implementation and a manually SIMD-optimised one across a configurable number of parallel threads.

Benchmarking mode runs both implementations across seven thread counts (1, 2, 4, 8, 16, 32, 64) for a user-specified sample count and prints average execution time with standard deviation for each configuration. University project, semester 5, 2022/2023.

### Features

- **Two DLL backends** — C++ (`ExecuteInCpp`) and x64 MASM Assembly (`ExecuteInAssembly`) export the same C ABI
- **Configurable parallelism** — row-based thread decomposition across 1–64 threads
- **Benchmark harness** — 7 thread counts × N samples, trims first 2.5% to remove JIT warm-up, reports mean ± std dev
- **Strategy pattern** — `Algorithm` abstract base + `CppAlgorithm`/`AsmAlgorithm` subclasses; `ThreadsManager` is algorithm-agnostic
- **Bulk bitmap I/O** — `CustomBitmap` uses `LockBits`/`Marshal.Copy` to avoid per-pixel `GetPixel`/`SetPixel` GDI+ overhead

### Technical Architecture

Three Visual Studio projects in one solution: **JA_Projekt** (.NET 6.0 C# host — orchestration, UI, benchmarking), **CPP** (C++ DLL), **ASM** (MASM DLL). The C# host loads a bitmap into a flat `byte[]`, partitions the row range across N worker threads via TPL `Task`, and dispatches each to the selected DLL for its assigned rows. The DLL writes directly into a pre-allocated output buffer.

`CalculateThreadsValues` computes `realHeight = height - 2` and `realWidth = stride - 2*pixelStride` to exclude border pixels that lack a complete 3×3 neighbourhood. `CalculateStartingIndex` constructs the precise byte offset for each thread-row combination, accounting for GDI+ stride padding.

### Engineering Highlights

**SIMD horizontal sum via `psadbw`** — Because all eight neighbour coefficients are `-1`, the dot product reduces to `9 × center − sum(8 neighbours)`. The Assembly implementation packs 8 surrounding bytes into the lower half of `XMM1` via `pinsrb`, then uses `psadbw` against a zeroed `XMM2` as a horizontal byte sum (since `|v - 0| = v` for unsigned bytes). Center pixel is loaded separately, multiplied by 9, and the neighbour sum subtracted — computing the full convolution in one SIMD instruction for the accumulation step.

**Branchless clamping** — `cmovg eax, ebx` (ebx=255) and `cmovl eax, ebx` (ebx=0) clamp the result to [0,255] without branch instructions, avoiding pipeline flush costs on the per-pixel hot path where saturation is frequent in high-contrast regions.

**Benchmark warm-up trimming** — `RemoveFaultyMeasurements(floor(N × 0.025))` discards the first 2.5% of samples before computing statistics, eliminating JIT compilation and CPU cache cold-start bias. Standard deviation uses the population formula via LINQ: `sqrt(average(pow(v - mean, 2)))`.
