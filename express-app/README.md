# Day 2: Express & TS project

## Features
- JWT Authentication
- Password hashing with bcrypt
- Protected routes
- User registration and login
- PostgreSQL database with PRISMA ORM
- Database migrations
- Type-safe database queries

## Techonologies
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT tokens
- **Prisma** - Type-safe ORM

## API Endpoints
### User management
- **GET** `/api/users/`
  - Get all users
  - Body: `{}`
  - Response: `{ success: true, data: User[]}`

- **GET** `/api/users/{id}`
  - Get user by id
  - Body: `{}`
  - Response: `{ success: true, data: User[]}`

- **POST** `/api/users/`
  - Create user
  - Body: `{name: string, email: string, password: string}`
  - Response: `{ success: true, data: User, message: string}`

- **DELETE** `/api/users/{id}`
  - Delete user
  - Body: `{}`
  - Response: `{ success: true, data: User, message: string}`

- **PUT** `/api/users/{id}`
  - Update user
  - Body: `{name?: string, email?: string}`
  - Response: `{ success: true, data: User, message: string}`


### Authentication
- **POST** `/api/auth/register`
    - Register new user
    - Body: `{name: string, email: string, password: string }`
    - Response: `{ success: true, token: string, user: User}`

- **POST** `/api/auth/login`
  - Login user
  - Body: `{ email: string, password: string }`
  - Response: `{ success: true, token: string, user: User }`

- **GET** `/api/auth/me`
  - Get current user (protected)
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ success: true, data: User }`

## Authentication

This API uses JWT (JSON Web Tokens) for authentication.

### Getting a Token
1. Register: `POST /api/auth/register`
2. Or Login: `POST /api/auth/login`
3. Use the returned token in subsequent requests.

## Database Setup:

### Prerequisites
- PostgreSQL installed locally OR
- Free PostgreSQL instance (Supabase, Neon, etc.)

### Setup Steps
1. Create a PostgreSQL database
2. Update `DATABASE_URL` IN `.env`
3. Run migrations:
    bash
    npx prisma migrate dev
4. View database:
    bash
    npx prisma studio