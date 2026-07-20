# Architecture Overview

This document describes the high-level architecture, folder layout, and design conventions used by the `payment-fe` frontend.

## Purpose

`payment-fe` is a mock frontend for a payments/merchant dashboard built with React + Vite + TypeScript and Tailwind CSS. It contains UI modules, mock data, and reusable UI building blocks for list/detail CRUD flows.

## Tech Stack

- React 19 + TypeScript
- Vite for bundling and dev server
- Tailwind CSS for styling (utility-first)
- Testing with Jest/React Testing Library (tests exist next to logic files)

## High-level Folder Layout

- `src/` — app source
  - `app/` — app bootstrap and route registration
  - `modules/` — feature modules (dashboard, merchant, transactions, payment-gateway, ...)
    - each module exports routes from `index.tsx` and keeps `data.ts` for mock data
    - presentational components live in `components/`
    - business logic (sorting, filtering, validators) live in plain `.ts` files alongside tests
  - `shared/` — shared UI and layout
    - `shared/ui/` contains small reusable UI primitives (`TextField`, `Toggle`, `DataTable`, `StatusBadge`, ...)
    - `shared/layout/` contains app shell and navigation

## Design Conventions

- Reuse native inputs: style real HTML inputs (date, checkbox, radio) rather than replacing them.
- Controlled inputs only: components accept `value` + `onChange`.
- Errors are string props and rendered inline.
- Buttons that navigate are `Link` components styled as buttons.
- Table action icons are links when they navigate; icons are decorative (`alt=""`) and the actionable element has an `aria-label`.
- Repeated Tailwind class strings are hoisted to a module constant (SCREAMING_SNAKE) when repeated 3+ times.

See `CLAUDE.md` for additional UI and styling rules collected from the design notes.

## Components & Patterns

- `DataTable` is a thin renderer expecting `columns`, `rows`, and `cells` factories for consistent table rendering.
- `StatusBadge` provides a single place for status colors and spacing; prefer it for all status labels.
- Business logic (sort/filter/validators) lives in plain `.ts` files with corresponding tests alongside them.

## Accessibility

- Labels wrap inputs to avoid `id`/`htmlFor` coupling.
- Color is not the only indicator: status badges include visible text and semantic classes.
- Interactive elements have clear `aria-label`s when icon-only.

## Local development

Start the dev server:

```bash
npm install
npm run dev
```

Run typecheck and build:

```bash
npx tsc -b
npm run build
```

Run tests:

```bash
npm test
```

## Contributing

- Keep presentational components small and stateless. Move non-trivial logic into plain `.ts` files and add unit tests.
- When adding new UI tokens (colors, spacing), prefer adding them to `index.css` `@theme` tokens.

---
This file is maintained in `/docs/ARCHITECTURE.md` — link from the project `README.md`.
