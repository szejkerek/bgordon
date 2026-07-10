---
title: "SmileFactory"
description: "A machine-learning pipeline that classifies genuine versus deliberate smiles from sequences of facial action-unit feature vectors, using windowed temporal aggregation and leave-one-out cross-validation."
date: "2024-04"
tags: ["AI", "Python"]
sourceUrl: "https://github.com/szejkerek/SmileFactory"
teamSize: 1
---

## About This Project

A machine-learning pipeline that distinguishes genuine (spontaneous) from deliberate (posed) smiles. Each smile is a variable-length sequence of high-dimensional facial action-unit (AU) feature vectors; the pipeline aggregates these temporally, trains classifiers, and reports per-window performance across subject-partitioned folds.

### Engineering Highlights

**Proportional temporal interval averaging** — Each variable-length smile sequence is divided into a fixed number of proportional temporal windows using integer floor division (`total * position // sections`), guaranteeing exact, non-overlapping partition boundaries regardless of length. All AU vectors within the selected window are averaged into one representative vector — the core of the "ranged window" experiment mode, contrasted with point sampling.

**Leave-one-out evaluation over subject folds** — For each temporal window position, the pipeline runs Leave-One-Out cross-validation over 10 subject-partitioned folds, flattening the nine training folds into a single feature matrix before fitting and testing on the held-out fold. Per-window mean and standard deviation drive the primary performance plots.
