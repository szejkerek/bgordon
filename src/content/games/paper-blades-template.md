---
title: "Paper Blades Template"
description: "Reusable Unity 6 project scaffold providing production-ready core systems — event channels, data persistence with XOR encryption, pluggable scene transitions, and observable UI list binding."
date: "2024-04"
tags: ["Unity", "C#", "Framework", "Architecture", "ScriptableObjects", "Design Patterns", "URP"]
sourceUrl: "https://github.com/PlaceHoldersStudio/PaperBlades"
featured: false
---

## About This Project

Paper Blades Template is a personal Unity framework used as the starting point for new game projects. It packages the recurring infrastructure concerns that appear in every Unity project so each new project can skip the boilerplate.

### Systems Included

- **Event Channels**: Generic `BaseGameEvent<T>` ScriptableObject pub/sub — emitters raise events without knowing listeners; reverse-iteration dispatch is safe when listeners unregister during dispatch
- **Data Persistence**: `ProfileFileUtility<T>` with optional XOR encryption, multiple save profiles, and `IDataPersistence` auto-discovery
- **Scene Transitions**: Strategy-pattern ScriptableObject variants — fade, circle expand, Animator-driven, ShaderGraph-driven
- **ListView**: `ObservableCollection<T>`-bound UI list that automatically rebuilds on collection changes
- **Audio**: SFX, music fade (DOTween), positional 3D audio, target-attached audio

### Technical Highlights

- `JsonUtilityEx` wraps Unity's `JsonUtility` to support root-level primitives, arrays, and `List<T>` via `MakeGenericType` reflection with per-type caching
- `CoreManager` bootstraps all systems via `GetComponentInChildren` on a single `DontDestroyOnLoad` prefab
- `BaseGameEventListener<T, E, UER>` three-type-parameter generic bridges ScriptableObject events to Inspector-configurable `UnityEvent<T>` responses
