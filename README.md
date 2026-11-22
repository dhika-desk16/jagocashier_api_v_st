# JagoCashier API

<p align="center">
  <strong>REST API backend for modern point-of-sale and store operations</strong>
</p><p align="center">
  <img src="https://skillicons.dev/icons?i=nestjs,ts,prisma,postgres" alt="NestJS, TypeScript, Prisma, and PostgreSQL" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white" alt="NestJS 11">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white" alt="Prisma 6">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

JagoCashier API is a backend service for cashier and multi-store retail operations. It provides authentication, catalog and inventory management, sales transactions, payments, receipts, promotions, customer loyalty, receivables, shift management, and stock operations through versioned REST endpoints.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Requirements](#system-requirements)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The API centralizes point-of-sale operations so multiple stores can manage users, products, inventory, transactions, and customer records consistently. It is designed for cashier applications, store management tools, and inventory or reporting clients.

### Objectives

- Provide secure access for store staff and role-based permissions.
- Support sales workflows from shift opening through payment and receipt generation.
- Track inventory across stores, including adjustments, transfers, and expiry batches.
- Manage customer loyalty, promotions, taxes, and receivable balances.

### Scope

This repository contains the API server, Prisma data model and migrations, seed data, unit specifications, and an end-to-end test setup. It does not include a web or mobile point-of-sale interface.

---

## Key Features

- JWT access tokens and 7-day rotating refresh tokens bound to a device ID
- Role and permission models for administrative and operational access
- Multi-store management, store settings, and cashier shift lifecycle
- Product categories, variants, SKUs, barcodes, and stock inventory
- Stock adjustments and transfers between stores
- Inventory batches, expiring-stock lookup, and expired-stock write-off
- Transaction items, multiple payment records, receipts, and receivables
- Promotions, product promotions, taxes, customers, and loyalty points
- Global validation, CORS, standardized responses, exceptions, and timezone handling
- Request throttling with short, medium, and long limits

---

## Technology Stack

### Backend

- Framework: NestJS 11
- Language: TypeScript 5
- ORM: Prisma 6
- Database: PostgreSQL
- Authentication: Passport JWT
- Validation: `class-validator` and `class-transformer`
- Password hashing: bcrypt
- HTTP platform: Express
- Date utilities: Day.js

### Testing

- Jest 30
- ts-jest
- Supertest

### Infrastructure

- Package manager: npm
- Runtime: Node.js
- API prefix: `/api`
- API version: URI-based, defaulting to `v1`

---

## System Requirements

### Software

- Node.js 20 or newer
- npm 10 or newer
- PostgreSQL 13 or newer
- Prisma-compatible database tooling

### Recommended Resources

- CPU: 2 cores or more
- RAM: 2 GB or more
- Storage: enough for PostgreSQL data and application logs

---

## Architecture

The application follows a modular NestJS architecture. HTTP controllers receive requests, services implement business logic, and Prisma provides database access. Global middleware handles validation, versioned routing, exception formatting, response transformation, CORS, throttling, and timezone conversion.

```text
Client
  │
  ▼
NestJS Controllers
  │
  ▼
Domain Services
  │
  ▼
PrismaService
  │
  ▼
PostgreSQL
```

### Main Modules

- **Authentication:** login, refresh, profile, and token validation
- **Organization:** roles, stores, users, and store settings
- **Catalog:** categories, products, variants, promotions, taxes, and payment methods
- **Operations:** inventory, batches, adjustments, transfers, shifts, and customers
- **Commerce:** transactions, transaction items, payments, receipts, and receivables
- **Loyalty:** loyalty points and loyalty transactions

---

## Project Structure

```text
.
├── prisma/
│   ├── migrations/       # Versioned PostgreSQL migrations
│   ├── schema.prisma     # Prisma data model
│   └── seed.ts           # Seed roles, stores, users, products, and settings
├── src/
│   ├── common/           # Filters, interceptors, guards, DTO helpers, and utilities
│   ├── modules/          # Feature modules and REST controllers
│   ├── prisma/           # Prisma module and database service
│   ├── app.module.ts     # Application module composition
│   └── main.ts           # Server bootstrap and global configuration
├── test/
│   └── app.e2e-spec.ts   # End-to-end test example
├── dist/                 # Compiled output
├── generated/prisma/     # Generated Prisma client
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

```bash
node --version
npm --version
psql --version
```

### Installation

```bash
git clone <repository-url>
cd jagocashier_api_v_st
npm install
```

### Environment Setup

Create a `.env` file in the repository root:

```dotenv
DATABASE_URL="postgresql://postgres:password@localhost:5432/jagocashier"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="1h"
PORT=3000
```

### Database Setup

```bash
npx prisma generate
npx prisma migrate deploy
npm run seed
```

For local development with new migrations:

```bash
npx prisma migrate dev
```

### Run

```bash
# Development with watch mode
npm run start:dev

# Standard development start
npm start

# Production build and run
npm run build
npm run start:prod
```

The default server URL is `http://localhost:3000/api/v1`.

---

## Environment Configuration

| Variable | Description | Required | Example |
|---|---|---:|---|
| `DATABASE_URL` | PostgreSQL connection string used by Prisma | Yes | `postgresql://user:password@localhost:5432/jagocashier` |
| `JWT_SECRET` | Secret used to sign and verify access tokens | Yes | `replace-with-a-long-random-secret` |
| `JWT_EXPIRES_IN` | Access-token lifetime accepted by `@nestjs/jwt` | Yes | `1h` |
| `PORT` | HTTP port | No | `3000` |

Keep `.env` out of source control. Use a secret manager or deployment environment variables in production.

---

## Usage

### Authentication Example

```bash
curl --request POST http://localhost:3000/api/v1/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "superadmin",
    "password": "password123",
    "deviceId": "cashier-terminal-01"
  }'
```

The login response contains `access_token`, `refresh_token`, and user data.

Use the access token for protected endpoints:

```bash
curl http://localhost:3000/api/v1/auth/profile \
  --header 'Authorization: Bearer <access_token>'
```

Refresh the token:

```bash
curl --request POST http://localhost:3000/api/v1/auth/refresh \
  --header 'Content-Type: application/json' \
  --header 'x-device-id: cashier-terminal-01' \
  --data '{"refreshToken":"<refresh_token>"}'
```

### Response Format

Successful responses are wrapped by a global interceptor:

```json
{
  "success": true,
  "message": "Request success",
  "data": {},
  "meta": null
}
```

Errors include HTTP status, error code, request path, method, and timestamp.

---

## API Documentation

Base URL:

```text
/api/v1
```

The API is URI-versioned and globally prefixed with `/api`. The default Nest route is `/api/v1`.

### Authentication

Send access tokens as Bearer credentials:

```text
Authorization: Bearer <access_token>
```

The refresh endpoint requires `x-device-id` and a refresh token in the request body.

### Main Endpoint Groups

| Resource | Base path |
|---|---|
| Authentication | `/auth` |
| Roles | `/roles` |
| Stores | `/stores` |
| Users | `/users` |
| Store settings | `/store-settings` |
| Product categories | `/product-categories` |
| Products | `/products` |
| Product variants | `/product-variants` |
| Inventory | `/inventory` |
| Inventory batches | `/inventory-batches` |
| Stock adjustments | `/stock-adjustments` |
| Stock transfers | `/stock-transfers` |
| Shifts | `/shifts` |
| Customers | `/customers` |
| Promotions | `/promotions` |
| Payment methods | `/payment-methods` |
| Taxes | `/taxes` |
| Transactions | `/transactions` |
| Transaction items | `/transaction-items` |
| Payments | `/payments` |
| Receipts | `/receipts` |
| Receivables | `/receivables` |
| Loyalty | `/loyalty-points`, `/loyalty-transactions` |

Most CRUD resources support `POST`, `GET`, `PATCH`, and `DELETE`. Use the controllers under `src/modules/` for exact request bodies and route-specific behavior.

---

## Database

PostgreSQL is the primary database. Prisma models cover roles, stores, users, refresh tokens, catalog items, inventory batches, shifts, transactions, payments, loyalty, receipts, and receivables.

### Migration Commands

```bash
# Create a migration during development
npx prisma migrate dev --name <migration_name>

# Apply existing migrations
npx prisma migrate deploy

# Reset a local database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

Migrations are stored in `prisma/migrations/`. The generated Prisma client is stored in `generated/prisma/`.

### Seed Data

```bash
npm run seed
```

The seed creates example roles, stores, store settings, users, categories, products, variants, inventory, customers, payment methods, taxes, and promotions. The default seeded password is `password123`; change or disable seed credentials before production use.

---

## Testing

### Run Tests

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# End-to-end tests
npm run test:e2e

# Coverage
npm run test:cov
```

Coverage output is written to `coverage/`. Unit specifications are colocated with feature modules in `src/modules/`.

---

## Deployment

### Production Requirements

- A reachable PostgreSQL instance
- `DATABASE_URL`, `JWT_SECRET`, and `JWT_EXPIRES_IN` configured securely
- A production Node.js process manager or container runtime
- HTTPS termination at a reverse proxy or platform load balancer
- Persistent database backups and log collection

### Production Steps

```bash
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
npm run start:prod
```

Run migrations and application deployment as separate, reviewed steps where possible. Do not run watch mode or seed scripts in production.

### Verification

```bash
curl http://<host>/api/v1
```

Verify database connectivity, login and refresh behavior, protected routes, migrations, logs, and TLS configuration before accepting traffic.

---

## Security

- Access tokens are signed with `JWT_SECRET` and validated by a Passport JWT strategy.
- Refresh tokens are hashed in PostgreSQL and associated with a user and device ID.
- bcrypt protects stored passwords and refresh-token hashes.
- A global validation pipe allows only DTO-defined fields and rejects unknown fields.
- Throttling guards provide short, medium, and long request limits.
- CORS is enabled; production deployments should replace wildcard origins with an explicit allowlist.
- Secrets must be provided through environment variables and excluded from source control.

Rotate `JWT_SECRET` intentionally because it invalidates existing access tokens.

---

## Troubleshooting

| Problem | Possible Solution |
|---|---|
| Application fails to start with a JWT error | Set `JWT_SECRET` and `JWT_EXPIRES_IN` in `.env` |
| Prisma cannot connect | Verify `DATABASE_URL`, PostgreSQL status, credentials, and network access |
| Migration or generated-client errors | Run `npx prisma generate`, then apply migrations |
| Login fails | Verify the username/password and confirm seed data has been loaded |
| Protected route returns 401 | Confirm the `Authorization: Bearer` header and token expiry |
| Refresh fails | Send `x-device-id` and use the matching login device ID |
| Requests are rejected as unknown fields | Review the endpoint DTO and remove extra properties |
| Port is already in use | Change `PORT` or stop the process using the current port |

---

## Roadmap

- [x] Modular REST API for POS and inventory operations
- [x] JWT login and refresh-token support
- [x] Inventory batch and expiry management
- [x] Receivable and partial-payment support
- [ ] OpenAPI/Swagger documentation
- [ ] Explicit production CORS policy
- [ ] Expanded test coverage and CI pipeline
- [ ] Deployment container and infrastructure templates

---

## Contributing

Contributions are welcome. Before submitting a change:

1. Create a focused feature or fix branch.
2. Keep changes scoped to the relevant NestJS module.
3. Follow existing TypeScript, DTO, service, and Prisma conventions.
4. Run formatting, linting, unit tests, and relevant e2e tests.
5. Include migration files for any schema changes.

```bash
npm run format
npm run lint
npm test
npm run test:e2e
npm run build
```

---

## License

This project is licensed under the MIT License.

Copyright (c) 2026 dhikaryast_page

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.