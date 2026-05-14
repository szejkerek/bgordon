---
title: "Animal Detection Neural Network"
description: "A neural network system that segments camouflaged animals from their natural environments using multi-class semantic segmentation."
date: "2024-03"
tags: ["Python", "PyTorch", "Deep Learning", "Computer Vision", "UNet", "ResNet", "Transfer Learning", "Semantic Segmentation", "albumentations", "CUDA"]
sourceUrl: "https://github.com/szejkerek/AnimalDetection"
featured: false
teamSize: 1
---

## About This Project

AnimalDetection is an academic deep learning project from a Biologically Inspired Artificial Intelligence course. It trains a UNet-based segmentation model on a custom ~300-image dataset to locate and delineate camouflaged animals — scenarios where standard object detection fails because the target blends into its background.

Rather than binary foreground/background segmentation, the system decomposes each scene into four semantic regions: the animal, the masking background (visually similar to the animal), the non-masking background, and a foreground attention region. This four-class formulation is better suited to understanding *why* a region is difficult to segment. Final IoU: **0.51** on a custom dataset, trained on consumer hardware (NVIDIA GTX 1070, 8 GB VRAM).

### Features

- **Four-class segmentation** — animal / masking background / non-masking background / foreground attention
- **UNet + ImageNet pretraining** — ResNet34 encoder pretrained on ImageNet; decoder path fine-tuned on ~300 camouflage images
- **Weighted cross-entropy loss** — class weights `[1, 0.05, 0.03, 0.01]` strongly prioritize correct animal-pixel prediction
- **Multi-group stochastic augmentation** — three independent `OneOf` groups targeting tone, blur, and signal degradation axes
- **Timestamped training runs** — each run saves checkpoint, config dump, stats, live loss/IoU plot, and composite visualizations

### Technical Architecture

Four Python packages: `config` (hyperparameters, class definitions, model/loss/optimizer), `data_model` (custom `Dataset`, train/valid/test splits, epoch wrappers), `utils` (augmentation, preprocessing, visualization, file I/O), and a top-level `main.py` loop.

Data flows: disk → OpenCV (BGR→RGB) → dimension crop to 32-pixel multiples (UNet architectural constraint) → color-based mask extraction into `(H, W, 4)` float array → albumentations augmentation → normalization + transposition to `(C, H, W)` tensor.

Ground-truth masks are stored as RGB color images where each pixel's color encodes its semantic class. At load time, `cv2.inRange` performs exact-color pixel matching per class; results are normalized to [0, 1] float and stacked channel-wise into the multi-class target tensor.

### Engineering Highlights

**Transfer learning on small data** — With ~300 images, training from scratch would underfit. ImageNet-pretrained ResNet34 provides robust feature extraction; only the decoder path needs to learn from the small camouflage dataset. This single decision was likely the largest factor in achieving a usable IoU.

**Three-group augmentation pipeline** — Groups target distinct perceptual variation axes: tone/color (CLAHE, brightness/contrast, gamma, HSV), blur type (Gaussian, median, motion), and signal degradation (noise, JPEG compression). Each group fires independently, producing different combinations each epoch without over-stacking transforms of the same perceptual category.

**Color-coded mask extraction** — Storing four semantic classes as distinct BGR color tuples in a single PNG avoids per-class file I/O at the cost of a correctness constraint: mask images must contain exact pixel values (no JPEG artifacts). The `Dataset` extracts binary channels via exact-color `inRange` matching at load time; the `class_values` parameter allows requesting class subsets without changing mask files.
