# Summary of Changes

This document summarizes all implemented changes for Cloudinary integration, auth hardening, upload security, CSRF/origin checks, security headers, and Firebase rules.

## 1. Dependencies

- Installed official Cloudinary SDK:
  - `cloudinary` in `frontend/package.json`
- Lockfile updated in `frontend/package-lock.json`

## 2. Cloudinary Integration

### Created

- `frontend/lib/cloudinary.ts`

### What was implemented

- Added a Cloudinary utility using the official SDK (`cloudinary.v2`)
- Added lazy Cloudinary configuration to avoid startup crashes when env vars are missing
- Added `uploadImageToCloudinary(buffer, folder?)` helper
- Upload returns Cloudinary delivery URL with optimization:
  - `fetch_format: "auto"`
  - `quality: "auto"`

### Environment variables added

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## 3. Upload API Migration and Hardening

### Updated

- `frontend/app/api/upload/route.ts`

### What changed

- Replaced local filesystem upload logic with Cloudinary upload
- Kept auth requirement for upload route
- Added strict CSRF/origin validation via shared helper
- Added per-IP rate limit for uploads:
  - `10 requests / minute`
- Reduced max upload size:
  - from `5MB` to `2MB`
- Restricted MIME types to:
  - `image/jpeg`
  - `image/png`
- Added image signature (magic byte) validation for JPEG and PNG
- Added graceful Cloudinary error handling (`500 Upload failed`)

## 4. Security Utilities

### Updated

- `frontend/lib/security.ts`

### What changed

- Added/kept reusable in-memory rate limiter helpers
- Added request origin validation utilities:
  - `isAllowedRequestOrigin(...)`
  - host/site/vercel fallback handling
- Added input sanitization helpers:
  - recursive `sanitizeInput(...)`
  - script/protocol stripping and angle bracket encoding for strings
- Added magic-byte detection helper:
  - `detectImageMime(buffer)` for JPEG/PNG

### New env/config support

- Added `ALLOWED_ORIGINS` in `.env.local` (comma-separated allowlist)

## 5. Auth System Hardening

### Updated

- `frontend/lib/auth.ts`
- `frontend/app/actions/auth.ts`
- `frontend/app/admin/(protected)/layout.tsx`
- `frontend/app/actions/content.ts`

### What changed

- Token generation/verification changed to async to support backend checks
- Added token version field (`tv`) inside signed token payload
- Added Firestore-backed token version source:
  - doc ID: `admin_security`
  - field: `tokenVersion`
  - cached briefly in memory for performance
- Verification now rejects tokens if tokenVersion mismatches current Firestore value
- Cookies are set with secure attributes:
  - `httpOnly: true`
  - `sameSite: "strict"`
  - `secure: process.env.NODE_ENV === "production"`
- Protected admin layout updated to await server-side token verification
- Content write server actions now enforce auth server-side as defense-in-depth

## 6. Login Rate Limiting + Origin Protection

### Updated

- `frontend/app/actions/auth.ts`

### What changed

- Login rate limit set to:
  - `5 attempts / minute` per IP
- Added origin check (`isAllowedRequestOrigin`) before login logic
- Rate-limit key reset after successful login

## 7. Content Mutation Security

### Updated

- `frontend/app/actions/content.ts`

### What changed

- Added `requireAdminSession()` for all save helpers
- Added origin check for mutation requests
- Added token verification for mutation requests
- Added input sanitization (`sanitizeInput`) before persisting data

## 8. Security Headers (Next.js)

### Updated

- `frontend/next.config.ts`

### What changed

- Added site-wide security headers:
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Strict-Transport-Security`
- Added Cloudinary domain to Next image remote patterns:
  - `res.cloudinary.com`

## 9. Firebase Rules Added

### Created

- `frontend/firestore.rules`
- `frontend/storage.rules`

### Rules intent

- Firestore: public reads, admin-only writes
- Storage: public reads, admin-only writes
- Removed open write access patterns

## 10. Environment Updates

### Updated

- `frontend/.env.local`

### Added/updated

- Added Cloudinary vars placeholders
- Added `ALLOWED_ORIGINS=http://localhost:3000`
- Updated `ADMIN_SECRET` to a strong random value placeholder used locally

## 11. Build Status

- `npm run build` completed successfully after changes.

## 12. Important Deployment Note

Current Firestore/Storage rules enforce admin-authenticated writes. If strict rules are deployed, writes done through Firebase client SDK from server-side code may fail unless one of the following is implemented:

1. Full Firebase Auth + admin custom claims path for writes, or
2. Move sensitive writes to Firebase Admin SDK on server

This note is to avoid breaking production write flows when tightening Firebase rules.
