# 🚀 Secure Authentication System with JWT (IA07)

A complete full-stack authentication system with JWT access/refresh tokens, NestJS backend, Next.js frontend, and user profile management, fully containerized with Docker.

## 📋 Overview

This project implements a modern, secure authentication system featuring:
- **Backend**: RESTful API built with NestJS, TypeORM, PostgreSQL, and JWT
- **Frontend**: Responsive React application using Next.js 16, React 19, shadcn/ui, and Tailwind CSS
- **Authentication**: JWT-based authentication with access tokens (5 min, memory) and refresh tokens (7 days, HttpOnly cookies)
- **Token Management**: Automatic token refresh via Axios interceptors
- **User Profile Management**: Update user name with real-time dashboard updates
- **Security**: Secure password hashing with bcrypt, HttpOnly cookies for refresh tokens
- **Protected Routes**: Client-side route guards with automatic redirection
- **Validation**: Strong password requirements with both client-side and server-side validation
- **Notifications**: Toast notifications for user feedback
- **State Management**: React Query for efficient API communication and authentication state
- **Docker**: Full containerization with Docker Compose for easy deployment

## 🎯 Features

### Backend (NestJS)
- ✅ User registration endpoint (`POST /auth/register`) with name field
- ✅ JWT authentication with access & refresh tokens
- ✅ Login endpoint (`POST /auth/login`) with error handling and returns user info
- ✅ Token refresh endpoint (`POST /auth/refresh`) returns new token and user info
- ✅ Logout endpoint (`POST /auth/logout`) with token invalidation
- ✅ Protected endpoint (`GET /user/me`) with JWT guard
- ✅ User profile update endpoint (`PATCH /user/name`) for updating user names
- ✅ PostgreSQL database with TypeORM
- ✅ Database migrations with TypeORM (no synchronize in production)
- ✅ Seed data for testing (3 pre-configured users)
- ✅ Refresh token management in database (one user can have many refresh tokens)
- ✅ Password hashing with bcrypt
- ✅ Email uniqueness validation
- ✅ User name field support
- ✅ Input validation with class-validator
- ✅ HttpOnly cookies for secure refresh token storage
- ✅ CORS enabled with credentials support
- ✅ Environment-based configuration
- ✅ Comprehensive error handling

### Frontend (Next.js)
- ✅ Login page with React Hook Form validation and welcome message with user name
- ✅ User registration page with name field
- ✅ Protected dashboard with user profile (displays name, email, ID, join date)
- ✅ User profile name update with real-time UI updates
- ✅ Server-side proxy for authentication redirects (Next.js 16)
- ✅ Generalized FormField component for all input types
- ✅ Axios instance with automatic token attachment
- ✅ Axios interceptors for automatic token refresh on 401 errors
- ✅ Access token stored in memory (not localStorage)
- ✅ Refresh token stored in HttpOnly cookies
- ✅ React Query for authentication mutations and queries
- ✅ Auth context for global authentication state
- ✅ Server-side authentication checks (no page flash)
- ✅ Automatic logout on refresh token expiration
- ✅ Modern UI with shadcn/ui components
- ✅ Tailwind CSS v4 styling
- ✅ Responsive design
- ✅ Dark mode support
- ✅ TypeScript throughout
- ✅ Real-time form validation with strength indicators
- ✅ Comprehensive error handling with user-friendly messages
- ✅ Toast notifications with sonner

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS
- **Authentication**: JWT (@nestjs/jwt, @nestjs/passport, passport-jwt)
- **Database**: PostgreSQL
- **ORM**: TypeORM with migrations (production-ready)
- **Validation**: class-validator, class-transformer
- **Security**: bcrypt for password hashing, HttpOnly cookies, JWT tokens
- **Middleware**: cookie-parser for cookie handling
- **Language**: TypeScript

**Note:** Database tables are created via TypeORM migrations. Migrations run automatically on startup with seed data included!

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Forms**: React Hook Form
- **HTTP Client**: Axios with interceptors
- **State Management**: React Query (@tanstack/react-query)
- **Auth Management**: Custom AuthContext with React Context API
- **Language**: TypeScript

## 📦 Project Structure

