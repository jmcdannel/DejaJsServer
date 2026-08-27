> [!IMPORTANT]
> **This project has moved.** Active development of DEJA.js and the Track & Trestle model
> railroad platform now happens in private repositories under
> [**Track and Trestle Technology, LLC**](https://github.com/trackandtrestle).
> This repository stays public as a historical snapshot and is no longer maintained.
>
> **Current product, docs, and downloads → [dejajs.com](https://dejajs.com)**

# ⚙️ DEJA.js Server (NestJS)

**NestJS backend that bridges cloud state to physical DCC-EX hardware.**

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=white" />
</p>

This was an exploration of rebuilding the DEJA server on **NestJS** — trading the original
hand-rolled Node service for a dependency-injected, module-per-domain architecture with
proper entities and services.

## 🏗️ Architecture

```
Firebase (Firestore + RTDB)
        │  subscribe
        ▼
  NestJS modules  ──▶  Layouts · Devices · Locos · Turnouts · Effects
        │
        ▼  USB serial (115200 baud)
  DCC-EX EX-CommandStation  ──▶  Track
```

| Concept | Role |
|---------|------|
| **Layout service** | Loads a layout definition and its device registry on boot |
| **Device entity** | Models a physical endpoint — command station, Arduino, Pico W |
| **DejaCloud service** | Subscribes to Firebase command streams and dispatches them |
| **Serial transport** | Translates commands into DCC-EX native syntax over USB |

## ⚙️ Tech stack

NestJS · TypeScript · Node.js · Firebase Admin SDK · SerialPort · Jest · pnpm

## 🧑‍💻 Local development

```bash
pnpm install
pnpm run start:dev     # watch mode
pnpm run test          # unit tests
pnpm run test:e2e      # end-to-end tests
```

> Default branch is `dev`. Firebase service-account credentials are required at runtime.

## 📌 Status

Superseded by the Turborepo-based server in [DEJA.js](https://github.com/jmcdannel/DEJA.js),
which kept the domain model but dropped the Nest runtime in favour of a lighter
`tsx`/`tsup` service that installs cleanly on a Raspberry Pi.

## 🧭 Where this fits

This repo is one step in a long-running line of model railroad control software:

| Era | Project | What changed |
|-----|---------|--------------|
| 2020 | [`train-control`](https://github.com/jmcdannel/train-control) | First React throttle, JMRI + Arduino over HTTP |
| 2021 | [`dctc`](https://github.com/jmcdannel/dctc) | Standalone Arduino DC controller (no computer required) |
| 2022–23 | [`layout-conductor-*`](https://github.com/jmcdannel?tab=repositories&q=layout-conductor) | Split into app + API; Python, Node, and Deno backends explored |
| 2024 | [`Track-and-Trestle-Technology-Suite`](https://github.com/jmcdannel/Track-and-Trestle-Technology-Suite) | MQTT-based monorepo: dispatcher, throttle, dashboard, action API |
| 2024–25 | [`DEJA.js`](https://github.com/jmcdannel/DEJA.js) | TypeScript/Turborepo rewrite, Firebase realtime backbone |
| 2025– | **[dejajs.com](https://dejajs.com)** (private) | Commercial cloud platform for DCC-EX |

---

<sub>Built by [Josh McDannel](https://github.com/jmcdannel) · [dejajs.com](https://dejajs.com) · [LinkedIn](https://www.linkedin.com/in/jmcdannel)</sub>
