# LMS Backend (Auth-enabled)

## Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. `cd backend`
3. `npm install`
4. `npm run dev` (requires nodemon) or `npm start`

This backend provides:
- User registration / login (JWT)
- Protected course creation (requires Authorization header with Bearer token)
- Enroll and certificate endpoints (protected)
