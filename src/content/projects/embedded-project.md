---
title: "Distributed Temperature System"
description: "An ESP32 distributed home temperature measurement system where sender nodes stream readings over ESP-NOW to a base station that bridges them to a live web page via Server-Sent Events."
date: "2023-02"
tags: ["Embedded", "C++"]
sourceUrl: "https://github.com/szejkerek/EmbeddedProject"
teamSize: 1
---

## About This Project

A distributed temperature-measurement system for the home, designed so additional sensor boards can be added to the network. Sender nodes broadcast readings over ESP-NOW peer-to-peer radio to a base station, which serves a live web page displaying the current temperature of every board. Fifth-semester embedded-systems (SMIW) project.

### Engineering Highlights

**WiFi channel discovery without association** — ESP-NOW requires both peers to share a WiFi channel, but sender nodes must not associate with the router. The senders scan for the target SSID to resolve its channel, then force the radio onto that channel with `esp_wifi_set_promiscuous` — a non-obvious workaround for a real ESP32 platform constraint.

**ESP-NOW to Server-Sent Events bridge** — A single receive callback forms the whole real-time pipeline: it `memcpy`s the raw binary struct off ESP-NOW, serializes it to JSON, and immediately pushes a Server-Sent Event to every connected browser's `EventSource` — no intermediate buffering or polling.
