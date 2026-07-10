---
title: "Tiny Pomodoro"
description: "An always-on-top Windows Pomodoro widget that blocks distracting sites and apps during focus sessions, pulls tasks from Todoist and ClickUp, and plays session-aware focus radio."
date: "2026-06"
tags: ["Desktop", "C#"]
sourceUrl: "https://github.com/szejkerek/TinyPomodoro"
teamSize: 1
---

## About This Project

Tiny Pomodoro is a small always-on-top timer that lives in the corner of the screen. It is a borderless, frameless WPF widget built on .NET 10, with a pure, unit-tested core sitting behind platform adapters. No installer, no account, no telemetry — settings and API tokens stay on the local machine.

### Features

- **Distraction blocker** — while a pomodoro runs, time-sink sites (YouTube, Facebook, LinkedIn, webmail) are blocked and distracting apps (e.g. Spotify) are killed; everything returns the moment you pause or take a break
- **Task integration** — pulls tasks from Todoist or ClickUp with due dates and status, tickable straight from the widget
- **Focus radio** — optional background audio that starts with a pomodoro and stops on breaks, with switchable categories (lo-fi, synthwave, classical, pink/brown noise) and an editable station list
- **Always on top** — borderless, draggable, stays out of the way
- **Streaks & heatmap** — a focus-stats view showing when work actually gets done

### Technical Details

The distraction blocker edits the Windows `hosts` file, so the app requests admin rights (UAC) on launch. The core timer/session logic is isolated as a pure, unit-tested library, with OS-specific concerns (hosts-file editing, process killing, audio) delegated to platform adapters — keeping the domain logic testable without touching the real system.
