---
title: "Animal Detection Neural Network"
description: "A neural network system that segments camouflaged animals from their natural environments using multi-class semantic segmentation."
date: "2024-03"
tags: ["AI", "Python"]
sourceUrl: "https://github.com/szejkerek/AnimalDetection"
teamSize: 1
---

Animal Detection Neural Network is a university deep-learning project focused on finding camouflaged animals in natural environments.

The dataset was created collaboratively by the entire year group. We collected and prepared images of animals blending into their surroundings, and then each student trained their own model using the shared data.

My solution used a U-Net segmentation model with a pretrained ResNet34 encoder. Instead of only predicting whether an animal was present, the network classified individual pixels and separated the image into the animal, camouflage-related background, regular background, and an attention region around the subject.

The model was trained on a relatively small custom dataset, so transfer learning, data augmentation, and weighted loss were used to improve the results. The final model reached an IoU score of 0.51 while being trained locally on a GTX 1070.

It was a great practical introduction to semantic segmentation, dataset preparation, transfer learning, model evaluation, and the challenges of training neural networks with limited data.

