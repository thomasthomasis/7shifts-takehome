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

I started by setting up a local environment before any feature work began, then containerized both the Laravel backend and React frontend behind a single docker-compose.yml so the whole stack starts with one command. From there I worked on the backend first. I designed the Staff and Shift schema together, then I built it up in layers. Migrations, Eloquent models with casts and relationships, Form Request validation, and controllers exposing a deliberately two endpoint design (create a shift vs. assign it to staff) that mirrors the assignment's own language. I added isolated unit tests around the enum and model behavior as that layer was built, rather than bolting tests on at the end.

With the API in place, I moved to the React frontend. I built a small fetch based API client, then components for listing/adding staff and creating/assigning shifts, with state lifted to the top level so the staff list stays in sync across both. Once these parts pieces existed, I did a full end-to-end manual test in the browser, which caught and fixed a real chain of integration bugs. For example, API routes were never registered in Laravel's bootstrap, the frontend never wired to its own components, a couple of missing imports, and a swapped validation rule. The kind of issues that only surface when everything runs together rather than in isolation. I then added Tailwind for a mobile first responsive layout, and closed out with a README covering setup, the architectural decisions, known limitations, and an honest account of how AI was used throughout. I then did a final check against the original assignment PDF to confirm nothing was missed before calling it done.

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

This project was built with substantial assistance from Claude Code, used as a pair-programming and mentoring tool throughout. I drove the process at each step - drafting the initial schema, and reviewing and signing off on design decisions like the shared `Role` enum, the two-endpoint approach for creating vs. assigning shifts, and the validation rules. I wrote or typed in most of the backend code myself based on that guidance. Claude wrote the React components and Tailwind styling directly, and diagnosed and fixed several bugs in the process (missing imports, a missing API route registration, incorrect validation rules) that I reviewed and understood afterward. Claude also explained Laravel concepts and conventions I hadn't used before. Claude was also used to generate parts of the README.md such as the tutorial on how to get setup and run the project.