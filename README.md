# Enterprise Next.js App Router Frontend Scaffold

Production-ready, enterprise-grade Next.js (App Router) frontend foundation engineered for strict type safety, accessibility, automated git code quality gates, and seamless integration with **Node.js REST/GraphQL API backends** (Express, NestJS, Fastify, Hono).

---

## 🛡 Automated Git Code Quality & Workflow Automation

This repository includes a fully configured automated code quality & git hook pipeline:

- **ESLint 9 & Prettier ([.prettierrc.mjs](./.prettierrc.mjs))**: Automatic code formatting and static analysis (includes Tailwind CSS class sorting via `prettier-plugin-tailwindcss`).
- **Commitlint ([commitlint.config.mjs](./commitlint.config.mjs))**: Enforces **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, `perf:`). Commits with non-conforming messages are automatically rejected by git.
- **Lint-Staged ([lint-staged.config.mjs](./lint-staged.config.mjs))**: Automatically formats and lints only staged files before git commits occur.
- **Husky Git Hooks ([.husky/](./.husky/))**:
  - `pre-commit`: Runs `lint-staged` and `npm run typecheck` automatically.
  - `commit-msg`: Runs `commitlint` on the commit message body.

---

## 🏛 Core Architectural Features

- **External Node.js API Ready**: Centralized `HttpClient` ([src/lib/api/client.ts](./src/lib/api/client.ts)) configured for cross-origin cookie authentication (`credentials: "include"`), automatic JWT bearer authorization, and error extraction supporting standard Node.js Express/NestJS DTO formats (`{ message: string | string[], error?: string }`).
- **Development API Proxy Rewrites ([next.config.ts](./next.config.ts))**: Automatically proxies requests to `/api/v1/*` to your Node.js backend server (`API_BASE_URL=http://localhost:4000`), eliminating CORS issues during local development.
- **Distributed Tracing**: Automatic `x-correlation-id` header injection in [src/proxy.ts](./src/proxy.ts) for end-to-end tracing between Next.js and your Node.js API services.
- **Fail-Fast Environment Engine ([src/env.ts](./src/env.ts))**: Validates `API_BASE_URL` and public variables at boot/build time using `@t3-oss/env-nextjs`.
- **Feature-Driven Architecture**: Modular domain boundaries (`src/features/<feature>/`) with strict Public API Export boundaries (`index.ts`).
- **WCAG 2.2 AA Design System**: Accessible Radix UI primitives, Tailwind CSS v4, and modern CSS Variables design tokens.

---

## 🔌 Connecting to your Node.js Backend

1. **Set your Node.js API endpoint in `.env.local`**:
   ```env
   # Node.js Server Base URL
   API_BASE_URL=http://localhost:4000
   ```
2. **Make HTTP Calls**:
   Use the pre-configured `httpClient` from `@/lib/api/client`:
   ```ts
   import { httpClient } from "@/lib/api/client";
   import type { ApiResponse } from "@/types/api";

   // Fetch data from Node.js backend (`http://localhost:4000/api/v1/users`)
   const response = await httpClient.get<User[]>("/api/v1/users");
   ```

---

## 📁 Repository Directory Layout

```text
├── .husky/                  # 🐶 Git hooks (pre-commit, commit-msg)
│   ├── pre-commit           # Runs lint-staged & typecheck
│   └── commit-msg           # Runs commitlint validation
├── public/                  # Static web assets
├── src/
│   ├── app/                 # Next.js App Router Layer (Pages, Layouts, Route Handlers)
│   │   ├── (dashboard)/     # Protected dashboard layout & routes
│   │   │   └── users/       # User management view page
│   │   ├── api/             # REST Route Handlers (`/api/health`)
│   │   ├── layout.tsx       # Root app shell with providers
│   │   ├── loading.tsx      # Loading state fallback
│   │   ├── error.tsx        # Global error boundary
│   │   └── not-found.tsx    # 404 page
│   │
│   ├── components/          # Shared Presentation Layer (Design System)
│   │   ├── ui/              # Atomic Primitives (Button, Input, Card, DataTable, Dialog, Badge, Skeleton)
│   │   ├── layout/          # AppShell, Header, Sidebar
│   │   └── feedback/        # ErrorBoundary, EmptyState
│   │
│   ├── features/            # Domain Feature Slices
│   │   └── users/           # Example domain feature
│   │       ├── actions/     # Next.js Server Actions
│   │       ├── components/  # UserTable, UserFormModal
│   │       ├── hooks/       # `useUsers`, `useCreateUser`
│   │       ├── schemas/     # Zod schemas
│   │       ├── types/       # Domain models & DTOs
│   │       └── index.ts     # PUBLIC API EXPORT BOUNDARY
│   │
│   ├── lib/                 # Cross-Cutting Infrastructure
│   │   ├── api/             # Centralized HttpClient (Node.js API compatible)
│   │   ├── auth/            # Session & RBAC guard assertions
│   │   ├── errors/          # Custom AppError taxonomy
│   │   ├── logger/          # Structured JSON logger
│   │   └── utils/           # `cn()` class merger & metadata helpers
│   │
│   ├── providers/           # AppProviders (React Query, Nuqs, Theme)
│   ├── stores/              # Zustand global client state
│   ├── styles/              # Global CSS reset & design tokens
│   ├── types/               # API Envelope types (`ApiResponse<T>`, `PaginatedResult<T>`)
│   ├── env.ts               # Fail-fast Zod runtime environment variable validation
│   └── proxy.ts             # Next.js Edge proxy for request correlation ID tracing
│
├── .prettierrc.mjs          # Prettier configuration & Tailwind plugin
├── commitlint.config.mjs    # Conventional Commit rules
├── lint-staged.config.mjs   # Staged files linter configuration
└── vitest.config.ts         # Vitest unit test runner config
```

---

## 🚀 Available Scripts

| Script                 | Command            | Purpose                                              |
| :--------------------- | :----------------- | :--------------------------------------------------- |
| `npm run dev`          | `next dev`         | Starts development server on `http://localhost:3000` |
| `npm run build`        | `next build`       | Compiles production bundle                           |
| `npm run start`        | `next start`       | Runs compiled production app                         |
| `npm run typecheck`    | `tsc --noEmit`     | Runs strict TypeScript compiler check                |
| `npm run lint`         | `next lint`        | Runs ESLint rules check                              |
| `npm run test`         | `vitest run`       | Runs unit & component test suite                     |
| `npm run format`       | `prettier --write` | Formats codebase                                     |
| `npm run format:check` | `prettier --check` | Checks formatting without writing                    |
