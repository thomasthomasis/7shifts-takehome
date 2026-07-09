# Restaurant Staff Scheduling System

This is the official repository for the 7shifts take home assignment. It consists of a small Laravel API + React
frontend for managing restaurant staff and their shifts.

## Tech Stack

- **Backend:** Laravel 13 (PHP 8.5), PostgreSQL, Laravel Sail
- **Frontend:** React 19 (Vite), Tailwind CSS
- **Orchestration:** a single root-level `docker-compose.yml` runs backend, database, and frontend together

## Getting Started

### Prerequisites
- Docker Desktop (with Compose)

### Setup
1. Clone the repo
2. `cp backend/.env.example backend/.env`
3. From the repo root: `docker compose up -d --build`
4. Generate the app key: `docker compose exec -u sail laravel.test php artisan key:generate`
5. Run migrations: `docker compose exec -u sail laravel.test php artisan migrate`
6. Visit the app at **http://localhost:5174**; the API is at **http://localhost/api**

### Running Tests
docker compose exec -u sail laravel.test php artisan test --testsuite=Unit

## Approach

[2-3 sentences in your own words: Laravel API with Form Request validation and a shared
`Role` enum as the single source of truth for allowed roles across both models; React
frontend with a small fetch-based API client; shift creation and shift assignment modeled
as two distinct actions, mirroring the assignment's own language; Tailwind for a
mobile-first responsive layout.]

## Assumptions

- `day`/`start_time`/`end_time` are modeled as a date plus two full datetimes.
- A shift's `staff_id` is nullable — a shift can be created before it's assigned to anyone,
  matching the requirements listing "create" and "assign" as separate actions.
- Deleting a staff member unassigns their shifts rather than deleting shift history.
- A shift's required `role` is validated independently of the assigned staff member's own
  role.

## Known Limitations & Tradeoffs

- Overnight shifts (e.g. 10pm–2am) aren't supported — validation requires `end_time` to be
  after `start_time`.
- The list of roles is hardcoded on the frontend rather than fetched from the API.
- Test coverage is limited to true unit tests (enum + model casting/relationships in
  isolation); the API endpoints themselves (controllers, routes, Form Request validation)
  don't have automated integration test coverage.
- No authentication — out of scope per the assignment.

## What I'd Add With More Time

- Feature tests hitting the actual API endpoints
- Editing/deleting staff and shifts (only create + list were in scope)
- Better handling for overnight shifts

## Code Attribution

No code was copied from prior personal or professional projects.

## AI Tool Usage

This project was built with substantial assistance from Claude Code, used as a pair-programming and mentoring tool throughout. I drove the process at each step - drafting the initial schema, and reviewing and signing off on design decisions like the shared `Role` enum, the two-endpoint approach for creating vs. assigning shifts, and the validation rules. I wrote or typed in most of the backend code myself based on that guidance. Claude wrote the React components and Tailwind styling directly, and diagnosed and fixed several bugs in the process (missing imports, a missing API route registration, incorrect validation rules) that I reviewed and understood afterward. Claude also explained Laravel concepts and conventions I hadn't used before.