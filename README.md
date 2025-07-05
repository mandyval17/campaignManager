# Campaign Manager Frontend

A modern, production-ready React application for campaign management and analytics. Built with TypeScript, Vite, React Query, MUI, Tailwind CSS, and a modular architecture. This frontend interfaces with the Campaign Manager backend for authentication and campaign metric management.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Scripts](#scripts)
- [Environment & Configuration](#environment--configuration)
- [Main Technologies](#main-technologies)
- [Architecture Overview](#architecture-overview)
- [Routing](#routing)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Linting & Formatting](#linting--formatting)
- [TypeScript](#typescript)
- [License](#license)

---

## Features

- User authentication (login/logout, JWT, cookies)
- Dashboard for campaign metrics (CRUD)
- Responsive, accessible UI (MUI + Tailwind)
- React Query for data fetching, caching, and mutations
- Form validation with Zod and React Hook Form
- Modular, scalable folder structure
- Error boundaries and loading states
- Custom hooks for auth, API, and utilities
- Type-safe models and API responses

---

## Project Structure

```
Frontend/
  public/                 # Static assets (favicon, etc.)
  src/
    assets/               # Images, SVGs, etc.
    components/
      common/             # Error boundaries, wrappers
      types/              # TypeScript models and types
      ui/                 # UI primitives (inputs, modals, loaders, etc.)
    hooks/
      auth/               # Auth context, hooks, protected routes
      tanstackCustom/     # Custom React Query hooks
      utils/              # Utility hooks
    pages/
      (auth)/login/       # Login page and components
      dashboard/          # Dashboard and campaign management
    services/
      Auth/               # Auth API and service
      metric/             # Metric API and service
      axios.ts            # Axios instance
    utilities/            # Utility functions (error formatting, etc.)
    App.tsx               # App root (providers, router)
    colorScheme.ts        # Color palette
    const.ts              # Constants (API URL, etc.)
    index.css             # Global styles (Tailwind)
    layout.tsx            # Main layout
    loadingScreen.tsx     # Loading screen
    main.tsx              # React entry point
    router.tsx            # React Router config
    404.tsx, 403.tsx      # Error pages
  index.html              # HTML entry point (preloader, root)
  package.json            # Scripts & dependencies
  tsconfig.json           # TypeScript config
  tailwind.config.js      # Tailwind CSS config
  eslint.config.js        # ESLint config
  .gitignore              # Git ignore rules
```

---

## Setup & Installation

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure backend API URL:**
   - The backend API URL is set in `src/const.ts`:
     ```ts
     export const DB_URL = 'https://campaignmanager-towz.onrender.com/api/v1/';
     ```
   - Change this to your backend deployment if needed.
3. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

---

## Scripts

- `npm run dev` – Start Vite dev server with HMR
- `npm run build` – Type-check and build for production
- `npm run preview` – Preview the production build
- `npm run lint` – Lint code with ESLint

---

## Environment & Configuration

- **API URL:** Set in `src/const.ts`
- **TypeScript paths:** Configured in `tsconfig.app.json` for `@`, `@components`, `@pages`, etc.
- **Vite aliases:** See `vite.config.ts` for import aliases
- **Tailwind CSS:** Configured in `tailwind.config.js` and imported in `src/index.css`

---

## Main Technologies

- **React 18** (with hooks, functional components)
- **TypeScript** (strict, type-safe)
- **Vite** (fast dev/build tool)
- **React Router v7** (routing)
- **React Query (TanStack)** (data fetching, caching)
- **MUI (Material UI)** (UI components)
- **Tailwind CSS** (utility-first styling)
- **Zod** (schema validation)
- **React Hook Form** (form state/validation)
- **Axios** (HTTP client)
- **Jest** (testing, if tests are added)

---

## Architecture Overview

- **App Providers:**
  - `App.tsx` wraps the app with React Query, MUI date pickers, and Toaster providers.
  - `hooks/app-provider.tsx` wraps children with AuthProvider.
- **Routing:**
  - `router.tsx` defines routes for login, dashboard, and 404.
  - `ProtectedRoute` ensures only authenticated users access the dashboard.
- **State Management:**
  - **Auth:** Context-based, with hooks for login/logout and user state.
  - **Data:** React Query for metrics and API data.
- **API Integration:**
  - `services/` contains API and service layers for Auth and Metric.
  - All requests use Axios with credentials for cookie-based auth.
- **Forms & Validation:**
  - Login and metric forms use React Hook Form + Zod for validation.
- **Styling:**
  - MUI for components, Tailwind for layout/utility classes, custom color scheme.
- **Error Handling:**
  - Error boundaries, error/loader wrappers, and toast notifications.

---

## Routing

- `/login` – Login page
- `/` – Dashboard (protected)
- `*` – 404 Not Found

---

## State Management

- **Auth:** Context API (`hooks/auth/authContext.tsx`), with hooks for login/logout and user state.
- **Data:** React Query for fetching, caching, and mutating campaign metrics.

---

## API Integration

- **Auth:**
  - `POST /auth/login` – Login
  - `POST /auth/logout` – Logout
- **Metrics:**
  - `GET /metric` – List all metrics
  - `POST /metric` – Create metric
  - `PUT /metric/:id` – Update metric
  - `DELETE /metric/:id` – Delete metric
- **All API calls:**
  - Use Axios instance (`services/axios.ts`)
  - Base URL set in `src/const.ts`
  - Credentials (cookies) sent for auth

---

## Styling

- **MUI:** For UI components (buttons, forms, dialogs, etc.)
- **Tailwind CSS:** For layout, spacing, and utility classes
- **Custom color scheme:** See `colorScheme.ts`
- **Global styles:** In `src/index.css`

---

## Linting & Formatting

- **ESLint:** Configured in `eslint.config.js` (React, TypeScript, React Query, etc.)
- **Prettier:** (Optional, not included by default)
- **TypeScript:** Strict mode, path aliases, and type checking

---

## TypeScript

- **Strictly typed models:** All API data, forms, and state are type-safe
- **Path aliases:** For clean imports (see `tsconfig.app.json` and `vite.config.ts`)
