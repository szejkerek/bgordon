---
title: "Tiny Pomodoro"
description: "A Pomodoro widget designed around my personal deep-work routine."
date: "2026-06"
tags: ["Desktop", "C#"]
sourceUrl: "https://github.com/szejkerek/TinyPomodoro"
teamSize: 1
---

## Overview

Tiny Pomodoro is a compact, always-on-top Windows focus timer I built solo in C# and WPF to put the ideas from *Deep Work* into practice, shaped around my own routine. During a focus session it actively removes the distractions I reach for on autopilot and pulls in my real task list, then restores everything the moment I pause or take a break. I built it with the help of Claude Code, as a way to explore AI-assisted development on a real problem I actually wanted solved.

## Technical Highlights

- **Website blocking via the hosts file.** `HostsFileBlocker` writes `0.0.0.0` redirects for chosen domains into the Windows hosts file and flushes the DNS cache, then removes them again on pause or break. See [`HostsFileBlocker.cs`](https://github.com/szejkerek/TinyPomodoro/blob/main/Services/HostsFileBlocker.cs).
- **Process killing with a watchdog.** `ProcessBlocker` kills named apps such as Spotify on focus start and re-kills them on every tick, so they cannot quietly be reopened until the session ends. See [`ProcessBlocker.cs`](https://github.com/szejkerek/TinyPomodoro/blob/main/Services/ProcessBlocker.cs).
- **Edge-triggered focus guard.** `FocusGuard` makes sure block and unblock only fire on real state transitions rather than on every timer tick. See [`FocusGuard.cs`](https://github.com/szejkerek/TinyPomodoro/blob/main/Services/FocusGuard.cs).
- **Todoist and ClickUp integration.** Vendor-specific gateways fetch tasks over HTTP with retry and backoff, routed through a common `ITaskGateway` so the UI stays vendor-neutral. See [`HttpTodoistGateway.cs`](https://github.com/szejkerek/TinyPomodoro/blob/main/Services/HttpTodoistGateway.cs).
- **Undoable completion.** Completing a task is held for a couple of seconds before it commits, so an accidental tap can be taken back. See [`SessionController.cs`](https://github.com/szejkerek/TinyPomodoro/blob/main/Services/SessionController.cs).
- **Stats that actually surface.** A seven-day by twenty-four-hour heatmap and daily streaks are computed from a JSON session log. See [`SessionStats.cs`](https://github.com/szejkerek/TinyPomodoro/blob/main/Services/SessionStats.cs).

A `SessionController` choreographs the timer, task list and blockers and is the one piece I kept fully unit-tested; API tokens are stored encrypted with DPAPI.

## Learnings

Working with Claude Code let me move fast while keeping the design mine, and it pushed me to keep the coordination logic cleanly separated and tested even on what is ultimately a personal tool.