```
wad-ia-07/
├── docker-compose.yml     # Docker orchestration
├── README.md              # This file
├── backend/               # Backend (NestJS)
│   ├── Dockerfile
│   ├── src/
│   │   ├── common/            # Shared resources
│   │   │   └── entities/      # TypeORM entities (User, RefreshToken)
│   │   ├── database/          # Database configuration
│   │   │   ├── data-source.ts # TypeORM data source for migrations
│   │   │   └── migrations/    # Database migrations
│   │   │       ├── 1733400000000-InitialMigration.ts
│   │   │       └── 1733400100000-SeedData.ts
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/          # Authentication module
│   │   │   │   ├── dto/       # Auth DTOs (login, register)
│   │   │   │   ├── guards/    # JWT auth guard
│   │   │   │   ├── strategies/# JWT strategy
│   │   │   │   ├── auth.controller.ts  # Auth endpoints
│   │   │   │   ├── auth.service.ts     # Auth business logic
│   │   │   │   └── auth.module.ts
│   │   │   └── user/          # User module
│   │   │       ├── user.controller.ts  # User-specific endpoints
│   │   │       ├── user.service.ts     # User data access methods
│   │   │       └── user.module.ts
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── .env.example
│   └── package.json
│
├── frontend/              # Frontend (Next.js)
│   ├── Dockerfile
│   ├── app/                   # Pages (App Router)
│   │   ├── page.tsx           # Home page
│   │   ├── login/             # Login page
│   │   ├── signup/            # Sign up page
│   │   └── dashboard/         # Protected dashboard
│   ├── components/            # React components
│   │   ├── home/              # Home page components
│   │   ├── auth/              # Auth form components
│   │   ├── ui/                # shadcn/ui components
│   │   └── protected-route.tsx # Route protection wrapper
│   ├── lib/                   # Utilities
│   │   ├── api.ts             # Axios instance with interceptors
│   │   ├── auth-context.tsx   # Authentication context
│   │   └── utils.ts
│   └── package.json
│
└── nginx/                 # Nginx configuration
    └── conf.d/
        └── default.conf
```

## 🔐 Authentication Flow

This application implements a secure JWT-based authentication system with the following flow:

### 1. **User Registration**
- User submits registration form with name, email, and password
- Backend validates input and checks for existing users
- Password is hashed using bcrypt (10 salt rounds)
- User is saved to the `users` table in the database with name field
- Response returns user info (id, name, email, createdAt)

### 2. **Login Process**
1. User submits login credentials (email + password)
2. Backend validates credentials:
   - Checks if user exists (returns `404` if not found)
   - Verifies password with bcrypt (returns `401` if wrong password)
3. On success, backend generates:
   - **Access Token**: Short-lived JWT (5 minutes) containing user ID and email
   - **Refresh Token**: Long-lived random token (7 days) stored in database
4. Response includes:
   - Access token in response body (stored in memory by frontend)
   - User info (id, name, email, createdAt) in response body
   - Refresh token in HttpOnly cookie (secure, not accessible by JavaScript)
5. Frontend displays personalized welcome message with user's name

### 3. **Authenticated Requests**
1. Axios interceptor automatically attaches access token to `Authorization` header
2. Backend validates JWT token using Passport JWT strategy
3. Protected routes (e.g., `/user/me`) require valid access token

### 4. **Automatic Token Refresh**
1. When access token expires, API returns `401 Unauthorized`
2. Axios response interceptor catches the error
3. Frontend automatically calls `/auth/refresh` with refresh token (from cookie)
4. Backend validates refresh token from database
5. New access token and user info are generated and returned
6. User data is updated in React Query cache
6. Original request is retried with new access token
7. If refresh token is invalid/expired:
   - User is logged out
   - All tokens are cleared
   - User is redirected to login page

### 5. **Logout Process**
1. User clicks logout button
2. Frontend calls `/auth/logout`
3. Backend:
   - Deletes refresh token from database
   - Clears refresh token cookie
4. Frontend:
   - Clears access token from memory
   - Invalidates all React Query cache
   - Redirects to login page

