---
title: "Stereo Vision & Disparity"
description: "A university stereo-vision project built with Python and OpenCV."
date: "2024-10"
tags: ["AI", "Python"]
sourceUrl: "https://github.com/szejkerek/ZAOWIR"
teamSize: 1
---

## Overview

A solo computer-vision project walking the entire stereo pipeline in Python and OpenCV: from single and stereo camera calibration through rectification and disparity estimation, out to depth maps, 3D point clouds and optical flow on video.

## Technical Highlights

- **Camera calibration and undistortion.** `calibrateCamera` on chessboard images recovers the intrinsic matrix and a five-coefficient distortion model, then `undistort` and `remap` correct the images. See [`main.py`](https://github.com/szejkerek/ZAOWIR/blob/main/main.py).
- **Stereo calibration.** Paired left and right captures give the extrinsics (rotation, translation, essential and fundamental matrices) at a mean reprojection error of 2.39 px. See [`Lab2/main.py`](https://github.com/szejkerek/ZAOWIR/blob/main/Lab2/main.py).
- **Rectification with epipolar lines.** Image pairs are rectified and epipolar lines drawn on top to verify the alignment visually, also in [`Lab2/main.py`](https://github.com/szejkerek/ZAOWIR/blob/main/Lab2/main.py).
- **Three disparity methods compared.** A custom 5x5 SAD block matcher alongside OpenCV's `StereoBM` and `StereoSGBM`, all scored against ground truth with MAE, RMSE, bad-pixel percentage and SSIM, plus error heatmaps. See [`lab3.py`](https://github.com/szejkerek/ZAOWIR/blob/main/Lab3/GordonKolokwium/lab3.py).
- **Depth and point clouds.** Disparity is converted to depth from baseline and focal length, and `reprojectImageTo3D` exports colored PLY point clouds. See [`lab4.py`](https://github.com/szejkerek/ZAOWIR/blob/main/Lab4/lab4.py).
- **Motion analysis on video.** Lucas-Kanade sparse tracking, Farneback dense flow, and morphological motion detection. See [`Lab5/main.py`](https://github.com/szejkerek/ZAOWIR/blob/main/Lab5/main.py).

## Learnings

Calibration turned out to be the most instructive part: intrinsics, distortion and extrinsics all have to be right before any disparity result downstream can be trusted.