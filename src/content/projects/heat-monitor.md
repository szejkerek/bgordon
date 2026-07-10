---
title: "HeatMonitor"
description: "An ESP32-based solution for real-time boiler temperature monitoring with historical data visualization and AI-driven predictions based on heating furnace settings."
date: "2025-02"
tags: ["Embedded", "C++"]
sourceUrl: "https://github.com/szejkerek/HeatMonitor"
teamSize: 1
draft: false
---

## About This Project

A project for predicting pellet consumption in a furnace to optimize its settings and minimize operating costs.

### Hardware

- ESP32 (PlatformIO/Arduino)
- 3× DS18B20 temperature sensors (OneWire/Dallas)
- Distance sensor (tank level measurement)

### Features

- Readings every ~6 s, median over a 60-second window → pushed to Firebase every minute
- ESP32 web server (ESPAsyncWebServer) — local data preview
- WhatsApp alerts via HTTP API
- Automatic WiFi reconnect
- Dedicated FreeRTOS task for Firebase

### Frontend

Static HTML + JS + CSS page (`data/`) querying Firebase or the local web server. Data visualization implemented in Python.