### 6. **Protected Routes**
- Dashboard and other protected pages use `ProtectedRoute` wrapper
- Checks authentication status before rendering
- Redirects unauthenticated users to login page
- Shows loading state while checking authentication

### 🔒 Security Measures

1. **Access tokens in memory**: Not stored in localStorage (prevents XSS attacks)
2. **Refresh tokens in HttpOnly cookies**: Not accessible by JavaScript (prevents XSS)
3. **SameSite cookie policy**: Prevents CSRF attacks
4. **Short-lived access tokens**: Minimizes damage if token is compromised
5. **Database-backed refresh tokens**: Allows server-side invalidation and audit trail
6. **Token revocation**: Tokens can be revoked without deletion (maintains audit history)
7. **Revoked field in database**: Prevents reuse of revoked tokens
8. **Secure cookie flag**: In production, cookies sent only over HTTPS
9. **CORS with credentials**: Properly configured to allow cookies

### 📊 Refresh Token Management

The `refresh_tokens` table includes:
- **token**: Unique refresh token string
- **userId**: Reference to the user
- **expiresAt**: Token expiration timestamp
- **revoked**: Boolean flag for token revocation (default: false)
- **createdAt**: Token creation timestamp

**Token Revocation Features:**
- `revokeToken(token)`: Revoke a specific refresh token
- `revokeAllUserTokens(userId)`: Revoke all tokens for a user (useful for security incidents)
- Revoked tokens are kept in database for audit purposes
- Automatic check for revoked status during token refresh

## 🚀 Getting Started

You can run this project in two ways:

### Option 1: 🐳 Docker (Recommended)

**Prerequisites:** Docker Desktop installed

```bash
# 1. Configure environment (if needed)
cd backend
cp .env.example .env
# Edit .env if you want to customize settings
cd ..

# 2. Start all services
docker compose up -d

# 3. View logs (optional)
docker compose logs -f

# Access the application:
# - Application: http://localhost:30080
# - API Endpoint: http://localhost:30080/api
# - API Documentation (Swagger): http://localhost:30080/api/docs
# - Frontend: Served through nginx
# - Backend: Served through nginx at /api
```

**Note:** All services communicate through an nginx reverse proxy. The application uses:
- **Port 30080** for HTTP traffic
- **Port 30443** for HTTPS traffic (when configured)
- Internal services (web, api, db) are not exposed directly

**Database migrations run automatically on startup with seed data included!**

### 🗄️ Database Migrations

This project uses TypeORM migrations for database schema management (production-ready approach):

**Seed Users (automatically created):**
- **Admin User** - admin@example.com / Admin@123
- **Test User** - test@example.com / User@123
- **John Doe** - john@example.com / Test@123

**Migration Commands:**
```bash
# Run migrations manually (if needed)
cd backend
npm run migration:run

# Revert last migration
npm run migration:revert

# Show migration status
npm run migration:show

# Generate new migration from entity changes
npm run migration:generate -- src/database/migrations/MigrationName

# Create empty migration
npm run migration:create -- src/database/migrations/MigrationName
```

**Note:** Migrations are automatically executed on application startup with `migrationsRun: true`.

#### Docker Commands

```bash
# Stop services
docker compose down

# Rebuild and restart
docker compose up -d --build

# View logs for all services
docker compose logs -f

# View logs for specific service
docker compose logs -f [web|api|db|nginx]

# Access database
docker compose exec db psql -U postgres -d authen_db

# Check service status
docker compose ps

# Restart specific service
docker compose restart [web|api|db|nginx]
```

### Option 2: 💻 Local Development

**Prerequisites:**
- Node.js v18 or higher
- PostgreSQL installed and running
- npm or yarn package manager

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create PostgreSQL database:**
   ```sql
   CREATE DATABASE authen_db;
   ```

3. **Configure environment variables:**
   
   Create a `.env` file (use `.env.example` as template):
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_NAME=authen_db
   PORT=3001
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   ```
   
   **Important:** Change `JWT_SECRET` to a strong random string in production!

5. **Start the backend server:**
   ```bash
   npm run start:dev
   ```
   
   Backend will run at `http://localhost:3001`

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```
   
   **Note:** When running with Docker, the frontend uses `/api` as the API URL (configured via nginx proxy).

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will run at `http://localhost:3000`

