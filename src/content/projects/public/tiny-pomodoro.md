---
title: "Tiny Pomodoro"
description: "A Pomodoro widget designed around my personal deep-work routine."
date: "2026-06"
tags: ["Desktop", "C#", "Tooling"]
sourceUrl: "https://github.com/szejkerek/TinyPomodoro"
teamSize: 1
---

## Overview

I kept reaching for Spotify and the same three websites on autopilot mid-focus. Tiny Pomodoro is the fix: a compact, always-on-top Windows timer in C# and WPF that removes those distractions during a session and pulls in my real task list, then restores everything the moment I pause. Built with Claude Code, as a way to explore AI-assisted development on a problem I actually wanted solved.

## Technical Highlights

- **Website blocking via the hosts file.** `HostsFileBlocker` writes `0.0.0.0` redirects for chosen domains into the Windows hosts file and flushes the DNS cache, then removes them again on pause or break. See [`HostsFileBlocker.cs`](https://github.com/szejkerek/TinyPomodoro/blob/main/Services/HostsFileBlocker.cs).
- **Process killing with a watchdog.** `ProcessBlocker` kills named apps such as Spotify on focus start and re-kills them on every tick, so they cannot quietly be reopened until the session ends. See [`ProcessBlocker.cs`](https://github.com/szejkerek/TinyPomodoro/blob/main/Services/ProcessBlocker.cs).
- **Edge-triggered focus guard.** `FocusGuard` makes sure block and unblock only fire on real state transitions rather than on every timer tick. See [`FocusGuard.cs`](https://github.com/szejkerek/TinyPomodoro/blob/main/Services/FocusGuard.cs).
- **Todoist and ClickUp integration.** Vendor-specific gateways fetch tasks over HTTP with retry and backoff, routed through a common `ITaskGateway` so the UI stays vendor-neutral. See [`HttpTodoistGateway.cs`](https://github.com/szejkerek/TinyPomodoro/blob/main/Services/HttpTodoistGateway.cs).
- **Undoable completion.** Completing a task is held for a couple of seconds before it commits, so an accidental tap can be taken back. See [`SessionController.cs`](https://github.com/szejkerek/TinyPomodoro/blob/main/Services/SessionController.cs).
- **Stats that actually surface.** A seven-day by twenty-four-hour heatmap and daily streaks are computed from a JSON session log. See [`SessionStats.cs`](https://github.com/szejkerek/TinyPomodoro/blob/main/Services/SessionStats.cs).

A `SessionController` choreographs the timer, task list and blockers and is the one piece I kept fully unit-tested; API tokens are stored encrypted with DPAPI.

## Learnings

Even on a personal tool, keeping the coordination logic cleanly separated and unit-tested paid off, and moving fast without letting the design drift was the real exercise.

