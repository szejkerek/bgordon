---
title: "Stereo Vision & Disparity"
description: "A stereo computer-vision pipeline covering camera calibration, image undistortion and rectification, and disparity-map estimation via block matching (BM), semi-global matching (SGBM), and a custom matcher."
date: "2024-10"
tags: ["AI", "Python"]
sourceUrl: "https://github.com/szejkerek/ZAOWIR"
teamSize: 1
---

## About This Project

A stereo computer-vision project (ZAOWIR — advanced imaging and robot vision) implemented across five labs. It calibrates cameras, undistorts and rectifies image pairs, and estimates depth by computing disparity maps with several matching algorithms, then evaluates them against ground truth with error maps.

### Pipeline

- **Camera calibration** — intrinsic/extrinsic parameters solved and stored, then applied to produce undistorted and remapped images
- **Disparity estimation** — three matchers compared: OpenCV block matching (BM), semi-global block matching (SGBM), and a hand-written custom matcher
- **Error evaluation** — per-algorithm error maps quantify each matcher's accuracy against a reference disparity
