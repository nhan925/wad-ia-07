# 🚀 User Registration System (IA06)

A complete full-stack user registration system with a NestJS backend and Next.js frontend, fully containerized with Docker.

## 📋 Overview

This project implements a modern user registration system featuring:
- **Backend**: RESTful API built with NestJS, TypeORM, and PostgreSQL
- **Frontend**: Responsive React application using Next.js 16, React 19, shadcn/ui, and Tailwind CSS
- **Authentication**: Secure password hashing with bcrypt
- **Validation**: Strong password requirements with both client-side and server-side validation
- **Notifications**: Toast notifications for user feedback
- **State Management**: React Query for efficient API communication
- **Docker**: Full containerization with Docker Compose for easy deployment

## 🎯 Features

### Backend (NestJS)
- ✅ User registration endpoint (`POST /user/register`)
- ✅ PostgreSQL database with TypeORM
- ✅ Password hashing with bcrypt
- ✅ Email uniqueness validation
- ✅ Input validation with class-validator
- ✅ CORS enabled for frontend
- ✅ Environment-based configuration
- ✅ Comprehensive error handling

### Frontend (Next.js)
- ✅ Modern UI with shadcn/ui components
- ✅ Tailwind CSS v4 styling
- ✅ React Hook Form for form management
- ✅ React Query for API state
- ✅ Native Next.js fetch API
- ✅ Responsive design
- ✅ Dark mode support
- ✅ TypeScript throughout
- ✅ Real-time form validation

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM (auto-creates tables via `synchronize: true`)
- **Validation**: class-validator, class-transformer
- **Security**: bcrypt for password hashing
- **Language**: TypeScript

**Note:** Database tables are automatically created when the backend starts. No manual SQL needed!

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Forms**: React Hook Form
- **API Client**: React Query + Native Fetch
- **Language**: TypeScript

## 📦 Project Structure

```
wad-ia-06/
├── docker-compose.yml     # Docker orchestration
├── README.md              # This file
├── backend/               # Backend (NestJS)
│   ├── Dockerfile
│   ├── src/
│   │   ├── user/              # User module
│   │   │   ├── dto/           # Data transfer objects
│   │   │   ├── entities/      # TypeORM entities
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env.example
│   └── package.json
│
├── frontend/              # Frontend (Next.js)
│   ├── Dockerfile
│   ├── app/                   # Pages (App Router)
│   │   ├── page.tsx           # Home page
│   │   ├── login/             # Login page
│   │   └── signup/            # Sign up page
│   ├── components/            # React components
│   │   ├── home/              # Home page components
│   │   ├── auth/              # Auth form components
│   │   └── ui/                # shadcn/ui components
│   ├── lib/                   # Utilities & API client
│   └── package.json
│
└── nginx/                 # Nginx configuration
    └── conf.d/
        └── default.conf
```

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
# - Frontend: Served through nginx
# - Backend: Served through nginx at /api
```

**Note:** All services communicate through an nginx reverse proxy. The application uses:
- **Port 30080** for HTTP traffic
- **Port 30443** for HTTPS traffic (when configured)
- Internal services (web, api, db) are not exposed directly

**Database tables are automatically created by TypeORM when the backend starts!**

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
   ```

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

1. **Open your browser** and navigate to `http://localhost:30080`

2. **From the home page**, you can:
   - Click "Sign Up" to create a new account
   - Click "Log In" to access the login page

3. **Sign Up Process**:
   - Enter your email address
   - Create a password (must meet requirements: 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
   - Confirm your password
   - Click "Sign Up" button
   - On success, you'll see a success toast and be redirected to the login page

4. **Login Page** (UI only - mock implementation):
   - Enter credentials
   - Receive mock authentication feedback

## 🔌 API Endpoints

### POST `/user/register`

Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "createdAt": "2025-11-22T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid email format or password doesn't meet requirements
- `409 Conflict` - Email already registered
- `500 Internal Server Error` - Server error

## ✅ Validation Rules

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

- **Password Hashing**: bcrypt with 10 salt rounds
- **Input Validation**: Both client and server-side
- **CORS Protection**: Configured for specific origins
- **Environment Variables**: Sensitive data kept secure
- **SQL Injection Prevention**: TypeORM parameterized queries
- **XSS Protection**: React's built-in escaping

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
curl -X POST http://localhost:30080/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@1234"}'
```

**3. Register via API (PowerShell):**
```powershell
Invoke-RestMethod -Uri "http://localhost:30080/api/user/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"test@example.com","password":"Test@1234"}'
```

**4. Verify User in Database:**
```bash
docker compose exec db psql -U postgres -d authen_db -c "SELECT id, email, \"createdAt\" FROM users;"
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
- Container: `wad-ia06-nginx`
- External Ports: `30080` (HTTP), `30443` (HTTPS)
- Routes `/api/*` requests to backend
- Routes `/` requests to frontend
- Provides single entry point for the application

**PostgreSQL Database (db)**
- Image: `postgres:18.1-alpine`
- Container: `wad-ia06-db`
- Database Name: `authen_db`
- Internal Port: `5432` (not exposed externally)
- Persistent volume: `wad-ia06-postgres-data`
- Health checks ensure database is ready
- Credentials: postgres/postgres (configurable)

**Backend API (api)**
- Container: `wad-ia06-api`
- Built from: `./backend/Dockerfile`
- Node.js: `24.3-alpine`
- Internal Port: `3001` (accessed via nginx)
- Multi-stage build for optimized image
- Auto-creates database tables via TypeORM
- Waits for PostgreSQL to be healthy before starting
- Non-root user (nestjs:1001)

**Frontend Web (web)**
- Container: `wad-ia06-web`
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
SELECT id, email, "createdAt" FROM users;

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
- Name: `wad-ia06-network`
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

This is an academic project (IA06 assignment). For improvements or suggestions, please contact the project maintainer.

## 📄 License

This project is for educational purposes as part of Web Application Development coursework.

## 👨‍💻 Author

**HCMUS - Web Application Development Course**  
Year 4, Semester 1 - Assignment IA06

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
