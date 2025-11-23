<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A robust user registration API built with NestJS, TypeORM, and PostgreSQL.

## ✨ Features

- ✅ **User Registration**: Secure registration with email and password
- ✅ **Email Validation**: Uniqueness check and format validation
- ✅ **Password Security**: bcrypt hashing with 10 salt rounds
- ✅ **Database**: PostgreSQL with TypeORM ORM
- ✅ **Auto Schema**: TypeORM automatically creates database tables
- ✅ **Input Validation**: class-validator for DTO validation
- ✅ **CORS**: Enabled for frontend integration
- ✅ **Environment Config**: Secure configuration management
- ✅ **Error Handling**: Comprehensive error responses
- ✅ **Docker Support**: Containerized for easy deployment

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Installation & Setup

1. **Install dependencies:**
   ```bash
   $ npm install
   ```

2. **Configure environment variables:**
   
   Create a `.env` file in the root directory with your database credentials:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=user_registration_db
   PORT=3001
   ```

3. **Ensure PostgreSQL is running** and the database exists. You can create it using:
   ```sql
   CREATE DATABASE user_registration_db;
   ```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode (recommended for development)
$ npm run start:dev

# production mode
$ npm run start:prod
```

The API will be available at `http://localhost:3001`

## API Endpoints

### POST `/user/register`

Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "createdAt": "2025-11-22T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid input data
- `409 Conflict` - Email already exists
- `500 Internal Server Error` - Server error

## 📊 Database Schema

### User Table (Auto-created by TypeORM)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | Primary Key, Auto-generated | Unique user identifier |
| email | TEXT | Unique, NOT NULL | User's email address |
| password | TEXT | NOT NULL | Hashed password (bcrypt) |
| createdAt | TIMESTAMPTZ | Auto-generated | Account creation timestamp |

**Note**: The table is automatically created when the backend starts due to `synchronize: true` in TypeORM configuration. For production, use migrations instead.

## 📁 Project Structure

```
backend/
├── src/
│   ├── user/                       # User module
│   │   ├── dto/
│   │   │   └── register-user.dto.ts    # Data validation DTOs
│   │   ├── entities/
│   │   │   └── user.entity.ts          # TypeORM User entity
│   │   ├── user.controller.ts          # HTTP endpoints
│   │   ├── user.service.ts             # Business logic
│   │   └── user.module.ts              # Module definition
│   ├── app.module.ts                   # Root application module
│   └── main.ts                         # Application entry point
│
├── test/                           # E2E tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── Dockerfile                      # Docker image definition
├── .dockerignore                   # Docker ignore rules
├── .env.example                    # Environment template
├── nest-cli.json                   # NestJS CLI configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies and scripts
```

## 🛠️ Technologies Used

- **NestJS** - Progressive Node.js framework with TypeScript
- **TypeORM** - TypeScript ORM with Active Record pattern
- **PostgreSQL** - Robust relational database
- **bcrypt** - Industry-standard password hashing
- **class-validator** - Decorator-based validation
- **class-transformer** - Object to class transformation
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 🔒 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds (configurable)
- **Email Validation**: Format and uniqueness checking
- **Password Requirements**: 
  - Minimum 8 characters
  - 1 uppercase letter
  - 1 lowercase letter
  - 1 number
  - 1 special character (@$!%*?&)
- **CORS Protection**: Configured for specific origins
- **Environment Variables**: Sensitive data kept secure
- **SQL Injection Prevention**: TypeORM parameterized queries
- **Input Sanitization**: class-validator and class-transformer
- **Error Handling**: No sensitive information leaked in errors

## 🧪 Password Validation

The password validation includes both backend and frontend checks:

```typescript
// Backend validation (register-user.dto.ts)
@IsString()
@MinLength(8)
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  message: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
})
password: string;
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 🐳 Docker Support

This backend can be run with Docker:

```bash
# Build the image
docker build -t backend .

# Run the container
docker run -p 3001:3001 \
  -e DATABASE_HOST=your-db-host \
  -e DATABASE_PORT=5432 \
  -e DATABASE_USER=postgres \
  -e DATABASE_PASSWORD=your-password \
  -e DATABASE_NAME=user_registration_db \
  backend
```

Or use the docker-compose setup from the project root:

```bash
# From project root
docker-compose up -d
```

## 🚀 Deployment

### Docker Deployment (Recommended)

Use the provided Dockerfile and docker-compose.yml:

```bash
# Production build
docker-compose up -d --build
```

### Cloud Platforms

**Railway.app:**
```bash
# Push to GitHub and connect to Railway
# Add PostgreSQL database
# Deploy automatically
```

**Render.com:**
- Create Web Service from Docker
- Add PostgreSQL database
- Set environment variables

**Heroku:**
```bash
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

**AWS/Google Cloud/Azure:**
- Use container services (ECS, Cloud Run, Container Instances)
- Deploy with managed PostgreSQL
- Set up load balancers and SSL

### Production Considerations

**Important for production:**

1. **Database Configuration:**
   ```typescript
   // Set synchronize to false
   synchronize: false,
   
   // Use migrations instead
   migrations: ['dist/migrations/*.js'],
   migrationsRun: true,
   ```

2. **Environment Variables:**
   - Never commit `.env` file
   - Use platform's secret management
   - Set `NODE_ENV=production`

3. **Security:**
   - Enable HTTPS
   - Add rate limiting
   - Implement JWT authentication
   - Add request validation
   - Enable helmet for security headers

4. **Performance:**
   - Enable caching (Redis)
   - Use connection pooling
   - Enable compression
   - Optimize database queries

5. **Monitoring:**
   - Set up logging (Winston, Pino)
   - Add health check endpoints
   - Monitor database performance
   - Set up error tracking (Sentry)

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## 🤝 Contributing

This is an academic project (IA06 assignment). For improvements or suggestions, please contact the project maintainer.

## 📄 License

This project is for educational purposes as part of HCMUS Web Application Development coursework.

## 📚 NestJS Resources

- [NestJS Documentation](https://docs.nestjs.com) - Official documentation
- [NestJS Discord](https://discord.gg/G7Qnnhy) - Community support
- [NestJS Courses](https://courses.nestjs.com/) - Video courses
- [TypeORM Documentation](https://typeorm.io/) - ORM documentation

## 🆘 Troubleshooting

### Tables not created
```bash
# Check backend logs for TypeORM synchronize messages
npm run start:dev

# If using Docker:
docker-compose logs backend | grep -i "table"
```

### Database connection failed
```bash
# Verify PostgreSQL is running
# Check .env credentials
# Test connection:
psql -h localhost -U postgres -d user_registration_db
```

### Port already in use
```bash
# Change PORT in .env or kill the process:
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac:
lsof -i :3001
kill -9 <PID>
```

---

**Built with ❤️ using NestJS and TypeScript**
