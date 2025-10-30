# GVerify - Background Verification Platform

A complete field verification platform for loans, insurance, vehicles, assets, and vendor verification services.

## Project Structure

```
├── garudaverify-frontend/  # Next.js 14 Frontend
├── garudaverify-backend/   # NestJS Backend API
└── docker-compose.yml      # Docker orchestration
```

## Features

- **Multi-role authentication** (Admin, Client, Field Agent)
- **Verification request management**
- **Field agent assignment**
- **Evidence upload with GPS tracking**
- **PDF report generation**
- **REST API with JWT authentication**
- **PostgreSQL database with Prisma ORM**

## Tech Stack

### Frontend
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod validation

### Backend
- NestJS 10
- Prisma ORM
- PostgreSQL 16
- JWT authentication
- Argon2 password hashing

## Quick Start with Docker

### Prerequisites
- Docker & Docker Compose installed
- Ports 3000, 8080, and 5432 available

### Running the Application

1. **Start all services:**
   ```bash
   docker-compose up -d
   ```

2. **Check service status:**
   ```bash
   docker-compose ps
   ```

3. **View logs:**
   ```bash
   # All services
   docker-compose logs -f

   # Specific service
   docker-compose logs -f backend
   docker-compose logs -f frontend
   docker-compose logs -f postgres
   ```

4. **Stop services:**
   ```bash
   docker-compose down
   ```

5. **Stop and remove volumes:**
   ```bash
   docker-compose down -v
   ```

### Access Points

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **Database:** localhost:5432

### Default Credentials (for seeded data)

```
Admin:
  Email: admin@garudaverify.in
  Password: Admin@123

Client:
  Email: client@acme.com
  Password: Client@123

Field Agent:
  Email: field@garudaverify.in
  Password: Field@123
```

## Local Development (Without Docker)

### Backend Setup

```bash
cd garudaverify-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run seed

# Start development server
npm run start:dev
```

### Frontend Setup

```bash
cd garudaverify-frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

## Database Management

### Run migrations
```bash
docker-compose exec backend npx prisma migrate dev
```

### Access Prisma Studio
```bash
cd garudaverify-backend
npx prisma studio
```

### Seed database
```bash
docker-compose exec backend npm run seed
```

## API Endpoints

### Authentication
- `POST /auth/login` - Login with email/phone and password

### Users
- `GET /users/me` - Get current user profile

### Verification Requests
- `GET /requests` - List all requests
- `POST /requests` - Create new request
- `GET /requests/:id` - Get request details

## Project Architecture

### Database Models
- **User** - Admin, Client, and Field Agent users
- **Organization** - Client organizations and internal org
- **VerificationRequest** - Verification requests with multiple types
- **Assignment** - Field agent job assignments
- **Evidence** - Photos, videos, documents with GPS data
- **Report** - Generated PDF reports
- **ApiKey** - API keys for client integration

### Request Types
- Loan verification
- Pre/Post insurance verification
- Vehicle inspection & valuation
- Asset verification
- Vendor hub verification
- Documents collection

## Environment Variables

### Backend (.env)
```env
PORT=8080
DATABASE_URL=postgresql://user:pass@host:5432/garudaverify
JWT_ACCESS_SECRET=your-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_ACCESS_EXPIRES=900
JWT_REFRESH_EXPIRES=1209600
CORS_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Troubleshooting

### Backend not starting
```bash
# Check logs
docker-compose logs backend

# Rebuild backend
docker-compose up -d --build backend
```

### Frontend not loading
```bash
# Check logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up -d --build frontend
```

### Database issues
```bash
# Reset database
docker-compose down -v
docker-compose up -d
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Proprietary - All rights reserved

## Support

For issues and questions, please open an issue on the repository.
