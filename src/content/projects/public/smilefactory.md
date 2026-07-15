---
title: "SmileFactory"
description: "A machine-learning pipeline for classifying genuine and posed smiles."
date: "2024-04"
tags: ["AI", "Python"]
sourceUrl: "https://github.com/szejkerek/SmileFactory"
teamSize: 5
---

## Overview

SmileFactory is a university machine-learning project by a five-person team asking whether a model can tell a genuine smile from a posed one, using the UvA-NEMO smile dataset. Rather than raw images, it works from facial action-unit features that describe muscle activity over time. I led the core implementation, covering the data loading and fold handling, the classifier integration and metrics, and the results and plots, while a teammate wrote the temporal windowing and others added classifiers and visualisation.

## Technical Highlights

- **Aligning smiles of different lengths.** Because every smile lasts a different number of frames, each sequence is split into proportional sections with integer floor division (`total * position // sections`), so the same phase can be compared across recordings. See [`FoldsLoader.py`](https://github.com/szejkerek/SmileFactory/blob/main/FoldsLoader/FoldsLoader.py).
- **Point versus interval sampling.** A configurable mode either picks a single frame at a proportional position or averages every frame in a window, trading temporal detail against smoothing. See [`general.py`](https://github.com/szejkerek/SmileFactory/blob/main/Config/general.py).
- **Six-classifier comparison.** Random Forest, Decision Tree, SVM, KNN, MLP and Gaussian Naive Bayes are evaluated side by side under one protocol. See [`main.py`](https://github.com/szejkerek/SmileFactory/blob/main/main.py).
- **Leave-one-out over predefined folds.** scikit-learn's `LeaveOneOut` runs across ten standard fold objects, matching the dataset's evaluation protocol, in [`main.py`](https://github.com/szejkerek/SmileFactory/blob/main/main.py).
- **Six metrics with error bars.** Accuracy, precision, recall, F1, ROC AUC and log loss are tracked with mean and standard deviation across folds and plotted per classifier across the seven time sections.

Random Forest was the strongest, reaching about 79% accuracy in the first of seven sections, which pointed to the onset of a smile carrying the most useful authenticity signal.

## Learnings

The interesting result was methodological: slicing the signal by phase showed that *when* you look at a smile matters as much as *what* you measure.

