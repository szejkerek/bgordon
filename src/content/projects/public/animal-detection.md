---
title: "Animal Detection Neural Network"
description: "A neural network system that segments camouflaged animals from their natural environments using multi-class semantic segmentation."
date: "2024-03"
tags: ["AI", "Python"]
sourceUrl: "https://github.com/szejkerek/AnimalDetection"
teamSize: 1
---

## Overview

Animal Detection is a university deep-learning project where the whole year group collected a shared dataset of camouflaged animals and each student trained their own segmentation model on it. My solution treated it as multi-class semantic segmentation: instead of just detecting presence, the network labels every pixel as the animal, the camouflaging background, the regular background, or an attention region around the subject.

## Technical Highlights

- **U-Net with a pretrained encoder.** Built on `segmentation_models_pytorch` with a ResNet encoder pretrained on ImageNet; transfer learning was essential given only around 300 images. My best-performing configuration paired U-Net with a ResNet34 encoder. See [`neural_net.py`](https://github.com/szejkerek/AnimalDetection/blob/main/config/neural_net.py).
- **Weighted loss for extreme class imbalance.** Cross-entropy weights of `[1, 0.05, 0.03, 0.01]` push the network to care about rare animal pixels rather than collapsing onto background, in [`neural_net.py`](https://github.com/szejkerek/AnimalDetection/blob/main/config/neural_net.py).
- **Color-coded masks.** Ground truth is stored as RGB images where each color is a class; the loader extracts per-class binary masks with `cv2.inRange` and stacks them, avoiding separate mask files. See [`dataset_class.py`](https://github.com/szejkerek/AnimalDetection/blob/main/data_model/dataset_class.py).
- **Heavy augmentation.** Three independent `albumentations` groups vary tone and color, blur type, and signal degradation (noise, JPEG artefacts) to fight overfitting on the small set. See [`augmentation.py`](https://github.com/szejkerek/AnimalDetection/blob/main/utils/augmentation.py).
- **Staged learning rate.** A manual decay from `1e-4` to `1e-5` at epoch 30 and to `1e-6` at epoch 200, tuned to the observed loss plateaus. See [`main.py`](https://github.com/szejkerek/AnimalDetection/blob/main/main.py).

The best model reached an IoU of 0.51 on the test set, trained locally on a GTX 1070 at 544x544.

## Learnings

A hands-on introduction to segmentation and to the realities of small-data training, where augmentation, class weighting and transfer learning mattered far more than raw model size.

