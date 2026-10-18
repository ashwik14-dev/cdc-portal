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
| `CLIENT_URL`     | Frontend origin allowed by CORS              | `http://localhost:5173`                   |
| `COOKIE_SECURE`  | Set `true` in production (HTTPS)             | `false`                                   |

> `.env` is git-ignored. Only `.env.example` is committed.

---

## Admin Seed

The Admin account is created by a script, **not** through public registration:

```bash
cd server
npm run seed
```

The admin email defaults to `admin@cdc.ac.in`. The initial password defaults to the value defined in
`server/scripts/seedAdmin.js` — set `SEED_ADMIN_PASSWORD` (and optionally `SEED_ADMIN_EMAIL`) in
`server/.env` before seeding to choose your own. The script prints the account it creates.

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

- No password reset / change-password flow (out of scope for this assignment).
- QR scanning opens a **verification page only** — attendance recording is intentionally out of scope.
- Tokens last 1 day; refresh-token rotation is not implemented.

---

## Demo Credentials

| Role    | Email               | Password   |
| ------- | ------------------- | ---------- |
| Admin   | `admin@cdc.ac.in`   | *(set via `SEED_ADMIN_PASSWORD`)* |
| Faculty | `priya@cdc.ac.in`   | `Fac@123`   |
| Student | `rahul@cdc.ac.in`   | `Stu@123`   |

> Demo credentials are for local evaluation only. Replace all secrets before any real deployment.
