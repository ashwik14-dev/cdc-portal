# AGENTS.md — CDC Portal

Handoff notes for AI agents (opencode). Read this first when working in this directory.

## What this is

A MERN (MongoDB, Express, React, Node) authentication + role-based dashboard app for the
**IARE Career Development Centre (CDC)** — built for an interview assignment. Three roles:
**Admin**, **Faculty**, **Student**.

There are **TWO front ends** that must both be kept in sync:

1. **React app** (`client/`) — the real app. Uses the Node API + MongoDB. This is what
   runs at `http://localhost:5173` and is scanned by phones.
2. **Standalone demo** (`index.html` at the project root) — a single self-contained file
   using `localStorage` only (no backend). Opened by double-clicking. It is an **offline demo**;
   its data is completely separate from the real app.

> **IMPORTANT RULE:** The user wants every UI/feature change applied to **BOTH** the React app
> and the standalone `index.html`, unless the change is backend-only.

## How to run

MongoDB runs as a Windows service named `MongoDB` (should already be started).

```powershell
# API  (from server\)  -> http://localhost:5000
node src/server.js

# Client (from client\) -> http://localhost:5173, also on the LAN IP
npm.cmd run dev -- --host

# Standalone demo: just double-click index.html
```

**Windows / PowerShell notes:**
- The shell is PowerShell 5.1. `npm` is blocked by execution policy -> **always use `npm.cmd`**.
- `&&` is NOT supported; chain with `;` or `if ($?) { ... }`.
- To start a background server from the tool, use `Start-Process` **with `-RedirectStandardOutput`
  and `-RedirectStandardError`** to temp files and `-WindowStyle Hidden`; otherwise the command
  hangs the shell for the full timeout.
- Background processes do **not** persist between shell calls and stop when the laptop shuts down.

## Demo credentials (seeded)

| Role    | Email               | Password    |
| ------- | ------------------- | ----------- |
| Admin   | `admin@cdc.ac.in`   | `Admin@123` (default; override with `SEED_ADMIN_PASSWORD`) |
| Faculty | `priya@cdc.ac.in`   | `Fac@123`   |
| Student | `rahul@cdc.ac.in`   | `Stu@123`   |

## Directory map

```
D:\CDC INTERVIEW\cdc-portal\
  index.html              standalone localStorage demo (all standalone edits go here)
  README.md               project docs
  START.bat               convenience launcher
  server\
    src\
      app.js              express app + route mounting
      server.js           entry point
      config\db.js
      models\User.js      User schema, STUDENT_BRANCHES enum, studentQrId
      controllers\        auth, admin, profile, verify
      routes\             auth, admin, profile, verify
      middleware\         auth, role, error
    scripts\seedAdmin.js  seeds the admin only
    .env / .env.example
  client\
    src\
      App.jsx             routes (/, /login, /about, /contact, /verify/:qrId, dashboards)
      api\                apiClient.js (+ auth/admin/profile api modules)
      components\         Navbar, PublicNav, ProtectedRoute, RoleRoute, FormInput, PhoneMockup, ThemeToggle
      context\            AuthContext.jsx, ThemeContext.jsx
      pages\              LoginPage, AboutPage, ContactPage, VerifyPage, AdminDashboard,
                          FacultyDashboard, StudentDashboard
      index.css           Tailwind v4 theme tokens
    vite.config.js        host:true (LAN) + /api proxy -> localhost:5000
    .env.example          VITE_PUBLIC_ORIGIN (optional)
```

## Conventions

- **Stack:** React 18 + Vite + Tailwind CSS v4, Express, Mongoose, JWT (httpOnly cookie +
  Bearer), bcrypt, `qrcode.react`, `lucide-react`.
- **Design tokens:** dark `#0B0F19`, light `#F8FAFC`, blue-600/indigo-600 gradients, Inter font,
  glassmorphism cards, split-screen login.
- Tailwind v4 dark mode: `@custom-variant dark (&:where(.dark, .dark *));` in `index.css`.
- **Canonical branch list** (used everywhere):
  `["CSE","CSE + AI & ML","CSE + Data Science","IT","ECE","EEE","CIVIL","MECH","AERONAUTICAL"]`.
- **After any client change:** run `npm.cmd run build` in `client\`.
- **After any standalone change:** extract the inline `<script>` and `node --check` it.
- **After any server change:** `node --check <file>`.
- The user is terse, iterates fast on visuals, and prefers readable/larger label text.

## Features already implemented

- Auth: login/logout, JWT in httpOnly cookie + Bearer, bcrypt hashing, role middleware.
- Admin: create/list/edit/delete **Faculty** and **Student** accounts; **branch** field on
  students; **"Students by Branch"** expandable panel (count + names/roll with inline edit + delete).
- Student: own profile + unique QR code + **Branch** tile.
- Public pages: Home, About (with institute logo), Contact (email/phone/locate/hours + form).
- Theme toggle (light/dark) shared across the app.
- **QR verification:** student QR encodes `<origin>/verify/<studentQrId>`; scanning opens a public
  **"Verified Student"** page (`/verify/:qrId` -> `VerifyPage.jsx`) backed by the public API
  `GET /api/verify/:qrId` (returns name, roll, branch, institute only — no email/password).
  Standalone has a matching `#verify?id=` view.

## Known notes / gotchas

- Standalone on `file://` cannot build a reachable verify URL, so its QR falls back to the raw id
  (phone scanning only works from the React app served over LAN).
- Seeded `rahul@cdc.ac.in` in Mongo originally had **no branch**; it was backfilled to `CSE`.
  New students created via the admin form require a branch.
- `GET /api/verify/:qrId` is intentionally **public** (not behind auth).
- Phone scanning steps are in README.md ("Scanning the student QR"). LAN IP is discovered via
  `ipconfig`; set `VITE_PUBLIC_ORIGIN` in `client\.env` to fix the base URL.

## Verify before claiming done

```powershell
# server
node --check src\app.js   # etc.
# client
npm.cmd run build
# API smoke test (server must be running)
# login as admin, then:
#   GET http://localhost:5000/api/admin/students
