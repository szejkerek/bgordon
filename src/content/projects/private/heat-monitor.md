---
title: "HeatMonitor"
description: "A home-built ESP32 monitoring system for checking furnace temperatures, heating pipes, and pellet levels directly from a phone."
date: "2025-02"
tags: ["Embedded", "C++"]
sourceUrl: "https://github.com/szejkerek/HeatMonitor"
teamSize: 1
---

HeatMonitor is a home-built ESP32 system created to better understand and reduce pellet consumption in my heating furnace.

The original goal was to collect enough data to predict fuel usage and optimize the furnace settings with machine learning. That part did not work out as planned, but the project still became a useful monitoring tool that I could check directly from my phone.

Three temperature sensors track the furnace and heating pipes, while a distance sensor estimates how much pellet is left in the tank. The ESP32 collects and filters the readings, sends them to Firebase, and exposes a simple web interface with current and historical data.

The system also includes automatic Wi-Fi reconnection, background data uploads, and alerts. Even without the planned AI optimization, it gave me a much clearer view of how the furnace behaves and made it easier to monitor the heating system without going down to the boiler room.
