# Sarthi NGO Website

A content-driven NGO website built with Next.js App Router, with a protected admin panel for updating live content stored in Firebase Firestore.

This repository currently contains one app in the `frontend` folder.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Repository Structure](#repository-structure)
5. [How Content Works](#how-content-works)
6. [Environment Variables](#environment-variables)
7. [Local Development Setup](#local-development-setup)
8. [Available Scripts](#available-scripts)
9. [Admin Panel Guide](#admin-panel-guide)
10. [Uploads API](#uploads-api)
11. [Deployment Guide](#deployment-guide)
12. [Troubleshooting](#troubleshooting)
13. [Security Notes](#security-notes)
14. [Contributing](#contributing)

---

## Project Overview

The Sarthi NGO site is a modern Next.js application designed for:

- Public-facing storytelling pages (Home, About, What We Do, Team, Get Involved)
- A protected admin dashboard used to update page sections
- Firestore-backed content persistence with fallback support for legacy document shape
- Static asset uploads for content editors (stored in `public/uploads`)

The app is optimized for server rendering with periodic revalidation and supports a content-first workflow where non-developers can update site copy and section data from the admin area.

---

## Key Features

### Public Site

- Multi-page NGO website with reusable section components
- Data-driven sections loaded from Firestore
- Server-rendered pages with ISR (`revalidate = 3600` on key pages)
- Responsive design across desktop/mobile

### Admin CMS (Custom)

- Login-protected `/admin` area
- Section-specific forms for:
  - Home page content
  - About page content
  - What We Do content
  - Team content
  - Get Involved content
  - Shared layout content (Navbar/Footer/Meta)
- Immediate content updates via server actions
- Route revalidation after saves

### Content Infrastructure

- Firestore documents split by page domain (`shared`, `home`, `about`, etc.)
- Legacy fallback support from a monolithic `page` document
- Local JSON defaults used for graceful field expansion

---

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: React 19, Tailwind CSS 4, custom UI components
- Motion/Icons: Framer Motion, Lucide React
- Data Store: Firebase Firestore
- Auth (admin): Cookie + HMAC token verification
- Linting: ESLint + Next config

---

## Repository Structure

```text
.
├─ README.md
└─ frontend/
   ├─ app/
   │  ├─ page.tsx                      # Home page
   │  ├─ about/page.tsx                # About page
   │  ├─ get-involved/page.tsx         # Get Involved page
   │  ├─ team/page.tsx                 # Team page
   │  ├─ what-we-do/page.tsx           # What We Do page
   │  ├─ admin/
   │  │  ├─ login/page.tsx             # Admin login
   │  │  └─ (protected)/               # Protected admin routes
   │  ├─ actions/
   │  │  ├─ auth.ts                    # Login/logout server actions
   │  │  └─ content.ts                 # Content save server actions
   │  └─ api/upload/route.ts           # Auth-protected image upload API
   ├─ components/
   │  ├─ sections/                     # Public page sections
   │  ├─ admin/forms/                  # Admin edit forms
   │  └─ layout/                       # Navbar/Footer
   ├─ content/page-content.json        # Seed/default content source
   ├─ lib/
   │  ├─ content.ts                    # Firestore read/write helpers
   │  ├─ firebase.ts                   # Firebase initialization
   │  └─ auth.ts                       # Token utilities
   ├─ scripts/seed-firestore.mjs       # Seeds Firestore from JSON
   ├─ public/uploads/                  # Uploaded images
   └─ types/content.ts                 # Content typing schema
```

---

## How Content Works

The app stores content in Firestore under one collection:

- `FIREBASE_COLLECTION` (default: `dev_content`)

Within that collection, each page/domain has a document:

- `shared` (navbar, footer, meta)
- `home`
- `about`
- `team`
- `get-involved`
- `what-we-do`

### Legacy Compatibility

If these segmented docs are missing, the app falls back to a legacy `page` document shape. This allows migration from older content storage without breaking the site.

### Revalidation Behavior

After admin saves:

- Shared updates revalidate layout (`/` with layout scope)
- Page-specific updates revalidate corresponding route

This ensures fresh content appears without full rebuilds.

---

## Environment Variables

Create environment files inside `frontend`.

- Local development: `.env.local`
- Production builds/deployments: `.env.production` (or platform env settings)

### Required Variables

```env
# Firebase (client SDK + Firestore)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firestore collection used by lib/content.ts
FIREBASE_COLLECTION=dev_content

# Admin login credentials
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_SECRET=
```

### Notes

- `ADMIN_SECRET` is used to HMAC-sign and verify auth token cookies.
- If `ADMIN_USERNAME` or `ADMIN_PASSWORD` is missing, login is blocked.
- In production, always use strong secrets and long random values.

---

## Local Development Setup

### 1. Prerequisites

- Node.js 20+
- npm 10+
- A Firebase project with Firestore enabled

### 2. Install dependencies

```bash
cd frontend
npm install
```

### 3. Configure environment

Create `frontend/.env.local` using the variables above.

### 4. Seed Firestore (first run)

```bash
cd frontend
node scripts/seed-firestore.mjs
```

To seed against production env file:

```bash
cd frontend
node scripts/seed-firestore.mjs --prod
```

### 5. Start dev server

```bash
cd frontend
npm run dev
```

Open `http://localhost:3000`.

---

## Available Scripts

Run from `frontend`:

- `npm run dev` - Start local dev server
- `npm run build` - Build production bundle
- `npm run start` - Start production server (after build)
- `npm run lint` - Run ESLint

---

## Admin Panel Guide

### Access

- Login route: `/admin/login`
- Protected route root: `/admin`

### Authentication Model

- Credentials are validated in server action (`app/actions/auth.ts`)
- Comparison uses timing-safe checks
- On success, signed cookie (`sarthi_admin_token`) is set
- Protected layout validates token on each server render

### Editing Content

Admin forms call server actions in `app/actions/content.ts` which:

1. Read current Firestore document
2. Merge/replace the section data
3. Write document back
4. Revalidate affected route

This creates a simple CMS flow without introducing a separate CMS product.

---

## Uploads API

Endpoint: `POST /api/upload`

### Behavior

- Requires valid admin auth cookie
- Accepts `multipart/form-data` with `file`
- Allowed MIME types:
  - `image/jpeg`
  - `image/png`
  - `image/webp`
  - `image/gif`
- Max file size: 5 MB
- Stores files in `frontend/public/uploads`
- Returns JSON URL like `/uploads/<generated-name>`

### Important Deployment Caveat

On serverless platforms with ephemeral file systems, local disk uploads may not persist across deploys/instances. For durable storage, migrate this API to Firebase Storage, S3, or similar object storage.

---

## Deployment Guide

This app is deployable to Vercel, self-hosted Node, or container environments.

### Vercel (recommended)

1. Set project root to `frontend`
2. Add all environment variables from this README
3. Build command: `npm run build`
4. Output handled by Next.js automatically

### Self-hosted Node

```bash
cd frontend
npm install
npm run build
npm run start
```

Set all required env vars in your runtime environment.

### After Deployment Checklist

- Verify home and all page routes load
- Verify `/admin/login` authentication
- Verify content save from admin updates public pages
- Verify image upload works and persists as expected in your infra

---

## Troubleshooting

### "Admin credentials are not configured"

Cause: `ADMIN_USERNAME` and/or `ADMIN_PASSWORD` not set.
Fix: Add both in env and restart server.

### Login always fails

- Confirm exact env credentials
- Confirm there are no trailing spaces in env values
- Ensure server restarted after env changes

### Content not appearing from Firestore

- Check Firebase project IDs and keys
- Confirm `FIREBASE_COLLECTION` is correct
- Ensure seeded docs exist (`shared`, `home`, etc.)
- Confirm Firestore rules allow the app access pattern

### Uploaded images disappear in production

Cause: ephemeral filesystem in host environment.
Fix: move uploads to durable object storage and store returned external URLs.

### New fields missing in older Firestore docs

The app merges some page data with local JSON defaults to handle schema evolution. Re-seed or update docs manually to normalize structure.

---

## Security Notes

- Replace default/fallback secrets in all environments
- Use HTTPS in production (secure cookies are enabled in production mode)
- Restrict admin credentials to trusted operators
- Consider rotating admin secrets periodically
- Consider adding rate limiting for `/admin/login` and `/api/upload`
- Prefer external object storage over local disk for uploads in production

---

## Contributing

1. Create a feature branch
2. Keep changes scoped and typed
3. Run lint and build before opening PR:

```bash
cd frontend
npm run lint
npm run build
```