## 📖 Usage

### Complete Authentication Flow

1. **Open your browser** and navigate to `http://localhost:30080`

2. **Sign Up Process**:
   - Click "Sign Up" from the home page
   - Enter your email address
   - Create a password (must meet requirements: 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
   - Confirm your password
   - Click "Sign Up" button
   - On success, you'll see a success toast and be redirected to the login page

3. **Login Process**:
   - Enter your registered email and password
   - Click "Log In" button
   - On success:
     - Access token is stored in memory
     - Refresh token is stored in HttpOnly cookie
     - You're redirected to the dashboard

4. **Using the Dashboard** (Protected Route):
   - View your user profile information
   - See your account details (email, user ID, creation date)
   - Click "Logout" to end your session

5. **Automatic Features**:
   - **Token Refresh**: When your access token expires (after 5 minutes), the app automatically refreshes it using your refresh token
   - **Session Persistence**: Refresh page and you'll stay logged in (refresh token valid for 7 days)
   - **Auto Logout**: If refresh token expires, you'll be automatically logged out and redirected to login

6. **Security Features in Action**:
   - Try accessing `/dashboard` without logging in → Redirected to login
   - Logout and try to access protected routes → Redirected to login
   - Close browser and reopen within 7 days → Still logged in (refresh token persists)

## 🔌 API Endpoints

**API Documentation**: Interactive Swagger documentation is available at `http://localhost:30080/api/docs` (Docker) or `http://localhost:3001/docs` (local development).

### Authentication Endpoints

#### POST `/auth/login`

Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Success Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "user@example.com",
    "createdAt": "2025-12-05T10:30:00.000Z"
  }
}
```
**Note:** Refresh token is set as HttpOnly cookie.

**Error Responses:**
- `404 Not Found` - User not found
- `401 Unauthorized` - Invalid password
- `400 Bad Request` - Invalid input format

#### POST `/auth/refresh`

Refresh the access token using the refresh token cookie.

**Request:** No body required (uses HttpOnly cookie)

**Success Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "user@example.com",
    "createdAt": "2025-12-05T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or expired refresh token

#### POST `/auth/logout`

Logout and invalidate refresh token.

**Request:** No body required

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

#### GET `/user/me`

Get current user profile (protected route).

**Headers Required:**
```
Authorization: Bearer {accessToken}
```

**Success Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "user@example.com",
  "createdAt": "2025-12-05T10:30:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or expired access token

#### PATCH `/user/name`

Update user's name (protected route).

**Headers Required:**
```
Authorization: Bearer {accessToken}
```

**Request:**
```json
{
  "name": "Jane Doe"
}
```

**Success Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Jane Doe",
  "email": "user@example.com",
  "createdAt": "2025-12-05T10:30:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or expired access token
- `400 Bad Request` - Invalid name format

#### POST `/auth/register`

Register a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Success Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "user@example.com",
  "createdAt": "2025-12-05T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid email format or password doesn't meet requirements
- `409 Conflict` - Email already registered
- `500 Internal Server Error` - Server error

## ✅ Validation Rules

### Name
- Required field
- Must be a non-empty string
- Used for user profile display

### Email
- Required field
- Must be valid email format
- Must be unique (checked against database)

### Password
- Required field
- **Minimum length: 8 characters**
- **Must contain at least:**
  - 1 uppercase letter (A-Z)
  - 1 lowercase letter (a-z)
  - 1 number (0-9)
  - 1 special character (@$!%*?&)
- Hashed before storage (bcrypt with 10 salt rounds)

### Confirm Password (Frontend only)
- Must match the password field

## 🔒 Security Features

### Authentication Security
- **JWT Access Tokens**: Short-lived (15 minutes), stored in memory only
- **Refresh Tokens**: Long-lived (7 days), stored in HttpOnly cookies
- **HttpOnly Cookies**: Prevents JavaScript access, mitigating XSS attacks
- **SameSite Cookie Policy**: Prevents CSRF attacks
- **Secure Cookie Flag**: HTTPS-only in production
- **Database-backed Refresh Tokens**: Server-side invalidation capability
- **Automatic Token Refresh**: Seamless UX with Axios interceptors
- **Protected Routes**: Client-side guards with server-side verification

### General Security
- **Password Hashing**: bcrypt with 10 salt rounds
- **Input Validation**: Both client and server-side with class-validator
- **CORS Protection**: Configured for specific origins with credentials support
- **Environment Variables**: Sensitive data kept secure
- **SQL Injection Prevention**: TypeORM parameterized queries
- **XSS Protection**: React's built-in escaping
- **Error Handling**: Specific error messages (User not found, Invalid password)

## 🎨 UI/UX Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark Mode**: Automatic theme detection
- **Loading States**: Visual feedback during API calls
- **Error Messages**: Clear, user-friendly error messages
- **Success Feedback**: Confirmation messages and redirects
- **Accessibility**: Semantic HTML and ARIA labels

## 🧪 Testing

### Testing the Application (Docker)

**1. Register a New User via Frontend:**
- Navigate to http://localhost:30080
- Click "Sign Up"
- Enter email and password
- Submit the form

**2. Register via API (curl):**
```bash
curl -X POST http://localhost:30080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test@1234"}'
```

**3. Register via API (PowerShell):**
```powershell
Invoke-RestMethod -Uri "http://localhost:30080/api/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"name":"Test User","email":"test@example.com","password":"Test@1234"}'
```

**4. Verify User in Database:**
```bash
docker compose exec db psql -U postgres -d authen_db -c "SELECT id, name, email, \"createdAt\" FROM users;"
```

### Backend Unit Tests
```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Coverage report
```

### Frontend Tests
```bash
cd frontend
npm run lint          # ESLint check
npm run build         # Production build test
```

## 🐳 Docker Details

### Architecture

The application uses a **microservices architecture** with nginx as a reverse proxy:

```
Client → nginx:30080 → web:3000 (Next.js)
                    → api:3001 (NestJS) → db:5432 (PostgreSQL)
