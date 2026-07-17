---
title: "High Pass Image Filter"
description: "A multithreaded image-sharpening tool comparing C++ and x64 Assembly implementations of the same convolution filter."
date: "2023-08"
tags: ["Graphics", "C++", "Assembly"]
sourceUrl: "https://github.com/szejkerek/HighPassImageFilter"
teamSize: 1
---

## Overview

High Pass Image Filter is a solo university project I built to answer one question with real numbers: how much faster is hand-written x64 Assembly than C++ for the same image filter? A C# host application handles image loading, threading, benchmarking and saving, and calls into two interchangeable native DLLs that expose an identical C ABI, one written in C++ and one in MASM Assembly, so I could swap implementations at runtime and measure them head to head. The filter itself is a 3x3 high-pass convolution that sharpens edges and lifts local contrast.

## Technical Highlights

- **SIMD sum with `psadbw`.** The Assembly path packs the eight neighbouring pixels into an XMM register and uses `psadbw` (sum of absolute differences against zero) to add them in a single instruction instead of eight scalar operations, exploiting the kernel's uniform `-1` coefficients. Code in [`Asm.asm`](https://github.com/szejkerek/HighPassImageFilter/blob/main/ASM/Asm.asm).
- **Branchless clamping.** The result is clamped to the valid 0-255 range with `cmovg`/`cmovl` conditional moves rather than branches, keeping the per-pixel hot path free of misprediction stalls, also in [`Asm.asm`](https://github.com/szejkerek/HighPassImageFilter/blob/main/ASM/Asm.asm).
- **Runtime-swappable native DLLs.** Both implementations export the same C ABI (`extern "C" __declspec(dllexport)`), so the host chooses either one at runtime through P/Invoke with no duplicated calling code. See [`dllmain.cpp`](https://github.com/szejkerek/HighPassImageFilter/blob/main/CPP/dllmain.cpp).
- **Row-range threading.** The host splits the image into row ranges across a configurable thread count (1 to 64) with correct byte-offset math and remainder handling, preserving memory locality. See [`ThreadsManager.cs`](https://github.com/szejkerek/HighPassImageFilter/blob/main/JA_Projekt/Main/ThreadsManager.cs).
- **Bulk bitmap I/O.** Pixels are lifted into a flat byte array in one `Marshal.Copy` via `LockBits`, avoiding the per-pixel `GetPixel`/`SetPixel` penalty. See [`CustomBitmap.cs`](https://github.com/szejkerek/HighPassImageFilter/blob/main/JA_Projekt/Main/CustomBitmap.cs).
- **Honest benchmarking.** The harness trims the first 2.5% of samples to discard JIT warm-up, then reports average time with standard deviation across seven thread counts. See [`TimeMesurement.cs`](https://github.com/szejkerek/HighPassImageFilter/blob/main/JA_Projekt/Utility/Benchmark/TimeMesurement.cs).

The payoff: hand-written Assembly ran nearly twice as fast as the compiler's best C++.

## Learnings

This was my first serious Assembly work, and the biggest lesson was to measure rather than assume. Seeing exactly where SIMD and branchless code moved the numbers taught me more about the gap between source code and the CPU than any amount of reading.
