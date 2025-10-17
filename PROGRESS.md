# Interview prep progress log


## Day 1

### Completed:
- Setup dev envirnonment(Node.js, VScode, Git)
- Created GitHub repo for tracking progress
- Revised Typescript Basics(types, interfaces, functions)
- Watched "What the heck is the event loop anyway?" by Philip Roberts
- Reviewed OWASP Top 10 - familiar with common vulnerabilities

### Key Learnings - Event Loop:
1. Don't block the event loop with sluggish and long-time taking operations like image processing or animation
2. The flow in the browser ecosystem is: call gets in the callstack, if its an webapi it gets moved in the web apis stack, if not it gets executed and removed from the callstack. When the webapi execution is finished the call it gets pushed in the Callback Queue. The event loop component its responsible for verifying continously if the call stack is empty and if so it moves the call from the callback queue in the call stack one by one.
3. There is also a render queue, above the callback queue. Eventloop first ask the render queue and then the callback queue
4. The JS ecosystem is indeed working synchronously and with the power of the browser/node ecosystem it can achieve concurrency
5. The difference between concurrency and parallelism: concurrency is working with multiple tasks and making progress by switching very fast between them while parallelism is the simultaneous execution of multiple tasks.


## Day 2

### Completed:
- Built complete Express + TypeScript REST API
- Implemented CRUD operations (GET, POST, PUT, DELETE)
- Added proper error handling middleware
- Implemented input validation with Zod
- Added request logging
- Set up environment configuration
- Structured project with controllers, routes, middleware, types

### Key Learnings:
- Middleware execution order is critical in Express
- TypeScript's type system catches errors before runtime
- Zod makes validation declarative and type-safe
- Proper error handling improves API debugging significantly
- Separating concerns (controllers/routes/middleware) makes code maintainable

### What I Built:
A production-ready REST API with 5 user endpoints, custom error classes,
validation schemas, and proper TypeScript types throughout.

## Day 3

### Completed:
- Added JWT authentication system
- Implemented user registration with password hashing (using bcrypt)
- Built login and register endpoints with token generation
- Created authentication middleware for protected routes
- Added data validation
- Protected sensitive user routes (CRUD)
- Tested all auth flows

### Key Learnings:
- JWT tokens store user identity securely
- bcrypt hasing is one-way(can't decrypt, only compare)
- Middleware can modify request objects
- Authentication vs Authorization
- Never send passwors in responses (sanitize user objects)

### What I built
Complete authentication system with secure user registration, protected routes and auth middleware

## Day 4
- Integrated PostgreSQL database with Prisma ORM
- Created database schema and migrations
- Replaced in-memory storage with real database
- Updated all auth operations to use async database calls
- Added proper error handling for database operations
- Tested full auth flow with persistent storage
- Users now persists across server restarts

### Key Learnings:
- Prisma makes TS + db work beautifully
- Migrations track database changes over time
- Async/await with database requires careful error handling
- Type safety extends all the way to the database layer
- Prisma Studio is amazing for visualizing data
- Understanding difference between ORM and raw SQL

### What I Built:
Converted in-memory API to production-ready database-backend system:
- Full Prisma setup with migrations
- Type-safe database queries
- Persistent user authentication
- Database connection management
- Error handling for database failures