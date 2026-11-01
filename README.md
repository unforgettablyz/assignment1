# Student Counselling Appointment System

DES3083 Software Engineering Process — Group 7
**Process model:** Evolutionary Prototyping
**Frontend:** React 19 (Vite, Tailwind CSS 4) · **Backend:** Node.js + Express 5 · **Database:** PostgreSQL 16

---

## Contents

1. [Project overview](#1-project-overview)
2. [Functional requirements](#2-functional-requirements)
3. [Business rules](#3-business-rules)
4. [Process model: how Evolutionary Prototyping is applied](#4-process-model-how-evolutionary-prototyping-is-applied)
5. [Prototype versions](#5-prototype-versions)
   - [Version 1 — Initial prototype (v0.1)](#version-1--initial-prototype-v01)
   - [Version 2 — Refined prototype (v0.2)](#version-2--refined-prototype-v02)
   - [Version 3 — Final system (v0.3)](#version-3--final-system-v03)
6. [Feedback log](#6-feedback-log)
7. [Tech stack](#7-tech-stack)
8. [Repository structure](#8-repository-structure)
9. [Backend (Express 5 + PostgreSQL 16)](#9-backend-express-5--postgresql-16)
10. [Frontend (React 19 + Vite)](#10-frontend-react-19--vite)
11. [Setup and running](#11-setup-and-running)
12. [Release checklist (every version)](#12-release-checklist-every-version)
13. [Team](#13-team)

---

## 1. Project overview

A web-based system for a university counselling centre. Students request counselling appointments, and administrators approve or reject them.

**Out of scope:** counselling notes, medical records and automatic appointment scheduling.

---

## 2. Functional requirements

These are the five approved requirements from the lecturer. Every version of the system builds towards all five.

| ID | Requirement |
| --- | --- |
| FR1 | Students and administrators shall log in and log out using authorised accounts. |
| FR2 | Students shall add an appointment record containing preferred date, preferred time and appointment purpose category. |
| FR3 | Students shall delete a Pending appointment record. |
| FR4 | Students shall update a Pending appointment record. |
| FR5 | The administrator shall approve or reject a Pending appointment record. |

---

## 3. Business rules

These rules apply to every version.

1. Two roles only: **Student** (User) and **Administrator**.
2. One main record type: **appointment**.
3. Every new appointment starts as **Pending**.
4. Students may update or delete their own appointments only while they are Pending.
5. Administrators may view and process Pending appointments, marking them **Approved** or **Rejected**.
6. A processed appointment is read-only. It cannot be updated, deleted or processed again.
7. All records are stored in a PostgreSQL database.
8. Accounts are pre-created (seeded). There is no self-registration, because FR1 only requires authorised accounts.

---

## 4. Process model: how Evolutionary Prototyping is applied

In Evolutionary Prototyping, the team builds a **working prototype first**, shows it to the client, and then **improves the same application** based on the feedback. The prototype is never thrown away. It grows into the final system.

This project follows that cycle three times:

```text
Build version → Client meeting → Log feedback → Plan changes → Build next version
```

- **One codebase:** all three versions are the same repository, marked with Git tags (`v0.1`, `v0.2`, `v0.3`).
- **Client:** the lecturer acts as the client and reviews each version in a scheduled meeting.
- **Traceability:** every change in a version is linked to either a planned FR or a feedback ID (e.g. `FB-03`) from the previous meeting.

### Version summary

| Version | Git tag | Weeks | Main goal | Client meeting |
| --- | --- | --- | --- | --- |
| Version 1 | `v0.1` | 3–6 | First working prototype of the core flow | Meeting 1 (before Week 6) |
| Version 2 | `v0.2` | 7–9 | Complete all five FRs and apply Meeting 1 feedback | Meeting 2 (~Week 9) |
| Version 3 | `v0.3` | 10–12 | Refine, test and finalise using Meeting 2 feedback | Meeting 3 (~Week 12) |

### FR coverage by version

| FR | Version 1 | Version 2 | Version 3 |
| --- | --- | --- | --- |
| FR1 Login/logout | Built | Refined | Final |
| FR2 Add appointment | Built | Refined | Final |
| FR3 Delete Pending | — | Built | Final |
| FR4 Update Pending | — | Built | Final |
| FR5 Approve/reject | — | Built | Final |

---

## 5. Prototype versions

Each version below explains its goal, what is built, and how it connects to client feedback. Update the **Status** and checklists as work is completed.

### Version 1 — Initial prototype (v0.1)

**Weeks:** 3–6
**Status:** Built, awaiting release tag and Meeting 1

**Goal:** Give the client a real, working prototype of the core flow to react to. A student can log in and request an appointment, and an administrator can log in and see it. This is a working React + Express + PostgreSQL system, not a mockup.

**What is built:**

| Area | Work |
| --- | --- |
| Database | `users` and `appointments` tables; seed data with test student and admin accounts |
| Backend | `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`; `GET` and `POST /api/appointments`; `GET /api/admin-appointments` |
| Frontend | `Login`, `StudentDashboard`, `AppointmentForm` (add mode) and `AdminDashboard` (list only) pages; logout in `Header` |

**Checklist:**
- [x] FR1 login and logout for Student and Administrator
- [x] FR2 add appointment (preferred date, preferred time, purpose category)
- [x] Student list of own appointments with status
- [x] Admin list of Pending appointments
- [x] Database schema and seed data
- [ ] [Release checklist](#12-release-checklist-every-version) passed and tagged `v0.1`

**Client meeting 1:** _date_
Feedback logged as `FB-01` to `FB-xx` (see [section 6](#6-feedback-log)). This feedback decides the refinements in Version 2.

---

### Version 2 — Refined prototype (v0.2)

**Weeks:** 7–9
**Status:** Planned

**Goal:** Evolve Version 1 into a system that covers all five FRs, and apply the changes the client asked for in Meeting 1.

**What is built:**

| Area | Work |
| --- | --- |
| Backend | `GET`, `PATCH` and `DELETE /api/appointments/:id`; `PATCH /api/admin-appointments/:id/process`; Pending-only rules enforced |
| Frontend | `AppointmentDetails` page; `AppointmentForm` edit mode; delete button (Pending only); approve/reject buttons in `AdminDashboard`; read-only view for processed appointments |
| Feedback | Changes from Meeting 1 |

**Checklist:**
- [ ] FR3 delete Pending appointment
- [ ] FR4 update Pending appointment
- [ ] FR5 admin approve/reject
- [ ] Processed appointments are read-only
- [ ] Meeting 1 feedback applied: _list FB IDs_
- [ ] [Release checklist](#12-release-checklist-every-version) passed and tagged `v0.2`

**Client meeting 2:** _date_
Feedback logged as `FB-xx` to `FB-xx`. This feedback decides the refinements in Version 3.

---

### Version 3 — Final system (v0.3)

**Weeks:** 10–12
**Status:** Planned

**Goal:** Refine Version 2 into the final system. Focus on usability, validation and testing, not new features.

**What is built:**

| Area | Work |
| --- | --- |
| Backend | Stronger input validation (e.g. no past dates), clearer error messages |
| Frontend | Usability improvements and form validation messages |
| Testing | Final testing of FR1–FR5 and all business rules |
| Process | Software Process Improvement activity applied |
| Feedback | Changes from Meeting 2 |

**Checklist:**
- [ ] Meeting 2 feedback applied: _list FB IDs_
- [ ] Input validation and usability improvements
- [ ] Final testing of FR1–FR5
- [ ] Software Process Improvement activity applied
- [ ] [Release checklist](#12-release-checklist-every-version) passed and tagged `v0.3`

**Client meeting 3:** _date_
Final evaluation and acceptance of the system.

---

## 6. Feedback log

This log records what the client said at each meeting and which version addresses it. It is the main evidence that each version evolved from client feedback. Keep the full log in the report appendix as well.

| ID | Meeting | Feedback | Priority | Target version | Status |
| --- | --- | --- | --- | --- | --- |
| FB-01 | 1 | _e.g. Show purpose category as a dropdown_ | High | v0.2 | Open |

**Status values:** Open, In progress, Done.

---

## 7. Tech stack

### Backend

| Need | Technology | Version |
| --- | --- | --- |
| Runtime | Node.js, CommonJS (`require`, `module.exports`) | 18 or newer |
| Server | Express | 5 |
| Database | PostgreSQL in Docker | 16 |
| Database access | `pg` with raw SQL (no ORM) | latest |
| Config | `dotenv` and a `.env` file | latest |
| Cross-origin requests | `cors` | latest |
| IDs | Built-in `crypto.randomUUID()` | built-in |
| Auth | `bcryptjs`, `jsonwebtoken` (JWT) | latest |

**Not used:** TypeScript, ORMs, Supabase service or client, Redis (no caching needed), and service/repository/model layers.

### Frontend

| Purpose | Technology | Version |
| --- | --- | --- |
| Build tool | Vite | latest |
| UI | **React** with function components in `.jsx` files | 19 |
| Language | JavaScript | — |
| Styling | Tailwind CSS utility classes in `className` | 4 |
| Page navigation | `react-router-dom` | latest |
| API calls | `axios`, through one shared instance | latest |
| Shared state | `zustand` | latest |
| Local state and effects | React hooks | — |
| Linting | `oxlint` (replaces ESLint) | latest |

**Not used:** `fetch`, Redux, Context API, React Query, TypeScript, CSS modules, styled-components and UI component libraries.

---

## 8. Repository structure

```text
counselling-appointment-system/
├── README.md                          # This file
├── .gitignore                         # node_modules and .env
├── backend/
│   ├── .env                           # Settings and secrets (never committed)
│   ├── db-check.js                    # Tests the database connection
│   ├── docker-compose.yml             # PostgreSQL 16 container
│   ├── index.js                       # Loads dotenv, global app.use, mounts routes, starts server
│   ├── init-db.js                     # Runs supabase/init.sql
│   ├── package.json
│   └── supabase/
│       ├── init.sql                   # All CREATE TABLE statements
│       ├── seed.sql                   # Test accounts and sample appointments
│       └── src/
│           ├── config/
│           │   ├── db.js              # pg Pool
│           │   └── auth.js            # signAccessToken, verifyAccessToken (added with auth)
│           ├── controllers/
│           │   ├── authController.js
│           │   └── appointmentController.js   # Serves both student and admin routes
│           ├── middleware/            # Added with auth
│           │   ├── authMiddleware.js  # Checks the JWT
│           │   └── requireAdmin.js    # Role check for admin routes
│           └── routes/
│               ├── authRoutes.js
│               ├── appointmentRoutes.js
│               └── adminAppointmentRoutes.js
└── frontend/
    ├── index.html                     # <div id="root">, loads src/main.jsx
    ├── vite.config.js                 # react() and tailwindcss() plugins
    ├── .oxlintrc.json                 # Lint rules
    ├── package.json
    ├── public/
    └── src/
        ├── main.jsx                   # StrictMode + ErrorBoundary around App
        ├── App.jsx                    # All routes, and nothing else
        ├── index.css                  # Only: @import "tailwindcss";
        ├── api/
        │   └── axiosInstance.js       # Shared axios setup
        ├── services/
        │   ├── authService.js
        │   └── appointmentService.js
        ├── store/
        │   └── useAuthStore.js
        ├── pages/
        │   ├── Login.jsx
        │   ├── StudentDashboard.jsx
        │   ├── AppointmentForm.jsx
        │   ├── AppointmentDetails.jsx
        │   └── AdminDashboard.jsx
        └── components/
            ├── Header.jsx
            ├── Footer.jsx
            ├── AppointmentCard.jsx
            ├── AppointmentCardSkeleton.jsx
            ├── AdminAppointmentCard.jsx
            ├── StatusBadge.jsx
            ├── RequireRole.jsx
            └── ErrorBoundary.jsx
```

The `supabase/` folder name is a class convention only. The project does not use the Supabase service.

There is no `hooks/` folder, because the app has no search box or other reusable hook logic. It is added only if client feedback needs one (for example, search with `useDebounce`).

---

## 9. Backend (Express 5 + PostgreSQL 16)

### 9.1 What goes where

| Code | Location |
| --- | --- |
| Database connection and JWT helpers | `config/` |
| Validation, SQL and responses | `controllers/` |
| URLs and HTTP methods only | `routes/` |
| Auth and role checks | `middleware/` |
| Loading `dotenv`, global `app.use`, mounting routes, starting the server | `index.js` |
| Table definitions | `supabase/init.sql` |
| Sample data | `supabase/seed.sql` |

### 9.2 Code conventions

- 2-space indentation, single quotes, semicolons.
- Handlers: `exports.name = async (req, res, next) => { ... }`, each with `try/catch` and `next(error)`.
- Request bodies are read with `req.body || {}`, because Express 5 leaves `req.body` undefined when no body is sent.
- Every SQL value uses `$1, $2` placeholders. User input is never put directly into a SQL string.
- **`snake_case`** for everything that crosses the API: database columns, JSON fields and query keys (e.g. `?student_id=usr_01`).
- **`camelCase`** for JavaScript variables and route parameters, renamed while destructuring: `const { student_id: studentId } = req.body || {};`
- `SELECT` and `RETURNING` list specific columns. `password_hash` is never returned.
- File names: `appointmentController.js`, `appointmentRoutes.js`. Base URLs: `/api/<plural-kebab-case>`.
- In route files, fixed paths come before parameter paths.

### 9.3 Database (`init.sql`)

All tables use `CREATE TABLE IF NOT EXISTS`. `users` is created before `appointments`. Main table IDs are `VARCHAR(100)`, generated in the controller as `apt_<uuid>`.

**`users`**

| Column | Type | Notes |
| --- | --- | --- |
| id | VARCHAR(100) PRIMARY KEY | e.g. `usr_01` |
| name | VARCHAR(150) NOT NULL | |
| email | VARCHAR(150) NOT NULL | Stored trimmed and lowercase; `CONSTRAINT unique_users_email UNIQUE (email)` |
| password_hash | VARCHAR(255) NOT NULL | bcrypt hash (cost 12), never returned by the API |
| role | VARCHAR(20) NOT NULL DEFAULT 'student' | `student` or `admin` |
| created_at | TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP | |

**`appointments`**

| Column | Type | Notes |
| --- | --- | --- |
| id | VARCHAR(100) PRIMARY KEY | e.g. `apt_<uuid>` |
| student_id | VARCHAR(100) NOT NULL | `CONSTRAINT fk_appointments_student` → `users(id)` `ON DELETE CASCADE` |
| preferred_date | DATE NOT NULL | Format `YYYY-MM-DD` |
| preferred_time | TIME NOT NULL | Format `HH:MM` |
| purpose_category | VARCHAR(50) NOT NULL | One of the allowed categories below |
| status | VARCHAR(20) NOT NULL DEFAULT 'Pending' | `Pending`, `Approved` or `Rejected` |
| processed_by | VARCHAR(100) | Admin who processed it; `CONSTRAINT fk_appointments_processed_by` → `users(id)` `ON DELETE SET NULL` |
| processed_at | TIMESTAMP | Null until processed |
| created_at | TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP | Set to `NOW()` in every `UPDATE` |

The two foreign keys both point to `users`, so they are named by their column (`student`, `processed_by`) to keep the names unique.

**Purpose categories** (to be confirmed with the client): `Academic`, `Career`, `Personal`, `Other`. The backend validates against this list, and the frontend dropdown must use the same values.

**Date and time handling:** `pg` turns `DATE` columns into JavaScript `Date` objects at local midnight. When these are sent as JSON in UTC, a Malaysia (UTC+8) date shifts back one day. To prevent this, every query selects `preferred_date::text AS preferred_date` and `to_char(preferred_time, 'HH24:MI') AS preferred_time`.

### 9.4 Seed data (`seed.sql`)

Seed data uses readable IDs (`usr_01`, `apt_01`), inserts `users` before `appointments`, and ends each `INSERT` with `ON CONFLICT DO NOTHING`, so it can run twice without errors.

Password hashes are generated once and pasted into `seed.sql`:

```text
node -e "console.log(require('bcryptjs').hashSync('Password123', 12))"
```

**Test accounts (testing only):**

| ID | Name | Email | Password | Role |
| --- | --- | --- | --- | --- |
| usr_01 | Test Student | student@test.edu.my | Password123 | student |
| usr_02 | Test Student 2 | student2@test.edu.my | Password123 | student |
| usr_03 | Test Admin | admin@test.edu.my | Password123 | admin |

The seed also includes sample appointments in each status (`Pending`, `Approved`, `Rejected`), to test the read-only rule.

### 9.5 API endpoints

Base URL: `http://localhost:8000/api`

**Before auth is added**, owner IDs come from the request (`student_id`, `admin_id`) and are marked `// TODO(auth)` in the code. **After auth**, they come from the JWT (`req.user.sub`), and those inputs and their `400` checks are removed.

#### Auth — `/api/auth` (FR1)

| Method | Path | Request | Success response | Protected | Version |
| --- | --- | --- | --- | --- | --- |
| POST | `/login` | `{ email, password }` | `200 { user, token }` | No | 1 |
| POST | `/logout` | — | `200 { message }`; client discards the token | No | 1 |
| GET | `/me` | Bearer token | `200 { user }` | Yes | 1 |

A wrong email or wrong password returns the same message: `Invalid email or password` (`401`).

#### Student appointments — `/api/appointments`

| Method | Path | Request (before auth) | Success response | FR | Version |
| --- | --- | --- | --- | --- | --- |
| GET | `/` | `?student_id=` | `200 { appointments }` | — | 1 |
| POST | `/` | `{ student_id, preferred_date, preferred_time, purpose_category }` | `201 { message, appointment }` with status `Pending` | FR2 | 1 |
| GET | `/:id` | `?student_id=` | `200 { appointment }` | — | 2 |
| PATCH | `/:id` | `{ student_id, preferred_date?, preferred_time?, purpose_category? }` | `200 { message, appointment }` | FR4 | 2 |
| DELETE | `/:id` | `?student_id=` | `200 { message }` | FR3 | 2 |

#### Admin appointments — `/api/admin-appointments`

| Method | Path | Request (before auth) | Success response | FR | Version |
| --- | --- | --- | --- | --- | --- |
| GET | `/` | `?status=Pending` (optional filter) | `200 { appointments }`, each with `student_name` (via `JOIN`) | — | 1 |
| PATCH | `/:id/process` | `{ admin_id, decision }` where `decision` is `Approved` or `Rejected` | `200 { message, appointment }` | FR5 | 2 |

### 9.6 How the business rules are enforced

| Rule | How |
| --- | --- |
| New records start Pending | `status` defaults to `'Pending'`; `POST` never accepts a status |
| Students only touch their own records | Every query uses `WHERE id = $1 AND student_id = $2` |
| Update/delete only while Pending | Load the row first: not found → `404`; not Pending → `400 Only Pending appointments can be changed` |
| Delete | A real `DELETE`, not a soft delete, because FR3 asks for deletion and a Pending request is not needed for history |
| Process only once | One atomic statement: `UPDATE ... SET status = $1, processed_by = $2, processed_at = NOW(), updated_at = NOW() WHERE id = $3 AND status = 'Pending' RETURNING ...`. No row returned → `404` or `400` |
| Only admins process | `requireAdmin` middleware checks `req.user.role === 'admin'`, otherwise `403` |
| Valid input | Required fields checked; `decision` must be `Approved` or `Rejected`; `purpose_category` must be in the allowed list; strings trimmed |

### 9.7 Responses and status codes

| Situation | Status | Body |
| --- | --- | --- |
| Read succeeds | `200` | `{ appointments: [...] }` or `{ appointment: {...} }` |
| Update or process succeeds | `200` | `{ message, appointment }` |
| Delete succeeds | `200` | `{ message }` |
| Create succeeds | `201` | `{ message, appointment }` |
| Missing or invalid input, or record not Pending | `400` | `{ message }` |
| Not logged in or bad token | `401` | `{ message }` |
| Not an admin | `403` | `{ message }` |
| Record not found (or not owned) | `404` | `{ message: 'Appointment not found' }` |
| Unknown `student_id` (FK error `23503`) | `400` | `{ message }` |

Until a JSON error handler is added, unexpected errors return Express's default `500` HTML page. This is expected during testing.

### 9.8 Auth

FR1 is part of Version 1, but auth is built **after** the core appointment endpoints have been tested without it, following the class guide. Building it adds:

- `bcryptjs` and `jsonwebtoken` packages, and `JWT_SECRET` and `JWT_EXPIRES_IN` in `.env`
- `config/auth.js` (HS256, default expiry `1h`)
- `middleware/authMiddleware.js` on the appointment and admin route files, and on `/me`
- `middleware/requireAdmin.js` on the admin route file
- JWT payload: `sub` (user ID as a string), `email`, `role`. No password or hash.
- Token sent as `Authorization: Bearer <token>`

`register`, `forgot-password` and `reset-password` are **not built**, because accounts are seeded (business rule 8).

### 9.9 Development workflow

1. Write `init.sql` and `seed.sql`, and check that every `NOT NULL` column without a default appears in each `INSERT`.
2. Write the controllers and routes for the version's endpoints.
3. Test every endpoint (see [11.3](#113-testing-the-api)).
4. Add or update auth and middleware.
5. Connect the frontend.

---

## 10. Frontend (React 19 + Vite)

The frontend is a **React 19** single-page app built with **Vite**, styled with **Tailwind CSS 4**, using **react-router-dom** for pages, **axios** for API calls and **zustand** for the logged-in user.

### 10.1 Data flow

```text
axiosInstance → service → page (state) → component (props)
```

| Folder | Role |
| --- | --- |
| `api/` | The only place that creates the axios instance |
| `services/` | The only place that makes API requests. Each function returns `res.data` |
| `store/` | State shared across unrelated pages: only the logged-in user and token |
| `pages/` | One component per route. Owns its state, fetches its data and arranges components |
| `components/` | Receives data through props and displays it. Reports events through `on...` callback props. Never calls the API |

### 10.2 API layer

**`api/axiosInstance.js`**
- `baseURL: 'http://localhost:8000/api'`, `timeout: 10000`, JSON headers
- Request interceptor adds `Authorization: Bearer <token>` using `useAuthStore.getState().token`
- Response interceptor logs API errors and passes them on

**`services/authService.js`**: `login(email, password)`, `logout()`, `getMe()`

**`services/appointmentService.js`**

| Function | Request | Version |
| --- | --- | --- |
| `getMyAppointments()` | `GET /appointments` | 1 |
| `createAppointment(data)` | `POST /appointments` | 1 |
| `getAppointmentById(id)` | `GET /appointments/:id` | 2 |
| `updateAppointment(id, data)` | `PATCH /appointments/:id` | 2 |
| `deleteAppointment(id)` | `DELETE /appointments/:id` | 2 |
| `getAdminAppointments(status)` | `GET /admin-appointments?status=` | 1 |
| `processAppointment(id, decision)` | `PATCH /admin-appointments/:id/process` | 2 |

Pages read the list property the API really returns: `data.appointments` for lists and `data.appointment` for one record. Fields stay in `snake_case`, e.g. `appointment.preferred_date`.

### 10.3 Shared state

**`store/useAuthStore.js`** holds `user`, `token`, `setAuth(user, token)` and `clearAuth()`.

- Components read it with selectors that return a store value, e.g. `useAuthStore((state) => state.user)`. A selector never builds a new object or array, because that causes an infinite re-render loop.
- In Version 1 the token is kept in memory, so refreshing the page logs the user out. If client feedback asks for this to change, zustand's built-in `persist` middleware is added (no new package).

### 10.4 Pages and routes

All routes are defined in `App.jsx`. The **Version** column shows when each page is added.

| Route | Page | Role | Purpose | FR | Version |
| --- | --- | --- | --- | --- | --- |
| `/login` | `Login` | All | Log in, then go to `/` (student) or `/admin` (admin) | FR1 | 1 |
| `/` | `StudentDashboard` | Student | List own appointments with status; link to add | — | 1 |
| `/appointments/new` | `AppointmentForm` | Student | Add appointment | FR2 | 1 |
| `/appointments/:id` | `AppointmentDetails` | Student | View one appointment; edit and delete if Pending | FR3 | 2 |
| `/appointments/:id/edit` | `AppointmentForm` | Student | Update a Pending appointment | FR4 | 2 |
| `/admin` | `AdminDashboard` | Admin | List Pending appointments (v1); approve or reject (v2) | FR5 | 1–2 |

- Logout (FR1) is a button in `Header`. It calls `authService.logout()`, then `clearAuth()`, then navigates to `/login`.
- `AppointmentForm` uses `<input type="date">` and `<input type="time">`, which give `YYYY-MM-DD` and `HH:MM`, the same formats the backend expects. The purpose dropdown uses the same category list as the backend.
- Every page renders `Header` and `Footer`. Internal links use `<Link>`, and navigation after a button click uses `useNavigate`. `<a href>` is used only for external sites.

### 10.5 Components

| Component | Props | Purpose |
| --- | --- | --- |
| `Header` | — | App name, logged-in user's name, logout button (reads `useAuthStore`) |
| `Footer` | — | App name and short description |
| `AppointmentCard` | `appointment` | Student view: date, time, category, status, link to details |
| `AppointmentCardSkeleton` | — | Same shape as the card, with `animate-pulse` |
| `AdminAppointmentCard` | `appointment`, `onApprove`, `onReject` | Admin view with student name and decision buttons (buttons added in v2) |
| `StatusBadge` | `status` | Amber for Pending, green for Approved, red for Rejected |
| `RequireRole` | `role`, `children` | Redirects to `/login` if not logged in, or to the user's own home if the role is wrong |
| `ErrorBoundary` | `children`, `fallback?` | Class component; wraps the whole app and each card in a list |

`RequireRole` is the one addition beyond the class guide. It is needed because the assignment has two roles, and students must not open `/admin`.

### 10.6 UI rules

- Every data page handles four states: **loading**, **error**, **empty** and **data**. Lists show a skeleton grid; the details page shows a spinner.
- Every data-fetching `useEffect` has a dependency array and an `ignore` cleanup flag.
- Edit and delete buttons appear only on `Pending` appointments. Approved and Rejected appointments are read-only.
- Delete, approve and reject ask for confirmation with `window.confirm` first.
- Forms disable the submit button while saving, and show the API's `err.response?.data?.message` when a request fails.

### 10.7 Code conventions

- Function components: `function Name() {}` with `export default Name;` at the bottom. `ErrorBoundary` is the only class component.
- PascalCase component files that match the component name (`AppointmentCard.jsx` → `function AppointmentCard`).
- Named exports for services and stores (`export const appointmentService = { ... }`).
- Imports include the `.jsx` or `.js` extension.
- Single quotes, semicolons and 2-space indentation.
- Props are destructured by name (`function AppointmentCard({ appointment })`); callback props start with `on`.
- Derived values (e.g. filtered lists) use `useMemo`, not extra `useState`.
- State updates create new arrays and objects; they never change existing ones.
- Tailwind utility classes only, with full class names (no `bg-${colour}-500`). Main colour: **teal** (`teal-700`, `teal-600`), used consistently.

---

## 11. Setup and running

| Service | URL |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000/api |
| PostgreSQL | localhost:54320 (container port 5432) |

**Requirements:** Node.js 18 or newer, Docker Desktop and Git.

### 11.1 Backend

**First-time project creation** (already done if you cloned the repository):

```text
npm init -y
npm install express cors dotenv pg bcryptjs jsonwebtoken
npm pkg set scripts.start="node index.js"
```

**`backend/.env`:**

```text
PGHOST=localhost
PGPORT=54320
PGDATABASE=postgres
PGUSER=postgres
PGPASSWORD=postgres
PGSSL=false
PORT=8000
JWT_SECRET=<long random value>
JWT_EXPIRES_IN=1h
```

Generate `JWT_SECRET` with:

```text
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Run** from the `backend/` folder (macOS, Linux or Git Bash):

```text
npm install
docker compose up -d --wait
node init-db.js
docker exec -i supabase-postgres psql -U postgres -d postgres < supabase/seed.sql
node db-check.js
npm start
```

On Windows PowerShell, use this for the seed step:

```text
Get-Content supabase/seed.sql | docker exec -i supabase-postgres psql -U postgres -d postgres
```

**When a table changes:** `CREATE TABLE IF NOT EXISTS` does not change an existing table. Either run an `ALTER TABLE` statement, or reset everything and rerun the commands above. Resetting deletes all data:

```text
docker compose down -v
```

### 11.2 Frontend

**First-time project creation** (already done if you cloned the repository):

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install axios react-router-dom zustand tailwindcss @tailwindcss/vite
npm install -D oxlint
npm uninstall eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh globals
npm pkg set scripts.lint=oxlint
```

Then:
1. Delete `src/App.css`, `eslint.config.js`, `src/assets/react.svg` and `public/vite.svg`.
2. Create `.oxlintrc.json` with the `react` and `oxc` plugins and the `react/rules-of-hooks` rule.
3. Set `src/index.css` to `@import "tailwindcss";`, and add `tailwindcss()` to the plugins in `vite.config.js`.

**Run** from the `frontend/` folder, after the backend is running:

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run lint      # oxlint
npm run build     # production build
npm run preview   # preview the build
```

In development, React StrictMode runs each effect twice, so the Network tab shows two requests per page load. This is normal.

### 11.3 Testing the API

Example requests (Git Bash). Before auth is added, use the `student_id` and `admin_id` inputs shown. After auth, remove them and add `-H "Authorization: Bearer <token>"`.

```bash
# FR1 Login
curl -X POST http://localhost:8000/api/auth/login -H "Content-Type: application/json" \
  -d '{"email":"student@test.edu.my","password":"Password123"}'

# List own appointments
curl "http://localhost:8000/api/appointments?student_id=usr_01"

# FR2 Add appointment
curl -X POST http://localhost:8000/api/appointments -H "Content-Type: application/json" \
  -d '{"student_id":"usr_01","preferred_date":"2026-12-01","preferred_time":"10:00","purpose_category":"Academic"}'

# FR4 Update Pending appointment
curl -X PATCH http://localhost:8000/api/appointments/apt_01 -H "Content-Type: application/json" \
  -d '{"student_id":"usr_01","preferred_time":"14:30"}'

# FR3 Delete Pending appointment
curl -X DELETE "http://localhost:8000/api/appointments/apt_01?student_id=usr_01"

# Admin list of Pending appointments
curl "http://localhost:8000/api/admin-appointments?status=Pending"

# FR5 Approve or reject
curl -X PATCH http://localhost:8000/api/admin-appointments/apt_02/process -H "Content-Type: application/json" \
  -d '{"admin_id":"usr_03","decision":"Approved"}'
```

Also test the failure cases: updating, deleting or processing an Approved or Rejected appointment must return `400`, and a missing `student_id` must return `400`.

---

## 12. Release checklist (every version)

Complete this before tagging `v0.1`, `v0.2` or `v0.3`:

- [ ] Every endpoint in the version tested, including failure cases
- [ ] Every SQL column used exists in `init.sql`
- [ ] `seed.sql` runs twice without errors
- [ ] Every route is in `App.jsx`, and API calls happen only in `services/`
- [ ] Every data page handles loading, error, empty and data states
- [ ] `npm run lint` and `npm run build` pass in `frontend/`
- [ ] No `.env` file is committed
- [ ] [Section 5](#5-prototype-versions) checklist and status updated
- [ ] [Feedback log](#6-feedback-log) updated
- [ ] Git tag created, e.g. `git tag v0.1 && git push origin v0.1`

---

## 13. Team

| Name | Role | Responsibilities |
| --- | --- | --- |
| _Name_ | Project lead | Planning, client meetings, process monitoring |
| _Name_ | Backend developer | API, database |
| _Name_ | Frontend developer | React UI, integration |
| _Name_ | Tester / documentation | Test cases, feedback log, report |