```

### Services

**Nginx Reverse Proxy**
- Image: `nginx:alpine`
- Container: `wad-ia07-nginx`
- External Ports: `30080` (HTTP), `30443` (HTTPS)
- Routes `/api/*` requests to backend
- Routes `/` requests to frontend
- Provides single entry point for the application

**PostgreSQL Database (db)**
- Image: `postgres:18.1-alpine`
- Container: `wad-ia07-db`
- Database Name: `authen_db`
- Internal Port: `5432` (not exposed externally)
- Persistent volume: `postgres_data`
- Health checks ensure database is ready
- Credentials: postgres/postgres (configurable)

**Backend API (api)**
- Container: `wad-ia07-api`
- Built from: `./backend/Dockerfile`
- Node.js: `24.3-alpine`
- Internal Port: `3001` (accessed via nginx)
- Multi-stage build for optimized image
- Auto-creates database tables via TypeORM
- Waits for PostgreSQL to be healthy before starting
- Non-root user (nestjs:1001)

**Frontend Web (web)**
- Container: `wad-ia07-web`
- Built from: `./frontend/Dockerfile`
- Node.js: `24.3-alpine`
- Internal Port: `3000` (accessed via nginx)
- Multi-stage build for optimized image
- Next.js with server-side rendering
- Waits for backend to be ready
- Non-root user (nextjs:1001)

### Database Management

**Verify tables were created:**
```bash
# Access PostgreSQL
docker compose exec db psql -U postgres -d authen_db

# List tables
\dt

# View users table structure
\d users

# Query users
SELECT id, name, email, "createdAt" FROM users;

# Exit
\q
```

**Backup database:**
```bash
docker compose exec db pg_dump -U postgres authen_db > backup.sql
```

**Restore database:**
```bash
docker compose exec -T db psql -U postgres -d authen_db < backup.sql
```

### Network Configuration

**Custom Network:**
- Name: `app-network`
- Driver: `bridge`
- Allows service-to-service communication using hostnames

**Service Hostnames:**
- `db` - Database service
- `api` - Backend API service
- `web` - Frontend web service
- `nginx` - Reverse proxy service

## 📚 Additional Documentation

- [Backend README](./backend/README.md) - Detailed backend API documentation
- [Frontend README](./frontend/README.md) - Detailed frontend documentation

## 🚢 Deployment

### Docker Deployment (Recommended)

**Railway.app (Free Tier):**
1. Connect your GitHub repository
2. Add PostgreSQL database service
3. Deploy backend and frontend services from docker-compose.yml
4. Set environment variables in Railway dashboard

**Render.com:**
1. Create PostgreSQL database
2. Deploy backend as Docker Web Service
3. Deploy frontend as Docker Web Service
4. Configure environment variables

**AWS/Google Cloud/Azure:**
- Use container services (ECS, Cloud Run, Container Instances)
- Push Docker images to container registry (ECR, GCR, ACR)
- Deploy with managed PostgreSQL database
- Set up load balancers and SSL certificates

### Manual Deployment

**Recommended Platforms:**
- **Backend**: Railway, Render, Heroku, Fly.io
- **Frontend**: Vercel (recommended for Next.js), Netlify, Cloudflare Pages
- **Database**: Railway PostgreSQL, Supabase, Neon, AWS RDS

### Production Considerations

1. **Security**:
   - Change database password in `.env`
   - Set `synchronize: false` in TypeORM config
   - Use database migrations instead of auto-sync
   - Enable HTTPS for all services
   - Add rate limiting to API endpoints

2. **Performance**:
   - Enable caching (Redis)
   - Use CDN for frontend assets
   - Enable compression
   - Optimize Docker images

3. **Monitoring**:
   - Set up logging (ELK stack, CloudWatch)
   - Add health check endpoints
   - Monitor database performance
   - Set up alerts for errors

## 🤝 Contributing

This is an academic project (IA07 assignment). For improvements or suggestions, please contact the project maintainer.

## 📄 License

This project is for educational purposes as part of Web Application Development coursework.

## 👨‍💻 Author

**HCMUS - Web Application Development Course**  
Year 4, Semester 1 - Assignment IA07

## 🆘 Troubleshooting

### Docker Issues

**Services won't start:**
```bash
# Check logs
docker compose logs

# Common fixes:
# - Ports 30080/30443 in use: change ports in docker-compose.yml
# - Not enough memory: increase Docker memory limit
# - Build errors: check Dockerfile syntax
```

**Database tables not created:**
```bash
# Check backend logs for TypeORM messages
docker compose logs api | grep -i "table\|database"

# Restart backend to trigger table creation
docker compose restart api

# Or rebuild everything
docker compose down -v
docker compose up -d
```

**Backend can't connect to database:**
```bash
# Verify database is running
docker compose ps db

# Check database health
docker compose exec db pg_isready -U postgres

# Verify environment variables
docker compose exec api env | grep DATABASE
```

**Frontend can't connect to backend:**
```bash
# Test through nginx (recommended)
curl http://localhost:30080/api

# Check nginx logs
docker compose logs nginx

# Check backend logs
docker compose logs api

# Check frontend logs
docker compose logs web
```

**Nginx routing issues:**
```bash
# Test nginx configuration
docker compose exec nginx nginx -t

# Reload nginx configuration
docker compose exec nginx nginx -s reload

# Check nginx config
docker compose exec nginx cat /etc/nginx/conf.d/default.conf
```

### Local Development Issues

**Backend won't start:**
- Ensure PostgreSQL is running locally
- Check `.env` file has correct database credentials
- Verify database exists: `CREATE DATABASE authen_db;`
- Check port 3001 is not in use

**Frontend can't connect to backend:**
- Verify backend is running on `http://localhost:3001`
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Ensure CORS is properly configured in `backend/src/main.ts`

**Registration fails:**
- Check backend logs for detailed error messages
- Verify email format is valid
- Ensure password meets all requirements (8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
- Check database connection and table exists

### Clean Everything

```bash
# Stop all services and remove volumes (deletes data!)
docker compose down -v

# Remove all Docker build cache
docker system prune -a --volumes

# Start fresh
docker compose up -d --build
```

## 📞 Support

For questions or issues related to this assignment, please contact your course instructor or TA.

---

**Built with ❤️ using NestJS, Next.js, and modern web technologies**
