# Campaign Manager Backend

A robust Express.js REST API backend written in TypeScript, using Prisma ORM and MySQL, designed for campaign management and analytics. This backend provides secure authentication, campaign metric CRUD operations, and a modular, testable architecture.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Overview](#api-overview)
  - [Authentication](#authentication)
  - [Metrics](#metrics)
  - [Other Endpoints](#other-endpoints)
- [Middleware](#middleware)
- [Testing & Linting](#testing--linting)
- [TypeScript & Linting](#typescript--linting)
- [License](#license)

---

## Features

- User authentication with JWT (access & refresh tokens)
- Secure password handling (bcrypt)
- Campaign metric CRUD (Create, Read, Update, Delete)
- Request validation with Zod
- Prisma ORM with MySQL
- Modular middleware (CORS, Helmet, Logger, Error Handling)
- TypeScript-first codebase
- Ready for Docker, CI/CD, and production

---

## Project Structure

```
Backend/
  prisma/                # Prisma schema and migrations
  src/
    api/
      auth/              # Auth endpoints, models, handlers
      metric/            # Metric endpoints, models, handlers
      emojis.ts          # Sample endpoint
      index.ts           # API router
    interfaces/          # TypeScript interfaces & types
    middlewares/         # Express middlewares
    utils/               # Utility functions (JWT, validation)
    app.ts               # Express app setup
    db.ts                # Prisma client instance
    env.ts               # Environment variable validation
    index.ts             # App entrypoint
  package.json           # Scripts & dependencies
  tsconfig.json          # TypeScript config
  .eslintrc              # ESLint config
  jest.config.js         # Jest config
  .gitignore             # Git ignore rules
  LICENSE                # MIT License
```

---

## Setup & Installation

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment variables:**
   Create a `.env` file in the `Backend/` directory with the following variables:
   ```env
   DATABASE_URL=your_mysql_connection_string
   JWT_AUTH_SECRET=your_jwt_auth_secret
   JWT_AUTH_EXPIRY=600 # in seconds (e.g., 600 = 10min)
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   JWT_REFRESH_EXPIRY=86400 # in seconds (e.g., 86400 = 1 day)
   NODE_ENV=development
   ```
3. **Setup the database:**
   ```sh
   npx prisma migrate dev --name init
   npx prisma generate
   ```
4. **Start the development server:**
   ```sh
   npm run dev
   ```
   The API will be available at `http://localhost:5000/api/v1` by default.

---

## Scripts

- `npm run dev` – Start server with hot reload (nodemon)
- `npm run build` – Compile TypeScript to `dist/`
- `npm start` – Build and run from `dist/`
- `npm run lint` – Lint and auto-fix code
- `npm run test` – Run Jest tests
- `npm run typecheck` – TypeScript type checking

---

## Environment Variables

| Variable           | Description                       |
| ------------------ | --------------------------------- |
| DATABASE_URL       | MySQL connection string           |
| JWT_AUTH_SECRET    | JWT secret for access tokens      |
| JWT_AUTH_EXPIRY    | Access token expiry (in seconds)  |
| JWT_REFRESH_SECRET | JWT secret for refresh tokens     |
| JWT_REFRESH_EXPIRY | Refresh token expiry (in seconds) |
| NODE_ENV           | `development` or `production`     |

---

## API Overview

### Authentication

- **POST `/api/v1/auth/login`**
  - Body: `{ email, password }`
  - Response: `{ data: { user, authToken, refreshToken }, message }`
- **POST `/api/v1/auth/logout`**
  - Clears auth and refresh cookies

### Metrics

- **GET `/api/v1/metric/`**
  - List all metrics (requires authentication)
- **GET `/api/v1/metric/:id`**
  - Get metric by ID (requires authentication)
- **POST `/api/v1/metric/`**
  - Create a new metric (requires authentication)
- **PUT `/api/v1/metric/:id`**
  - Update a metric (requires authentication)
- **DELETE `/api/v1/metric/:id`**
  - Delete a metric (requires authentication)

### Other Endpoints

- **GET `/api/v1/ping`** – Health check
- **GET `/api/v1/emojis`** – Returns a list of emojis (sample endpoint)

---

## Middleware

- **Helmet:** Security headers
- **CORS:** Cross-origin requests (configured for local and Vercel frontend)
- **Terminal Logger:** Pretty logs each request in the terminal
- **Request Validators:** Validates params, body, and query using Zod
- **Authenticate:** JWT authentication and refresh logic
- **Error Handler:** Centralized error responses
- **Not Found:** 404 handler for unknown routes

---

## Models & Validation

- **User**: `id`, `email`, `password`, `createdAt`, `updatedAt`
- **Metric**: `id`, `campaignName`, `date`, `impressions`, `clicks`, `conversions`, `userId`, `createdAt`, `updatedAt`
- **Validation:** All input is validated using Zod schemas before processing

---

## TypeScript & Linting

- **Strict TypeScript**: All code is type-checked
- **ESLint**: Airbnb TypeScript base config, custom rules in `.eslintrc`
- **Preconfigured scripts**: `npm run lint`, `npm run typecheck`

---

## Testing

- **Jest**: Unit and integration tests (see `test/` directory)
- **Supertest**: For HTTP assertions
