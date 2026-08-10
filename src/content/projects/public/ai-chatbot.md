---
title: "AI Chatbot"
description: "An interactive Unity 6 AI assistant with real-time chat, TTS, STT, animated character, and event-driven architecture built with Zenject."
date: "2026-08"
tags: ["Unity", "C#", "AI"]
sourceUrl: "https://github.com/szejkerek/ImmersionGordon"
teamSize: 1
---

## Overview

Interactive 3D chatbot built in **Unity 6**. Users can type or dictate messages, receive responses from a mock API, and see the character react with **voice, stats, and contextual animations**.

The project uses **Zenject dependency injection** and an **event-driven architecture**, with no singletons or global state.

## Features

* **Chat UI**: message history, user/character bubbles, error states.
* **HTTP API**: Mockoon integration with timeout and graceful error handling.
* **Character Stats**: dynamic name, satisfaction (`0–100`) and mood (`0–6`).
* **Animations**: Mixamo character with Idle, Happy, Mad and fallback states.
* **Text-to-Speech**: VoiceRSS playback with cancellation of outdated requests.
* **Speech-to-Text**: Whisper-based microphone input with recording feedback.

## Architecture

| Component                 | Responsibility                  |
| ------------------------- | ------------------------------- |
| `MockoonClient`           | HTTP, timeout, response parsing |
| `ChatDisplay`             | Chat UI and input               |
| `MoodAnimationController` | Mood → animation state          |
| `VoiceRssService`         | TTS and audio playback          |
| `WhisperService`          | Microphone and STT              |
| `SceneInstaller`          | Zenject bindings                |

## Technical Highlights

* Modular architecture with **Zenject DI** and C# events.
* No singletons or static service access.
* Custom parser for mixed JSON + `Status` API responses.
* TTS requests cancel outdated audio automatically.
* Network errors are displayed directly in the chat.
* Input, networking, UI, audio and animation remain fully decoupled.

The result is a compact, extensible conversational character system focused on **clean architecture, maintainability and responsive user interaction**.
