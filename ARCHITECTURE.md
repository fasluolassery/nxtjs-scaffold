# Architecture & Decision Records

This document records the architectural standards, design patterns, and boundaries enforced in this repository.

---

## 1. Feature Slicing & Boundary Enforcement

Every domain module under `src/features/<feature-name>` must expose a single public index export boundary (`index.ts`).

### Rules:

- External features or pages **must** import from `@/features/<feature-name>`.
- Deep internal imports such as `@/features/users/components/UserTable` from outside the feature are forbidden.
- Intra-feature components can import internal files directly.

---

## 2. Server Action & API Data Access Flow

Data access follows a strict non-leaking pipeline:

```text
Component (Client Leaf / Server Component)
    ↓
Server Action / TanStack Query Hook
    ↓
Centralized HttpClient (Correlation ID + Error Normalization)
    ↓
API Backend
```

### Authorization & Error Guarantees:

- Server Actions enforce session & RBAC guards (`assertAuthorized`).
- Runtime payload validation uses Zod schemas (`safeParse`).
- Failures map to operational `AppError` subclasses (`ValidationError`, `UnauthorizedError`, `NotFoundError`).

---

## 3. Environment Variable Security

Environment variables are defined in `src/env.ts` using `@t3-oss/env-nextjs` and `zod`.

- Server-only secrets (`API_SECRET_KEY`, `DATABASE_URL`) are strictly forbidden from having the `NEXT_PUBLIC_` prefix.
- The build or startup process fails fast with an explicit error list if any required variable is missing or invalid.
