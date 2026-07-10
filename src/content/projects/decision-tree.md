---
title: "Decision Tree"
description: "A C++ console classifier that labels data samples by traversing a user-defined decision tree loaded from plain-text structure and data files."
date: "2020-01"
tags: ["Algorithms", "C++"]
sourceUrl: "https://github.com/szejkerek/DecisionTree"
teamSize: 1
---

## About This Project

A C++ console application that classifies data samples by traversing a user-defined decision tree. Both the tree structure and the input data are supplied as plain-text files; classified results are written to an output file. Invoked with explicit `-i` / `-t` / `-o` flags for input, tree, and output paths.

### Input Format

- **Sample file** — a space-separated attribute header followed by numeric rows.
- **Tree file** — one node per line: `ID attribute operator threshold yes_branch no_branch`. Leaf targets are plain string labels; internal targets are integer node IDs. Comments start with `%`.

### Engineering Highlights

**Implicit leaf detection** — Branch targets are either integer IDs (internal nodes) or plain strings (leaf labels). The traversal distinguishes them by testing whether the target parses as a number — no dedicated sentinel value or enum tag needed.

**Single-pass partitioning** — At each internal node the current sample set is split into YES/NO subsets in one pass by comparing the node's attribute against its threshold, then both subsets are classified independently through recursive calls. A clean divide-and-conquer traversal that terminates naturally as branches narrow to leaf labels.
