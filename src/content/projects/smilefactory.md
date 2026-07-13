---
title: "SmileFactory"
description: "A machine-learning pipeline for classifying genuine and posed smiles."
date: "2024-04"
tags: ["AI", "Python"]
sourceUrl: "https://github.com/szejkerek/SmileFactory"
teamSize: 1
---

SmileFactory is a university machine-learning project built by a five-person team to explore whether a model can tell a genuine smile from a deliberately posed one.

Instead of working directly with images, the system analyzes sequences of facial action-unit features describing changes in facial muscle activity over time. Because every smile has a different length, we split each sequence into proportional time sections and averaged the features within them. This made it possible to compare the same stage of a smile across different recordings. We trained and evaluated three classifiers.

Random Forest delivered the strongest and most consistent results, reaching 79% accuracy in the first of seven analyzed time sections. The project showed that the early phase of a smile can contain some of the most useful signals for distinguishing spontaneous expressions from posed ones.

