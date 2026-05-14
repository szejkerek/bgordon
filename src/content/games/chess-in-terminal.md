---
title: "Chess In Terminal"
description: "A fully playable two-player chess game that runs entirely in the terminal, with FEN position loading and PGN game export."
date: "2021-07"
tags: ["C++", "OOP", "Chess", "Terminal", "FEN", "PGN", "Design Patterns", "Smart Pointers"]
sourceUrl: "https://github.com/szejkerek/ChessInTerminal"
featured: false
teamSize: 1
---

## About This Project

ChessInTerminal is a command-line chess application written in C++ implementing complete chess rules for local two-player games. The board renders as an ASCII grid with piece symbols in brackets (`[K]`, `[p]`, `[ ]`). Players enter moves using long algebraic notation (`e2e4`) or query legal moves for a piece by typing its square coordinate.

The game detects check, announces it before each prompt, and saves the full move list to a file on checkmate. It supports command-line arguments (`-i` for input file, `-o` for output file), and loads starting positions from FEN notation — making it fully scriptable.

### Features

- **Complete chess rules** — all standard piece movements, check detection, and checkmate
- **FEN support** — load arbitrary positions from a text file; defaults to standard starting position
- **PGN-compatible export** — move history written in numbered long-algebraic notation, importable into most chess viewers
- **Legal move query** — type a square coordinate to display all legal moves for that piece
- **Scriptable** — `-i` / `-o` flags for input/output file paths

### Technical Architecture

Five core abstractions power the engine:

- **`Piece` (abstract base class)** — pure virtual `ValidMoves()` returns `vector<vector<Coords>>` where each inner vector is a directional ray. Sliding pieces emit rays of up to seven squares; non-sliding pieces emit single-element rays. The move generator breaks out of a ray on the first blocker, naturally modelling occlusion without per-piece logic.
- **`Square`** — holds a nullable `shared_ptr<Piece>` (`nullptr` = empty). Piece transfers on move are pointer reassignments.
- **`Board`** — owns `Square[8][8]`, exposes query and mutation methods, implements FEN parsing, and provides `operator<<` for rendering.
- **`Move`** — dual-mode: with `onlyKingAttack=false` it builds pseudo-legal moves; with `true` it only sets `enemyKingUnderAttack`, reusing the same movement geometry for check detection without a separate attack map.
- **`GameManager`** — game loop, input validation, check/checkmate detection, turn swap, output.

### Key Engineering Decisions

**Board copy for simulation** — `isCheckNextNextRound` accepts `Board` by value. Copying the board copies all 64 `shared_ptr` members; `SimulatedMovePiece` reassigns pointers on the copy, leaving the original untouched. This gives correct independent simulation state without a custom copy constructor.

**`pawnMultiplier` (+1 / -1)** — collapses white and black pawn direction into a single code path.

**Check detection via move generator reuse** — `AttackEnemyKing` calls `GeneratePseudoLegal` with `onlyKingAttack=true`, skipping all move collection but still evaluating reachability. Avoids maintaining a separate attack bitboard at the cost of iterating all enemy pieces per check query.

### Lessons Learned

The two-phase legal move generation approach (pseudo-legal → simulation filter) requires careful separation of board mutation from querying — the simulated board must be a true independent copy. C++ value semantics with `shared_ptr` provide this naturally, though the correctness is non-obvious at first glance.

The `vector<vector<Coords>>` ray structure is effective for communicating blocking semantics to the generator but creates an implicit contract not enforced by the type system. A future iteration might pass `Board const&` to `ValidMoves()` to allow pieces to handle their own board-context special cases, eliminating the `Pawn::ValidMoves()` returning an empty vector.
