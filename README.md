# CDC Portal — Mini MERN Authentication & Role-Based Dashboard

A small MERN stack application for the **IARE Career Development Centre (CDC)** that demonstrates
authentication, role-based access control, account management and a clean React UI — styled to
match the official CDC Attendance System look and feel (dark `#0B0F19` hero + light `#F8FAFC`
auth panel, blue/indigo gradients, glassmorphism cards, Inter font).

Three roles are supported: **Admin**, **Faculty** and **Student**.
Only the Admin can create Faculty and Student accounts. Each student receives a **unique QR code**.

---

## Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Frontend   | React 18, Vite, Tailwind CSS v4, React Router, lucide  |
| Backend    | Node.js, Express.js                                    |
| Database   | MongoDB with Mongoose                                  |
| Auth       | JWT (httpOnly cookie + Bearer token), bcrypt hashing   |
| QR codes   | `qrcode.react` (SVG, generated client-side)            |

---

## Project Structure

```
cdc-portal/
  server/
    src/
      config/db.js
      models/User.js
      controllers/  auth.controller.js  admin.controller.js  profile.controller.js  verify.controller.js
      routes/       auth.routes.js  admin.routes.js  profile.routes.js  verify.routes.js
      middleware/   auth.middleware.js  role.middleware.js  error.middleware.js
      app.js  server.js
    scripts/seedAdmin.js
    .env.example
    package.json
  client/
    src/
      api/         apiClient.js  auth.api.js  admin.api.js  profile.api.js
      components/  Navbar.jsx  ProtectedRoute.jsx  RoleRoute.jsx  FormInput.jsx  PhoneMockup.jsx
      pages/       LoginPage.jsx  AdminDashboard.jsx  FacultyDashboard.jsx  StudentDashboard.jsx  VerifyPage.jsx
      context/AuthContext.jsx
      App.jsx  main.jsx
    package.json
  README.md
```

---

## Setup Instructions

