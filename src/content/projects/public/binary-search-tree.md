---
title: "Binary Search Tree"
description: "A generic, header-only C++ binary search tree using modern RAII memory management, full copy/move semantics, and text + binary serialization."
date: "2020-06"
tags: ["Algorithms", "C++"]
sourceUrl: "https://github.com/szejkerek/BinarySearchTree"
teamSize: 1
---

## About This Project

A generic, header-only binary search tree implemented in C++ with modern memory-management techniques. The `BST<T>` template works with any comparable type, supports all three standard traversal orders, and can serialize itself to both human-readable text and raw binary. Built as a second-semester data structures project.

### Features

- **Template class `BST<T>`** — works with any type that defines comparison operators
- **RAII memory management** — `std::unique_ptr` node ownership, no manual `delete`
- **Full rule-of-five semantics** — copy and move constructors and assignment
- **Three traversals** — inorder, preorder, postorder
- **Serialization** — text-based and raw-binary read/write
- **Custom type support** — demonstrated with a `P_info` person-record class
- **Leak detection** — `_CrtDumpMemoryLeaks` in MSVC debug builds

### Engineering Highlights

**`unique_ptr` node ownership** — Each node holds its children as `std::unique_ptr`, so destroying a node automatically frees its entire subtree with no explicit cleanup traversal. The tree's move constructor and move assignment transfer the root in O(1) via `std::move`, making returned/temporary trees cheap.

**Structure-preserving copy** — Copying is a preorder traversal of the source followed by reinsertion into the destination. Because a BST's shape is fully determined by insertion order, visiting the source root before its children reproduces an identical structure — not merely the same set of values.
