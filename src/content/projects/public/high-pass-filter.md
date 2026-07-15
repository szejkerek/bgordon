---
title: "High Pass Image Filter"
description: "A multithreaded image-sharpening tool comparing C++ and x64 Assembly implementations of the same convolution filter."
date: "2023-08"
tags: ["Graphics", "C++", "Assembly"]
sourceUrl: "https://github.com/szejkerek/HighPassImageFilter"
teamSize: 1
---

High Pass Image Filter is a university project built to compare the performance of the same image-processing algorithm implemented in C++ and hand-written x64 Assembly.

The application applies a 3×3 high-pass convolution filter to bitmap images, sharpening edges and increasing local contrast. A C# host application handles image loading, thread management, benchmarking, and saving the final result, while the actual filtering is performed by two interchangeable native DLLs—one written in C++ and the other in MASM Assembly.

The image is divided into row ranges and processed in parallel using a configurable number of threads. A dedicated benchmark mode runs both implementations with different thread counts and compares their average execution times and stability across multiple samples.

The Assembly version uses SIMD instructions to process pixel data more efficiently. Since the filter subtracts all eight neighbouring pixels from nine times the centre pixel, the implementation uses `psadbw` to quickly calculate the sum of the surrounding values. The final result is clamped to the valid pixel range without regular branching, using conditional move instructions instead.

This was my first serious experience with Assembly, and it gave me a much better understanding of what happens between high-level code and the CPU. I learned how compilers translate code, how memory layout and instruction choice affect performance, how SIMD works, and why an optimisation should always be measured instead of assumed.