> **This repository contains source code only — no database is included.** All accounts
> (admin, faculty, students) live in whatever MongoDB you connect to. `http://localhost:5173`
> therefore refers to the machine that is *running* the app: opening it in a browser reaches
> your own computer, so a shared link only works after someone runs these steps on their
> machine (or you deploy the app — see [Known Limitations](#known-limitations)).

### 0. Quick start (copy-paste)

Run these in order; the app is ready when both terminals are running.

```bash
# Terminal 1 - API + database
cd server
npm install
copy .env.example .env
npm run seed        # creates admin + demo faculty/student and prints the credentials
npm run dev         # API on http://localhost:5000

# Terminal 2 - React app
cd client
npm install
npm run dev         # UI on http://localhost:5173
```

Then open **http://localhost:5173** and log in with the printed credentials
(`admin@cdc.ac.in` / `Admin@123` by default — see [Demo Credentials](#demo-credentials)).

### Even easier on Windows

Install **Node.js** and **MongoDB Community Server** once, download this project, then **double-click
`START.bat`**. It creates `server/.env`, installs the packages, creates the accounts, starts both
apps and opens the browser — nothing else to type. If Node.js is missing or MongoDB is not running it
stops and tells you exactly what to install.

### 1. Prerequisites

- Node.js 18+
- MongoDB running locally on `mongodb://127.0.0.1:27017` (or a MongoDB Atlas URI)

### 2. Backend

```bash
cd server
npm install
# create your .env from the example
copy .env.example .env
# seed the initial admin (no public admin registration)
npm run seed
# start the API (http://localhost:5000)
npm run dev
```

### 3. Frontend

```bash
cd client
npm install
# start the dev server (http://localhost:5173)
npm run dev
```

Open **http://localhost:5173** and log in.

### 4. Scanning the student QR (optional)

Each student's QR encodes a verification URL that opens a public page (no login needed):

```
http://<host>:5173/verify/<studentQrId>
```

To scan it with a **phone**, the phone must be able to reach the dev server over your local network:

1. Find your computer's LAN IP (e.g. `192.168.1.5`): `ipconfig` on Windows.
2. Open the app on the computer using that IP: **http://192.168.1.5:5173** (not `localhost`).
3. The QR now encodes `http://192.168.1.5:5173/verify/<id>`. Log in as a student and scan it with
   the phone camera — the phone opens the verification page.

> The Vite dev server already binds to all interfaces (`host: true`). Allow Node through the
> Windows firewall if prompted. Set `VITE_PUBLIC_ORIGIN` in `client/.env` to force a fixed base
> URL (e.g. a deployed domain) regardless of how the site is opened.

---

## Environment Variables (`server/.env`)

| Variable         | Description                                  | Example                                   |
| ---------------- | -------------------------------------------- | ----------------------------------------- |
| `PORT`           | API port                                     | `5000`                                    |
| `MONGO_URI`      | MongoDB connection string                    | `mongodb://127.0.0.1:27017/cdc_portal`    |
| `JWT_SECRET`     | Secret used to sign JWTs (keep private)      | `long_random_string`                      |
| `JWT_EXPIRES_IN` | Token lifetime                               | `1d`                                      |
| `CLIENT_URL`     | Frontend origin(s) allowed by CORS (comma-separated) | `http://localhost:5173`            |
| `COOKIE_SECURE`  | Set `true` in production (HTTPS)             | `false`                                   |
| `COOKIE_SAME_SITE` | `none` + `COOKIE_SECURE=true` when frontend and API are on different sites | `lax`        |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Admin created by `npm run seed` | `admin@cdc.ac.in` / `Admin@123` |
| `SEED_DEMO_ACCOUNTS` | Also seed the demo faculty/student   | `true`                                    |

> Localhost, `127.0.0.1` and private LAN origins (`192.168.x.x`, `10.x.x.x`, `172.16-31.x.x`) are
> always accepted, so phones on the same Wi-Fi work without extra CORS configuration. Public
> origins must be listed in `CLIENT_URL`.

> `.env` is git-ignored. Only `.env.example` is committed.

---

## Admin Seed

The Admin account is created by a script, **not** through public registration:

```bash
cd server
npm run seed
```

The admin email defaults to `admin@cdc.ac.in` and the initial password to `Admin@123`; override them
with `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` in `server/.env` before seeding. The script prints
every account it creates and **never overwrites an existing user**. By default it also seeds the
demo faculty and student accounts listed under [Demo Credentials](#demo-credentials) so the whole
flow can be exercised immediately; set `SEED_DEMO_ACCOUNTS=false` to seed only the admin.

---

## Deployment (optional)

The app is not hosted, but it deploys free with **MongoDB Atlas** (database), **Render** (API) and
**Vercel** (React client). Once deployed, anyone — including a reviewer in another state — can open
the URL and log in; nothing depends on your computer being on.

### 1. Database — MongoDB Atlas

1. Create a free M0 cluster and a database user.
2. Network Access → allow `0.0.0.0/0` (or Render's IPs).
3. Copy the connection string: `mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/cdc_portal`.

### 2. API — Render

- New → **Web Service** → connect this repository.
- **Root Directory:** `server` · **Build Command:** `npm install` · **Start Command:** `npm start`
- Environment variables:

  | Key | Value |
  | --- | ----- |
  | `MONGO_URI` | the Atlas connection string |
  | `JWT_SECRET` | a long random string |
  | `JWT_EXPIRES_IN` | `1d` |
  | `CLIENT_URL` | your Vercel URL, e.g. `https://cdc-portal.vercel.app` |
  | `COOKIE_SECURE` | `true` |
  | `COOKIE_SAME_SITE` | `none` |
  | `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | the admin you want |

- After the first deploy, open Render's **Shell** and run `npm run seed` once to create the admin
  (and demo accounts). The command prints the credentials.

### 3. Client — Vercel

- New Project → import this repository.
- **Root Directory:** `client` · Framework preset **Vite** (build `npm run build`, output `dist`).
- Environment variables:

  | Key | Value |
  | --- | ----- |
  | `VITE_API_URL` | `https://<your-render-service>.onrender.com/api` |
  | `VITE_PUBLIC_ORIGIN` | `https://<your-vercel-app>.vercel.app` |

- Redeploy after adding `VITE_PUBLIC_ORIGIN`, and make sure Render's `CLIENT_URL` matches the final
  Vercel URL so CORS allows the login request.

---

## API Endpoints

| Method | Endpoint                 | Access         | Purpose                       |
| ------ | ------------------------ | -------------- | ----------------------------- |
| POST   | `/api/auth/login`        | Public         | Authenticate a user           |
| POST   | `/api/auth/logout`       | Authenticated  | Clear session cookie          |
| GET    | `/api/auth/me`           | Authenticated  | Return logged-in user details |
| POST   | `/api/admin/faculty`     | Admin only     | Create a Faculty account      |
| GET    | `/api/admin/faculty`     | Admin only     | List Faculty accounts         |
| POST   | `/api/admin/students`    | Admin only     | Create a Student account      |
| GET    | `/api/admin/students`    | Admin only     | List Student accounts         |
| PATCH  | `/api/admin/students/:id`| Admin only     | Update a Student account      |
| DELETE | `/api/admin/students/:id`| Admin only     | Delete a Student account      |
| GET    | `/api/profile/me`        | Authenticated  | Return the current user's own profile |
| GET    | `/api/verify/:qrId`      | Public         | Verify a student from a scanned QR code |

The backend determines the current user **only** from verified JWT credentials — never from a
client-supplied id or role. `GET /api/profile/me` always returns the caller's own profile.

---

## Role-Based Access

| Role    | Can do                                                              |
| ------- | ------------------------------------------------------------------- |
| Admin   | Create, list, edit & delete Faculty/Student accounts, view dashboard |
| Faculty | View only their own profile                                         |
| Student | View only their own profile + unique QR code                        |

Authorization is enforced in **Express middleware** (`role.middleware.js`), not just by hiding
frontend buttons. Faculty and Student tokens receive `403` on `/api/admin/*`.

---

## Testing Checklist (verified)

- [x] Seeded Admin can log in
- [x] Invalid credentials are rejected (401)
- [x] Admin can create Faculty and Student accounts
- [x] Duplicate emails are rejected (409)
- [x] Duplicate student roll numbers are rejected (409)
- [x] Newly created Faculty can log in and view their own profile
- [x] Newly created Student can log in and view their own profile and QR code
- [x] Each student receives a unique QR code (`studentQrId`)
- [x] Scanning a student QR opens a public `/verify/:qrId` page showing name, roll number and branch
- [x] Faculty cannot access Admin-only APIs (403)
- [x] Student cannot access Admin-only APIs (403)
- [x] A user cannot request another user's profile
- [x] Password hashes are not included in any API response
- [x] Logout and protected-page behaviour work

---

## Security Notes

- Passwords are hashed with **bcrypt** (cost 10) before storage; `passwordHash` is `select: false`
  and stripped in `toJSON`.
- JWT is stored in an **httpOnly cookie** (and also returned for `Authorization: Bearer` clients).
- `email` and `rollNumber` have **unique indexes**; duplicates are handled gracefully.
- Inputs are validated (email format, required fields, password length, role enum, roll number).
- The student QR encodes a verification **URL** (`<origin>/verify/<studentQrId>`), not the raw id.
  `/api/verify/:qrId` is a public endpoint that returns only non-sensitive fields (name, roll
  number, branch) — never a password or auth token.

---

## AI Tools Used

This project was built with **opencode (AI coding assistant)** — used to scaffold the project
structure, generate the Express/React boilerplate, and replicate the CDC reference page's visual
design. All generated code was reviewed, run and tested: the full API flow (login, account
creation, role enforcement, duplicate handling) and the production frontend build were verified
locally before submission.

---

## Known Limitations

- **Not hosted by default:** the app runs locally; see [Deployment](#deployment-optional) to put it
  online so a reviewer can open a URL and log in without running anything.
- No password reset / change-password flow (out of scope for this assignment).
- QR scanning opens a **verification page only** — attendance recording is intentionally out of scope.
- Tokens last 1 day; refresh-token rotation is not implemented.

---

## Demo Credentials

Created by `npm run seed` (see [Admin Seed](#admin-seed)):

| Role    | Email               | Password   |
| ------- | ------------------- | ---------- |
| Admin   | `admin@cdc.ac.in`   | `Admin@123` |
| Faculty | `priya@cdc.ac.in`   | `Fac@123`   |
| Student | `rahul@cdc.ac.in`   | `Stu@123`   |

The seeded Student has roll number `22B91A0501` (CSE) and a unique `studentQrId`; the QR verification
page is public and needs no login.

> These are local evaluation credentials only — the admin password is overridable via
> `SEED_ADMIN_PASSWORD`. Faculty/Student accounts you create through the Admin dashboard are stored
> in your own MongoDB and are **not** part of this repository. Replace all secrets before any real
> deployment.
