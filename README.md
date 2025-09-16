# Casino Jackpot Assignment

## Overview

Casino Jackpot is a fullstack slot machine game built for the web. The app simulates a classic 3-reel slot machine with server-side session management and a "house always wins" twist. All game logic, credits, and session state are securely managed on the backend.

## Features
- 1 row, 3 reels, 4 symbols (C, L, O, W)
- Animated reels: each reel stops sequentially (1s, 2s, 3s)
- Spin, Cash Out, and New Game buttons
- Server logic: reroll on high balance (house edge)
- Session managed via httpOnly cookie
- Modern React UI, Zustand for UI state
- Dockerized for easy local and production deployment

## Tech Stack
- **Frontend:** React, Zustand, axios, Vite
- **Backend:** NestJS, Redis
- **Deployment:** Docker, docker-compose

## Getting Started

### Local Development
```bash
chmod +x ./setup-docker.sh
./setup-docker.sh
```
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Production
- Ready for deployment with Docker

## API Endpoints
- `POST /game/spin` — Spin the reels
- `POST /game/cashout` — Cash out and close session

- `POST /session/start` — Start a new session
- `GET /session/` — Check if session is active

## Game Logic
- Start: 10 credits
- Win: 3 matching symbols
- Cherry (C): 10, Lemon (L): 20, Orange (O): 30, Watermelon (W): 40
- <40 credits: fair random
- 40-60 credits: 30% chance to reroll on win
- >60 credits: 60% chance to reroll on win
- Cash out closes session and clears cookie

## UI/UX
- Minimalist design
- Reel animation: each reel stops in sequence
- All UI state managed via Zustand

## Testing
- Backend logic covered with unit tests (NestJS)
- Easily extendable for e2e/API tests

## Code Structure
- `frontend/` — React app
- `backend/` — NestJS API
- `docker-compose.yml` — Multi-service orchestration

