---
title: "Serial Communication Protocols"
description: "Two Windows desktop apps implementing an RS-232 terminal emulator and a simplified Modbus ASCII protocol over RS-485, with CRC validation, timeouts, and retransmission."
date: "2023-06"
tags: ["Embedded", "C#"]
sourceUrl: "https://github.com/szejkerek/IWSK"
teamSize: 1
---

## About This Project

Two Windows desktop applications built for a university course on communication interfaces (IWSK). The first is a WPF RS-232 terminal emulator; the second is a WinForms implementation of a simplified Modbus ASCII protocol over RS-485.

### Features

- **RS-232 terminal** — configurable baud rate, data bits, stop bits, parity, and flow control; PING/PONG latency measurement; multiple line terminators (CR, LF, CRLF, custom)
- **RS-485 / Modbus ASCII** — Master and Slave roles, broadcast and addressed function codes, CRC-7 checksum validation, configurable timeouts, retransmission, and deliberate CRC error injection for testing

### Engineering Highlights

**CRC-7 lookup table** — A static constructor precomputes a 256-entry table by simulating the CRC-7 polynomial bit-by-bit for every byte value at class load. `ComputeChecksum` then runs in O(n) with one array lookup per byte, no runtime bit shifting.

**Dual-timeout master state machine** — `WaitForResponse` runs two independent timeouts concurrently: a transaction timeout bounding the whole round-trip, and a character timeout tracked in the receive callback that fires when the inter-character gap exceeds a threshold — matching the Modbus timing model.
